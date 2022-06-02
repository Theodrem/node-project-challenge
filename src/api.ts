import Express from "express";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from './routes/routes';

const PORT = process.env.PORT || 5050;

const app = Express();

RegisterRoutes(app);

app.use(Express.static("public"));
app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.listen(PORT,
  () => {
    console.info("API Listening on port " + PORT);
  }
);
