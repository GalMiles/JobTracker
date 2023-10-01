const mongoose = require('mongoose');

const EmailsSchema = new mongoose.Schema({
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

const Emails = mongoose.model("Emails", EmailsSchema);
module.exports = Emails;