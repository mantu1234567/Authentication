const nodemailer = require('nodemailer');


const sendMail = async (otp, email) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'GMAIL',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'reset password otp',
            html: `<div>${otp}</div>`,
        };

        const info = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.log('Error sending email:', error.message);
    }
};

module.exports = sendMail;


// const sendMail = async (otp,email)=>{
//     try {
//         const transport = nodemailer.createTransport({
//             service:'GMAIL',
//             auth:{
//                 user:process.env.EMAIL,
//                 pass:process.env.EMAIL_PASSWORD
//             }
//         })
       
//         const mailOptions = {
//             from:process.env.EMAIL,
//             to:email,
//             subject:'reset password otp',
//             html:`<div>${otp}</div>`
//         }
    
//         transport.sendMail(mailOptions,(error,info)=>{
//             if(error){
//                 throw new Error('faild to send email')
//             }
//         })
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// module.exports = sendMail;