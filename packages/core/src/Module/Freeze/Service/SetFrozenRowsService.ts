import { Worksheet } from 'src/Sheets/Domain';

export function SetFrozenRowsService(worksheet: Worksheet, numRows: number): number {
    // get config
    const config = worksheet.getConfig();

    // store old sheet name
    const oldStatus = config.freezeRow;

    // set new sheet name
    config.freezeRow = numRows;

    // return old sheet name to undo
    return oldStatus;
}
