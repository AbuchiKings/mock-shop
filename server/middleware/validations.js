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
];

const validateSignup = [
    body(['firstName', 'lastName'])
        .exists()
        .withMessage('Name fields cannot be empty')
        .isString()
        .isLength({ min: 3 })
        .withMessage('First name and last name must have a minimun of three(3) characters'),
    sanitizeBody(['firstName', 'lastName'])
        .customSanitizer(value => {
            if (value) return value.replace(/\s+/, '').trim();
        }),
    validateLogin[0],
    validateLogin[1],
    body('isAdmin')
        .exists()
        .optional()
        .isBoolean()
];

const validatePasswordUpdate = [
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
        .withMessage('New password cannot be the same as old password'),

    body('newPassword')
        .exists()
        .withMessage('New password must be provided.')
        .isLength({ min: 5 })
        .withMessage('New password should have a minimum of 5 characters')

];

const validateId = [
    param('id')
        .exists()
        .withMessage('Provide an id')
        .isInt({ min: 1 })
        .withMessage('Id must be a positive integer not less than 1')
];


const validateNewProduct = [
    body('name')
        .exists()
        .withMessage('Product name cannot be empty')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Product name must be at least 2 letters long'),
    sanitizeBody('name').customSanitizer(value => value.replace(/\s{2,}/g, ' ').trim()),
    body('description')
        .exists()
        .withMessage('Product description must be provided')
        .isLength({ min: 10 })
        .withMessage('Product description must not have less than ten(10) characters')
        .trim()
        .escape(),
    body('category')
        .exists()
        .withMessage('Product category must be provided')
        .notEmpty()
        .withMessage('Category field cannot be empty'),
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

// const validateProductUpdate = [
//     validateId[0],
//     validateNewProduct[0].optional(),
//     validateNewProduct[1].optional(),
//     validateNewProduct[2].optional(),
//     validateNewProduct[3].optional(),
//     validateNewProduct[4].optional(),
//     validateNewProduct[5].optional(),
// ];

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
   // validateProductUpdate,
    validateAddToCart,
    validationHandler
};

export default validator;