"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//*****     USERS TABLE     *****//
function default_1(sequelize, Sequelize) {
    var Users = sequelize.define('users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'inactive',
        },
    }, {
        freezeTableName: true
    });
    Users.associate = function (models) {
        models.users.hasOne(models.userSettings, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
        models.users.hasMany(models.otp, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
    };
    return Users;
}
exports.default = default_1;
;
