import { Router } from 'express';
import ProductController from '../controller/ProductController';
import validator from '../middleware/validations';
import auth from '../middleware/Auth';

const router = Router();

router.post(
    '/products',
    
);