
//*****     USERS TABLE     *****//
export default function (sequelize: any, Sequelize: any) {
    var Users = sequelize.define(
        'users', {
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
            type: Sequelize.ENUM('MALE', 'FEMALE')
        },
    },
        {
            freezeTableName: true
        }
    );
    
    Users.associate = function (models: any) {
        models.users.hasOne(models.userSettings, {onDelete:'cascade',targetKey:'id',foreignKey:'userId'})
    }
    return Users
};