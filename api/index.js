require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);

const authenticate = require('./middleware/authenticate');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authenticate);

// Routes
app.use('/api/auth', require('./routes/auth')(knex));
app.use('/api/collection', require('./routes/collection')(knex));
app.use('/api/decks', require('./routes/decks')(knex));

// Health check
app.get('/', (req, res) => res.json({ status: 'API running' }));

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
