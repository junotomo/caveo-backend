import { RoleType } from "../enums/RoleType";

export class EnumHelper {
    public toRoleType(value: string | number): number {
        if (typeof value === 'string')
            return RoleType[value as keyof typeof RoleType];

        return value;
    }
}