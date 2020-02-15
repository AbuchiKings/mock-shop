import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';
import CartController from '../controller/cartController';

const router = Router();

router.put('/carts',
    //auth.verifyToken,
    CartController.addToCart
);
// router.put('/carts',
//    // auth.verifyToken,
//     //auth.verifyAdmin,
//     CartController.createCart
// );
// router.put('/carts',
//    // auth.verifyToken,
//     //auth.verifyAdmin,
//     CartController.createCart
// );
// router.put('/carts',
//    // auth.verifyToken,
//     //auth.verifyAdmin,
//     CartController.createCart
// );

export default router;