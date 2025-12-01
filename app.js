const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Task API Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - ДОЛЖЕН БЫТЬ ПОСЛЕ ВСЕХ МАРШРУТОВ
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /tasks',
      'POST /tasks',
      'GET /tasks/:id', 
      'PUT /tasks/:id',
      'PATCH /tasks/:id',
      'DELETE /tasks/:id'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log(`📍 Tasks API: http://localhost:${PORT}/tasks`);
});

module.exports = app;