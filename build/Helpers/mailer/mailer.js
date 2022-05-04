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
exports.prepareMail = exports.sendMail = void 0;
// Import packages
var mail_1 = __importDefault(require("@sendgrid/mail"));
// Import configs
var configTypes_1 = __importDefault(require("../../Configs/configTypes"));
var sendMail = function (_a) {
    var senderName = _a.senderName, senderEmail = _a.senderEmail, mailRecipients = _a.mailRecipients, mailSubject = _a.mailSubject, mailBody = _a.mailBody;
    return __awaiter(void 0, void 0, void 0, function () {
        var msg;
        return __generator(this, function (_b) {
            try {
                mail_1.default.setApiKey(configTypes_1.default.SENDGRID_API_KEY);
                msg = {
                    to: mailRecipients,
                    from: "".concat(senderName, " <").concat(senderEmail, ">"),
                    subject: mailSubject,
                    html: mailBody,
                };
                mail_1.default.send(msg).then(function () { }, function (error) {
                    console.error(error);
                    return {
                        status: false,
                        message: "Email not sent ".concat(error),
                    };
                });
                return [2 /*return*/, {
                        status: true,
                        message: 'Email sent successfully',
                    }];
            }
            catch (error) {
                console.log(error);
                return [2 /*return*/, {
                        status: false,
                        message: "Email not sent ".concat(error),
                        email: mailRecipients,
                    }];
            }
            return [2 /*return*/];
        });
    });
};
exports.sendMail = sendMail;
var prepareMail = function (_a) {
    var mailRecipients = _a.mailRecipients, mailSubject = _a.mailSubject, mailBody = _a.mailBody, senderName = _a.senderName, senderEmail = _a.senderEmail;
    return __awaiter(void 0, void 0, void 0, function () {
        var _sendMail;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.sendMail)({
                        senderName: senderName,
                        senderEmail: senderEmail,
                        mailRecipients: mailRecipients,
                        mailSubject: mailSubject,
                        mailBody: mailBody,
                    })];
                case 1:
                    _sendMail = _b.sent();
                    return [2 /*return*/, { status: _sendMail.status, message: _sendMail.message }];
            }
        });
    });
};
exports.prepareMail = prepareMail;
