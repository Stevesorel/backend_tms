const instance = require("../database/database")
const { DataTypes } = require("sequelize")

const User = instance.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    site: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    terminer: {
        type: DataTypes.BOOLEAN,  // Changé de STRING à BOOLEAN
        allowNull: true,
        defaultValue: false
    },
    web_site_link: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'Users'
})

// Synchronisation (optionnel selon votre workflow)
// instance.sync({ alter: true })

module.exports = User