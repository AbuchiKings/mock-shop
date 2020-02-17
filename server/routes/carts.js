import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';
import CartController from '../controller/cartController';

const router = Router();

router.put('/cart',
    auth.verifyToken,
    CartController.addToCart
);

router.get('/cart',
    auth.verifyToken,
    CartController.getCart
);

router.delete('/cart/:id',
    auth.verifyToken,
    CartController.deleteCartItem
);


export default router;