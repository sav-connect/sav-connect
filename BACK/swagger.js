const pack = require('./package.json');


const swaggerOptions = {
    
    swagger: "2.0",
    info: {
        title: "savConenct Api Documentation",
        version: pack.version
    }

};

let options = {
    swaggerDefinition: {
        info: {
            description: 'API docs for savConnect',
            title: 'savConnect API',
            version: pack.version,
        },
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http'],
    },
    basedir: __dirname, //app absolute path
    files: ['./app/routes/**/*.js'] //Path to the API handle folder
};

module.exports = options;