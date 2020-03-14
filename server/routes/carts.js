import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/auth';
import CartController from '../controller/cartController';

const router = Router();

router.put('/cart',
  auth.verifyToken,
  validator.validateAddToCart,
  validator.validationHandler,
  CartController.addToCart);

router.get('/cart',
  auth.verifyToken,
  CartController.getCart);

router.delete('/cart/:id',
  auth.verifyToken,
  validator.validateId,
  validator.validationHandler,
  CartController.deleteCartItem);


export default router;
