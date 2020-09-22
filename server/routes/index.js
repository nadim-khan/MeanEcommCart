const express = require('express');
const authRoutes = require('./auth.route');
const feesRoutes = require('./fees.route');
const broadcastRoutes = require('./broadcast.route');
const router = express.Router();

//localhost:4050/api/auth call
router.use('/auth', authRoutes);
//localhost:4050/api/fees call
router.use('/fees', feesRoutes);
//localhost:4050/api/broadcast call
router.use('/broadcast', broadcastRoutes);

module.exports = router;