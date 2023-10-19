import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.mjs';

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'john_doe2',
      age: 20,
      email: 'john2@example.com',
      password: 'password',
    };

    const response = await request(app).post('/api/user').send(newUser);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User created successfully.');
    expect(response.body.data).to.have.property('username', newUser.username);
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/api/user');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Users retrieved successfully.');
    expect(response.body.data).to.be.an('array');
  });
});
