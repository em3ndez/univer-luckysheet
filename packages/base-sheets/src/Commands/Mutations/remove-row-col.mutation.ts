import { CommandType, IColumnData, ICurrentUniverService, IMutation, IRowData, ObjectArray } from '@univerjs/core';
import { IAccessor } from '@wendellhu/redi';

import { IInsertColMutationParams, IInsertRowMutationParams, IRemoveColMutationParams, IRemoveRowMutationParams } from '../../Basics/Interfaces/MutationInterface';

export const IRemoveRowMutationFactory = (accessor: IAccessor, params: IRemoveRowMutationParams): IInsertRowMutationParams => {
    const currentUniverService = accessor.get(ICurrentUniverService);
    const universheet = currentUniverService.getUniverSheetInstance(params.workbookId);

    if (universheet == null) {
        throw new Error('universheet is null error!');
    }

    const worksheet = universheet.getWorkBook().getSheetBySheetId(params.worksheetId);
    if (worksheet == null) {
        throw new Error('universheet is null error!');
    }

    const manager = worksheet.getRowManager();
    const rowPrimitive = manager.getRowData().toJSON();
    const rowWrapper = new ObjectArray(rowPrimitive);
    const rowInfo = new ObjectArray<IRowData>();

    for (let i = 0; i < params.ranges.length; i++) {
        const range = params.ranges[i];

        const slice = rowWrapper.slice(range.startRow, range.endRow);
        rowInfo.concat(slice);
    }

    return {
        workbookId: params.workbookId,
        worksheetId: params.worksheetId,
        ranges: params.ranges,
        rowInfo,
    };
};

export const RemoveRowMutation: IMutation<IRemoveRowMutationParams> = {
    id: 'sheet.mutation.remove-row',
    type: CommandType.MUTATION,
    handler: async (accessor, params) => {
        const currentUniverService = accessor.get(ICurrentUniverService);
        const universheet = currentUniverService.getUniverSheetInstance(params.workbookId);

        if (universheet == null) {
            throw new Error('universheet is null error!');
        }

        const worksheet = universheet.getWorkBook().getSheetBySheetId(params.worksheetId);
        if (!worksheet) return false;

        const manager = worksheet.getRowManager();
        const rowPrimitive = manager.getRowData().toJSON();
        const rowWrapper = new ObjectArray(rowPrimitive);

        for (let i = 0; i < params.ranges.length; i++) {
            const range = params.ranges[i];
            const start = range.startRow;
            const end = range.endRow - range.startRow + 1;

            for (let j = start; j < end; j++) {
                rowWrapper.splice(j, 1);
            }
        }

        return true;
    },
};

export const IRemoveColMutationFactory = (accessor: IAccessor, params: IRemoveColMutationParams): IInsertColMutationParams => {
    const currentUniverService = accessor.get(ICurrentUniverService);
    const universheet = currentUniverService.getUniverSheetInstance(params.workbookId);

    if (universheet == null) {
        throw new Error('universheet is null error!');
    }

    const worksheet = universheet.getWorkBook().getSheetBySheetId(params.worksheetId);

    if (worksheet == null) {
        throw new Error('worksheet is null error!');
    }

    const manager = worksheet.getColumnManager();
    const columnPrimitive = manager.getColumnData().toJSON();
    const columnWrapper = new ObjectArray(columnPrimitive);
    const colInfo = new ObjectArray<IColumnData>();

    for (let i = 0; i < params.ranges.length; i++) {
        const range = params.ranges[i];

        const slice = columnWrapper.slice(range.startColumn, range.endColumn);
        colInfo.concat(slice);
    }

    return {
        workbookId: params.workbookId,
        worksheetId: params.worksheetId,
        ranges: params.ranges,
        colInfo,
    };
};

export const RemoveColMutation: IMutation<IRemoveColMutationParams> = {
    id: 'sheet.mutation.remove-col',
    type: CommandType.MUTATION,
    handler: async (accessor, params) => {
        const currentUniverService = accessor.get(ICurrentUniverService);
        const universheet = currentUniverService.getUniverSheetInstance(params.workbookId);

        if (universheet == null) {
            throw new Error('universheet is null error!');
        }

        const worksheet = universheet.getWorkBook().getSheetBySheetId(params.worksheetId);
        if (!worksheet) return false;

        const manager = worksheet.getColumnManager();
        const columnPrimitive = manager.getColumnData().toJSON();
        const columnWrapper = new ObjectArray(columnPrimitive);

        for (let i = 0; i < params.ranges.length; i++) {
            const range = params.ranges[i];
            const start = range.startColumn;
            const end = range.endColumn - range.startColumn + 1;

            for (let j = start; j < end; j++) {
                columnWrapper.splice(j, 1);
            }
        }

        return true;
    },
};
