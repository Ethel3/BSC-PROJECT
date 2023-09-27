import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.mjs'; 
describe('UserGame API', () => {
  it('should link a user to a game', async () => {
    const newUserGame = {
      user_id: 2,
      game_id: 1,
      play_time: 18
    };

    const response = await request(app).post('/api/user/game').send(newUserGame);

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('Game created for user successfully!');
    expect(response.body).to.have.property('username', 'john_doe');
  });
  it('should retrieve all games for all users', async () => {
    const response = await request(app).get('/api/user/game');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Games for all users retrieved successfully.');
    expect(response.body.data).to.be.an('array');
  });
  // Write similar tests for other UserGame functionality
});
