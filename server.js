require('./server.babel'); // babel registration (runtime transpilation for node)

const Express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config');
const router = require('./server/router');

const port = Number(config.port) || 3000;

const app = new Express();

mongoose.connect(config.mongodb, { auth: { authdb: 'admin' } });

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a+' }),
    skip: (req, res) => (res.statusCode >= 400) })
  );
  app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'log', 'error.log'), { flags: 'a+' }),
    skip: (req, res) => (res.statusCode < 400)
  }));
} else {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

router(app);

app.use(Express.static('public'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> Yelp server listening on port ${port}`);
  }
});
