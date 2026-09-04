/**
 * IEEE RAS FSB SB — server.js
 * Express backend proxying chat messages to the Google Gemini API via official SDK.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

// Serve the static site (index.html, css/, js/, assets/) from project root
app.use(express.static(path.join(__dirname, '..')));

const SYSTEM_CONTEXT = `You are the RAS Assistant for IEEE RAS FSB SB
(IEEE Robotics & Automation Society, Faculty of Sciences of Bizerte
Student Branch). You can answer general questions like a normal AI
assistant, and you also know about the branch: its workshops,
bootcamps, competitions, member projects, team, and how to join.
Keep answers concise and friendly.`;

app.post('/api/chat', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const { message, history = [] } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A "message" string is required.' });
    }

    // Map the short chat history into Gemini's "contents" format.
    const contents = [
      ...history.map(turn => ({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    // Call Gemini using the official SDK
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_CONTEXT
      }
    });

    const reply = response.text || "Sorry, I couldn't come up with a reply just now.";
    res.json({ reply });

  } catch (err) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`IEEE RAS FSB SB server running on http://localhost:${PORT}`);
});