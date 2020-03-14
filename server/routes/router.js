import { Router } from 'express';
import products from './products';
import users from './users';
import carts from './carts';

const router = Router();

router.use('/api/v1', products);

router.use('/api/v1', users);

router.use('/api/v1', carts);

router.all('*', (req, res) => {
  res.status(404).json({ message: 'This route does not exist.' });
});


export default router;
