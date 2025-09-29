import { transporter } from '../config/email.config.js'
import { mailGenerator } from '../config/mailgen.config.js'

export const sendEmail = async (to, emailBody) => {
    const html = mailGenerator.generate(emailBody)
    const text = mailGenerator.generatePlaintext(emailBody)

    const message = {
        from: process.env.NODEMAILER_FROM_EMAIL,
        to,
        subject: emailBody.body.subject || 'Notification',
        text,
        html,
    }

    return transporter.sendMail(message)
}
