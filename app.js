const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const morgan = require('morgan');

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'developer') app.use(morgan('dev'))
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err });
});

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }});
});

const listener = () => {
  console.log(`Listening on port ${port}!`);
}

app.listen(port, listener);
