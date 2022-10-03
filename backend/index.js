const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');
// const logger = require('./middleware/logger');

// initializing the middleware function
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

// setting public a static folder 

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})) 

// homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App', 
    members: 
}));

// app.get('/', (req, res) => { 
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// for most files we're taking two parameters, a path and a callback function