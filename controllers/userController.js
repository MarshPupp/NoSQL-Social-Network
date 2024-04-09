const User = require('../models/User');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.userId }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({ user, message: 'User successfully updated' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({ user, message: 'User successfully deleted' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};