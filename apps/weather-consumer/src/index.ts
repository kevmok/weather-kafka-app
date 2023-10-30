import { WeatherResponse } from 'shared-types';
import { Kafka } from 'kafkajs';
import { createMongoDBDataAPI } from 'mongodb-data-api';

const mongoApi = createMongoDBDataAPI({
  apiKey: process.env.MONGO_API_KEY as string,
  urlEndpoint: process.env.MONGO_URL as string,
});

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

const insertMongoRecord = async (dict: object) => {
  //
  await mongoApi.insertOne({
    dataSource: 'weather-cluster',
    database: 'Weather',
    collection: 'Austin',
    document: {
      ...dict,
    },
  });
};

const consumeMessage = async (): Promise<void> => {
  // Create a consumer
  const consumer = kafka.consumer({ groupId: 'my-group' });
  try {
    await consumer.connect();

    // Subscribe to the topic
    await consumer.subscribe({ topic: 'node-demo', fromBeginning: false });

    // Handle incoming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value: WeatherResponse = JSON.parse(
          message.value?.toString() as string,
        );
        console.log(value);
        await insertMongoRecord(value);
      },
    });
  } catch (error) {
    console.log(error);
  }
};

consumeMessage().catch(console.error);
