const Mail = require('../model/mail.model');
const nodemailer = require("nodemailer");

var emailId;
var queryDetails;
var userName;
//make request/mongod call to inser into mongo db
async function insertQueryMail(details) {
    console.log("Saving new Querymail details to db", details);
    userName = details.username;
    emailId = details.email;
    queryDetails = details.queryDetail;
    sendEmailToAddress();
    return await new Mail(details).save();
}

async function getAllMails() {
    let mailDetail = await Mail.find();
        return mailDetail;
}

async function deleteMail(mailId) {
    let mailDetail = await Mail.findByIdAndDelete(mailId,(err,obj)=>{
        if (err) {
            throw err;
        }
    console.log("1 document deleted");
    });
        return mailDetail;
}

async function sendEmailToAddress() {
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //   });
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'brigitte16@ethereal.email',
            pass: 'YTkQXUNnMB9Eyh2CvJ'
        }
        // service: "Gmail",
        // host: 'smtp.gmail.com',
        // port: 587,
        // auth: {
        //     user: "gymnasim491338@gmail.com",
        //     pass: "m76kur3av5"
        // }
    });

      let info = await transporter.sendMail({
        from: `"${userName}" <${emailId}>`, // sender address
        to: "brigitte16@ethereal.email", // list of receivers
        subject: `Contact Us : Query by ${userName} - ${emailId}`, // Subject line
        text: `${queryDetails}`, // plain text body
      });
      console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = {
    insertQueryMail,
    getAllMails,
    deleteMail
};