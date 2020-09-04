const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./api/routes')
const port = process.env.PORT || 5000;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true , })) 

app.use('/api', routes)

app.listen(port, () => {
    console.log('server is listening on port ', port)
})