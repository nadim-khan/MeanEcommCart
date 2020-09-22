const Broadcast = require('../model/broadcast.model');
const bcrypt = require('bcrypt');

//make request/mongod call to inser into mongo db
async function insertBroadcastDetails(details) {
    console.log("Saving new Broadcast details to db", details);
    return await new Broadcast(details).save();
}

async function getAllBroadcasts() {
    let broadcastDetails = await Broadcast.find();
        return broadcastDetails;
}

async function deleteBroadcast(broadcastId) {
    let broadcastDetails = await Broadcast.findByIdAndDelete(broadcastId,(err,obj)=>{
        if (err) {
            throw err;
        }
    console.log("1 document deleted");
    });
        return broadcastDetails;
}


module.exports = {
    getAllBroadcasts,
    insertBroadcastDetails,
    deleteBroadcast
};