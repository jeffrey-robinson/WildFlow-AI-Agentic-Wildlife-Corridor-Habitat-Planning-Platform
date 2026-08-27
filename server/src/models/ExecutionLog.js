const mongoose = require('mongoose');

const executionLogSchema = new mongoose.Schema(
  {
    executionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Execution',
      required: true,
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workflow',
    },
    nodeId: {
      type: String,
    },
    agent: {
      type: String,
      enum: ['planner', 'habitat', 'fragmentation', 'corridor', 'risk', 'validation', 'recovery', 'monitoring'],
      required: true,
    },
    level: {
      type: String,
      enum: ['info', 'warn', 'error', 'success'],
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ExecutionLog', executionLogSchema);
