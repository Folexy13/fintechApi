//Imports
import fs from 'fs';
import path from 'path';
import { Sequelize, Op , DataTypes} from 'sequelize';

//Import config file
import config from '../Configs/configTypes';

//Initizalizing and tweaking db 
let db = {} as any;
const sequelize: any = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD, {
    host: config.DBHOST,
    port: config.DBPORT,
    dialect: config.DBDIALECT,
    logging:false,
    // logging: (...msg) => console.log(msg)
        pool:config.POOL= {
        max: config.POOL.max,
        min:config.POOL.min,
        acquire: config.POOL.acquire,
        idle:config.POOL.idle
    }
});

db.Op = Op;
sequelize
    .authenticate().then(() => console.log("connected to DB successfully"))
    .catch(function (err: any) {
        console.error(err, 'Something went wrong with the Database Update!')
    });


//Exports

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./User')(sequelize, DataTypes);



// db.sequelize
//     .sync({force:false})
// 	.then(async function () {console.info('Connection to Database was successful')})
// 	.catch(function (err: any) {
// 		console.error(err, 'Something went wrong with the Database Update!');
// 	});



// module.exports = db;

db.sequelize.sync({ force: false })
    .then(() => console.log('yes resync-done !'));


module.exports = db;

