var path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const compiler = webpack(config);

const serverOptions = {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    stats: {
        chunks: false,
        colors: true,
        hash: false,
        reasons: true,
        timings: true,
        version: false,
        warnings: true
    }
};

const server = new webpackDevServer(compiler, serverOptions);

server.listen(8080, () => {
    console.log('now listening http://localhost:8080');
});
