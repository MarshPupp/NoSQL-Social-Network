const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.get('/thoughts', getAllThoughts);

router.post('/thoughts', createThought);

router.get('/thoughts/:id', getThoughtById);

router.put('thoughts/:id', updateThoughtById);

router.delete('/thoughts/:id', deleteThoughtById);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;