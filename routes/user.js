import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.js';

// public routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);

// protected routes

export default router;