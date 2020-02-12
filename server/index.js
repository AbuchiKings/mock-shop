import express from 'express';
import cors from 'cors';
// import router from './routes/router';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// app.use(router);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.log(err);
});

export default app;
