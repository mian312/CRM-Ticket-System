import nodemailer from "nodemailer";
import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const EmailTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: `${process.env.NODEMAILER_EMAIL_USER}`,
        pass: `${process.env.NODEMAILER_EMAIL_PASS}`,
    }
});

const emailProcessor = ({ email, pin, type }) => {
    let info = "";
    switch (type) {
        case "request-new-password":
            info = {
                from: `"CMR Company" <${process.env.NODEMAILER_EMAIL_USER}>`, // sender address
                to: email, // list of receivers
                subject: "Password rest Pin", // Subject line
                text:
                    "Here is your password rest pin" +
                    pin +
                    " This pin will expires in 1day", // plain text body
                html: `<b>Hello </b>
            Here is your pin 
            <b>${pin} </b>
            This pin will expires in 1day
            <p></p>`, // html body
            };

            sendEmail(info);
            break;

        case "update-password-success":
            info = {
                from: `"CMR Company" <${process.env.NODEMAILER_EMAIL_USER}>`, // sender address
                to: email, // list of receivers
                subject: "Password updated", // Subject line
                text: "Your new password has been update", // plain text body
                html: `<b>Hello </b>
             
            <p>Your new password has been update</p>`, // html body
            };

            sendEmail(info);
            break;

        default:
            break;
    }
};

const sendEmail = async (info) => {
    try {
        // Send the email with the defined transport object
        const result = await EmailTransporter.sendMail(info);

        console.log("Email sent: %s", result.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));

        return result; // Resolve with the result of the email sending
    } catch (error) {
        console.log(error);
        throw error; // Throw the error if sending the email fails
    }
};

const smsTransporter = () => {
    // Twilio authentication setup
    const accountSid = process.env.TWILLO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);

    return client;
};



const smsProcessor = ({ phoneNumber, pin, type }) => {
    let message = "";

    // Set up Twilio authentication using the 'smsTransporter' function
    const client = smsTransporter();

    switch (type) {
        case "request-new-password":
            message = `Here is your password reset pin: ${pin}.\nThis pin will expire in 1 day`;

            sendSMS(client, phoneNumber, message);
            break;

        case "update-password-success":
            // You can customize the SMS message for password update success
            message = "Your password has been successfully updated.";

            sendSMS(client, phoneNumber, message);
            break;

        default:
            break;
    }
};


const sendSMS = (client, phoneNumber, message) => {
    // Send an SMS using the provided Twilio client
    client.messages
        .create({
            body: message,
            to: `+91${phoneNumber}`,
            from: '+13342924349',
        })
        .then((message) => console.log("SMS sent. SID: ", message.sid))
        .catch((error) => console.error("Error sending SMS: ", error));
};

export { emailProcessor, smsProcessor };
