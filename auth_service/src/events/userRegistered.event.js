import amqp from 'amqplib'

export const publishUserRegistered = async (user) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_registered'

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)), {
        persistent: true,
    }) // channel.sendToQueue(queue, message, options)
}
