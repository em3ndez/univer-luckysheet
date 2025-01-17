import './desktop.module.less';

import { CoverCommand, DocsView, DocsViewManagerService, ICoverCommandParams } from '@univerjs/base-docs';
import {
    DocsEditor,
    Engine,
    IMouseEvent,
    IPointerEvent,
    IRenderingEngine,
    ISelectionTransformerShapeManager,
    Layer,
    Scene,
    Viewport,
} from '@univerjs/base-render';
import {
    CANVAS_VIEW_KEY,
    CanvasView,
    ISetRangeValuesCommandParams,
    SelectionManagerService,
    SetRangeValuesCommand,
} from '@univerjs/base-sheets';
import {
    createEmptyDocSnapshot,
    Disposable,
    handleJsonToDom,
    ICommandService,
    IContextService,
    ICurrentUniverService,
    IDocumentData,
    ISelectionCell,
    ISelectionRange,
    IStyleData,
    Nullable,
    toDisposable,
} from '@univerjs/core';
import { Inject, Injector } from '@wendellhu/redi';

import { FOCUSING_SHEET_CELL_EDITOR, FOCUSING_SHEET_EDITOR } from '../context/context';
import { ICellEditorService } from './cell-editor.service';
import { getPositionOfCurrentCell, ICellPosition } from './utils';

const SHEET_CELL_EDITOR_CLASSNAME = 'univer-cell-editor-container';
const SHEET_CELL_EDITOR_MODEL_ID = 'sheet.model.cell-editor';

// TODO: active cell editor when on input or IME input. Should clear the cell editor when activate it with a keystroke.

/**
 * Cell editor for Univer on desktop. Reuse by multi univer sheet documents.
 */
export class DesktopCellEditorService extends Disposable implements ICellEditorService {
    private _containerElement: HTMLDivElement;

    private _editorEngine: Engine;

    private _editorScene: Scene;

    /** This flag indicated whether the cell editor is visible (as it always handles keyboard events when a UniverSheet is focused). */
    private _activated = false;

    private _currentEditingCell: Nullable<ISelectionRange> = null;

    constructor(
        @Inject(Injector) private readonly _injector: Injector,
        @Inject(CanvasView) private readonly _sheetCanvasView: CanvasView,
        @Inject(SelectionManagerService) private _selectionManagerService: SelectionManagerService,
        @ISelectionTransformerShapeManager
        private readonly _selectionTransformerShapeManager: ISelectionTransformerShapeManager,
        @ICommandService private readonly _commandService: ICommandService,
        @IRenderingEngine private readonly _renderingEngine: Engine,
        @ICurrentUniverService private readonly _currentUniverService: ICurrentUniverService,
        @IContextService private readonly _contextService: IContextService
    ) {
        super();
    }

    initialize(): void {
        this._mountCellEditor();
        this._initListeners();
        this._focusCurrentSheet();
    }

    override dispose(): void {
        super.dispose();

        document.body.removeChild(this._containerElement);
    }

    async enterEditing() {
        if (this._activated) {
            return;
        }

        this._activated = true;

        // Steps of starting a cell editor:
        // 1. get cell info at the given positions
        // 2. mount cell editor at the given position.
        // 3. set quitting editor callbacks.
        const currentCell = this._selectionManagerService.getLast()?.cellRange;
        if (!currentCell) {
            return;
        }

        this._currentEditingCell = getRangeFromCellInfo(currentCell);
        const position = this._positionCellEditor(currentCell);
        await this._updateDocumentModelFromCellModel(position);

        this._contextService.setContextValue(FOCUSING_SHEET_EDITOR, true);
        this._contextService.setContextValue(FOCUSING_SHEET_CELL_EDITOR, true);

        this._currentUniverService.focusUniverInstance(SHEET_CELL_EDITOR_MODEL_ID); // focus the UniverDoc instance to enable rich text editing
        this._getCellEditor()?.activate();
    }

    quitEditing(): void {
        if (!this._activated) {
            return;
        }

        this._activated = false;
        this._hideCellEditor();

        const currentUniverSheet = this._currentUniverService.getCurrentUniverSheetInstance();
        const workbookId = currentUniverSheet.getUnitId();
        this._currentUniverService.focusUniverInstance(workbookId);
        this._contextService.setContextValue(FOCUSING_SHEET_EDITOR, false);
        this._contextService.setContextValue(FOCUSING_SHEET_CELL_EDITOR, false);

        const model = this._currentUniverService.getUniverDocInstance(SHEET_CELL_EDITOR_MODEL_ID)!.getDocument();
        const dataStream = model.getBodyModel().getText();
        this._getCellEditor()?.deactivate(true);

        this._commandService.executeCommand(SetRangeValuesCommand.id, <ISetRangeValuesCommandParams>{
            workbookId,
            worksheetId: currentUniverSheet.getWorkBook().getActiveSheet().getSheetId(),
            range: this._currentEditingCell,
            value: {
                v: dataStream,
            },
        });
    }

    private _focusCurrentSheet(): void {
        this._currentUniverService.focusUniverInstance(
            this._currentUniverService.getCurrentUniverSheetInstance().getUnitId()
        );
    }

    private _mountCellEditor(): void {
        // container element
        const containerElement = (this._containerElement = document.createElement('div'));
        containerElement.classList.add(SHEET_CELL_EDITOR_CLASSNAME);
        containerElement.style.position = 'fixed';
        containerElement.style.boxSizing = 'border-box';
        containerElement.style.background = 'white';
        containerElement.style.outline = '2px solid #a8c7fa';
        containerElement.style.border = '2px solid #0b57d0';
        containerElement.setAttribute('spellcheck', 'false');

        // set basic docModel
        // use the model to create a UniverDoc
        const cellEditorDoc = this._currentUniverService.createDoc({
            ...createEmptyDocSnapshot(),
            id: SHEET_CELL_EDITOR_MODEL_ID,
            documentStyle: {
                marginLeft: 2,
                marginTop: 2,
                marginRight: 2,
                marginBottom: 2,
                marginHeader: 2,
                marginFooter: 2,
                pageSize: {
                    height: 200,
                    width: 200,
                },
            },
        });
        const docModel = cellEditorDoc.getDocument();

        // rendering engine add document canvas
        const engine = (this._editorEngine = new Engine());
        const scene = (this._editorScene = new Scene(CANVAS_VIEW_KEY.CELL_EDITOR, engine, {
            width: 200,
            height: 100,
        }));
        scene.openTransformer();
        const viewMain = new Viewport(CANVAS_VIEW_KEY.CELL_EDITOR, scene, {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            isWheelPreventDefaultX: true,
        });
        scene.addViewport(viewMain).attachControl();
        scene.addLayer(Layer.create(scene, [], 0), Layer.create(scene, [], 2));
        const docsView = this._injector.createInstance(DocsView, docModel);
        docsView.initialize(scene);

        engine.runRenderLoop(() => {
            scene.render();
        });

        document.body.appendChild(this._containerElement);
        engine.setContainer(this._containerElement);
    }

    private _positionCellEditor(currentCell: ISelectionCell) {
        const cellInfo = this._selectionTransformerShapeManager.convertCellRangeToInfo(currentCell)!;
        const position = getPositionOfCurrentCell(cellInfo, this._renderingEngine);

        this._containerElement.style.display = 'block';
        this._containerElement.style.left = `${position.left}px`;
        this._containerElement.style.top = `${position.top}px`;
        this._containerElement.style.minHeight = `${position.minHeight}px`;
        this._containerElement.style.minWidth = `${position.minWidth}px`;
        this._containerElement.style.maxHeight = `${position.maxHeight}px`;
        this._containerElement.style.maxWidth = `${position.maxWidth}px`;

        this._editorEngine.resize();
        this._containerElement.focus();

        return position;
    }

    private _hideCellEditor(): void {
        this._containerElement.style.display = 'none';
    }

    private _initListeners(): void {
        const main = this._sheetCanvasView.getSheetView().getSpreadsheet();
        if (main == null) {
            return;
        }
        const onDbClickObserver = main.onDblclickObserver.add((evt: IPointerEvent | IMouseEvent) => {
            if (evt.button !== 2) {
                this.enterEditing();
                evt.preventDefault();
            }
        });
        const pointerDownObserver = main.onPointerDownObserver.add((evt: IPointerEvent | IMouseEvent) => {
            this.quitEditing();
        });

        this.disposeWithMe(
            toDisposable(() => {
                main.onDblclickObserver.remove(onDbClickObserver);
                main.onPointerDownObserver.remove(pointerDownObserver);
            })
        );
    }

    private async _updateDocumentModelFromCellModel(position: ICellPosition): Promise<void> {
        const cellEditorModel = this._currentUniverService
            .getUniverDocInstance(SHEET_CELL_EDITOR_MODEL_ID)
            ?.getDocument();
        if (!cellEditorModel) {
            throw new Error('Cell editor model not found!');
        }

        const cellValue = this._getCellValue();
        const style = this._getCellStyle();

        const snapshot: IDocumentData = {
            id: SHEET_CELL_EDITOR_MODEL_ID,
            body: {
                dataStream: `${cellValue}\r\n\0`,
            },
            documentStyle: {
                marginLeft: 2,
                marginTop: 2,
                marginRight: 2,
                marginBottom: 2,
                marginHeader: 2,
                marginFooter: 2,
                // FIXME: width here is not correct
                pageSize: {
                    height: position.minHeight - 2 * 2,
                    width: position.minWidth - 2 * 2,
                },
            },
        };

        return this._commandService.executeCommand<ICoverCommandParams, void>(CoverCommand.id, {
            unitId: SHEET_CELL_EDITOR_MODEL_ID,
            snapshot,
            clearUndoRedoStack: true,
        });
    }

    private _getCellValue(): string {
        const range = this._getActiveRange();
        if (!range) {
            return '';
        }

        const value = range && range.getDisplayValue();
        if (typeof value === 'string') {
            return value;
        }

        if (typeof value === 'object' && value !== null) {
            return handleJsonToDom(value);
        }

        return '';
    }

    private _getCellStyle(): Nullable<IStyleData> {
        return this._getActiveRange()?.getTextStyle();
    }

    private _getCellEditor(): Nullable<DocsEditor> {
        return this._injector
            .get(DocsViewManagerService)
            .getDocsView(SHEET_CELL_EDITOR_MODEL_ID)
            ?.getDocs()
            .getEditor();
    }

    private _getActiveRange() {
        const cellRange = this._selectionManagerService.getLast()?.cellRange;
        if (!cellRange) return;
        let { row, column } = cellRange;

        if (cellRange.isMerged) {
            row = cellRange.startRow;
            column = cellRange.startColumn;
        }

        return this._currentUniverService
            .getCurrentUniverSheetInstance()
            .getWorkBook()
            .getActiveSheet()
            .getRange(row, column);
    }
}

function getRangeFromCellInfo(cellInfo: ISelectionCell): ISelectionRange {
    let startRow: number;
    let startColumn: number;

    let endRow: number;

    let endColumn: number;

    if (cellInfo.isMerged) {
        startRow = cellInfo.startRow;
        startColumn = cellInfo.startColumn;

        endRow = cellInfo.endRow;
        endColumn = cellInfo.endColumn;
    } else {
        startRow = endRow = cellInfo.row;
        startColumn = endColumn = cellInfo.column;
    }

    return {
        startRow,
        startColumn,
        endRow,
        endColumn,
    };
}
