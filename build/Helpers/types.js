"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoles = exports.typeEnum = void 0;
var typeEnum;
(function (typeEnum) {
    typeEnum["VERIFICATION"] = "verification";
    typeEnum["RESET"] = "reset";
    typeEnum["TWOFA"] = "2fa";
})(typeEnum = exports.typeEnum || (exports.typeEnum = {}));
var AdminRoles;
(function (AdminRoles) {
    AdminRoles["CONTROL"] = "control";
    AdminRoles["SUPPORT"] = "support";
})(AdminRoles = exports.AdminRoles || (exports.AdminRoles = {}));
