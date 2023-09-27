
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

const emails = "Gals email";

app.get('/api/emails', (req, res) => {
  res.json(emails);
});

app.post('/api/emails', (req, res) => {
  // const { email } = req.body;
  const {email} = "my email"
  emails.push(email);
  res.json({ message: 'Email added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log('Hi');
// getEmails();


