//Rest api 
const express = require('express');
const broadcastController = require('../controllers/broadcast.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/broadcast/setBroadcast and getBroadcast call
router.post('/setBroadcast', asyncHandler(setBroadcastMessage));
router.get('/getBroadcast', asyncHandler(getAllBroadcasts));
router.post('/deleteBroadcast', asyncHandler(deleteBroadcast));

async function setBroadcastMessage(req, res, next) {
    const broadcastStructure = req.body;
    console.log('Updating broadcastStructure ', broadcastStructure);
   const updated = await broadcastController.insertBroadcastDetails(broadcastStructure);
   req.user = updated;
    res.json(updated);
    next();
}


async function getAllBroadcasts(req, res, next) {
    const savedFee = await broadcastController.getAllBroadcasts();
    res.json(savedFee);
    next();
}

async function deleteBroadcast(req, res, next) {
    const feeId = req.body;
    console.log('*******************************************',feeId)
    const deletedFee = await broadcastController.deleteBroadcast(feeId);
    console.log('broadcastStructure Deleted', deletedFee);
    res.json({msg:'Deleted Successfully', status: 200});
//    next();
}

module.exports = router;