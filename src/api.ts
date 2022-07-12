import 'dotenv/config';
import cors from 'cors'
import bodyParser from 'body-parser';
import Express from 'express';
import swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';

const PORT = process.env.PORT || 5050;
const app = Express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*'
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

RegisterRoutes(app);

app.use(Express.static('public'));
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
)

app.listen(PORT, () => {
  console.info(`API Listening on port ${PORT}`);
})
