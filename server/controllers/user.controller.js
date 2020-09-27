const User = require('../model/user.model');
const bcrypt = require('bcrypt');
//make request/mongod call to inser into mongo db
async function insert(user) {
    console.log("Saving User to db", user);
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    return await new User(user).save();
}

async function getUserByEmailIdAndPassword(email, password) {
    let user = await User.findOne({ email });
    if (isUserValid(user, password, user.hashedPassword)) {
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    } else {
        return null;
    }
}

async function getUserById(id) {
    let user = await User.findById(id);
    if (user) {
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    } else {
        return null;
    }
}

async function getAllUsers() {
    let user = await User.find();
    return user;
}

function isUserValid(user, password, hashedPassword) {
    return user && bcrypt.compareSync(password, hashedPassword);
}



module.exports = {
    insert,
    getUserByEmailIdAndPassword,
    getUserById,
    getAllUsers
};