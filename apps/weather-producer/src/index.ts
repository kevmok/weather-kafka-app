import { CronJob } from 'cron';
import { Producer } from './producer';

// Create a cron job that runs every 10 seconds
const job = new CronJob('*/10 * * * * *', () => {
  console.log('Running a job every 10 seconds');
  Producer();
});

job.start();
