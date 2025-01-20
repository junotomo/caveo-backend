import { User } from "../entity/User";
import { RoleType } from "../enums/RoleType";

export interface IUserRepository {
    createUserAsync(name: string, email: string, role: RoleType): Promise<void>;
    findUserByEmailAsync(email: string): Promise<User | null>;
}