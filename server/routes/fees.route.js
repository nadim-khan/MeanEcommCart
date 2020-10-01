//Rest api 
const express = require('express');
const feesController = require('../controllers/fees.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/fees/feeUpdate and getFeeStructure call
router.post('/feeUpdate', asyncHandler(insertFee));
router.get('/getFeeStructure', asyncHandler(getFeeStructure));
router.post('/feeDelete', asyncHandler(deleteFeeStructure));
router.post('/paymentUpdate', asyncHandler(insertUserPayment));
router.get('/getUserPayments', asyncHandler(getUserPayments));

async function insertFee(req, res, next) {
    const feeStructure = req.body;
    console.log('Updating Fee Structure', feeStructure);
   const updated = await feesController.insertFeeDetails(feeStructure);
   req.user = updated;
    res.json(updated);
    next();
}

async function insertUserPayment(req, res, next) {
    const paymentStructure = req.body;
    console.log('Updating payment Structure', paymentStructure);
   const updated = await feesController.insertPaymentDetails(paymentStructure);
   req.user = updated;
    res.json(updated);
    next();
}


async function getUserPayments(req, res, next) {
    const savedFee = await feesController.getUserPaymentDetails();
    res.json(savedFee);
    next();
}

async function getFeeStructure(req, res, next) {
    const savedFee = await feesController.getFeeStructure();
    res.json(savedFee);
    next();
}

async function deleteFeeStructure(req, res, next) {
    const feeId = req.body;
    console.log('*******************************************',feeId)
    const deletedFee = await feesController.deleteFeeDetails(feeId);
    console.log('Fee Deleted', deletedFee);
    res.json({msg:'Deleted Successfully', status: 200});
//    next();
}

module.exports = router;