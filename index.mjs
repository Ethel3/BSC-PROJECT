import express from 'express';
import bodyParser from 'body-parser';
import { createGame, updateGame, getGame, deleteGame, getGames } from './models/gameModels.mjs';   
import { createUser, updateUser, getUser, getUsers, deleteUser } from './models/userModel.mjs';
import { createUserGame, updateUserGame,getUserGame,getUserGames,deleteUserGame } from './models/userGameModel.mjs';    

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Game Library API!');
}
);

// Game Routes
app.get('/games', getGames);
app.get('/games/:id', getGame);
app.post('/games', createGame);
app.put('/games/:id', updateGame);
app.delete('/games/:id', deleteGame);

// User Routes
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

// User Game Routes
app.get('/userGames', getUserGames);
app.get('/userGames/:id', getUserGame);
app.post('/userGames', createUserGame);
app.put('/userGames/:id', updateUserGame);
app.delete('/userGames/:id', deleteUserGame);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));



