import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/auth';
import ProductController from '../controller/productController';

const router = Router();

router.post('/products',
  auth.verifyToken,
  auth.verifyAdmin,
  validator.validateNewProduct,
  validator.validationHandler,
  ProductController.createProduct);

router.patch('/products/:id',
  auth.verifyToken,
  auth.verifyAdmin,
  validator.validateProductUpdate,
  validator.validationHandler,
  ProductController.updateProduct);

router.get('/products',
  auth.verifyToken,
  ProductController.getAllProducts);
  
router.get('/products/:id',
  auth.verifyToken,
  validator.validateId,
  validator.validationHandler,
  ProductController.getProduct);

router.delete('/products/:id',
  auth.verifyToken,
  auth.verifyAdmin,
  validator.validateId,
  validator.validationHandler,
  ProductController.deleteProduct);

export default router;
