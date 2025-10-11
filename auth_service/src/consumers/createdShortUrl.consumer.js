import amqp from 'amqplib'

export const consumeUserCreatedShortUrl = async (handleMessage) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'user_created_short_url'

    await channel.assertQueue(queue, { durable: true })
    channel.consume(
        queue,
        async (msg) => {
            if (msg !== null) {
                try {
                    const { userId, shortUrlObjectId } = JSON.parse(msg.content.toString())

                    if (!userId || !shortUrlObjectId) {
                        console.error('Invalid message format:', msg.content.toString())
                        return channel.ack(msg)
                    }

                    await User.findByIdAndUpdate(userId, {
                        $push: { shortUrls: shortUrlObjectId },
                    })

                    channel.ack(msg)
                } catch (error) {
                    console.error('Error handling message:', error)
                    channel.nack(msg, false, false)
                }
            }
        },
        { noAck: false }
    )
}
