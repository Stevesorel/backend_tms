const bcrypt = require('bcrypt')
const { UniqueConstraintError } = require('sequelize')
const User = require('../models/User')

exports.register = async (request, response) => {
    const { name, email, telephone, site, description, terminer, web_site_link } = request.body

    // Validation des champs requis
    if (!name || !email || !telephone || !site || !description) {
        return response.status(400).json({
            success: false,
            error: "Tous les champs sont obligatoires (sauf terminer)."
        })
    }

    try {
        // Création de l'utilisateur
        const user = await User.create({
            name,
            email,
            telephone,
            site,
            description,
            web_site_link,
            terminer: terminer || false
        })

        return response.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès.",
            user: user
        })
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err)

        if (err instanceof UniqueConstraintError) {
            return response.status(409).json({
                success: false,
                error: "Cet email est déjà utilisé."
            })
        }

        return response.status(500).json({
            success: false,
            error: "Erreur interne du serveur lors de la création."
        })
    }
}

























// const bcrypt = require('bcrypt')
// const { UniqueConstraintError } = require('sequelize'); // Importer l'erreur spécifique de Sequelize

// const User = require('../models/user')

// // Inscription
// exports.register = async (request, response) =>
// {
//     // Note : Si l'utilisateur doit se connecter, le champ 'password' est essentiel
//     const { name, email, telephone, site, description } = request.body;

//     // --- 1. Validation des champs ---
//     if (!email || !name || !telephone || !site || !description)
//     {
//         // Code 400: Mauvaise requête
//         return response.status(400).json({ error: "Champs obligatoires manquants." });
//     }

//     try
//     {
//         // --- 2. Création de l'utilisateur avec Sequelize ---
//         // 💡 Rappel : Si vous ajoutez un mot de passe, vous devez le hacher avec bcrypt ici !
        
//         const user = await User.create({ name, email, telephone, site, description });

//         // --- 3. Succès de la création (Code 201 Created) ---
//         // Le 'return' est crucial pour n'envoyer qu'une seule réponse.
//         return response.status(201).json({
//             message: "Commande effectuée avec succès.",
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 telephone: user.telephone,
//                 site: user.site,
//                 description: user.description 
//             }
//         });
//     }
//     catch (err)
//     {
//         console.error("Erreur Sequelize lors de l'inscription:", err);

//         // --- 4. Gestion de l'erreur de doublon spécifique à Sequelize ---
//         if (err instanceof UniqueConstraintError) {
//             // Code 409: Conflit (l'email existe déjà)
//             return response.status(409).json({ error: "Cet email est déjà utilisé." });
//         }
        
//         // Gestion des autres erreurs (validation, connexion BD, etc.)
//         // Code 500: Erreur interne du serveur
//         return response.status(500).json({ error: "Erreur interne du serveur lors de la création de l'utilisateur." });
//     }
// };

