const router = require('express').Router();
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api', thoughtRoutes);
router.use('/api', userRoutes);

router.use((req, res) => res.status(404).send('ERROR!'));

module.exports = router;