import express from 'express';
import {apiV1} from "./routes/api.js";
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:5173'}));
app.use('/api/v1', apiV1);


export default app;