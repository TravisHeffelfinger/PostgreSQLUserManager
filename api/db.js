const pg = require('pg')

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/deq69vd4hv1oa2',
    ssl: process.env.DATABASE_URL ? true : false
});
client.connect();

module.exports = client;