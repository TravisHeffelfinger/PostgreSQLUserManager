const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const routes = require('./api/routes')
const port = process.env.PORT || 5000;

app.use(cors())


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(express.json())
app.use(express.urlencoded({ extended: true , })) 

app.use('/api', routes)

app.listen(port, () => {
    console.log('server is listening on port ', port)
})