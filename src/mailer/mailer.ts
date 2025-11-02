import dotenv from 'dotenv'
import { Server } from 'http'

import nodemailer from 'nodemailer'

dotenv.config()

export const sendMail =async(
    to:string,
    subject:string,
    html?:string
): Promise<string> =>{
    try {

    const mailTransporter = await nodemailer.createTransport(
      {
          host: process.env.SMTP_HOST,
          port:465,
          service:'gmail',
          secure:true,
          auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
          }
      }
    )

    const mailOptions : nodemailer.SendMailOptions={
        from:process.env.MAIL_USER,
        to,
        subject,
        html
    }

    const mailResponse = await mailTransporter.sendMail(mailOptions)
     if (mailResponse.accepted.length > 0) return 'Email sent successfully';
        if (mailResponse.rejected.length > 0) return 'Email not sent';
        return 'Email server not responding';
        
    } catch (error:any) {
        return JSON.stringify({error:error.message})

    }

    
}
