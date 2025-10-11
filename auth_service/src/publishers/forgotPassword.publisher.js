import amqp from 'amqplib'

export const publishUserForgotPassword = async (data) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_forgot_password'

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    })
}
