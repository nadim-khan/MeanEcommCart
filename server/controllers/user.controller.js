const User = require('../model/user.model');
const bcrypt = require('bcrypt');
//make request/mongod call to inser into mongo db
async function insert(user) {
    console.log("Saving User to db", user);
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    return await new User(user).save();
}

module.exports = {
    insert
};