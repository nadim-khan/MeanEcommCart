const Fees = require('../model/fees.model');
const Payments = require('../model/payments.model');
const bcrypt = require('bcrypt');

//make request/mongod call to inser into mongo db
async function insertFeeDetails(details) {
    console.log("Saving new Fee details to db", details);
    return await new Fees(details).save();
}

async function insertPaymentDetails(details) {
    console.log("Saving new Payment details to db", details);
    return await new Payments(details).save();
}


async function getFeeStructure() {
    let feeDetails = await Fees.find();
        return feeDetails;
}

async function getUserPaymentDetails() {
    let paymentDetails = await Payments.find();
        return paymentDetails;
}

async function deleteFeeDetails(feeId) {
    let feeDetails = await Fees.findByIdAndDelete(feeId,(err,obj)=>{
        if (err) {
            throw err;
        }
    console.log("1 document deleted");
    });
        return feeDetails;
}


module.exports = {
    getFeeStructure,
    insertFeeDetails,
    deleteFeeDetails,
    insertPaymentDetails,
    getUserPaymentDetails
};