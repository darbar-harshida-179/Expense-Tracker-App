// backend/routes/authRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import { login, register } from "../controllers/authController.js";
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: "select_account"
    }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/login'
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiredIn: "7d" }
        );
        res.json({
            message: "Google Login Successfull!",
            token
        });
    }
)

export default router;