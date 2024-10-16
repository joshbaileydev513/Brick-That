const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Lego extends Model { }

Lego.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        lego_url: {  // Updated to match the column name in your database
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        createdAt: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'lego',
    }
);

module.exports = Lego;
