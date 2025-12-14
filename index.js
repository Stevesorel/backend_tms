// index.js - Version simplifiée
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authroutes = require('./route/authroutes')

const app = express()

// Middleware JSON
app.use(express.json())

// CORS simplifié
app.use(cors({
  origin: [
    'https://votre-frontend.vercel.app', // Votre frontend Vercel
    'http://localhost:5174',
    'http://localhost:5173'
  ]
}))

// Routes API
app.use('/api/auth', authroutes)

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'TMS Backend API', 
    version: '1.0.0',
    status: 'online'
  })
})

// Health check pour Docker
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TMS Backend'
  })
})

// Démarrer le serveur
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`)
  console.log(`🌐 URL: http://localhost:${PORT}`)
})