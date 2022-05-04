"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var getConfig = function () {
    return {
        PORT: Number(process.env.PORT),
        DBPORT: Number(process.env.DBPORT),
        DBNAME: String(process.env.DBNAME),
        DBHOST: String(process.env.DBHOST),
        DBUSERNAME: String(process.env.DBUSERNAME),
        SENDGRID_API_KEY: String(process.env.SENDGRID_API_KEY),
        DBPASSWORD: String(process.env.DBPASSWORD),
        DBDIALECT: 'mysql',
        JWT_EXPIRY_TIME: String(process.env.JWT_EXPIRY_TIME),
        JWTSECRET: String(process.env.JWTSECRET),
        MAIL_FROM_NAME: String(process.env.MAIL_FROM_NAME),
        MAIL_FROM: String(process.env.MAIL_FROM),
        TWILLIO_ACCOUNT_SID: String(process.env.TWILLIO_ACCOUNT_SID),
        TWILLIO_AUTH_TOKEN: String(process.env.TWILLIO_AUTH_TOKEN),
        TWILLIO_MESSAGE_SERVICE_ID: String(process.env.TWILLIO_MESSAGE_SERVICE_ID),
        FlW_SECRET_KEY: String(process.env.FlW_SECRET_KEY),
        FlW_PUBLIC_KEY: String(process.env.FlW_PUBLIC_KEY),
        FLW_ENCRYPTION_KEY: String(process.env.FLW_ENCRYPTION_KEY),
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 100000,
        }
    };
};
var getSanitizedConfig = function (config) {
    for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === undefined) {
            throw new Error("Missing key ".concat(key, " in .env"));
        }
    }
    return config;
};
var config = getConfig();
var sanitizedConfig = getSanitizedConfig(config);
exports.default = sanitizedConfig;
