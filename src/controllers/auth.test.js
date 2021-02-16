import jwt from 'jsonwebtoken';
import { login } from './auth';
import userData from '../data/user';

describe('auth controller', () => {
  describe('login()', () => {
    it('should gets 401 error on wrong credentials', () => {
      const EXPECTED_RESULT = {
        httpCode: 401,
      };
      const result = login({ username: 'wrong', password: 'wrong' });

      expect(result).toEqual(EXPECTED_RESULT);
    });

    it('should gets 400 error on bad request', () => {
      const EXPECTED_RESULT = {
        httpCode: 400,
      };
      const result = login('');

      expect(result).toEqual(EXPECTED_RESULT);
    });

    it('should gets a valid token on correct credentials', () => {
      process.env.SECRET_KEY = 'mySecretKey';
      const { token } = login({
        username: userData.username,
        password: userData.password,
      });

      const { username } = jwt.verify(token, process.env.SECRET_KEY);

      expect(username).toEqual(userData.username);
    });
  });
});
