import "reflect-metadata";
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRouter from "./routes/UserRoute"
import { AppDataSource } from './config/TypeOrm';

const app = new Koa();

AppDataSource.initialize().then(() => {
  console.log('Database connected');
}).catch((err) => console.error('Error connecting to database', err));

app.use(bodyParser());
app.use(userRouter.routes());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});