import express from 'express';
import cors from 'cors';
import router from './routes/router';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';


const app = express();
const port = process.env.PORT || 5000;
const apiDoc = YAML.load(path.join(process.cwd(), './server/docs/api-docs.yaml'));


app.use(cors());

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

app.use(router);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({ status: err.status, message: err.message });
  next();
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});


export default app;