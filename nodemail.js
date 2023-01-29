const nodemailer = require('nodemailer')

// let transporter;

let auth = false;
let transporter;


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "e.library.2021.system@gmail.com",
//     pass: 'Hemant123456$'
//   }
// })


function authenticate(mail, pass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mail,
      pass: pass
    }
  })
  auth=true;
  return true;
}

// return new Promise(function (resolve, reject) {
//   transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: mail,
//       pass: pass
//     }
//   }, function (err, result) {
//     if (err) {
//       console.log(err);
//       reject(err);
//     } else {
//       auth = true;
//       console.log(result);
//       resolve(result)
//     }
//   })
// })
// }

// function auth(){
// transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "e.library.2021.system@gmail.com",
//     pass: 'Hemant123456$s'
//   }
// })
// }

// conssole.log(transporter);

var sendto = "singhhemant1852@gmail.com"


function sendMail(mail, mess, subject) { 
  return new Promise(function (resolve, reject) {
    if (auth == false)
      reject('not authenticate');
       
    transporter.sendMail({
      from: "Dazzling Developers",
      to: mail,
      subject: subject,
      text: mess,
      // html: mess
      // from: '"Fred Foo 👻" <foo@example.com>', // sender address
      // to: "bar@example.com, baz@example.com", // list of receivers
      // subject: "Hello ✔", // Subject line
      // text: "Hello world?", // plain text body
      // html: "<b>Hello world?</b>", // html body
    }, function (err, results) {
      if (err) {
        reject(err);
      }
      else
        resolve(results);
    })
  })
}


function sendMail1(mail, mess, subject) {
  if (auth)
    return new Promise(function (resolve, reject) {
      transporter.sendMail({
        from: 'e.library.2021.system@gmail.com',
        to: mail,
        subject: subject,
        html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>GIF (requires "amp-anim" script in header):<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`
      },
        function (err, results) {
          if (err)
            reject(err);
          else
            resolve(results);
        })
    })
}


// sendMail(sendto).then(function(data){
//     console.log(data);
// }).catch(function(err){
//     console.log(err);
// })

module.exports = module = {
  sendMail,
  sendMail1,
  authenticate
}