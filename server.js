const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, contact, description } = req.body;

  if (!name || !contact || !description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'For Sure Floors <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'forsurefloorsllc@gmail.com',
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
