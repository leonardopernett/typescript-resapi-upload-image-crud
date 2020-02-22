import express from 'express';
import morgan from 'morgan';
import path from 'path';
import multer from 'multer';

import indexRouter from './router/index';

const app = express();

//setting
app.set('port', process.env.PORT || 3001);

//middlewre
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api',indexRouter);

//statys file
app.use(express.static(path.resolve('./build/public')));

export default app;