const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text =>  text.toUpperCase());
app.set('view engine','hbs');


// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name : 'Garber',
//         likes : [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) =>{
        err? console.log('Unable to append to server.log'): null;
    });
    next();
});

// app.use((req,res,next)=> {
//     res.render('maintenace.hbs');
// }); o resto abaixo não será executado

app.use(express.static(__dirname+'/public'));


app.get('/',(req,res)=> {
    res.render('home.hbs',{
        pageTitle : 'Home',
        welcomeMessage : 'Welcome, are you ok?'
    });
});

app.get('/about',(req,res)=> {
    // res.send('<h1>About Page<h1>');
    res.render('about.hbs',{
        pageTitle : 'About Page',
    });
});

app.get('/bad',(req,res) => {
    //res.send('<h1 style="color:red">Bad Request</h1>');
    res.send({
        errorMessage : 'Errou'
    });
});


app.listen(3000, () => {
    console.log('Server is up!!!')
    console.log('port 3000')
}); // port 3000