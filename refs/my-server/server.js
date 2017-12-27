const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const Crawler = require('./src/services/crawler');

const app = express();
const port = 3000;

//set layout
app.engine('.hbs', exphbs({
    // defaultLayout: path.join(__dirname, 'src/views/layouts/main.hbs'),
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'src/views/layouts')
}));

//set view engine
app.set('view engine', '.hbs');

//set views path
app.set('views', path.join(__dirname, 'src/views'));

//set static files root
app.use(express.static('src/assets'));

//render start crawler view
app.get('/startCrawler', (request, response) => {
    response.render('startCrawler', {});
});

app.use(express.static(path.join(__dirname, 'src/css/shares')));

//render taobao index images view
app.get('/taobaoIndexImgs', (request, response) => {
    const crawler = new Crawler();
    crawler.getTaobaoIndexImgs(function (srcs) {
        response.render('taobaoIndexImgs', {
            srcs: srcs
        });
    });
});

//render JD bike images view
app.get('/jdBikesImgs', (request, response) => {
    const crawler = new Crawler();
    crawler.getJDBikeImgs(function (srcs) {
        response.render('jdBikesImgs', {
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