const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure emails directory exists
const emailsDir = path.join(__dirname, 'emails');
if (!fs.existsSync(emailsDir)) {
    fs.mkdirSync(emailsDir);
}

// JSON file path
const emailsFile = path.join(emailsDir, 'emails.json');

// Initialize emails.json if it doesn't exist
if (!fs.existsSync(emailsFile)) {
    fs.writeFileSync(emailsFile, JSON.stringify([], null, 2));
}

// Route to handle form submission
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, 'inquiry-type': inquiryType, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, subject, and message are required.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // Create email object
        const newEmail = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : '',
            inquiryType: inquiryType || 'general',
            subject: subject.trim(),
            message: message.trim(),
            status: 'new',
            read: false,
            archived: false
        };

        // Read existing emails
        const emailsData = fs.readFileSync(emailsFile, 'utf8');
        const emails = JSON.parse(emailsData);

        // Add new email
        emails.unshift(newEmail); // Add to beginning

        // Save to JSON file
        fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));

        console.log('New contact form submission saved:', newEmail);

        // Send email notification (optional)
        sendEmailNotification(newEmail);

        res.json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            data: newEmail
        });

    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request.'
        });
    }
});

// Route to get all emails (for admin viewing)
app.get('/api/emails', (req, res) => {
    try {
        const emailsData = fs.readFileSync(emailsFile, 'utf8');
        const emails = JSON.parse(emailsData);
        res.json({ success: true, emails });
    } catch (error) {
        console.error('Error reading emails:', error);
        res.status(500).json({ success: false, message: 'Error reading emails' });
    }
});

// Route to update email status
app.put('/api/emails/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { read, archived, status } = req.body;

        const emailsData = fs.readFileSync(emailsFile, 'utf8');
        let emails = JSON.parse(emailsData);

        const emailIndex = emails.findIndex(email => email.id == id);

        if (emailIndex === -1) {
            return res.status(404).json({ success: false, message: 'Email not found' });
        }

        // Update email properties
        if (read !== undefined) emails[emailIndex].read = read;
        if (archived !== undefined) emails[emailIndex].archived = archived;
        if (status) emails[emailIndex].status = status;

        fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2));

        res.json({ success: true, email: emails[emailIndex] });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ success: false, message: 'Error updating email' });
    }
});

// Function to send email notification (optional)
function sendEmailNotification(emailData) {
    // You can integrate with Nodemailer here if you want email notifications
    // This is optional - the JSON file will store all submissions
    console.log('New contact form received from:', emailData.email);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Contact form endpoint: http://localhost:${PORT}/api/contact`);
});