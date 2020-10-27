const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const routes = require('./api/routes')
const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true , })) 

app.use('/api', routes)
app.use(express.static(path.join(__dirname, 'postgres-demo-client/build')));

app.listen(port, () => {
    console.log('server is listening on port ', port)
})