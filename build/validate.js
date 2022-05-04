"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var utility_1 = require("./Helpers/utility");
var validate = function (method) {
    switch (method) {
        case '/register': {
            return [
                (0, express_validator_1.body)('firstName').not().isEmpty().isString().withMessage('firstName is required!'),
                (0, express_validator_1.body)('lastName').not().isEmpty().isString().withMessage('lastName is required!'),
                (0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('Email is required!'),
                (0, express_validator_1.body)('password').not().isEmpty().isString().withMessage('Password is required!'),
                (0, express_validator_1.body)('phone').not().isEmpty().withMessage('Phone is required!'),
                (0, express_validator_1.body)('phone').isNumeric().withMessage('Phone number must be a number!'),
                (0, express_validator_1.body)('role').optional().isString().withMessage('role is required'),
                (0, express_validator_1.body)('walletbalance').optional().isFloat().withMessage('wallet cannot be null')
            ];
        }
        case '/login': {
            return [
                (0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('Email is required!'),
                (0, express_validator_1.body)('password').not().isEmpty().isString().withMessage('Password is required!'),
            ];
        }
        case '/update-user-settings': {
            return [(0, express_validator_1.body)('twoFa').not().isEmpty().isBoolean().withMessage('2fa is required and must be boolean!')];
        }
        case '/update-password': {
            return [
                (0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('Email is required!'),
                (0, express_validator_1.body)('oldPassword').not().isEmpty().isString().withMessage('Old password is required!'),
                (0, express_validator_1.body)('newPassword').not().isEmpty().isString().withMessage('New password is required!'),
            ];
        }
        case '/reset-password': {
            return [(0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('Email is required!')];
        }
        case '/change-password': {
            return [
                (0, express_validator_1.body)('token').not().isEmpty().isString().withMessage('token is required!'),
                (0, express_validator_1.body)('password').not().isEmpty().isString().withMessage('password is required!'),
            ];
        }
        case '/verify-otp': {
            var validType_1 = ['verification', 'reset', '2fa'];
            return [
                (0, express_validator_1.body)('token').not().isEmpty().isString().withMessage('token is required!'),
                (0, express_validator_1.body)('email').not().isEmpty().isString().withMessage('email is required!'),
                (0, express_validator_1.body)('type')
                    .not()
                    .isEmpty()
                    .custom(function (value) {
                    return validType_1.includes(value);
                })
                    .withMessage("type can only include ".concat(validType_1)),
                (0, express_validator_1.body)('otp')
                    .not()
                    .isEmpty()
                    .custom(function (value) {
                    return Number(value);
                })
                    .withMessage('otp is required!'),
            ];
        }
        case '/pay': {
            return (0, utility_1.successResponse)(200, "Transaction successful");
        }
        case 'id': {
            return [(0, express_validator_1.param)('id').isInt().withMessage('ID must be a number!')];
        }
    }
};
exports.default = validate;
