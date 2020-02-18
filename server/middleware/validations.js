import { body, sanitizeBody, param, query, validationResult } from 'express-validator';


const validateLogin = [
    body('email')
        .exists()
        .withMessage('A valid email must be provided.')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .exists()
        .withMessage('User password must be provided.')
        .isLength({ min: 5 })
        .withMessage('Password should have a minimum of 5 characters')
        .custom(value => {
            if (value !== undefined) {
                let val = value.trim();
                return val.length > 4;
            };
        })
        .withMessage('Password must have a minimum of 5 characters'),
];

const validateSignup = [
    body(['firstName', 'lastName'])
        .exists()
        .withMessage('Name fields cannot be empty')
        .isString()
        .isLength({ min: 3 })
        .withMessage('First name and last name must have a minimun of three(3) letters')
        .custom(value => {
            if (value !== undefined) {
                let val = value.replace(/\s+/g, '').trim();
                return val.length > 2;
            };
        })
        .withMessage('Name fields must have a minimum of three(3) letters'),
    validateLogin[0],
    validateLogin[1],
    body('isAdmin')
        .exists()
        .withMessage('Admin field cannot be empty')
        .isBoolean()
];

const validateId = [
    param('id')
        .exists()
        .withMessage('Provide an id')
        .isInt({ min: 1 })
        .withMessage('Id must be a positive integer not less than 1')
];

const validatePasswordUpdate = [
    validateId[0],
    body('oldPassword')
        .exists()
        .withMessage('User password must be provided.')
        .isLength({ min: 5 })
        .withMessage('Password should have a minimum of 5 characters')
        .custom((oldPassword, { req }) => {
            if ((oldPassword && req.body.newPassword) && oldPassword.length >= 5) {
                return oldPassword !== req.body.newPassword;
            }
        })
        .withMessage('New password cannot be the same as old password')
        .custom(value => {
            if (value !== undefined) {
                let val = value.trim();
                return val.length > 4;
            };
        })
        .withMessage('Password must have a minimum of 5 characters'),


    body('newPassword')
        .exists()
        .withMessage('New password must be provided.')
        .isLength({ min: 5 })
        .withMessage('New password should have a minimum of 5 characters')
        .custom(value => {
            if (value !== undefined) {
                let val = value.trim();
                return val.length > 4;
            };
        })
        .withMessage('Password must have a minimum of 5 characters')

];

const validateNewProduct = [
    body('name')
        .exists()
        .withMessage('Product name cannot be empty')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Product name must be at least 2 letters long')
        .custom(value => {
            if (value !== undefined) {
                let val = value.replace(/\s+/g, '').trim();
                return val.length > 1;
            };
        })
        .withMessage('Product\'s name must have a minimum of 2 letters'),


    body('description')
        .exists()
        .withMessage('Product description must be provided')
        .isLength({ min: 10 })
        .withMessage('Product description must not have less than ten(10) letters')
        .custom(value => {
            if (value !== undefined) {
                let val = value.replace(/\s+/g, '').trim();
                return val.length > 9;
            };
        })
        .withMessage('Product\'s description must have a minimum of 10 letters')
        .escape(),


    body('category')
        .exists()
        .withMessage('Product category must be provided')
        .custom(value => {
            if (value !== undefined) {
                let val = value.replace(/\s+/g, '').trim();
                return val.length > 1;
            };
        })
        .withMessage('Product\'s category must have a minimum of 2 letters'),


    body('price')
        .exists()
        .withMessage('Product price must be provided')
        .isFloat({ min: 1.0 })
        .withMessage('Product price must be decimal number of 1.0 or more'),


    body('imageUrl')
        .exists()
        .withMessage('Product\'s image must be provided')
        .custom(imageUrl => {
            const checkUrl = /(http(s?):(\/){2})([^/])([/.\w\s-])*\.(?:jpg|gif|png)/g;
            return checkUrl.test(imageUrl);
        })
        .withMessage('Product image input should be a valid image url')

];

const validateProductUpdate = [
    validateId[0],
    validateNewProduct[0].optional(),
    validateNewProduct[1].optional(),
    validateNewProduct[2].optional(),
    validateNewProduct[3].optional(),
    validateNewProduct[4].optional()
];

const validateAddToCart = [
    body('productId')
        .exists()
        .withMessage('Provide an id')
        .isInt({ min: 1 })
        .withMessage('Id must be a positive integer not less than 1')
];


const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    } else {
        next();
    }
};

const validator = {
    validateLogin,
    validateSignup,
    validatePasswordUpdate,
    validateId,
    validateNewProduct,
    validateProductUpdate,
    validateAddToCart,
    validationHandler
};

export default validator;