// server.js
require('dotenv').config(); // încarcă variabilele din .env

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware globale
app.use(express.json());           // parsează JSON în body
app.use(helmet());                 // securitate HTTP headers
app.use(cors());                   // permite cereri cross-origin
app.use(morgan('dev'));            // log în console

// Limitare request-uri (anti brute-force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // max 100 requests / IP
});
app.use(limiter);

// Conectare MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Rute simple (vom adăuga mai multe după)
app.get('/', (req, res) => {
  res.json({ message: 'Marketplace API running 🚀' });
});

// Pornim serverul
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));