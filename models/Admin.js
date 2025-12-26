// models/Admin.js
const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const bcrypt = require('bcryptjs')

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('super_admin', 'admin', 'moderator'),
        defaultValue: 'admin'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Admins',
    timestamps: true,
    hooks: {
        beforeCreate: async (admin) => {
            if (admin.password) {
                const salt = await bcrypt.genSalt(10)
                admin.password = await bcrypt.hash(admin.password, salt)
            }
        }
    }
})

// Méthode pour vérifier le mot de passe
Admin.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = Admin