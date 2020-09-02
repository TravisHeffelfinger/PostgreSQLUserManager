const express = require('express')
const app = express()
const path = require("path");
const routes = require('./api/routes')
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true , })) 

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "views")));
app.use('/api', routes)

app.listen(port, () => {
    console.log('server is listening on port ', port)
})