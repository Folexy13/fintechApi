"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*************************************************************************
USER SETTINGS TABLE
*************************************************************************/
function default_1(sequelize, Sequelize) {
    var UserSettings = sequelize.define('userSettings', {
        twoFa: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    UserSettings.associate = function (models) {
        models.userSettings.belongsTo(models.users, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
    };
    return UserSettings;
}
exports.default = default_1;
