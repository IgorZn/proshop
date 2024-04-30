import express from 'express';
import {apiV1} from "./routes/api.js";

const app = express();

app.use(express.json());
app.use('/api/v1', apiV1);


export default app;