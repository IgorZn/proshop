import express from 'express';
import path from "node:path";
import {apiV1} from "./routes/api.js";
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import ErrorHandler from "./middleware/ErrorHandler.js";
import helmet from "helmet";
import fileUpload from 'express-fileupload'; // https://www.npmjs.com/package/express-fileUpload

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(express.static('upload'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
    responseOnLimit: 'The file is too large',
    debug: true
}))
app.use(cors({
    origin: ['http://localhost:5173', "http://localhost:5001"],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,Access-Control-Expose-Headers',
    exposedHeaders: 'Content-Type,Authorization,Access-Control-Expose-Headers'
}));
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: null, secure: false, httpOnly: true},
    resave: false,
    saveUninitialized: false,

}))

app.set('trust proxy', 1)

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

app.use('/api/v1', apiV1);


export default app;