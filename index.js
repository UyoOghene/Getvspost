const express = require('express'); 
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuidv4(),
        username: 'james',
        comment: 'hi, im james' },
    { 
        id: uuidv4(),
        username: 'brownn',
        comment: 'hi, im james brown' },
    { 
        id: uuidv4(),
        username: 'bond',
        comment: 'hi, im james bond' },
    { 
        id: uuidv4(),
        username: 'lebron',
        comment: 'hi, im lebron james' }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});


app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
  const comment =  comments.find(c => c.id === id);
    res.render('comments/show', {comment});
});


app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment,id: uuidv4() });
    console.log(req.body); 
    res.redirect('/comments'); 
    // res.send('worked')
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment =  comments.find(c => c.id === id);
    res.render('comments/edit', {comment});

})

// app.patch('/comments/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(req.body.comment)
//     res.send('goooo')
//   const comment =  comments.find(c => c.id === id);
//     res.send('comments/show', {comment});
// });

app.delete('/comments/:id',(req,res) =>{
    const {id} = req.params;
       comments =  comments.filter(c => c.id !== id);
       res.redirect('/comments')

})

app.patch('/comments/:id',(req,res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

// app.patch('/comments/:id',(req,res) => {
//     res.send('update')
// })

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
