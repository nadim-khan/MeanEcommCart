require('dotenv').config();

const envVars = process.env;

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongo: {
        uri: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
        isDebug: envVars.MONGOOSE_DEBUG
    },
    jwtsecret: envVars.JWT_SECRET
};