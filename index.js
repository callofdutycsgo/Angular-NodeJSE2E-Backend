`use strict`;

const Hapi = require('hapi');
const Inert = require('inert');

//Create Server
const server = Hapi.server({
    host: 'localhost',
    port: 8080
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


