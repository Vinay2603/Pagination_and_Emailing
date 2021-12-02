
const transporter = require("../configs/mail")

const sendMail= (from , to , subject, text, html )=>{
    const  message = {
        from,
        to,
        subject,
        text,
        html
      };
    
       transporter.sendMail(message)
}
module.exports = sendMail
