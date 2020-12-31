import bodyParser from 'body-parser';
import app from './App'
import routes from '../src/routes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

routes({ app })

app.listen(port, (): void => {
  return console.log(`server is listening on ${port}`)
})