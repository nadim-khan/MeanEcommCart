const express = require('express');
const authRoutes = require('./auth.route');
const feesRoutes = require('./fees.route');
const router = express.Router();

//localhost:4050/api/auth call
router.use('/auth', authRoutes);
//localhost:4050/api/auth call
router.use('/fees', feesRoutes);

module.exports = router;