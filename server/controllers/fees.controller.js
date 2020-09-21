const Fees = require('../model/fees.model');
const bcrypt = require('bcrypt');

//make request/mongod call to inser into mongo db
async function insertFeeDetails(details) {
    console.log("Saving new Fee details to db", details);
    return await new Fees(details).save();
}

async function getFeeStructure() {
    let feeDetails = await Fees.find();
        return feeDetails;
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
    deleteFeeDetails
};