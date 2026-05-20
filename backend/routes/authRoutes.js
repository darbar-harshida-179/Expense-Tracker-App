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
            {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.redirect(`http://localhost:5173/google-success?token=${token}`);
    }
)

export default router;