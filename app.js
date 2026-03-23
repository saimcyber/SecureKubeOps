const express = require('express');
const morgan = require('morgan');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use(morgan('combined'));

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc();
  res.send('🚀 SecureKubeOps is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});