import { LoginUserRequestBody } from "../entity/LoginUserRequestBody";
import { RegisterUserRequestBody } from "../entity/RegisterUserRequestBody";

export interface IUserService {
    loginAsync(user: LoginUserRequestBody): Promise<string>;
    createUserAsync(user: RegisterUserRequestBody): Promise<string>
}