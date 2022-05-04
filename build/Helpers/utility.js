"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpValidity = exports.addMinutesToDate = exports.generateOtp = exports.fnResponse = exports.errorResponse = exports.successResponse = exports.handleResponse = void 0;
var handleResponse = function (res, statusCode, status, message, data) {
    return res.status(statusCode).json({
        status: status,
        message: message,
        data: data,
    });
};
exports.handleResponse = handleResponse;
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
var fnResponse = function (_a) {
    var status = _a.status, message = _a.message, data = _a.data;
    return { status: status, message: message, data: data };
};
exports.fnResponse = fnResponse;
var generateOtp = function () {
    return Math.floor(Math.random() * 999999 + 1);
};
exports.generateOtp = generateOtp;
var addMinutesToDate = function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
};
exports.addMinutesToDate = addMinutesToDate;
var otpValidity = function (a, b) {
    if (a.getTime() > b.getTime())
        return true;
    return false;
};
exports.otpValidity = otpValidity;
