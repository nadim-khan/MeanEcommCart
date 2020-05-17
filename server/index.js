const app = require('./config/express');
const config = require('./config/config');
const mongoose = require('./config/mongoose');

app.listen(config.port, (req, res) => {
    console.clear();
    console.log("******************************************\n \t   My Cart- MEAN App\n******************************************");
    console.info(`Server started on port ${config.port} (${config.env})`);
});

// ********************************** Initial startup file
// const express = require('express');
// const path = require('path');
// const app = express();

// const destinationDir = path.join(__dirname, '../dist');

// //Hosting the dist(production) folder
// app.use(express.static(destinationDir));

// //for any url - Serving Index.html  
// app.get('*', (req, res) => {
//     res.sendFile(path.join(destinationDir, 'index.html'));
// });

// const port = process.env.PORT || 8000;
// app.listen(port, (req, res) => {
//     console.clear();
//     console.log("******************************************\n \t   My Cart- MEAN App\n******************************************");
//     console.log("Server started on port: " + port);
//     console.log(`Express hosting from :  ${destinationDir}`);
// });