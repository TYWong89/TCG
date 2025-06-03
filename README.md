# GATCG Deck Builder
## Welcome to the Grand Archive TCG card search, deckbuilder and collector application!
### A fullstack application for Grand Archive TCG card browsing, collection management, and deck building.

** Frontend: ** React + Vite (/ui)

** Backend: ** Node.js + Express + Knex + PostgreSQL (/api)

** API:**  Integrates with GATCG public card API

### Features
User authentication (register/login with JWT)

Browse and search the full GATCG card database

Build, save, and manage custom decks

Track and manage your personal card collection

RESTful backend with PostgreSQL database

### Project Structure
GATCG-Deck-Builder/
├── api/          # Express backend API
│   ├── controllers/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...etc.
├── ui/           # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── App.jsx
│   └── ...etc.
├── docker-compose.yaml (optional, if Dockerized)
└── README.md

### Prerequisites
Node.js (v18 or higher recommended)

npm (comes with Node)

PostgreSQL (local or remote instance)

### Quick Start
1. Clone the Repo

`git clone` https://github.com/YOUR_USERNAME/GATCG-Deck-Builder.git
cd GATCG-Deck-Builder

2. ** Set Up the Backend (/api) ** 

```
cd api
npm install
```

** Configure environment variables **
Create a .env file in /api:

PORT=3001
JWT_SECRET=your-very-secret-key
DATABASE_URL=postgres://username:password@localhost:5432/your_db_name
Replace username, password, and your_db_name as needed.

** Set up the database **
Make sure PostgreSQL is running and your DATABASE_URL is correct.
```
npm run migrate     # Run migrations to create tables
npm run seed        # (If you have seeds)
```
** Start the backend server **
```
npm run dev         # For development (nodemon)
# or
npm start           # For production
```
3.** Set Up the Frontend (/ui) ** 
Open a new terminal:
```
cd ui
npm install
npm run dev
```
This starts the Vite development server (by default at http://localhost:5173).

4. ** Vite Proxy (Dev only) ** 
*Vite is configured to proxy API requests to your backend.*
See /ui/vite.config.js:

server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    },
  },
},
*If you change your backend port, update this accordingly.*

5. ** Using the App ** 
Go to http://localhost:5173 in your browser.

Register a new user, or log in.

Browse/search cards, build decks, manage your collection!

### Docker (Optional)
If you want to run everything with Docker:

Make sure you have Docker Desktop installed.

Edit docker-compose.yaml as needed (for DB credentials).

In the root folder, run:
```
docker-compose up --build
```
Developer Notes
Backend routes: All API endpoints start with /api/... (see /api/routes).

Frontend API calls: See /ui/src/api.js.

Database migrations: Managed by Knex (/api/migrations).

Environment Variables (/api/.env Example)

PORT=3001
JWT_SECRET=your-very-secret-key
DATABASE_URL=postgres://username:password@localhost:5432/gatcg_deckbuilder

### Troubleshooting
**Frontend API calls get 404?**

Make sure your backend is running.

Make sure Vite proxy is set up and Vite has been restarted after changes.

Check the terminal output for both backend and frontend for error messages.

**Cannot connect to database?**

Double-check your DATABASE_URL and PostgreSQL service is running.

**JWT errors?**

Make sure your JWT_SECRET in .env is set and matches your needs.

### License
MIT 

### Credits
Grand Archive TCG API & Images

React, Vite, Express, Knex, PostgreSQL