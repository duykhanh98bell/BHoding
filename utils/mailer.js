const nodemailer = require('nodemailer');
const _ = require('lodash');

const option = {
    service: 'gmail',
    auth: {
        user: 'adupacpac1234@gmail.com', 
        pass: "Longdeptraibodoithe'070" 
    }
};
const transporter = nodemailer.createTransport(option);

transporter.verify(function(error, success) {
    
    if (error) {
        console.log(error);
    } else { 
        const defaultMail  = {
            form: 'adupacpac1234@gmail.com',
            text: 'test text',
        };
        module.exports = function(mail){
            mail = _.merge({}, defaultMail, mail);

            transporter.sendMail(mail, function(error, info) {
                if (error) { 
                    console.log(error);
                } else { 
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        
    }

});