// import { Worker, SHARE_ENV} from 'node:worker_threads';
// import fs from 'node:fs';
import cronParser from "cron-parser";
import log from "lib/logger";
import cron from "node-cron";

export const everyHourExpression = "0 * * * *"; // Cron expression for every hour

export function initJobs() {
  if (process.env.ENVIRONMENT !== "DEV") {

  }
}

function orderSyncJob() {
  // Schedule a task to run at the start of every hour
  const interval = cronParser.parseExpression(everyHourExpression);
  const nextScheduleTime = interval.next().toString();
  console.log("[JOB] - Next scheduled date and time:", nextScheduleTime);
  cron.schedule(everyHourExpression, async () => {
    try {
      console.log("[JOB] - running a Order Sync Job");


    } catch (error) {
      log.error(`[JOB] - Error Order Sync root cause - ${error.message}`);
    }
  });
}
