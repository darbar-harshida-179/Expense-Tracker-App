// 
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    res.send("User Registered Successfully!");
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User Not Found!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Wrong Password!");
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
}