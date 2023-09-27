const Imap = require('imap');
const { simpleParser } = require('mailparser');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

const imap = new Imap({
    user: 'gal.miles.career@gmail.com',
    password: 'wczw urpm ehcd ploo',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    connTimeout: 10000, // Set a longer connection timeout (e.g., 10 seconds)
    authTimeout: 5000  // Set a longer authentication timeout (e.g., 5 seconds)
  });
  
  
  getEmails = () => {
    try {
      imap.once('ready', () => {
        console.log('Connected to Gmail IMAP server.');
  
        // List the available mailboxes
        imap.openBox('INBOX', false, () => {
          imap.search(['UNSEEN'], (err, results) => {
            // imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
            const f = imap.fetch(results, { bodies: '' });
            f.on('message', msg => {
              msg.on('body', stream => {
                simpleParser(stream, async (err, parsed) => {
                  console.log('==================================');
                  console.log('From:' + parsed.from.text + '->' + parsed.text);
                })
              })
            })
            // Handle the 'end' event, which fires when the connection ends
            imap.once('end', () => {
              console.log('Done fetching mails.');
              imap.end();
            });
          });
  
        });
      });
  
  
      imap.once('error', err => {
        console.log(err);
      });
      
      imap.once('end', () => {
        console.log('Disconnected from Gmail IMAP server.');
      });
  
      // Connect to the IMAP server
      imap.connect();
  
      // // // Disconnect when done
      // imap.end();
    }
    catch (e) {
      console.log('Error has occuerd:' + e);
    }
  }
  
  exports.getEmails = getEmails;