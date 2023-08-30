import express from 'express';
import bodyParser from 'body-parser';
import { createRequire } from 'module';
import connectToDb from './dbConfig.mjs';

const require = createRequire(import.meta.url)
const app = express();
require('dotenv').config()
connectToDb()

const PORT = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
