import nodemailer from 'nodemailer';


export default credentials => {
    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.gmail.com',
        // secure: true,
        // port: 465,
        auth: {
            user: credentials.gmail.user,
            pass: credentials.gmail.password,
        },
    });

    const mailOptions = ({ email, urlString }) => ({
        from: 'TEST TASK', // sender address
        to: email, // list of receivers
        subject: 'Response', // Subject line
        html: `<h3>
                Please click this link<a href="http://127.0.0.1:8000/api/v1/auth/users/verify?urlString=${urlString}">link</a>
                to continue registration.
                </h3>`, // plain text body'
    });

    return {
        send: user => mailTransport.sendMail(mailOptions(user))
    }
    // const result = await transporter.sendMail(mailOptions);
}
