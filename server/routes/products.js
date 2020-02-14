import { Router } from 'express';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';
import ProductController from './../controller/productController';

const router = Router();

router.post('/products',
    auth.verifyToken,
    auth.verifyAdmin,
    ProductController.createProduct
);

router.patch('/products/:id',
    auth.verifyToken,
    auth.verifyAdmin,
    ProductController.updateProduct
);

router.get('/products',
    auth.verifyToken,
    ProductController.getAllProducts
);
router.get('/products/:id',
    auth.verifyToken,
    ProductController.getProduct
);

router.delete('/products/:id',
    auth.verifyToken,
    auth.verifyAdmin,
    ProductController.deleteProduct
);

export default router; 