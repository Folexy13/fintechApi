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
exports.activateAccount = exports.login = exports.sendOtp = void 0;
// Import packages
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Import DB and configs
var db_1 = __importDefault(require("../Controllers/db"));
var configTypes_1 = __importDefault(require("../Configs/configTypes"));
var utility_1 = require("./utility");
var templateData_1 = require("./mailer/templateData");
var mailer_1 = require("./mailer/mailer");
var template_1 = require("./mailer/template");
var sendOtp = function (_a) {
    var email = _a.email, type = _a.type, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var otp, now, expirationTime, user, otpInstance, otpDetails, encoded, _b, mailSubject, mailBody, sendEmail, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    otp = (0, utility_1.generateOtp)(), now = new Date(), expirationTime = (0, utility_1.addMinutesToDate)(now, 10);
                    return [4 /*yield*/, db_1.default.users.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
                case 1:
                    user = _c.sent();
                    return [4 /*yield*/, db_1.default.otp.create({ otp: otp, expirationTime: expirationTime, userId: user.id })];
                case 2:
                    otpInstance = _c.sent();
                    otpDetails = {
                        timestamp: now,
                        email: email,
                        password: password,
                        success: true,
                        message: 'OTP sent to user',
                        otpId: otpInstance.id,
                    };
                    encoded = jsonwebtoken_1.default.sign(JSON.stringify(otpDetails), configTypes_1.default.JWTSECRET);
                    _b = (0, templateData_1.getOtpTemplateData)({ otp: otp, type: type }), mailSubject = _b.mailSubject, mailBody = _b.mailBody;
                    return [4 /*yield*/, (0, mailer_1.prepareMail)({
                            mailRecipients: email,
                            mailSubject: mailSubject,
                            mailBody: (0, template_1.otpMailTemplate)({ subject: mailSubject, body: mailBody }),
                            senderName: configTypes_1.default.MAIL_FROM_NAME,
                            senderEmail: configTypes_1.default.MAIL_FROM,
                        })];
                case 3:
                    sendEmail = _c.sent();
                    if (sendEmail.status)
                        return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: 'OTP Sent', data: encoded })];
                    return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: 'OTP not sent' })];
                case 4:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: "An error occured:- ".concat(error_1) })];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.sendOtp = sendOtp;
var login = function (_a) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, validPass, payload, token, data, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, db_1.default.users.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcryptjs_1.default.compareSync(password, user.password)];
                case 2:
                    validPass = _b.sent();
                    if (!validPass)
                        return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: 'Email or Password is incorrect!' })];
                    if (user.status === 'inactive')
                        return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: 'Account Suspended!, Please contact support!' })];
                    payload = {
                        id: user.id,
                        email: email,
                        gender: user.gender,
                        names: user.names,
                        phone: user.phone,
                        status: user.status,
                        type: 'user',
                    };
                    token = jsonwebtoken_1.default.sign(payload, configTypes_1.default.JWTSECRET);
                    data = { type: 'token', token: token, user: payload };
                    return [2 /*return*/, (0, utility_1.fnResponse)({ status: true, message: 'Login successfull', data: data })];
                case 3: return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: 'Incorrect Email' })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _b.sent();
                    console.log(error_2);
                    return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: "An error occured - ".concat(error_2) })];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.login = login;
var activateAccount = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.users.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
            case 1:
                user = _a.sent();
                user.update({ status: 'active' });
                return [2 /*return*/, (0, utility_1.fnResponse)({ status: true, message: 'User Activated' })];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, (0, utility_1.fnResponse)({ status: false, message: "An error occured - ".concat(error_3) })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.activateAccount = activateAccount;
