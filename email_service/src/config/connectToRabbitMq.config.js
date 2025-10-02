import amqp from 'amqplib'

export const connectToRabbitMQ = async () =>  {
    const maxRetries = 10;
    const retryDelay = 3000; 

    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`🔄 Connecting to RabbitMQ (attempt ${i + 1}/${maxRetries})...`);

            const connection = await amqp.connect(process.env.RABBITMQ_URL);

            console.log('✅ Connected to RabbitMQ successfully!');
            return connection;

        } catch (error) {
            console.log(`❌ Connection failed: ${error.message}`);

            if (i === maxRetries - 1) {
                throw new Error('Could not connect to RabbitMQ after multiple attempts');
            }

            console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}