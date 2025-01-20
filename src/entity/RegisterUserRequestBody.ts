import { RoleType } from "../enums/RoleType";

export type RegisterUserRequestBody = {
    name: string;
    email: string;
    password: string;
    role: RoleType
}