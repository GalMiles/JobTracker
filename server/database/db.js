const mongoose = require('mongoose');
const EmailModel = require("./models/Email");


async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://brit:Bl713713@crud.ldrup1x.mongodb.net/emails?retryWrites=true&w=majority", {
            useNewUrlParser: true
        });
        console.log("Connection to MongoDB successful!");
    } catch (err) {
        console.log(err);
    }
}

async function insertJob(req, res) {
    const jobTitle = req.body.jobTitle;
    const jobCompany = req.body.jobCompany;

    const email = new EmailModel({ jobTitle: jobTitle, jobCompany: jobCompany, date: Date.now() });

    try {
        await email.save();
        res.send("inserted data");

    } catch (err) {
        console.log(err)
    }
}

async function insertEmailJob(job) {
    const date = job.date;
    const jobCompany = job.company;
    const jobTitle = job.position;

    const email = new EmailModel({ jobTitle: jobTitle, jobCompany: jobCompany, data: date });

    try {
        await email.save();
        res.send("inserted data");

    } catch (err) {
        console.log(err)
    }
}

async function getJobs(req, res) {
    EmailModel.find({})
        .then((result) => {
            // Handle the success case here.
            res.send(result);
        })
        .catch((err) => {
            // Handle the error case here.
            res.send(err);
        });
}

async function updateJob(req, res) {
    const newJobTitle = req.body.newJobTitle;
    const id = req.body.id;

    EmailModel.findById(id)
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
}

async function deleteJob(req, res) {
    const id = req.params.id;

    await EmailModel.findByIdAndRemove(id).exec();
    res.send("item is deleted");
}

module.exports = {connectDB, insertJob, getJobs, updateJob, deleteJob, insertEmailJob};






