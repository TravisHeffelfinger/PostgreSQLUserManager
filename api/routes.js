const express = require('express')
const router = express.Router();
const client = require('./db')

router.get('/', (req, res) => {
    res.render('index') 
})

router.post('/add-student', (req, res) => {
    client.query('insert into students (first_name, last_name, email, age) values ($1, $2, $3, $4) returning *', [req.body.firstname, req.body.lastname, req.body.email, req.body.age], (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})

router.get('/search', (req, res) => {
    res.send('search')
})
router.post('/edit-student/:name', (req, res) => {
    let name = req.params.name;
    client.query('')
})
router.get('/students', (req, res) => {
    client.query('select * from students', (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})

router.get('/students/:name', (req, res) => {
    let name = req.params.name;
    client.query('select * from students where first_name = $1', [name], (err, result) => {
        if(err) console.log(err)
        console.log(result.rows)
        res.send(result.rows)
    })
})

module.exports = router;