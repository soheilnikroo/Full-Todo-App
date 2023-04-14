const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sharexfulltodoapp@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
});

const setrMailOptionAndSend = async (userEmail, userName) => {
    const mailOptions = {
        from: 'fulltodoappSX@gmail.com',
        to: userEmail,
        subject: 'Welcome dear friend',
        text: `dear ${userName}, you are now a member of sharex family, enjoy our full todo app`
    }

    try{
        const result = await transporter.sendMail(mailOptions)
    }catch(err){
        console.log(err);
    }
}

module.exports = setrMailOptionAndSend;