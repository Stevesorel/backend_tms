// index.js - VERSION MISE À JOUR
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authroutes = require('./route/authroutes')
const adminRoutes = require('./route/adminRoutes')  // NOUVEAU

const app = express()

// Middleware
app.use(express.json())

// CORS
const corsOptions = {
    origin: [
        'https://tms-compagny.vercel.app',
        'http://localhost:5174',
        'http://localhost:5173',
        'http://localhost:5175'  // Pour votre frontend admin
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}

app.use(cors(corsOptions))

// Routes
app.use('/api', authroutes)        // Routes publiques + login admin
app.use('/api/admin', adminRoutes) // Routes admin protégées

// Routes de base
app.get('/', (req, res) => {
    res.json({
        message: 'TMS Backend API',
        version: '1.0.0',
        endpoints: {
            public: '/api',
            admin: '/api/admin (protégé)'
        }
    })
})

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    })
})

// 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        path: req.url
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(50))
    console.log(`✅ TMS Backend démarré sur le port ${PORT}`)
    console.log(`🌐 URL: http://localhost:${PORT}`)
    console.log('')
    console.log('📡 ROUTES PUBLIQUES:')
    console.log(`   GET  http://localhost:${PORT}/api/all`)
    console.log(`   POST http://localhost:${PORT}/api/command`)
    console.log('')
    console.log('🔐 ROUTES ADMIN:')
    console.log(`   POST http://localhost:${PORT}/api/admin/login`)
    console.log(`   GET  http://localhost:${PORT}/api/admin/dashboard/stats (protégé)`)
    console.log(`   GET  http://localhost:${PORT}/api/admin/users (protégé)`)
    console.log('='.repeat(50))
})