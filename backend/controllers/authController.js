import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await User.findOne({ email }).orFail();
        return res.status(400).send({ message: 'Email already in use' });
    } catch (e) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.send(user);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).orFail();

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, 'secretKey');
            return res.send("Bearer " + token);
        }
        return res.status(400).send({ message: 'Wrong password' });
    } catch (e) {
        return res.status(400).send({ message: 'Email not found' });
    }
};

export default { signupUser, loginUser };
