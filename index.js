//Nodestock demo app.

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const path = require('path');
const exphbs = require('express-handlebars');
const apirequest = require('request');
const bodyParser = require('body-parser');

//API Key pk_cc212abd06dd467fa5d14f7ec402f50b 
/*apirequest('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_cc212abd06dd467fa5d14f7ec402f50b', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    
    if(res.statusCode === 200){
        console.log(body);
    }
});
*/

function call_api(ProcessedAPI, stockTicker){
    if (stockTicker == undefined) {stockTicker = 'fb'}
    var uri = 'https://cloud.iexapis.com/stable/stock/'+stockTicker+'/quote?token=pk_cc212abd06dd467fa5d14f7ec402f50b';
    console.log(uri);
    apirequest(uri, { json: true }, (err, res, body) => {
    if (err) { Console.log(err); }
    
    if(res.statusCode === 200){
        ProcessedAPI(body);
    }

    return '';
});
}
app.use(bodyParser.urlencoded({extended: false}));

//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebars routes
app.get('/',function(req,res) {
    console.log("->s")
    call_api(function(apiResult) {
        console.log("->c");
        res.render('home', { stock: apiResult });
    });
    console.log("->d")
});

//Set handlebars routes
app.post('/',function(req,res) {
    console.log("->s")
    call_api(function(apiResult) {
        console.log("->c");
        //inputStockTicker = req.body.stock_ticker
        //res.render('home', { stock: apiResult, posted_stuff: inputStockTicker });
        res.render('home', { stock: apiResult });
    }, req.body.stock_ticker);
    console.log(req.body.stock)
    console.log("->d")
});

app.get('/about.html',function(req,res){
    res.render('about');
});


//Let express reach the 'public' folder for static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => console.log('Server is listening on port: '+PORT));
