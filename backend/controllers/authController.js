// backend/controllers/authController.js

import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleat 6 character!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User Registered Successfully!" });

    } catch (err) {

        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Not Found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong Password!" });
        }
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login Successful", token, user: { _id: user._id, name: user.name, email: user.email } });

    } catch (err) {

        res.status(500).json({ message: "Server Error", error: err.message });
    }
};