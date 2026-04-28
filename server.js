const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, contact, description } = req.body;

  if (!name || !contact || !description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"For Sure Floors" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request — For Sure Floors</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone / Email:</strong> ${contact}</p>
        <p><strong>What they need:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send message. Please call us directly.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`For Sure Floors running on port ${PORT}`);
});
