import Router from 'koa-router';
import { UserController } from '../controllers/UserController';

const userRouter = new Router();
const userController = new UserController();

userRouter.post('/login', async (ctx) => userController.login(ctx));

userRouter.post('/register', async (ctx) => userController.register(ctx));

export default userRouter;