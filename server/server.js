const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('../webpack.config.js');

const isProd = process.env.NODE_ENV === 'production';
const port = 3000;
const app = express();

if(isProd) {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} else {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(middleware);
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
    res.end();
  });
}

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port);
});
