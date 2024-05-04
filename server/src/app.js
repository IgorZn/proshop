import express from 'express';
import {apiV1} from "./routes/api.js";
import morgan from 'morgan';
import cors from 'cors';
import ErrorHandler from "./middleware/ErrorHandler.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:5173'}));

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

app.use('/api/v1', apiV1);


export default app;