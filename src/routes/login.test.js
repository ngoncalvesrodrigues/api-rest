import 'dotenv/config';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import router from './login';
import userData from '../data/user';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/login', router);

describe('Login Endpoint', () => {
  it('consuming /login endpoint', (done) => {
    request(app)
      .post('/login')
      .send({ username: userData.username, password: userData.password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { username } = jwt.verify(
          response.body.token,
          process.env.SECRET_KEY
        );
        expect(username).toEqual(userData.username);
        done();
      })
      .catch((err) => done(err));
  });
});
