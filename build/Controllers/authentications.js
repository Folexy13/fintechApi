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
exports.chargeCard = exports.updateUserSettings = exports.changePassword = exports.resetPassword = exports.updatePassword = exports.preLogin = exports.verifyOtp = exports.register = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Flutterwave = require('flutterwave-node-v3');
//Import Db and configs
var configTypes_1 = __importDefault(require("../Configs/configTypes"));
var db_1 = __importDefault(require("./db"));
//Destructured functions
var types_1 = require("../Helpers/types");
var utility_1 = require("../Helpers/utility");
var auth_1 = require("../Helpers/auth");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, firstName, lastName, phone, email, gender, password, walletbalance, salt, hashedPwd, insertData, isExist, user, payload, token, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, email = _a.email, gender = _a.gender, password = _a.password, walletbalance = _a.walletbalance;
                return [4 /*yield*/, bcryptjs_1.default.genSalt(15)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 2:
                hashedPwd = _b.sent();
                insertData = { firstName: firstName, lastName: lastName, phone: phone, email: email, walletbalance: walletbalance, gender: gender, password: hashedPwd };
                _b.label = 3;
            case 3:
                _b.trys.push([3, 10, , 11]);
                return [4 /*yield*/, db_1.default.users.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
            case 4:
                isExist = _b.sent();
                if (isExist)
                    return [2 /*return*/, (0, utility_1.handleResponse)(res, 400, false, "User with email ".concat(email, " already exists"))];
                return [4 /*yield*/, db_1.default.users.create(insertData)];
            case 5:
                user = _b.sent();
                if (!user) return [3 /*break*/, 8];
                return [4 /*yield*/, db_1.default.userSettings.create({ userId: user.id })];
            case 6:
                _b.sent();
                payload = {
                    id: user.id,
                    names: "".concat(user.firstName, " ").concat(user.lastName),
                    phone: user.phone,
                    gender: user.gender,
                    email: user.email,
                    type: 'registration',
                    status: 'inactive'
                };
                token = jsonwebtoken_1.default.sign(payload, configTypes_1.default.JWTSECRET);
                data = { type: 'token', token: token, user: payload };
                console.log(data);
                console.log(data.token);
                return [4 /*yield*/, (0, auth_1.sendOtp)({ email: email, type: types_1.typeEnum.VERIFICATION })];
            case 7:
                _b.sent();
                return [2 /*return*/, (0, utility_1.handleResponse)(res, 200, true, "Registration successfull")];
            case 8: return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "An error occured")];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "An error occured - ".concat(error_1))];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var verifyOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, currentdate, _a, token, otp, email, type, decoded, otpInstance, updateData, loginResponse, accountActivated, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                currentdate = new Date();
                _a = req.body, token = _a.token, otp = _a.otp, email = _a.email, type = _a.type;
                decoded = jsonwebtoken_1.default.verify(token, configTypes_1.default.JWTSECRET);
                if (!decoded)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "Invalid verification")];
                console.log(decoded);
                if (decoded.email != email)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "OTP was not sent to this particular email")];
                return [4 /*yield*/, db_1.default.otp.findOne({ where: { userId: decoded.id } })];
            case 2:
                otpInstance = _b.sent();
                console.log(otpInstance);
                if (!otpInstance)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "OTP does not exists")];
                if (otpInstance.verified)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "OTP Already Used")];
                if (!(0, utility_1.otpValidity)(otpInstance.expirationTime, currentdate))
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'OTP Expired')];
                if (otp != otpInstance.otp)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'OTP NOT Matched')];
                updateData = { verified: true, verifiedAt: currentdate };
                return [4 /*yield*/, otpInstance.update(updateData)];
            case 3:
                _b.sent();
                if (!(type === types_1.typeEnum.TWOFA)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, auth_1.login)({ email: email, password: decoded.password })];
            case 4:
                loginResponse = _b.sent();
                if (!loginResponse.status)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, loginResponse.message)];
                return [2 /*return*/, (0, utility_1.successResponse)(res, 'Login Successful', loginResponse.data)];
            case 5:
                if (!(type === types_1.typeEnum.RESET)) return [3 /*break*/, 6];
                if (decoded.password)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Suspicious attempt discovered! Pls reset password again')];
                return [2 /*return*/, (0, utility_1.successResponse)(res, 'OTP Matched', token)];
            case 6: return [4 /*yield*/, (0, auth_1.activateAccount)(email)];
            case 7:
                accountActivated = _b.sent();
                if (!accountActivated.status)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, accountActivated.message)];
                return [2 /*return*/, (0, utility_1.successResponse)(res, 'Email verified', email)];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, (0, utility_1.errorResponse)(res, "An error occured - ".concat(error_2))];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.verifyOtp = verifyOtp;
var preLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, sendOtpResponse, data, loginResponse, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, db_1.default.users.findOne({
                        where: { email: email },
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, include: { model: db_1.default.userSettings, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    })];
            case 2:
                user = _b.sent();
                if (!user) return [3 /*break*/, 7];
                if (!user.userSetting.twoFa) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, auth_1.sendOtp)({ email: email, password: password, type: types_1.typeEnum.TWOFA })];
            case 3:
                sendOtpResponse = _b.sent();
                if (!sendOtpResponse.status)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, sendOtpResponse.message)];
                data = { type: '2fa', token: sendOtpResponse.data };
                return [2 /*return*/, (0, utility_1.successResponse)(res, sendOtpResponse.message, data)];
            case 4: return [4 /*yield*/, (0, auth_1.login)({ email: email, password: password })];
            case 5:
                loginResponse = _b.sent();
                if (!loginResponse.status)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, loginResponse.message)];
                return [2 /*return*/, (0, utility_1.successResponse)(res, loginResponse.message, loginResponse.data)];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, 'Incorrect Email,Cross-Check  email')];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "An error occured - ".concat(err_1, " "))];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.preLogin = preLogin;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, oldPassword, newPassword, user, validPassword, salt, hashPassword, updatedPassword, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _a = req.body, email = _a.email, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db_1.default.users.findOne({ where: { email: email }, attributes: { excludes: ['createdAt', 'updatedAt'] } })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "user with ".concat(email, " not found"))];
                return [4 /*yield*/, bcryptjs_1.default.compareSync(oldPassword, user.password)];
            case 3:
                validPassword = _b.sent();
                if (!validPassword)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Old password does not match!')];
                return [4 /*yield*/, bcryptjs_1.default.genSalt(15)];
            case 4:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, salt)];
            case 5:
                hashPassword = _b.sent();
                updatedPassword = user.update({ password: hashPassword });
                if (!updatedPassword)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Unable to update Password!')];
                return [2 /*return*/, (0, utility_1.successResponse)(res, "Password update was successful")];
            case 6:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, (0, utility_1.errorResponse)(res, "An error occured ".concat(error_3))];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, email, user, sendOtpResponse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db_1.default.users.findOne({
                        where: { email: email },
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, auth_1.sendOtp)({ email: email, type: types_1.typeEnum.RESET })];
            case 3:
                sendOtpResponse = _a.sent();
                if (!sendOtpResponse.status)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, sendOtpResponse.message)];
                return [2 /*return*/, (0, utility_1.successResponse)(res, sendOtpResponse.message, sendOtpResponse.data)];
            case 4: return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "Incorrect Email")];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "An error occured - ".concat(error_4))];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, token, password, decoded, user, salt, hashPassword, updatedPassword, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _a = req.body, token = _a.token, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                decoded = jsonwebtoken_1.default.verify(token, configTypes_1.default.JWTSECRET);
                if (!decoded)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "Invalid verification")];
                return [4 /*yield*/, db_1.default.users.findOne({ where: { email: decoded.email, status: 'active' }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "Account Suspended!, Please contact support!")];
                return [4 /*yield*/, bcryptjs_1.default.genSalt(15)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                hashPassword = _b.sent();
                return [4 /*yield*/, user.update({ password: hashPassword })];
            case 5:
                updatedPassword = _b.sent();
                if (!updatedPassword)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "Unable update password!")];
                return [2 /*return*/, (0, utility_1.successResponse)(res, "Password changed successfully")];
            case 6:
                error_5 = _b.sent();
                console.log(error_5);
                return [2 /*return*/, (0, utility_1.errorResponse)(res, "An error occured - ".concat(error_5))];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var updateUserSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, twoFa, id, user, updatedSettings, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                twoFa = req.body.twoFa;
                id = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.users.findOne({ where: { id: id } })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user.update({ twoFa: twoFa })];
            case 3:
                updatedSettings = _a.sent();
                if (!updatedSettings)
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, "Unable update settings!")];
                return [2 /*return*/, (0, utility_1.successResponse)(res, "Settings updated successfully")];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, (0, utility_1.errorResponse)(res, "An error occured - ".concat(error_6))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUserSettings = updateUserSettings;
var chargeCard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var flw, payload, response, payload2, reCallCharge, callValidate, url, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flw = new Flutterwave(configTypes_1.default.FlW_PUBLIC_KEY, configTypes_1.default.FlW_SECRET_KEY);
                payload = {
                    "card_number": "5531886652142950",
                    "cvv": "564",
                    "expiry_month": "09",
                    "expiry_year": "23",
                    "currency": "NGN",
                    "amount": "100",
                    "redirect_url": "http://localhost:8081/callback",
                    "fullname": "Aluko Opeyemi",
                    "email": "folajimiopeyemisax13@gmail.com",
                    "phone_number": "07067903042",
                    "enckey": configTypes_1.default.FLW_ENCRYPTION_KEY,
                    "tx_ref": "MC-344ee--4eerye4euee3rerhfghfh23e43e",
                    "authorization": {
                        "mode": "pin",
                        "fields": [
                            "pin"
                        ],
                        "pin": 3310
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, flw.Charge.card(payload)];
            case 2:
                response = _a.sent();
                console.log(response);
                if (!(response.meta.authorization.mode === 'pin')) return [3 /*break*/, 5];
                payload2 = payload;
                payload2.authorization = {
                    "mode": "pin",
                    "fields": [
                        "pin"
                    ],
                    "pin": 3310
                };
                return [4 /*yield*/, flw.Charge.card(payload2)];
            case 3:
                reCallCharge = _a.sent();
                return [4 /*yield*/, flw.Charge.validate({
                        "otp": "12345",
                        "flw_ref": reCallCharge.data.flw_ref
                    })];
            case 4:
                callValidate = _a.sent();
                console.log(callValidate);
                _a.label = 5;
            case 5:
                if (response.meta.authorization.mode === 'redirect') {
                    console.log("Here 1");
                    url = response.meta.authorization.redirect;
                    res.redirect(url);
                }
                return [3 /*break*/, 7];
            case 6:
                error_7 = _a.sent();
                return [2 /*return*/, error_7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.chargeCard = chargeCard;
