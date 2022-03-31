import { body, param } from 'express-validator';

const validate = (method: string): any => {
    switch (method) {
        case '/register': {
            return [
                body('firstName').not().isEmpty().isString().withMessage('firstName is required!'),
                body('lastName').not().isEmpty().isString().withMessage('lastName is required!'),
                body('email').not().isEmpty().isString().withMessage('Email is required!'),
                body('password').not().isEmpty().isString().withMessage('Password is required!'),
                body('phone').not().isEmpty().withMessage('Phone is required!'),
                body('phone').isNumeric().withMessage('Phone number must be a number!'),
                body('role').optional().isString().withMessage('role is required'),
                body('walletbalance').optional().isFloat().withMessage('wallet cannot be null')
            ];
        }
    }
}
export default validate