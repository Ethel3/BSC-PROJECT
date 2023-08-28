import express from 'express';
import bodyParser from 'body-parser';

const app = express();
require('dotenv').config()

const PORT = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

