import { Kafka } from 'kafkajs';
import WeatherClient from './classes/WeatherClient';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID as string,
  brokers: ['cluster.playground.cdkt.io:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.SASL_USERNAME as string,
    password: process.env.SALS_PASSWORD as string,
  },
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

export const Producer = async () => {
  const weatherClient = new WeatherClient(
    process.env.WEATHER_API_KEY as string,
  );
  const producer = kafka.producer();
  try {
    await producer.connect();
    const weather = await weatherClient.getCurrentWeather('Austin');
    // Send a message
    await producer.send({
      topic: 'node-demo',
      messages: [
        {
          value: JSON.stringify({
            weather,
          }),
        },
      ],
    });
    console.log('Successfully sent an event');
    await producer.disconnect();
  } catch (error) {
    console.log(error);
  }
};
