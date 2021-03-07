const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const path = require('path');
const exphbs = require('express-handlebars')

//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebars routes
app.get('/',function(req,res){
    res.render('home', {stuff: "This is stuff"});
});



//Let express reach the 'public' folder for static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => console.log('Server is listening on port: '+PORT));
