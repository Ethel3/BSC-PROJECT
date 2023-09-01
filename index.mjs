import express from 'express';
import bodyParser from 'body-parser';
import { createRequire } from 'module';
// import connectToDb from './dbConfig.mjs';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/user.routes.js';
import routes from './routes/game.routes.js';

const require = createRequire(import.meta.url)
require('dotenv').config()
// connectToDb()
const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/game", routes);

app.use(errorHandler)

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
