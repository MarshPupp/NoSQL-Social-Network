const { Schema, model, mongoose } = require("mongoose");
const { ReactionSchema } = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        reactionId: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = { Thought, ThoughtSchema };