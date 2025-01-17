import {
    ChangeSelectionCommand,
    ExpandSelectionCommand,
    SetBoldCommand,
    SetFontFamilyCommand,
    SetFontSizeCommand,
    SetItalicCommand,
    SetStrikeThroughCommand,
    SetUnderlineCommand,
} from '@univerjs/base-sheets';
import { IShortcutService } from '@univerjs/base-ui';
import { Disposable, ICommandService } from '@univerjs/core';

import { QuitCellEditorCommand } from '../services/cell-editor/cell-editor.command';
import { QuitCellEditorShortcutItem } from '../services/shortcuts/shortcuts';
import {
    ExpandSelectionDownShortcutItem,
    ExpandSelectionEndDownShortcutItem,
    ExpandSelectionEndLeftShortcutItem,
    ExpandSelectionEndRightShortcutItem,
    ExpandSelectionEndUpShortcutItem,
    ExpandSelectionLeftShortcutItem,
    ExpandSelectionRightShortcutItem,
    ExpandSelectionUpShortcutItem,
    MoveSelectionDownShortcutItem,
    MoveSelectionEndDownShortcutItem,
    MoveSelectionEndLeftShortcutItem,
    MoveSelectionEndRightShortcutItem,
    MoveSelectionEndUpShortcutItem,
    MoveSelectionLeftShortcutItem,
    MoveSelectionRightShortcutItem,
    MoveSelectionTabShortcutItem,
    MoveSelectionUpShortcutItem,
} from './shortcuts/selection.shortcut';
import {
    SetBoldShortcutItem,
    SetItalicShortcutItem,
    SetStrikeThroughShortcutItem,
    SetUnderlineShortcutItem,
} from './shortcuts/style.shortcut';
import { ClearSelectionValueShortcutItem } from './shortcuts/value.shortcut';

export class DesktopSheetShortcutController extends Disposable {
    constructor(
        @IShortcutService private readonly _shortcutService: IShortcutService,
        @ICommandService private readonly _commandService: ICommandService
    ) {
        super();

        [
            ChangeSelectionCommand,
            ExpandSelectionCommand,
            SetBoldCommand,
            SetItalicCommand,
            SetStrikeThroughCommand,
            SetUnderlineCommand,
            SetFontFamilyCommand,
            SetFontSizeCommand,

            QuitCellEditorCommand,
        ].forEach((c) => {
            this.disposeWithMe(this._commandService.registerCommand(c));
        });

        [
            MoveSelectionDownShortcutItem,
            MoveSelectionUpShortcutItem,
            MoveSelectionLeftShortcutItem,
            MoveSelectionRightShortcutItem,
            MoveSelectionTabShortcutItem,
            MoveSelectionEndDownShortcutItem,
            MoveSelectionEndUpShortcutItem,
            MoveSelectionEndLeftShortcutItem,
            MoveSelectionEndRightShortcutItem,
            ExpandSelectionDownShortcutItem,
            ExpandSelectionUpShortcutItem,
            ExpandSelectionLeftShortcutItem,
            ExpandSelectionRightShortcutItem,
            ExpandSelectionEndDownShortcutItem,
            ExpandSelectionEndUpShortcutItem,
            ExpandSelectionEndLeftShortcutItem,
            ExpandSelectionEndRightShortcutItem,

            SetBoldShortcutItem,
            SetItalicShortcutItem,
            SetUnderlineShortcutItem,
            SetStrikeThroughShortcutItem,

            ClearSelectionValueShortcutItem,

            QuitCellEditorShortcutItem,
        ].forEach((item) => {
            this.disposeWithMe(this._shortcutService.registerShortcut(item));
        });
    }
}
