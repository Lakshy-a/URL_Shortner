import amqp from 'amqplib'
import { User } from '../models/user.models.js'

export const consumeUrlClicked = async (handleMessage) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'url_clicked'

    await channel.assertQueue(queue, { durable: true })
    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            try {
                const { userId, shortUrlObjectId, clickedAt } = JSON.parse(msg.content.toString())
                if (!userId || !shortUrlObjectId || !clickedAt) {
                    console.error('Invalid message format:', msg.content.toString())
                    return channel.ack(msg)
                }

                await User.findByIdAndUpdate(
                    userId,
                    {
                        $inc: { 'shortUrls.$[elem].clicks': 1 },
                    },
                    {
                        arrayFilters: [{ 'elem._id': shortUrlObjectId }],
                    }
                )

                channel.ack(msg)
            } catch (error) {
                console.error('Error in consume url clicked:', error)
                channel.nack(msg, false, false)
            }
        }
    })
}
