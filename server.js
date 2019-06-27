var express = require('express')
var path = require('path')
var session = require('express-session')
var app = express()
var port = 3000

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 

app.use(session({
    'secret': 'sijsh153t3ffef',
}));

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
var auth = (req,res,next)=>{
    if(req.session.isLogin){
        next();
    }else{
        res.redirect('/');
    }
}
app.post('/login',(req,res)=>{
    console.log(req.body);
    if(req.body.uname == 'Anand' && req.body.password == 'Temp'){
        req.session.isLogin = 'true';
        req.session.user = 'Anand112';
        res.redirect('/home');

    }else{
        res.redirect('/');
    }

})

app.get('/home',auth,(req,res)=>{
    console.log(req.session)
    res.send("Welcome \n<br/><a href='/logout'>Logout</a>")
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
app.listen(port , ()=>{console.log(`Listening on Port ${port}`)})