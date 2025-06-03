// api/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'insecure-jwt-key';

function makeAuthController(User) {
  return {
    async register(req, res) {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ error: 'Username and password required' });

      const exists = await User.findByUsername(username);
      if (exists) return res.status(409).json({ error: 'Username already taken' });

      const password_hash = await bcrypt.hash(password, 10);
      const [user] = await User.createUser(username, password_hash);

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, username: user.username } });
    },

    async login(req, res) {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ error: 'Username and password required' });

      const user = await User.findByUsername(username);
      if (!user) return res.status(401).json({ error: 'Invalid username or password' });

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, username: user.username } });
    },

    async me(req, res) {
      if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
      res.json({ id: req.user.id, username: req.user.username });
    }
  };
}

module.exports = makeAuthController;
