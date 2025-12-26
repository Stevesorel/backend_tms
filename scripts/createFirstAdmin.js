// scripts/createFirstAdmin.js
require('dotenv').config()
const sequelize = require('../database/database')
const Admin = require('../models/Admin')

async function createFirstAdmin() {
    try {
        await sequelize.authenticate()
        console.log('✅ Connexion DB réussie')

        // Synchroniser les modèles
        await Admin.sync({ alter: true })
        console.log('✅ Modèle Admin synchronisé')

        // Vérifier si un admin existe déjà
        const existingAdmin = await Admin.findOne({
            where: { email: 'admin@tms.com' }
        })

        if (existingAdmin) {
            console.log('⚠️  Un admin existe déjà avec cet email')
            console.log('Email:', existingAdmin.email)
            return
        }

        // Créer le premier admin
        const admin = await Admin.create({
            username: 'superadmin',
            email: 'admin@gmail.com',
            password: 'success',  // À CHANGER après la première connexion
            role: 'super_admin'
        })

        console.log('')
        console.log('='.repeat(50))
        console.log('✅ SUPER ADMIN CRÉÉ AVEC SUCCÈS')
        console.log('='.repeat(50))
        console.log('📧 Email: admin@tms.com')
        console.log('🔑 Mot de passe temporaire: Admin123!')
        console.log('')
        console.log('⚠️  IMPORTANT:')
        console.log('1. Changez ce mot de passe après la première connexion')
        console.log('2. Gardez ces identifiants en sécurité')
        console.log('='.repeat(50))
        
        process.exit(0)
    } catch (error) {
        console.error('❌ Erreur:', error)
        process.exit(1)
    }
}

createFirstAdmin()
