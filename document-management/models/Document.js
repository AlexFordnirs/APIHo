const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Document = sequelize.define('Document', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('application_for_vacation', 'application_for_employment'),
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    signingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Document;
