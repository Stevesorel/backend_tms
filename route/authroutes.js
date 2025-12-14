const express = require('express')
const router = express.Router()

// Import des contrôleurs
const { GetAll } = require('../controllers/getAll')
const { updateUser } = require('../controllers/updateUser')
const { deleteUser } = require('../controllers/deleteUser')
const { register } = require('../controllers/inscription')

// Définition des routes
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/command', register)
router.get('/all', GetAll)

module.exports = router