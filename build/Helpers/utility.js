"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
var successResponse = function (res, message, data) {
    if (message === void 0) { message = 'Operation successfull'; }
    return res.status(200).json({
        status: true,
        message: message,
        data: data,
    });
};
exports.successResponse = successResponse;
var errorResponse = function (res, message, data) {
    if (message === void 0) { message = 'An error occured'; }
    return res.status(400).json({
        status: false,
        message: message,
        data: data,
    });
};
exports.errorResponse = errorResponse;
