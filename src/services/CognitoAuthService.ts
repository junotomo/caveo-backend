import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';

dotenv.config();

export class CognitoAuthService {
    private userPool: CognitoUserPool;

    constructor() {
        const poolData = {
            UserPoolId: process.env.COGNITO_USER_POOL_ID!,
            ClientId: process.env.COGNITO_CLIENT_ID!
        };
        
        this.userPool = new CognitoUserPool(poolData);
    };

    public authenticateUser(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: email,
                Pool: this.userPool
            });

            const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            });

            user.authenticateUser(authDetails, {
                onSuccess: (session) => resolve(session),
                onFailure: (err) => reject(err)
            });
        });
    };

    public createUser(name: string, email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const attributeList: CognitoUserAttribute[] = [];

            const emailAttribute = new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            });

            const nameAttribute = new CognitoUserAttribute({
                Name: 'name',
                Value: name,
            });

            attributeList.push(emailAttribute);
            attributeList.push(nameAttribute);

            this.userPool.signUp(email, password, attributeList, [], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
}