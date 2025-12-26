require('dotenv').config()
const sequelize = require('../database/database')
const Admin = require('../models/Admin')

async function checkAdmins() {
    try {
        await sequelize.authenticate()
        console.log('✅ Connexion DB réussie')
        
        // Chercher tous les admins
        const admins = await Admin.findAll({
            attributes: ['id', 'username', 'email', 'role', 'isActive', 'createdAt']
        })
        
        console.log('')
        console.log('='.repeat(50))
        console.log('📋 ADMINS EXISTANTS DANS LA BASE')
        console.log('='.repeat(50))
        
        if (admins.length === 0) {
            console.log('Aucun admin trouvé')
        } else {
            admins.forEach((admin, index) => {
                console.log(`\nAdmin #${index + 1}:`)
                console.log(`  ID: ${admin.id}`)
                console.log(`  Username: ${admin.username}`)
                console.log(`  Email: ${admin.email}`)
                console.log(`  Role: ${admin.role}`)
                console.log(`  Actif: ${admin.isActive ? '✅' : '❌'}`)
                console.log(`  Créé le: ${admin.createdAt}`)
            })
        }
        
        console.log('='.repeat(50))
        
        // Vérifions aussi avec l'email admin@tms.com
        const specificAdmin = await Admin.findOne({
            where: { email: 'admin@tms.com' },
            attributes: { exclude: ['password'] }
        })
        
        if (specificAdmin) {
            console.log('\n🔍 Admin trouvé avec email admin@tms.com:')
            console.log(`  Username: ${specificAdmin.username}`)
            console.log(`  Pour vous connecter, utilisez:`)
            console.log(`  Email: admin@tms.com`)
            console.log(`  Mot de passe: Celui que vous avez défini`)
        }
        
        process.exit(0)
    } catch (error) {
        console.error('❌ Erreur:', error.message)
        process.exit(1)
    }
}

checkAdmins()
