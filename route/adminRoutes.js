// route/adminRoutes.js
const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth')
const {
    getAllUsers,
    updateUser,
    deleteUser,
    getStats
} = require('../controllers/adminController')

// ===== ROUTES PROTÉGÉES (nécessitent un token admin) =====

// Dashboard et statistiques
router.get('/dashboard/stats', authenticateToken, getStats)

// Gestion des utilisateurs
router.get('/users', authenticateToken, getAllUsers)
router.put('/users/:id', authenticateToken, updateUser)
router.delete('/users/:id', authenticateToken, deleteUser)

// Profil admin
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        success: true,
        data: req.admin
    })
})

module.exports = router