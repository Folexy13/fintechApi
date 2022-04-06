"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    logging: false
    // logging: (...msg) => console.log(msg)
});
db.Op = sequelize_1.Op;
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
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.users = require('../Models/User.ts')(sequelize, sequelize_1.DataTypes);
db.sequelize
    .sync({ force: false })
    .then(function () {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        console.info('Connection to Database was successful');
        return [2 /*return*/];
    }); });
})
    .catch(function (err) {
    console.error(err, 'Something went wrong with the Database Update!');
});
module.exports = db;