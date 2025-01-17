import {
    CommandType,
    ICellData,
    ICommand,
    ICommandService,
    ICurrentUniverService,
    ISelectionRange,
    isICellData,
    IUndoRedoService,
    ObjectMatrix,
    ObjectMatrixPrimitiveType,
    Tools,
} from '@univerjs/core';
import { IAccessor } from '@wendellhu/redi';

import { SelectionManagerService } from '../../Services/selection-manager.service';
import {
    ISetRangeValuesMutationParams,
    SetRangeValuesMutation,
    SetRangeValuesUndoMutationFactory,
} from '../Mutations/set-range-values.mutation';

export interface ISetRangeValuesCommandParams {
    worksheetId?: string;
    workbookId?: string;
    range?: ISelectionRange;
    value: ICellData | ICellData[][] | ObjectMatrixPrimitiveType<ICellData>;
}

/**
 * The command to set values for ranges.
 */
export const SetRangeValuesCommand: ICommand = {
    id: 'sheet.command.set-range-values',
    type: CommandType.COMMAND,
    handler: async (accessor: IAccessor, params: ISetRangeValuesCommandParams) => {
        const commandService = accessor.get(ICommandService);
        const undoRedoService = accessor.get(IUndoRedoService);
        const currentUniverService = accessor.get(ICurrentUniverService);
        const selectionManagerService = accessor.get(SelectionManagerService);

        const {
            value,
            range,
            workbookId = currentUniverService.getCurrentUniverSheetInstance().getUnitId(),
            worksheetId = currentUniverService
                .getCurrentUniverSheetInstance()
                .getWorkBook()
                .getActiveSheet()
                .getSheetId(),
        } = params;

        const currentSelections = range ? [range] : selectionManagerService.getRangeDatas();
        if (!currentSelections || !currentSelections.length) {
            return false;
        }

        const cellValue = new ObjectMatrix<ICellData>();
        let realCellValue: ObjectMatrixPrimitiveType<ICellData> | undefined;

        // FIXME: this is actually not ideal
        for (let i = 0; i < currentSelections.length; i++) {
            const { startRow, startColumn, endRow, endColumn } = currentSelections[i];
            if (Tools.isArray(value)) {
                for (let r = 0; r <= endRow - startRow; r++) {
                    for (let c = 0; c <= endColumn - startColumn; c++) {
                        cellValue.setValue(r + startRow, c + startColumn, value[r][c]);
                    }
                }
            } else if (isICellData(value)) {
                cellValue.setValue(startRow, startColumn, value);
            } else {
                realCellValue = value as ObjectMatrixPrimitiveType<ICellData>;
            }
        }

        const setRangeValuesMutationParams: ISetRangeValuesMutationParams = {
            rangeData: currentSelections,
            worksheetId,
            workbookId,
            cellValue: realCellValue ?? cellValue.getMatrix(),
        };
        const undoSetRangeValuesMutationParams: ISetRangeValuesMutationParams = SetRangeValuesUndoMutationFactory(
            accessor,
            setRangeValuesMutationParams
        );

        const result = commandService.executeCommand(SetRangeValuesMutation.id, setRangeValuesMutationParams);
        if (result) {
            undoRedoService.pushUndoRedo({
                URI: workbookId,
                undo() {
                    return commandService.executeCommand(SetRangeValuesMutation.id, undoSetRangeValuesMutationParams);
                },
                redo() {
                    return commandService.executeCommand(SetRangeValuesMutation.id, setRangeValuesMutationParams);
                },
            });

            return true;
        }

        return false;
    },
};
