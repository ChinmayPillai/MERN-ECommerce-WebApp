const Redis = require('ioredis');

const client = new Redis(
    {
        host: 'redis',
        port: 6379,
    }
);

module.exports = client;