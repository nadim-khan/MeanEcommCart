users = [];
//make request/mongod call to inser into mongo db
async function insert(user) {
    console.log("Saving User to db", user);
    users.push(user);
    return user;
}

module.exports = {
    insert
};