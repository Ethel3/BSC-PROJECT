import express from 'express';
import { authMiddleware } from '../middleware/auth.mjs';
const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This route is protected', user: req.user });
});

export default router;
