const express = require('express')
const router = express.Router();
const client = require('./db')
const {v4: uuidv4} = require('uuid')

router.post('/add-student', (req, res) => {
    console.log(req.body)
    client.query('insert into students (student_id, first_name, last_name, email, age) values ($1, $2, $3, $4, $5) returning *', [ uuidv4(),req.body.first_name, req.body.last_name, req.body.email, req.body.age], (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})

router.post('/search', (req, res) => {
    console.log('search term: ', req.body.first)
    client.query('select * from students where first_name ~* $1',[`(^${req.body.first}.*)`], (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})
router.get('/edit-student/:id', (req, res) => {
    let id = req.params.id;
    client.query('select * from students where id like $1', [id], (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})

router.post('/update-student/:id', (req, res) => {
    console.log('this is the req.body from /update' , req.body)
     client.query(`update students set (first_name, last_name, email, age) = ($1, $2, $3, $4) where id = $5 returning *;`,
        [req.body.first_name, req.body.last_name, req.body.email, req.body.age, req.params.id],
         (err, result) => {
         if(err) console.log(err)
         res.send(result.rows)
    })
});

router.get('/students', (req, res) => {
    client.query('select * from students', (err, result) => {
        if(err) console.log(err)
        res.send(result.rows)
    })
})

router.post('/delete/:id', (req, res) => {
    let id = req.params.id
    client.query('delete from students where id = $1', [id], (err, result) => {
        if(err) console.log(err)
        console.log('user deleted')  
    })
    res.redirect('back')
})

router.get('/students/:check', (req, res) => {
    let check = req.params.check;
    if(check === 'ascending') {
        client.query('select * from students order by first_name asc')
        .then(response => {
            res.send(response.rows)
        }, reject => {
            console.log(reject)
            res.redirect('back')
        })
    } else if (check === 'descending') {
        client.query('select * from students order by first_name desc')
        .then(response => {
            res.send(response.rows)
        }, reject => {
            console.log(reject)
            res.redirect('back')
        })
    }
})

module.exports = router;