const assert = require('assert');

const server = require('../server');

// import wreck for use api
const Wreck = require('@hapi/wreck').defaults({
    baseUrl: `http://localhost:${process.env.PORT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});


// Create class for use token générated by login
class Token {
    constructor() {
        this.token = 'Bearer ';
    }

    setToken = (token) => {
        this.token = this.token + token;
    }
}

// Before, i test status code route login 
describe('TEST LOGIN', () => {
    it('Access to login', async () => {

        const {
            res,
            payload
        } = await Wreck.post('/api/login');

        // I check status code 200
        assert.equal(res.statusCode, 200);

    });
});



// New type to test
describe('SAV CONNECT', () => {

    // Instance to Token
    let token = new Token();

    // Before i login into api
    before(async () => {
        const data = {
            payload: {
                mail: 'admin@admin.fr',
                password: 'Admin1234?',
            },
            json: true
        };

        const {
            res,
            payload
        } = await Wreck.post('/api/login', data)

        // I save token with class Token
        token.setToken(payload.token);
    });


    // New cat for TAG test
    describe('TAG', () => {

        // i save tag Id;
        let tagID = 0;

        // test all tags
        it('Return all tags', async () => {
            const data = {
                headers: {
                    'Authorization': token.token
                },
                json: true
            };

            Wreck.get('/api/tag', data)
                .then(res => {
                    assert(res.payload.toString(), 'string');
                });
        });

        // test add tag
        it('add tag', async () => {
            const data = {
                payload: {
                    title: 'test',
                    color: '#000000',
                },
                headers: {
                    'Authorization': token.token
                },
                json: true
            };

            Wreck.post('/api/tag/add', data)
                .then(res => {
                    tagID = res.payload.id;
                    assert.ok(res.payload);
                });
        });

        // test select one tag
        it('Select One tag', async () => {
            const data = {
                headers: {
                    'Authorization': token.token
                },
                json: true
            };

            Wreck.get('/api/tag/' + tagID, data)
                .then(res => {
                    assert.ok(res.payload);
                });
        });

    });


});