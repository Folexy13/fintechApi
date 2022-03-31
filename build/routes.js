"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
var express_1 = require("express");
var validate_1 = __importDefault(require("./validate"));
var authentications_1 = require("./Controllers/authentications");
var router = (0, express_1.Router)();
// *******  API CALLS  ********
//Index to show our api is working
router.get('/', function (req, res) { return res.json({ message: 'Api is working' }); });
//Endpoints
router.post('/register', (0, validate_1.default)('/register'), authentications_1.register);
exports.default = router;
