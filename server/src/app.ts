import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//* Routes
import indexRouter from './routes/index.routes';

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 5000);
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/api', indexRouter);
  }

  listen() {
    this.app.listen(this.app.get('port'));
    console.log('The application is listening on port', this.app.get('port'));
  }
}