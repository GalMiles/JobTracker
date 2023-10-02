const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const db = require('./database/db');


app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

db.connectDB();

app.post("/insert", async (req,res)=>{
  try {
    const result = await db.insertJob(req, res); 
    console.log('Insert data into db');
  } catch {
    console.log(err);
  }
});

//display all of the information
app.get('/read', async (req, res) => {
  try {
    const result = await db.getJobs(req, res);
    console.log('Get data from db');
  } catch (err) {
    console.log(err);
  }
});


app.put("/update", async (req,res)=>{
  try {
    const result = await db.updateJob(req, res); 
    console.log('Update data in db');
  } catch (err) {
    console.log(err);
  }
});

//delete item
app.delete("/delete/:id", async (req,res) => {
  try {
    const result = await db.deleteJob(req, res); 
    console.log('Delete data from db');
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log('Hi');
// getEmails();


