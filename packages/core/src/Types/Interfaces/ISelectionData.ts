import { Nullable } from '../../Shared/Types';
import { ISelectionRange } from './ISelectionRange';

/**
 * Properties of selection data
 */
export interface IPosition {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export interface ISingleCell {
    row: number; // current cell, if cell is in merge,  isMerged is true, If the cell is in the upper left corner, isMergedMainCell is true.
    column: number;

    isMerged: boolean;

    isMergedMainCell: boolean;
}

export interface ISelectionRangeWithCoord extends IPosition, ISelectionRange {}

export interface ISelectionCell extends ISelectionRange, ISingleCell {}

export interface ISelectionCellWithCoord extends IPosition, ISingleCell {
    mergeInfo: ISelectionRangeWithCoord; // merge cell, start and end is upper left cell
}

export enum SelectionType {
    NORMAL,
    ROW,
    COLUMN,
}

export interface ISelection {
    rangeData: ISelectionRange;
    cellRange: Nullable<ISelectionCell>;
    type?: SelectionType;
}

export interface ISelectionWithCoord {
    selection: ISelectionRangeWithCoord;
    cellInfo: Nullable<ISelectionCellWithCoord>;
    type?: SelectionType;
}

export interface ITextSelectionRangeStart {
    cursorStart: number;
    isStartBack: boolean;
}

export interface ITextSelectionRange extends ITextSelectionRangeStart {
    cursorEnd: number;
    isEndBack: boolean;
    isCollapse: boolean;
}

export interface ITextSelectionRangeParam extends ITextSelectionRange {
    segmentId?: string; //The ID of the header, footer or footnote the location is in. An empty segment ID signifies the document's body.
}

export interface ITextSelectionRangeStartParam extends ITextSelectionRangeStart {
    segmentId?: string;
}
