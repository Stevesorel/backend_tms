const User = require('../models/User')

exports.deleteUser = async (request, response) => {
    const { id } = request.params

    if (!id) {
        return response.status(400).json({ 
            success: false,
            error: "ID utilisateur manquant." 
        })
    }

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return response.status(404).json({ 
                success: false,
                error: "Utilisateur non trouvé." 
            })
        }

        await user.destroy()

        return response.status(200).json({
            success: true,
            message: "Utilisateur supprimé avec succès."
        })
    } catch (err) {
        console.error("Erreur lors de la suppression:", err)
        return response.status(500).json({
            success: false,
            error: "Erreur interne du serveur lors de la suppression."
        })
    }
}