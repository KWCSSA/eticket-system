const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require('body-parser');
const auth = require('./auth/auth')
const email_validator = require("email-validator");
const nodemailer = require('nodemailer');
const app = express()
const mailer = require('./mail/mailer')
//password protected page
app.use(auth)
app.use(bodyParser.json())

//connect to mongoDB
const mongoose = require("mongoose");
const mongoDB = process.env.DB_URL
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Schema & Model
const Schema = mongoose.Schema;

const clientInfoSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    ticketKind: String
});

const clientInfoModel = mongoose.model('clientInfoModel', clientInfoSchema);

//Node Mailer
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.KW_MAIL,
        pass: process.env.KW_PW
    }
});

//api
app.get("/", function(req, res){
    res.send("KWCSSA eTicket System")
})

app.post("/newTicket", function(req, res){
    if(req.query){
        let client_email = req.query.email;
        if(email_validator.validate(client_email)){
            // console.log("create mongodb models")
            console.log(req.query)
            var newTicket = new clientInfoModel({
                name: req.query.name,
                phone: req.query.phone,
                email: req.query.eamil,
                ticketKind: req.body.ticketKind
            });
            newTicket.save(function(err){
                if(err) return handleError(err);
                else res.send({status: "success"});
            })
            
            mailer.send_mail(req);

        }
        else res.send({status: "invalid"});
    } 
    else{
        res.send({status: "empty"});
    }
    
})



app.listen(8080, () => {
    console.log("Server listening to port 8080");
  });