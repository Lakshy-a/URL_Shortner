import amqp from 'amqplib'

export const consumeUserRegistered = async () => {
    const connection = await amqp.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    const queue = 'user_registered'

    await channel.assertQueue(queue, { durable: true })
    console.log('📩 Waiting for messages in', queue)

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            console.log('hello from user registered consumer', msg)

            channel.ack(msg)
        }
    })
}
