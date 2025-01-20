import { LoginUserRequestBody } from "../entity/LoginUserRequestBody";
import { RegisterUserRequestBody } from "../entity/RegisterUserRequestBody";
import { UserService } from "../modules/user/services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { UserValidator } from "../validators/UserValidator";

export class UserController {
    private userService: UserService;
    private userValidator: UserValidator;

    constructor() {
        this.userService = new UserService(new UserRepository());
        this.userValidator = new UserValidator();
    }

    public async login(ctx: any) {
        const { email, password } = ctx.request.body as LoginUserRequestBody;

        try {
            await this.userValidator.loginUserValidator().validate(ctx.request.body);
            const result = await this.userService.loginAsync({ email, password })
            ctx.body = { message: 'Authenticated',  jwtToken: result};
        } catch (error) {
            ctx.status = 401;
            ctx.body = { message: 'Authentication failed', error };
        }
    }

    public async register(ctx: any) {
        const { name, email, password, role } = ctx.request.body as RegisterUserRequestBody;

        try {
            await this.userValidator.createUserValidator().validate(ctx.request.body);
            const result = await this.userService.createUserAsync({ name, email, password, role });
            ctx.body = { message: 'User created successfully!', user: result };
        } catch (error) {
            ctx.status = 400;
            ctx.body = { message: 'Error creating user', error: (error as Error).message };
        }
    }
}