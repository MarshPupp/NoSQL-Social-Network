const Thought = require('../models/Thought');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.createThought(req.body);
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.thoughtId }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found'})
            }
            res.status(200).json({ thought, message: 'Thought Successfully Updated' })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found'})
            }
            res.status(200).json({ thought, message: 'Thought successfully deleted' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status (404).json({ message: 'No thought or reaction found'});
            }
            res.status(200).json({ thought, message: 'Reaction added successfully'})
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought or reaction found' });
            }
            res.status(200).json({ message: 'Reaction successfully deleted' })
        } catch (error) {
            res.status(500).json(error);
        }
    },
};