import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';
import CartController from '../controller/cartController';

const router = Router();

router.put('/carts',
    auth.verifyToken,
    CartController.addToCart
);

router.get('/carts',
    auth.verifyToken,
    CartController.getCart
);

router.delete('/carts',
    auth.verifyToken,
    CartController.deleteCartItem
);


export default router;