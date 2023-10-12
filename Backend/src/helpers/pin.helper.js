import nodemailer from "nodemailer";
import Twilio from 'twilio';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'berniece18@ethereal.email',
        pass: 'Bs8THNZXjsHp83SCQQ'
    }
});

const emailProcessor = (email, pin) => {
    const info = {
        from: '"CMR Company" <berniece18@ethereal.email>',
        to: email,
        subject: "Password Reset Pin",
        text: `Here is your password reset pin: ${pin}. This pin will expire in 1 day`,
        html: `<b>Hello</b>
    Here is your pin 
    <b>${pin}</b>
    This pin will expire in 1 day
    <p></p>`,
    };

    sendEmail(info);
};

const sendEmail = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await transporter.sendMail(info);
            console.log("Email sent: %s", result.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const sendSMS = (ph, pin) => {
    const accountSid = 'AC5399d270b12016911be82d0629451ccd';
    const authToken = '2d00a5e8f79aaa46860fa8a93da1f9a1';
    const client = new Twilio(accountSid, authToken);

    client.messages
        .create({
            pin: pin,
            body: `Here is your password reset pin: ${pin}.\n This pin will expire in 1 day`,
            to: `+91${ph}`,
            from: '+13342924349',
        })
        .then((message) => console.log("SMS sent. SID: ", message.sid))
        .catch((error) => console.error("Error sending SMS: ", error));
};

export { emailProcessor, sendSMS };
