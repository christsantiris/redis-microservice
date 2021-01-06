import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express'
import app from './App'
import routes from '../src/routes';
import authRoutes from './routes/auth-routes';
import { serviceConfigs } from './config/config';
import DbService from './services/db.service';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

const port = serviceConfigs.port;

routes({ app });
authRoutes({ app });

const dbService = new DbService();

app.listen(port, async(): Promise<void> => {
  console.log(`server is listening on ${port}`)
  await dbService.createMongoConnection();
})