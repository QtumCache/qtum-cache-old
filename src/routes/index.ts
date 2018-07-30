import * as express from 'express';

import apiRouter from './apiRouter';
import rootRouter from './rootRouter';

export default function (app: express.Express) {
  apiRouter(rootRouter);
  app.use('/', rootRouter);
};
