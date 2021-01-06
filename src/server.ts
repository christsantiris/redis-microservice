import bodyParser from 'body-parser';
import app from './App'
import routes from '../src/routes';
import authRoutes from './routes/auth-routes';
import { serviceConfigs } from './config/config';
import DbService from './services/db.service';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = serviceConfigs.port;

routes({ app });
authRoutes({ app });

const dbService = new DbService();

app.listen(port, async(): Promise<void> => {
  console.log(`server is listening on ${port}`)
  await dbService.createMongoConnection();
})