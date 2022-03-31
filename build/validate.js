"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
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
    }
};
exports.default = validate;
