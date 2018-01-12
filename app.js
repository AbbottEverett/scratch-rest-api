const express = require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const foodsRouter = require('./src/routes/foods');

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'developer') app.use(morgan('dev'))
app.use(bodyParser.json());

app.use('/foods', foodsRouter);

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

module.exports = app;
