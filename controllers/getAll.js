const User = require('../models/User')

exports.GetAll = async (request, response) => {
    try {
        // Récupération des utilisateurs triés par date de création (plus récents d'abord)
        const users = await User.findAll({
            order: [['createdAt', 'DESC']]
        });
        
        // Formatage de la réponse
        return response.status(200).json({ 
            success: true,
            message: "Liste des utilisateurs récupérée avec succès.", 
            count: users.length,
            users: users 
        });
    } catch (err) {
        console.error("Erreur Sequelize lors de la récupération des utilisateurs:", err);

        return response.status(500).json({ 
            success: false,
            error: "Erreur interne du serveur lors de la récupération des données." 
        });
    }
};