import amqp from 'amqplib'

export const publishUrlClicked = async (data) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    const queue = 'url_clicked'

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    })

    setTimeout(() => {
        connection.close()
    }, 500)
}
