const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const {getEmails, convertToJob} = require('./emails');
const fs = require('fs');
const file_path = './jobs.json';
const db = require('./database/db');


app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// (async () => {
//   try {
//     const res = await getEmails();
//     let jobEmails = res.filter(email => email.from.includes('LinkedIn <jobs-noreply@linkedin.com>'));
//     jobEmails = jobEmails.filter(email => email.subject.includes('your application was sent to'));
//     jobEmails = convertToJob(jobEmails);
//     await fs.writeFile(file_path, JSON.stringify(jobEmails), (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('File written successfully\n');
//       }
//     });
//     console.log('finish');
//     console.log(jobEmails); // Log the emails after fetching is complete
//   } catch (e) {
//     console.error('Outer error has occurred:', e);
//   }
// })();


// const jobs = fs.readFileSync(file_path, 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   else {
//     console.log('File read successfully\n');
//     return data;
//   }
// });

// const jobsArr = JSON.parse(jobs);
// jobsArr.forEach(job => {
//   db.insertEmailJob(job);
// });
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


