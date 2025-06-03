require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);

const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Public routes (no auth required)
app.use('/api/auth', require('./routes/auth')(knex));

// Protected routes (require JWT auth)
app.use('/api/collection', authenticateToken, require('./routes/collection')(knex));
app.use('/api/decks', authenticateToken, require('./routes/decks')(knex));

// Health check
app.get('/', (req, res) => res.json({ status: 'API running' }));

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
