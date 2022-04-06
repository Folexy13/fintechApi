//Imports
import fs from 'fs';
import path from 'path';
import { Sequelize, Op ,DataType, DataTypes} from 'sequelize';

//Import config file
import config from '../Configs/configTypes';

//Initizalizing and tweaking db 
let db = {} as any;
const sequelize: any = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
    host: config.DBHOST,
    port: config.DBPORT,
    dialect: config.DBDIALECT,
    logging:false
    // logging: (...msg) => console.log(msg)
});

db.Op = Op;

//load models
// fs.readdirSync(__dirname + '/../Models/')
//     .filter(function (file) {
//         return file.indexOf('.') !== 0 && file !== 'index.js'
//     })
//     .forEach(async function (file) {
//         var model = require(path.join(__dirname + '/../Models', file));
//         db[model.name] = model;
//         console.log(__dirname + '/../Models')
//     });
//     Object.keys(db).forEach(function (modelName) {
//         if ('associate' in db[modelName]) {
//             db[modelName].associate(db);
//         };
//     })

//Synchronizing DB



//Exports

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('../Models/User.ts')(sequelize,DataTypes)



db.sequelize
    .sync({force:false})
	.then(async function () {console.info('Connection to Database was successful')})
	.catch(function (err: any) {
		console.error(err, 'Something went wrong with the Database Update!');
	});



module.exports = db;

