const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.get('/users', getAllUsers);

router.post('/users', createUser);

router.get('/users/:id', getUserById);

router.put('/users/:id', updateUserById);

router.delete('/users/:id', deleteUserById);

router.post('/:userID/friends', addFriend);

router.delete('/:userID/friends/:friendId', deleteFriend);

module.exports = router;