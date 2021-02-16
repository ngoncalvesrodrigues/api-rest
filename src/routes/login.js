import { Router } from 'express';
import { login } from '../controllers/auth';

const router = Router();

router.post('/', (req, res) => {
  const result = login(req.body);
  if (result.token) {
    res.json(result);
  } else if (result.httpCode === 401) {
    res.status(401).json({ code: 401, message: 'Unauthorized error' });
  } else {
    res.json({ code: 400, message: 'Bad request' });
  }
});

export default router;
