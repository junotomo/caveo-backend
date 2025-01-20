
import { User } from '../entity/User';
import { IUserRepository } from "../interfaces/IUserRepository";
import { RoleType } from '../enums/RoleType';
import { AppDataSource } from '../config/TypeOrm';

export class UserRepository implements IUserRepository {

    async findUserByEmailAsync(email: string): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        return user ? user : null;
    }

    async createUserAsync(name: string, email: string, role: RoleType): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);

        const user = userRepository.create({
            name,
            email,
            role
        });

        await userRepository.save(user);
    }
}