import "reflect-metadata";
import { DataSources } from "./database";
import express, { Application, NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import router from './routes/task.routes';
import taskRoutersCartItem from './routes/task.routersCartItem';
class Server {
    protected app: Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.Start();
        this.Routes();
        this.database();
    }
    loggerMiddleware(err: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
        return response.json({
            message: err.arguments
        })
    }
    configuration() {
        this.app.set('port', 4000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port ", this.app.get('port'));
        });
    }
    Routes() {
        this.app.use(router);
        this.app.use(taskRoutersCartItem);
    }
    async database() {
        try {
            await DataSources.initialize();
            console.log('DataBase connected');
        } catch (error) {
            throw error;
        }
    }

}
const server = new Server();
export default Server;

