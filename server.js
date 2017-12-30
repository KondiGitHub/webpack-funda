var Hapi = require('hapi');
var path = require('path');
const Webpack = require('webpack');
const Config = require('./webpack.config.js');

const host = 'localhost';
const port = 8000;
var server = new Hapi.Server();

server.connection({
    host,
    port
});

const compiler = Webpack(Config);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    host,
    port,
    historyApiFallback: true,
    publicPath: Config.output.publicPath,
    headers: {"X-Custom-Webpack-Header": "YES"}
});

server.ext('onRequest', function(request, reply) {

    devMiddleware(request.raw.req, request.raw.res, (err) => {

        if (err) {
            return reply(err);
        }
        reply.continue();
    });
});
server.register({
    register: require('vision'),
    once: true
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: './views'
});

// Non Api Routes
server.route({
    path: "/",
    method: "GET",
    handler: function (request,reply) {
        reply.view('index',{title: 'Basic Express App'});
    }
});


server.start(function (err) {
    if(err) {
        console.log("Sorry error");
    }
    console.log("server started on port "+server.info.port);

});