const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const env = require('../config/env');
const orchestrator = require('../agents/orchestrator');

let analysisQueue = null;
let isRedisAvailable = false;

// Attempt Redis connection
try {
  const redisConnection = new Redis(env.redisUrl, {
    maxRetriesPerRequest: 1,
    connectTimeout: 2000,
    lazyConnect: true,
  });

  redisConnection.on('error', (err) => {
    // Suppress unhandled ECONNREFUSED error events when Redis is absent
  });

  redisConnection.connect().then(() => {
    isRedisAvailable = true;
    console.log('[Redis Connected]: BullMQ background queue active.');

    analysisQueue = new Queue('analysisQueue', { connection: redisConnection });

    new Worker('analysisQueue', async (job) => {
      console.log(`[BullMQ Worker]: Processing job ${job.id} for execution ${job.data.executionId}`);
      return await orchestrator.runExecution(job.data.executionId);
    }, { connection: redisConnection });
  }).catch(() => {
    console.warn('[Redis Warning]: Redis server not detected. Using Async In-Memory Execution Queue fallback.');
  });
} catch (err) {
  console.warn('[Redis Exception]: Using Async In-Memory Execution Queue fallback.');
}

const addExecutionToQueue = async (executionId) => {
  if (isRedisAvailable && analysisQueue) {
    await analysisQueue.add('runAnalysis', { executionId }, { attempts: 3, backoff: 5000 });
    return { queued: true, type: 'BullMQ' };
  } else {
    // In-memory fallback
    setImmediate(() => {
      orchestrator.runExecution(executionId).catch((err) => {
        console.error('[In-Memory Queue Execution Error]:', err);
      });
    });
    return { queued: true, type: 'InMemory' };
  }
};

module.exports = {
  addExecutionToQueue,
};
