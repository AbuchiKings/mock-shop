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

router.get('/users/:id',
   // auth.verifyToken,
   // validator.validateId,
   // validator.validationHandler,
    UserController.getUserById
);

router.patch('/users/update-password',
    // auth.verifyToken,
    // validator.validatePasswordUpdate,
    // validator.validationHandler,
    UserController.updatePassword
);
export default router;