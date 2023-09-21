import express from 'express';
import { createRequire } from 'module';
import errorHandler from './middleware/errorHandler.js';
import userGameRoutes from './routes/usergame.routes.js';
import userRoutes from './routes/user.routes.js';
import gameRoutes from './routes/game.routes.js';

const require = createRequire(import.meta.url)
require('dotenv').config()
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes)
app.use("/api/game", gameRoutes)
app.use("/api/user/game", userGameRoutes)
app.use(errorHandler)

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));