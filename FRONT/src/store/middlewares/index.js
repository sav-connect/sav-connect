import { applyMiddleware } from 'redux';

// Import middlewares files
import loggerMW from './logger';
import authMW from './auth';
import routesMW from './routes';


export default applyMiddleware(
  loggerMW,
  authMW,
  routesMW,
);
