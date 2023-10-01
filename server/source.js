const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 5000;

const EmailsModel = require("./models/emails");



app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

const emails = ["Gals email-1", "Gals email-2"];

mongoose.connect("mongodb+srv://brit:Bl713713@crud.ldrup1x.mongodb.net/emails?retryWrites=true&w=majority",{
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Connection to MongoDB successful!');
});

//Brit test with mongodb
app.post("/insert", async (req,res)=>{

  const emailTitle = req.body.emailTitle;
  const emailBody =  req.body.emailBody;
  const jobTitle = req.body.jobTitle;
  const jobCompany = req.body.jobCompany;

  const email = new EmailsModel({emailTitle: emailTitle , emailBody: emailBody, jobTitle: jobTitle, jobCompany:jobCompany});

  try{
    await email.save();
    res.send("inserted data");

  } catch(err){
    console.log(err)
  }
});

//display all of the information
app.get("/read", (req, res) => {
  EmailsModel.find({})
    .then((result) => {
      // Handle the success case here.
      res.send(result);
    })
    .catch((err) => {
      // Handle the error case here.
      res.send(err);
    });
});


app.put("/update", (req,res)=>{

  const newJobTitle = req.body.newJobTitle;
  const id = req.body.id;

  EmailsModel.findById(id)
    .then((updatedJobTitle) => {
      updatedJobTitle.jobTitle = newJobTitle;
      updatedJobTitle.save();

      // Handle the success case here.
      res.send("update");
    })
    .catch((err) => {
      // Handle the error case here.
      console.log(err);
    });
});

//delete item
app.delete("/delete/:id", async (req,res) => {
  const id = req.params.id;

  await EmailsModel.findByIdAndRemove(id).exec();
  res.send("item is deleted");

});

//original

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


