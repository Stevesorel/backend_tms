// controllers/adminController.js
const User = require('../models/User')

// Récupérer tous les utilisateurs (avec pagination)
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const offset = (page - 1) * limit

        const { count, rows: users } = await User.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        })

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page,
                pages: Math.ceil(count / limit),
                limit
            }
        })
    } catch (error) {
        console.error('Erreur:', error)
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            })
        }

        await user.update(updates)

        res.json({
            success: true,
            message: 'Utilisateur mis à jour',
            data: user
        })
    } catch (error) {
        console.error('Erreur:', error)
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            })
        }

        await user.destroy()

        res.json({
            success: true,
            message: 'Utilisateur supprimé'
        })
    } catch (error) {
        console.error('Erreur:', error)
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}

// Statistiques
exports.getStats = async (req, res) => {
    try {
        const total = await User.count()
        const completed = await User.count({ where: { terminer: true } })
        const pending = await User.count({ where: { terminer: false } })

        res.json({
            success: true,
            data: {
                total,
                completed,
                pending,
                completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
            }
        })
    } catch (error) {
        console.error('Erreur:', error)
        res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        })
    }
}