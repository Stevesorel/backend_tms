const bcrypt = require('bcrypt')
const { UniqueConstraintError } = require('sequelize')
const User = require('../models/user')

exports.updateUser = async (request, response) => {
    const { id } = request.params
    const { name, email, telephone, site, description, terminer } = request.body

    if (!id) {
        return response.status(400).json({ 
            success: false,
            error: "ID utilisateur manquant." 
        })
    }

    try {
        // Recherche de l'utilisateur
        const user = await User.findByPk(id)

        if (!user) {
            return response.status(404).json({ 
                success: false,
                error: "Utilisateur non trouvé." 
            })
        }

        // Mise à jour des champs
        await user.update({
            name: name !== undefined ? name : user.name,
            email: email !== undefined ? email : user.email,
            telephone: telephone !== undefined ? telephone : user.telephone,
            site: site !== undefined ? site : user.site,
            description: description !== undefined ? description : user.description,
            terminer: terminer !== undefined ? terminer : user.terminer
        })

        return response.status(200).json({
            success: true,
            message: "Utilisateur modifié avec succès.",
            user: user
        })
    } catch (err) {
        console.error("Erreur lors de la modification:", err)

        if (err instanceof UniqueConstraintError) {
            return response.status(409).json({ 
                success: false,
                error: "Cet email est déjà utilisé." 
            })
        }

        return response.status(500).json({
            success: false,
            error: "Erreur interne du serveur lors de la modification."
        })
    }
}