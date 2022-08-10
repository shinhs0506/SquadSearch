import User from "../models/user.js";

const getProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        return res.send(user);
    } catch (e) {
        return res.status(500).send({ message: 'Error occured while getting profile' });
    }
};

export default{
    getProfile,
};