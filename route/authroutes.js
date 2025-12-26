// route/authroutes.js - VERSION MODIFIÉE
const express = require('express')
const router = express.Router()

// Contrôleurs publics (votre app originale)
const { GetAll } = require('../controllers/getAll')
const { register } = require('../controllers/inscription')
const { updateUser } = require('../controllers/updateUser')
const { deleteUser } = require('../controllers/deleteUser')

// Contrôleurs auth (pour login admin)
const { adminLogin, verifyToken, logout } = require('../controllers/authController')

// ===== ROUTES PUBLIQUES (votre application frontend) =====
router.get('/all', GetAll)
router.post('/command', register)
router.put('/update/:id', updateUser)      // Public ou admin? À décider
router.delete('/delete/:id', deleteUser)   // Public ou admin? À décider

// ===== ROUTES AUTH ADMIN (login/logout) =====
router.post('/admin/login', adminLogin)
router.get('/admin/verify', verifyToken)   // Optionnel
router.post('/admin/logout', logout)       // Optionnel

module.exports = router