import bodyParser from 'body-parser';
import app from './App'
import routes from '../src/routes';
import { serviceConfigs } from './config/config';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = serviceConfigs.port;

routes({ app });

app.listen(port, (): void => {
  return console.log(`server is listening on ${port}`)
})