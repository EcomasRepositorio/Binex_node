import { Router } from 'express';
import UserController from '../controllers/authh.controllers';
import authMiddleware from '../middlewares/authh.middlewares';

export const authhRouter = Router();

// register
authhRouter.post('/register', UserController.register);

// login
authhRouter.post('/login', UserController.login);

// all users
authhRouter.get('/users', authMiddleware, UserController.all);