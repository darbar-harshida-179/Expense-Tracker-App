// backend/routes/authRoutes.js

import express from 'express';
import { login, register } from "../controllers/authController.js";
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.send('Google Login Successfull!');
    }
)

export default router;