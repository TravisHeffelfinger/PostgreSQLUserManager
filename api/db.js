const pg = require('pg')

const connectionString = 'postgres://brdogkwafzbmzy:4150ebbb93240739ebbfcb459f671bd1fe2a4c1ff0d769126506e686005b49e1@ec2-184-72-162-198.compute-1.amazonaws.com:5432/deq69vd4hv1oa2';

const client = new pg.Client(connectionString);
client.connect();

module.exports = client;