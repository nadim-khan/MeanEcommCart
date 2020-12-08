//Rest api 
const express = require('express');
const bcrypt = require('bcrypt');
const helpers = require('../middleware/helper');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const multer = require('multer');

const router = express.Router();

//localhost:4050/api/auth/register call
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserByEmailIdAndPassword), login);
router.get('/getAllUsers', asyncHandler(getAllUsers));
router.post('/updateUser', asyncHandler(updateUserDetails));


async function insert(req, res, next) {
    const user = req.body;
    console.log('Registering the User', user);
    // let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    // upload(req, res, function(err) {
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any

    //     if (req.fileValidationError) {
    //         return res.send(req.fileValidationError);
    //     }
    //     else if (!req.file) {
    //         return res.send('Please select an image to upload');
    //     }
    //     else if (err instanceof multer.MulterError) {
    //         return res.send(err);
    //     }
    //     else if (err) {
    //         return res.send(err);
    //     }

    //     // Display uploaded image for user validation
    //     res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    // });
    req.user = await userController.insert(user);
     // res.json(savedUser);
     next();
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



async function getUserByEmailIdAndPassword(req, res, next) {
    const user = req.body;
    const savedUser = await userController.getUserByEmailIdAndPassword(
        user.email,
        user.password
    );
    req.user = savedUser;
    next();
}

async function updateUserDetails(req, res, next) {
    const user = req.body;
    console.log('User to be updated'+user);
    updateUser= await userController.updateUserData(user);
    res.json(updateUser);
    next();
}

async function getAllUsers(req, res, next) {
    const usersList = await userController.getAllUsers();
    res.json(usersList);
    next();
}

function login(req, res) {
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    });
}



module.exports = router;