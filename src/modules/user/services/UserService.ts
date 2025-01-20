import { LoginUserRequestBody } from "../../../entity/LoginUserRequestBody";
import { RegisterUserRequestBody } from "../../../entity/RegisterUserRequestBody";
import { CognitoAuthService } from '../../../services/CognitoAuthService';
import { IUserService } from "../../../interfaces/IUserService";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { EnumHelper } from "../../../helpers/EnumHelper";

export class UserService implements IUserService{
    private readonly cognitoAuthService: CognitoAuthService;
    private readonly enumHelper: EnumHelper;

    constructor(private readonly userRepository: IUserRepository) {
        this.cognitoAuthService = new CognitoAuthService();
        this.enumHelper = new EnumHelper();
    };

    async loginAsync(user: LoginUserRequestBody): Promise<string> {
        const session = await this.cognitoAuthService.authenticateUser(user.email, user.password);

        return session.idToken.jwtToken;
    };

    async createUserAsync(user: RegisterUserRequestBody): Promise<string> {
        await this.checkUserExistsAsync(user.email);

        const session = await this.cognitoAuthService.createUser(user.name, user.email, user.password);

        const userRole = this.enumHelper.toRoleType(user.role);

        await this.userRepository.createUserAsync(user.name, user.email, userRole);

        return session.user.username;
    };

    private async checkUserExistsAsync(email: string): Promise<void> {
        const user = await this.userRepository.findUserByEmailAsync(email);

        if (user)
            throw new Error("User email already exists!");
    }
}