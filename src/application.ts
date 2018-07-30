import express = require('express');

import router from './routes';

import requestLogger = require('./middleware/requestLogger');
import Config from './config/config';
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

export class App {
  /**
   * @param app - express application
   * @param port - port to listen on
   */

  constructor(private app: express.Express, private config: Config) {
    this.configureApp(app);
    this.configureMiddleware(app);
    this.configureRoutes(app);
  }

  /**
   * @param app - express application
   */
  private configureApp(app: express.Express) {
    // view engine setup
    app.set('view engine', 'ejs');

    // bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // cookieParser
    app.use(cookieParser());
  }

  private configureMiddleware(app: express.Express) {
    app.use(requestLogger);
  }

  private configureRoutes(app: express.Express) {
    router(app);
  }

  public run() {
    this.app.listen(this.config.port);
  }
}