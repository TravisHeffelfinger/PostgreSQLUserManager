const pg = require('pg')

const connectionString = 'postgres://postgres:postgres@localhost:5432/dvdrental';

const client = new pg.Client(connectionString);
client.connect();

module.exports = client;