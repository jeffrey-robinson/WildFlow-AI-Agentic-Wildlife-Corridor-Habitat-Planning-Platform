const { app } = require('../server/src/app');
const connectDB = require('../server/src/config/db');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.warn('[Vercel Serverless DB Warning]:', err.message);
    }
  }
  return app(req, res);
};

