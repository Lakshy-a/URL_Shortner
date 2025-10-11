import amqp from 'amqplib'

export const publishUserCreatedShortUrl = async (data) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_created_short_url'

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    })
}
