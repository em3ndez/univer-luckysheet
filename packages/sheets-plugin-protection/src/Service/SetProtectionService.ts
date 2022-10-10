import { Worksheet } from '@univer/core';

export function SetProtectionService(workSheet: Worksheet, enable: boolean, password: string): [boolean, string] {
    const protection = workSheet.getProtection();
    const oldEnable = protection.getEnable();
    const oldPassword = protection.getPassword();
    protection.setPassword(password);
    protection.setEnable(enable);
    return [oldEnable, oldPassword];
}
