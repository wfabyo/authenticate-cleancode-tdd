import express from 'express';
import bodyParser from 'body-parser';
 
export default class App {
  private app: express.Application;
  private port: number;
 
  constructor(routes: any, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(
        express.urlencoded({
            extended: true
        })
    )
    this.app.use(express.json())
  }
 
  private initializeRoutes(routes: any) {
    this.app.use('/', routes)
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 