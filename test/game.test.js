import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.mjs'; 

describe('Game API', () => {
  it('should create a new game', async () => {
    const newGame = {
      title: 'Magical Tiles',
      description: 'A game to practice songs and learn how to use the piano',
      publisher_date: '2010-07-25',
        };

    const response = await request(app).post('/api/game').send(newGame);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Game created successfully.');
    expect(response.body.data).to.have.property('title', newGame.title);
  });
  it('should retrieve all games', async () => {
    const response = await request(app).get('/api/game');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Games retrieved successfully.');
    expect(response.body.data).to.be.an('array');
  });
});
