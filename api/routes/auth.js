const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'insecure-jwt-key';

module.exports = (knex) => {
  const router = express.Router();

  // Register
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    try {
      const exists = await knex('users').where({ username }).first();
      if (exists) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      const password_hash = await bcrypt.hash(password, 10);
      const [user] = await knex('users')
        .insert({ username, password_hash })
        .returning(['id', 'username']);
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (e) {
      console.error('Register error', e);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    try {
      const user = await knex('users').where({ username }).first();
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (e) {
      console.error('Login error', e);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Get current user info
  router.get('/me', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
      res.json({ id: decoded.id, username: decoded.username });
    } catch (e) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  return router;
};
