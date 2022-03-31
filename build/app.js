"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var configTypes_1 = __importDefault(require("./Configs/configTypes"));
var routes_1 = __importDefault(require("./routes"));
// Initialising app
var app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
// Server setup
app.listen(configTypes_1.default.PORT, function () { return console.log("Server listening on port ".concat(configTypes_1.default.PORT)); });
app.use(routes_1.default);
