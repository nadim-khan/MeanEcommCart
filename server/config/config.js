require('dotenv').config();

const envVars = process.env;

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
};