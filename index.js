`use strict`;

const Hapi = require('hapi');
const Inert = require('inert');
const Joi = require('joi');


//Create Server
const server = Hapi.server({
    host: 'localhost',
    port: 8080,
    routes: { cors: true }
});

const provision = async () => {

    await server.register(Inert);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};
provision();



//Add Route to Server Requests
//#1
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return "Backend Services: Server is Online";
    }
});



//#2 Static Files
server.route({
    method: 'GET',
    path: '/download/{param*}',
    handler: {
        directory: {
            path: './public',
        }
    }
});

server.route({
    method: 'GET',
    path: '/download',
    handler: function (request, h) {
        return h.file('./public/download.html');
    }
});

server.route({
    method: 'GET',
    path: '/form',
    handler: function (request, h) {
        return h.file('./jsonDB.json');
    }
});


server.route({
    method: 'GET',
    path: '/joi/{name}',
    options: {
        validate: {
            params: {
                name: Joi.string().min(3).max(10)
            }
        }
    },
    handler: function (request) {
        return `Hello ${request.params.name}!`;    }
});

