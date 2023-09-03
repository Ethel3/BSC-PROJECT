import express from 'express';
import { createRequire } from 'module';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/user.routes.js';

const require = createRequire(import.meta.url)
require('dotenv').config()
const app = express();
app.use(express.json());

app.use("/api/user", router);

app.use(errorHandler)

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
