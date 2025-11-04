import { verify } from "crypto";

export const emailTemplate ={

    welcome : ( firstName:string )=>`
        <h1>Welcome to Our Platform LapTronix, ${firstName}!</h1>
        <p>We're excited to have you on board. 
        Explore our features and enjoy your stay!
        </p>
        <p>Best Regards,<br/>The LapTronix Team</p>
    `,
    passwordReset : ( resetLink:string )=>`
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best Regards,<br/>The LapTronix Team</p>
    `,
    verifyEmail : ( code:string )=>`
        <h1>Email Verification</h1>
        <p>Thank you for registering with LapTronix. Please verify your email address by clicking the link below:</p>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>If you didn't register for this account, please ignore this email.</p>
        <p>Best Regards,<br/>The LapTronix Team</p>
    `

}