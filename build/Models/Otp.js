"use strict";
/*************************************************************************
OTP TABLE
*************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, Sequelize) {
    var Otp = sequelize.define('otp', {
        otp: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 333322
        },
        expirationTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        verifiedAt: Sequelize.DATE,
    }, {
        freezeTableName: true,
    });
    Otp.associate = function (models) {
        models.userSettings.belongsTo(models.users, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
    };
    return Otp;
}
exports.default = default_1;
