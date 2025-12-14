const Sequelize = require("sequelize")
require('dotenv').config(); // Charger les variables d'environnement

// Récupérer les valeurs depuis .env avec des valeurs par défaut
const instance = new Sequelize(
  process.env.DB_DATABASE || "steve",
  process.env.DB_USERNAME || "steve", 
  process.env.DB_PASSWORD || "success",
  {
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432, // Ajout du port
    logging: process.env.NODE_ENV === 'development' ? console.log : false // Logs en dev seulement
  }
)

async function testConnection()
{
    return instance.authenticate()
}

// Ne pas exécuter automatiquement dans Docker (sera appelé depuis app.js)
// testConnection().then(()=>{
//     console.log("✅ Connexion à la base de données réussie")
// }).catch((error)=>{
//     console.log("❌ Connexion refusée:", error.message)
// })

module.exports = instance