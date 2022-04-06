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
exports.register = void 0;
var express_validator_1 = require("express-validator");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var utility_1 = require("../Helpers/utility");
var DB = require('../Models');
var User = DB.users;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, firstName, lastName, phone, email, password, _b, walletbalance, salt, hashedPwd, insertData, isExist, user, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, (0, utility_1.errorResponse)(res, 'Validation Error', errors.array())];
                }
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone, email = _a.email, password = _a.password, _b = _a.walletbalance, walletbalance = _b === void 0 ? 0.00 : _b;
                return [4 /*yield*/, bcryptjs_1.default.genSalt(15)];
            case 1:
                salt = _c.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 2:
                hashedPwd = _c.sent();
                insertData = { firstName: firstName, lastName: lastName, phone: phone, email: email, walletbalance: walletbalance, password: hashedPwd };
                _c.label = 3;
            case 3:
                _c.trys.push([3, 6, , 7]);
                return [4 /*yield*/, User.findOne({ where: { email: email }, attributes: { exclude: ['createdAt', 'updatedAt'] } })];
            case 4:
                isExist = _c.sent();
                if (isExist)
                    return [2 /*return*/, (0, utility_1.handleResponse)(res, 400, false, "User with email ".concat(email, " already exists"))];
                return [4 /*yield*/, User.create(insertData)];
            case 5:
                user = _c.sent();
                console.log(user);
                return [2 /*return*/, res.json(user)];
            case 6:
                error_1 = _c.sent();
                return [2 /*return*/, (0, utility_1.handleResponse)(res, 401, false, "An error occured - ".concat(error_1))];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
