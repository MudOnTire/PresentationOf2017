const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const Crawler = require('./services/crawler');

const app = express();
const port = 3000;

//set layout
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, 'views/layouts'),
}));

//set view engine
app.set('view engine', '.hbs');

//set views path
app.set('views', path.join(__dirname, 'views'));

//render crawler view
app.get('/', (request, response) => {
    const crawler = new Crawler();
    crawler.getTaobaoIndexImgs(function (srcs) {
        response.render('crawler', {
            srcs: srcs
        });
    });
});





app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send('Something broken!');
});