import { Router } from 'express';
import products from './products';
import users from './users'
import carts from './carts'

const router = Router();

router.use('/api/v1', products);

router.use('/api/v1', users);

router.use('/api/v1', carts);


export default router;