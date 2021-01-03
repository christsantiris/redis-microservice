import bodyParser from 'body-parser';
import app from './App'
import routes from '../src/routes';
import { serviceConfigs } from './config/config';
import DbService from './services/db.service';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = serviceConfigs.port;

routes({ app });

const dbService = new DbService();

app.listen(port, (): void => {
  console.log(`server is listening on ${port}`)
  dbService.createMongoConnection();
})