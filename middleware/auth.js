// middleware/auth.js
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_dev_admin_123'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

// Middleware pour vérifier le token JWT
exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token manquant'
            })
        }

        // Vérifier le token
        const decoded = jwt.verify(token, JWT_SECRET)
        
        // Chercher l'admin dans la base
        const admin = await Admin.findOne({
            where: { 
                id: decoded.id,
                isActive: true 
            },
            attributes: { exclude: ['password'] }
        })

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Admin non trouvé'
            })
        }

        // Ajouter l'admin à la requête
        req.admin = admin
        next()
    } catch (error) {
        console.error('Erreur auth:', error.message)
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                success: false,
                message: 'Token invalide'
            })
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: 'Token expiré'
            })
        }
        
        return res.status(500).json({
            success: false,
            message: 'Erreur authentification'
        })
    }
}

// Générer un token JWT
exports.generateToken = (adminId) => {
    return jwt.sign(
        { id: adminId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )
}