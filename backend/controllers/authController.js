import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AvatarGenerator from 'avatar-generator';
import sharp from 'sharp';

import User from '../models/user.js';

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await User.findOne({ email }).orFail();
        return res.status(400).send({ message: 'Email already in use' });
    } catch (e) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatar = new AvatarGenerator();
        const image = await avatar.generate(email, 'male');
        const imageBuffer = await image.resize(100, 100).png().toBuffer();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePicture: imageBuffer,
            bio: 'random bio',
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
            const payload = {
                _id: user._id,
                name: user.name,
            };
            const token = jwt.sign(payload, 'secretKey', { expiresIn: '20d' });
            return res.send({
                user: user.toJSON(),
                token,
            });
        }
        return res.status(400).send({ message: 'Wrong password' });
    } catch (e) {
        return res.status(400).send({ message: 'Email not found' });
    }
};

const forceLoginUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).orFail();
        const payload = {
            _id: user._id,
            name: user.name,
        };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '20d' });
        return res.send({
            user: user.toJSON(),
            token,
        });
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while forcing login' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).orFail();
        return res.send(user);
    } catch (e) {
        return res.status(400).send({ message: 'Email not found' });
    }
};

const updateUser = async (req, res) => {
    const _id = req.userId;
    const { name, password, bio } = req.body;
    const profilePicture = req.file;

    try {
        const update = {};

        if (name) {
            update.name = name;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            update.password = hashedPassword;
        }
        if (profilePicture && Object.keys(profilePicture).length !== 0) {
            const buffer = await sharp(profilePicture.buffer).resize(100, 100).png().toBuffer();
            update.profilePicture = buffer;
        }
        if (bio) {
            update.bio = bio;
        }

        const user = await User.findByIdAndUpdate(_id, update, { new: true }).orFail();
        const payload = {
            _id: user._id,
            name: user.name,
        };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '20d' });
        return res.send({
            user: user.toJSON(),
            token,
        });
    } catch (e) {
        return res.status(400).send({ message: 'Error while updating user' });
    }
};

export default {
    signupUser, loginUser, forceLoginUser, logoutUser, updateUser,
};
