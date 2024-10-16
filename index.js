const express = require('express'); 
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    { username: 'james', comment: 'hi, im james' },
    { username: 'brownn', comment: 'hi, im james brown' },
    { username: 'bond', comment: 'hi, im james bond' },
    { username: 'lebron', comment: 'hi, im lebron james' }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    console.log(req.body); 
    res.redirect('/comments'); 
    // res.send('worked')
});

app.get('/tacos', (req, res) => {
    res.send('Get/tacos response');
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send({ meat, qty });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});
