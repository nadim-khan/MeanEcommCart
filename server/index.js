const app = require('./config/express');
const config = require('./config/config');
const mongoose = require('./config/mongoose');

app.listen(config.port,'0.0.0.0'||5000||process.env.port, (req, res) => {
    console.clear();
    console.log("******************************************\n \t   My Cart- MEAN App\n******************************************");
    console.info(`Server started on port ${config.port} (${config.env})`);
});
