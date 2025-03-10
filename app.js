const express = require('express');
const ejsMate = require('ejs-mate'); // Import ejs-mate
const path = require('path');
require("dotenv").config({ path: "./settings.env" });
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const serverless = require("serverless-http");
const multer = require('multer');
const upload = multer(); // Use Multer to parse form data


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

//just a comment
  // Example route
  app.get('/', (req, res) => {
    res.render('index');
  });

  
  app.post('/send-email', (req, res) => {
    console.log('Received Data:', req.body); // Debugging

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required!' }); // ✅ Send JSON error
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: 'jyotishbishwakarma@gmail.com',
        subject: `Inquiry from Portfolio - ${subject}`,
        text: `Message from: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending message. Please try again later.' }); // ✅ Send JSON error
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Thank you reaching out! I will get in touch with you soon!' }); // ✅ Send JSON success
        }
    });
});





/*app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });*/

/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/


module.exports = app;
