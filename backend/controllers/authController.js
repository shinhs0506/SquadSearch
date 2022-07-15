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
        return res.send({
            data: user,
            message: `Successfully signed up with email ${email}`,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).orFail();

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { id: user.id, name: user.name, email: user.email };
            const token = jwt.sign(payload, 'secretKey', { expiresIn: '20d' });
            const tokenParts = token.split('.');
            return res.send({
                data: {
                    tokenHeader: tokenParts[0],
                    tokenBody: tokenParts[1],
                },
                message: `Welcome back ${user.email}`,
            });
        }
        return res.status(400).send({ message: 'Wrong password' });
    } catch (e) {
        return res.status(400).send({ message: 'Email not found' });
    }
};

export default { signupUser, loginUser };
