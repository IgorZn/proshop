import express from 'express';
import {apiV1} from "./routes/api.js";
import morgan from 'morgan';
import cors from 'cors';
import cookieSession from 'cookie-session';
import ErrorHandler from "./middleware/ErrorHandler.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:5173'}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
}))

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

app.use('/api/v1', apiV1);


export default app;