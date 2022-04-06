"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
//Import config file
var configTypes_1 = __importDefault(require("../Configs/configTypes"));
//Initizalizing and tweaking db 
var db = {};
var sequelize = new sequelize_1.Sequelize(configTypes_1.default.DBNAME, configTypes_1.default.DBUSERNAME, configTypes_1.default.DBPASSWORD, {
    host: configTypes_1.default.DBHOST,
    port: configTypes_1.default.DBPORT,
    dialect: configTypes_1.default.DBDIALECT,
    logging: false,
    // logging: (...msg) => console.log(msg)
    pool: configTypes_1.default.POOL = {
        max: configTypes_1.default.POOL.max,
        min: configTypes_1.default.POOL.min,
        acquire: configTypes_1.default.POOL.acquire,
        idle: configTypes_1.default.POOL.idle
    }
});
db.Op = sequelize_1.Op;
sequelize
    .authenticate().then(function () { return console.log("connected to DB successfully"); })
    .catch(function (err) {
    console.error(err, 'Something went wrong with the Database Update!');
});
//Exports
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.users = require('./User')(sequelize, sequelize_1.DataTypes);
// db.sequelize
//     .sync({force:false})
// 	.then(async function () {console.info('Connection to Database was successful')})
// 	.catch(function (err: any) {
// 		console.error(err, 'Something went wrong with the Database Update!');
// 	});
// module.exports = db;
db.sequelize.sync({ force: false })
    .then(function () { return console.log('yes resync-done !'); });
module.exports = db;
