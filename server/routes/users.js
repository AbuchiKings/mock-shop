import { Router } from 'express';
import UserController from '../controller/userController';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';

const router = Router();


router.post('/auth/signup',
    //validator.validateSignup,
    //validator.validationHandler,
    UserController.createUser
);

router.post('/auth/login',
    // validator.validateLogin,
    // validator.validationHandler,
    UserController.login
);


router.patch('/users/update-password/:id',
    auth.verifyToken,
    // validator.validatePasswordUpdate,
    // validator.validationHandler,
    UserController.updatePassword
);

router.delete('/users/:id',
    auth.verifyToken,
    UserController.deleteUser
);
export default router;