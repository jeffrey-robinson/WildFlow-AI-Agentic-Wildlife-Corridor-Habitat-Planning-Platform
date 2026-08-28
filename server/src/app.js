const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const env = require('./config/env');
const connectDB = require('./config/db');
const { initSocket } = require('./config/socket');
const errorHandler = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const executionRoutes = require('./routes/executionRoutes');
const wildlifeRoutes = require('./routes/wildlifeRoutes');
const habitatRoutes = require('./routes/habitatRoutes');
const corridorRoutes = require('./routes/corridorRoutes');
const riskRoutes = require('./routes/riskRoutes');
const datasetRoutes = require('./routes/datasetRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Root & Health Endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'WildFlow AI Conservation Intelligence Platform',
    message: 'WildFlow AI Backend API is active and running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      workflows: '/api/workflows',
      executions: '/api/executions',
    },
    timestamp: new Date(),
    environment: env.nodeEnv,
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'WildFlow AI Conservation Intelligence Platform',
    timestamp: new Date(),
    environment: env.nodeEnv,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/wildlife', wildlifeRoutes);
app.use('/api/habitats', habitatRoutes);
app.use('/api/corridors', corridorRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Middleware
app.use(errorHandler);

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || env.port || 5000;
  
  const listenOnPort = (portToTry) => {
    server.listen(portToTry, '0.0.0.0')
      .on('listening', () => {
        console.log(`===================================================`);
        console.log(` 🌳 WildFlow AI Backend Server running on port ${portToTry}`);
        console.log(` 📡 Socket.IO Real-Time Stream Engine Ready`);
        console.log(` 🐘 GIS Spatial & Multi-Agent Layer Active`);
        console.log(`===================================================`);
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE' && !process.env.PORT) {
          console.warn(`[Port Warning]: Port ${portToTry} in use. Retrying on port ${portToTry + 1}...`);
          listenOnPort(portToTry + 1);
        } else {
          console.error('[Server Error]:', err);
        }
      });
  };

  listenOnPort(PORT);
};

if (require.main === module) {
  startServer();
}

module.exports = { app, server };
