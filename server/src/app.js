import express from 'express';
import {apiV1} from "./routes/api.js";
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import ErrorHandler from "./middleware/ErrorHandler.js";
import helmet from "helmet";

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Type,Authorization,Access-Control-Expose-Headers'
}));
app.use(session({
    secret: 'keyboard cat',
    maxAge: 24 * 60 * 60 * 1000,
    cookie: { maxAge: 60000, secure: false, sameSite: 'none', httpOnly: true},
    resave: false,
    saveUninitialized: false,

}))

app.set('trust proxy', 1)

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

app.use('/api/v1', apiV1);


export default app;