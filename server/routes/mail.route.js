//Rest api 
const express = require('express');
const mailController = require('../controllers/mail.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/mail/sendNewMail, getAllMails  and deleteMail call
router.post('/sendNewMail', asyncHandler(sendNewMail));
router.post('/checkMail', asyncHandler(checkThisMail));
router.get('/getAllMails', asyncHandler(getAllMails));
router.post('/deleteMail', asyncHandler(deleteMail));

async function sendNewMail(req, res, next) {
    const mailStructure = req.body;
    console.log('Updating mailStructure ', mailStructure);
    const updated = await mailController.insertQueryMail(mailStructure);
    req.user = updated;
    res.json(updated);
    next();
}


async function checkThisMail(req, res, next) {
    const mailId = req.body;
    const checkTheMail = await mailController.updateCheckMail(mailId);
    console.log('mail Checked', checkTheMail);
    res.json({ msg: 'Mail Checked Successfully', status: 200 });
}

async function getAllMails(req, res, next) {
    const allMails = await mailController.getAllMails();
    console.log('All mailStructure  after ', allMails);
    res.json(allMails);
    //next();
}

async function deleteMail(req, res, next) {
    const mailId = req.body;
    console.log('*******************************************', mailId)
    const deletedMail = await mailController.deleteMail(mailId);
    console.log('mailStructure Deleted', deletedMail);
    res.json({ msg: 'Mail Deleted Successfully', status: 200 });
    //    next();
}

module.exports = router;