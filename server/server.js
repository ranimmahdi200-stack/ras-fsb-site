/**
 * IEEE RAS FSB SB — server.js
 * Express server serving static site assets.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the static site (index.html, css/, js/, assets/) from project root
app.use(express.static(path.join(__dirname, '..')));

module.exports = app;

app.listen(PORT, () => {
  console.log(`IEEE RAS FSB SB server running on http://localhost:${PORT}`);
});