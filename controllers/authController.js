// controllers/authController.js
const Admin = require('../models/Admin')
const { generateToken } = require('../middleware/auth')

// Connexion admin
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email et mot de passe requis'
            })
        }

        // Chercher l'admin
        const admin = await Admin.findOne({
            where: { email, isActive: true }
        })

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants incorrects'
            })
        }

        // Vérifier le mot de passe
        const isValidPassword = await admin.comparePassword(password)
        
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants incorrects'
            })
        }

        // Générer le token
        const token = generateToken(admin.id)

        // Préparer la réponse (sans le mot de passe)
        const adminData = admin.toJSON()
        delete adminData.password

        res.json({
            success: true,
            message: 'Connexion réussie',
            data: {
                token,
                admin: adminData,
                expiresIn: process.env.JWT_EXPIRES_IN || '24h'
            }
        })
    } catch (error) {
        console.error('Erreur login:', error)
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}

// Vérification de token
exports.verifyToken = async (req, res) => {
    try {
        res.json({
            success: true,
            data: req.admin
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur vérification'
        })
    }
}

// Déconnexion
exports.logout = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Déconnexion réussie'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}