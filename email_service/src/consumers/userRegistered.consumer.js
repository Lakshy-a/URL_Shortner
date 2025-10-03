import amqp from 'amqplib'
import { sendEmail } from '../services/email.service.js'
import { welcomeEmail } from '../emailTemplates.js'

export const consumeUserRegistered = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_registered'

    await channel.assertQueue(queue, { durable: true })

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const user = JSON.parse(msg.content.toString())
            const emailContent = welcomeEmail(user.userName, user.token)

            await sendEmail(user.email, emailContent)

            channel.ack(msg)
        }
    })
}
