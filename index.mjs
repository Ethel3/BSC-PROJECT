import express from 'express';
import bodyParser from 'body-parser';
import { createRequire } from 'module';
import connectToDb from './dbConfig.mjs';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/user.routes.js';

const require = createRequire(import.meta.url)
const app = express();
require('dotenv').config()
connectToDb()

app.use("/api/user", router);

app.use(errorHandler)

const PORT = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
