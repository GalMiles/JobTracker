const e = require('express');
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const moment = require('moment');



  async function getEmails() {
    const emailsArr = [];
    const specificDate = moment('2023-10-03').format('YYYY-MM-DD'); // Change to the desired date
  
    const imap = new Imap({
      user: 'gal.miles.career@gmail.com',
      password: 'wczw urpm ehcd ploo',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      connTimeout: 10000, // Set a longer connection timeout
      authTimeout: 10000  // Set a longer authentication timeout
    });
  
    try {
      await new Promise((resolve, reject) => {
        imap.once('ready', () => {
          console.log('Connected to Gmail IMAP server.');
  
          imap.openBox('INBOX', true, () => {
            imap.search(['UNSEEN', ['SINCE', specificDate]], (err, results) => {
              const f = imap.fetch(results, { bodies: '' });
              let messageCount = 0;
              f.on('message', msg => {
                msg.on('body', stream => {
                  simpleParser(stream, async (err, parsed) => {
                    const item = {
                      from: parsed.from.text,
                      subject: parsed.subject,
                      text: parsed.text,
                      date: parsed.date
                    };
                    messageCount++;
                    await emailsArr.push(item);
                    console.log('==================================');
                    console.log(item);

                    if (messageCount === results.length) {
                      imap.end();
                      resolve(emailsArr);
                    }
                  });
                });
              });
            });
          });
        });
  
        imap.once('error', err => {
          console.log(err);
          reject(err); // Reject the promise if an error occurs
        });
  
        imap.once('end', () => {
          console.log('Disconnected from Gmail IMAP server.');
        });
  
        // Connect to the IMAP server
        imap.connect();
      });
    } catch (e) {
      console.error('Error has occurred:', e);
      throw e; // Rethrow the error to be caught by the caller
    }
  
    return emailsArr;
  }
  function convertToJob(emails) {

    const jobEmails = [];
  
    const comanpyRgx = /your application was sent to (.+?)$/i;
      // const positionRegx = /\b(\w+\sEngineer|\w+\sDeveloper)\b/g;
      let companyName = '';
      // let position = '';
  
    emails.forEach(email => {
      const matchCompany = email.subject.match(comanpyRgx);
      // const matchPosition = email.text.match(positionRegx);
  
      let s = email.text.split('\n');
      let position = s[2];
  
      let dateObject = new Date(email.date);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  
      dateObject = dateObject.toLocaleDateString('en-US', options);
  
      if (matchCompany) {
        companyName = matchCompany[1];
      } else {
        companyName = email.subject;
      }
  
      // if (matchPosition) {
      //   position = matchPosition[0];
      // } else {
      //   position = 'Developer'; 
      // }
      const job = { 
        company: companyName,
        position: position,
        date: dateObject
      }
      jobEmails.push(job);
  
    })
    return jobEmails;
  
  }
module.exports = {getEmails, convertToJob};