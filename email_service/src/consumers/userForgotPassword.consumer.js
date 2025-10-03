import amqp from 'amqplib'
import { sendEmail } from '../services/email.service.js'
import { resetPasswordEmail, welcomeEmail } from '../emailTemplates.js'

export const consumeUserForgotpassword = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_forgot_password'

    await channel.assertQueue(queue, { durable: true })

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString())
            const emailContent = resetPasswordEmail(data.userName, data.resetUrl)

            await sendEmail(data.email, emailContent)
            channel.ack(msg)
        }
    })
}
