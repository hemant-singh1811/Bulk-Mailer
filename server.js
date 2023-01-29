const express = require('express');
const async = require('hbs/lib/async');
const { sendMail, sendMail1, authenticate } = require('./nodemail')
const path = require('path');
const res = require('express/lib/response');
const { isBuffer } = require('util');
const server = express();

var auth = false;
var message = "";
var subject = "";
var email = "";
var password = "";
var warning = "";
var testemail = "e.library.2021.system@gmail.com";

server.get('/', (req, res) => {
    res.redirect('/login');
})

server.use(express.json({ limit: '150mb' }));
server.use(express.urlencoded({ limit: '150mb' }));
// server.use(express.limit(100000000));

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(express.static(__dirname + '/public'));

server.use('/login', express.static(__dirname + '/public/'))

server.get('/message', async(req, res) => {
    console.log("auth: ", auth);
    if (auth)
        res.sendFile(__dirname + '/public/message.html')
    else
        res.redirect('/login')
})

server.post("/auth", async(req, res) => {

    // let mail = 'hy6517712@gmail.com'
    // let pass = 'Harshcn123';
    let mail = req.body.email;
    let pass = req.body.pass;
    email = mail;

    password = pass;

    auth = await authenticate(mail, pass)
    if (auth) {
        await sendMail(testemail, 'test', 'test')
            .then((data) => {
                console.log('auth success');
                res.send('success')
            }).catch((err) => {
                console.log('auth fail');
                res.send('failure')
                auth = false;
            })
    }
})

server.get('/content', async(req, res) => {

    message = req.query.message;
    subject = req.query.subject;

    console.log(message);
    console.log(subject);

    res.send("success")
})

server.post('/username', async(req, res) => {
    res.send(email)
})

server.get('/sendMail', async(req, res) => {
    if (auth)
        res.sendFile(__dirname + '/public/email_list.html')

    else
        res.redirect('/login')
})

server.get('/testauth', async(req, res) => {
    let mail = 'dazzlingdevelopers2022@gmail.com';
    let pass = 'PRHAAB@ADGITM'

    // console.log(_dirname);
    auth = await authenticate(mail, pass)
        // .then((data)=>{
        //     res.send(data);
        // }).catch((err)=>{
        //     res.send(err)
        // })
    console.log("auth : " + auth);
    res.send("authentication successfully")



})

server.get('/defaultmessage', async(req, res) => {
    res.send(message);
})

server.post('/mail', async(req, res) => {
    if (!auth) {
        console.log('not auth');
        res.redirect('!AUTH');
    } else {
        var total = req.body.total;

        var size = Object.keys(total).length

        // console.log(total);
        var result = [];
        for (var i = 0; i < size; i++) {
            var mail = total[i].mail;
            var message = total[i].message;

            await sendMail(mail, message, subject).then((data) => {
                console.log('data : ', data);
                var sub = {
                    mail: mail,
                    messageId: data.messageId,
                    time: realtime()
                }
                result.push(sub);
            }).catch((err) => {
                var sub = {
                    mail: mail,
                    messageId: 'null',
                    time: realtime()
                }
                result.push(sub);
                console.log('error : ', err);
            })

        }

        res.send(result)
        let curr = new Date();

        //     let status = false;
        let starttime = curr.getSeconds();
        //     console.log('mail is sending....');
        //     console.log('mail process done');
        //     curr = new Date();
        //     let endtime = curr.getSeconds();

        //     mailres = "success : " + success + " , fail : " + fail + "  total time taken : " + (endtime - starttime) + "ms";
        //     if (status)
        //         res.send(mailres);
        //     else {
        //         res.send("fail");
        //     }
    }
})

server.listen(8989, function() {
    console.log('server is running at localhost:8989');
})


function realtime() {

    var time = new Date();

    var hour = time.getHours();
    var minutes = time.getMinutes();
    var second = time.getSeconds();

    var ampm = (hour > 12) ? "PM" : "AM";

    hour = (hour > 12) ? hour - 12 : hour;

    hour = ("0" + hour).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    second = ("0" + second).slice(-2);

    var time = hour + ":" + minutes + ":" + second + " " + ampm;

    return time;
}