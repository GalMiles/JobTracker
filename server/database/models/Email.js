const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    emailTitle:{
      type: String,
      required: true  
    },
    emailBody:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    jobCompany:{
        type: String,
        required: true
    }

});

const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;