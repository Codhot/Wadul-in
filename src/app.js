// src/app.js
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // 👈 pastikan path-nya betul

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route API
app.use('/api', authRoutes); // 👈 penting: gunakan prefix /api

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


