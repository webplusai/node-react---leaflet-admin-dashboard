require('../server.babel'); // babel registration (runtime transpilation for node)

const Express = require('express');
const webpack = require('webpack');
const path = require('path');

const config = require('../config');
const webpackConfig = require('./dev.config');
const compiler = webpack(webpackConfig);

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true }
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> 🚧  Webpack development server listening on port ${port}`);
  }
});
