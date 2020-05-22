const assert = require('assert');

const server = require('../server');

const Wreck = require('@hapi/wreck').defaults({
    baseUrl: `http://localhost:${process.env.PORT}`
});

