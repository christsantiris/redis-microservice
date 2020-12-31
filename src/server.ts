import bodyParser from 'body-parser';
import app from './App'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

app.listen(port, (): void => {
  return console.log(`server is listening on ${port}`)
})