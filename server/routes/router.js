import { Router } from 'express';
import products from './products';
import users from './users'

const router = Router();

router.use('/api/v1', products);

router.use('/api/v1', users);


export default router;