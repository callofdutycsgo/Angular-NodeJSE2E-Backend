`use strict`;

const Hapi = require('hapi');
const Inert = require('inert');
const Joi = require('joi');
const Fs = require('fs');


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
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return "Backend Services: Server is Online";
    }
});



//Static Files
server.route({
    method: 'GET',
    path: '/download/{param*}',
    handler: {
        directory: {
            path: './public',
        }
    }
});

//File Handler
server.route({
    method: 'GET',
    path: '/download',
    handler: function (request, h) {
        return h.file('./public/download.html');
    }
});

//Responding with JSON Data
server.route({
    method: 'GET',
    path: '/getform',
    handler: function (request, h) {
        return h.file('./jsonDB.json');
    }
});

//Validations Using Joi
server.route({
    method: 'GET',
    path: '/joi/{name}',
    options: {
        validate: {
            params: {
                name: Joi.string().min(5).max(15)
            }
        }
    },
    handler: function (request) {
        return `Hello ${request.params.name}!. Welcome to the Resolute ${request.params.name}!`;
    }
});


server.route({
    method: 'POST',
    path: '/updateform',
    handler: function (request, h) {
        return h.file('./jsonDB.json');
    }
});





//ERROR Handler for 404
server.route({
    method: ['GET', 'POST', 'PUT'],
    path: '/{any*}',
    handler: (response, h) => {
        return h.response(`<img src="https://www.lifewire.com/thmb/OO7CD06NAdoIwv71DgUgBiTd4ps=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg" 
       style="width:100%;height:100%;">
`).code(404)
    }
})