const Nightmare = require('nightmare');

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36";

function Crawler() { }

Crawler.prototype.getTaobaoIndexImgs = function (complete) {
    const nightmare = Nightmare({
        show: true,
        waitTimeout: 60000,
    });
    nightmare
        .useragent(userAgent)
        .goto("https://www.taobao.com/")
        .viewport(1280, 800)
        .scrollTo(1000, 0)
        .wait(500)
        .scrollTo(2000, 0)
        .wait(500)
        .scrollTo(3000, 0)
        .wait(500)
        .scrollTo(4000, 0)
        .wait(500)
        .scrollTo(5000, 0)
        .wait(500)
        .scrollTo(6000, 0)
        .wait(500)
        .scrollTo(7000, 0)
        .wait(500)
        .scrollTo(8000, 0)
        .wait(500)
        .scrollTo(9000, 0)
        .wait(500)
        .scrollTo(10000, 0)
        .wait(500)
        .scrollTo(11000, 0)
        .wait(500)
        .scrollTo(12000, 0)
        .wait(500)
        .scrollTo(13000, 0)
        .wait(500)
        .evaluate(() => {
            var imgs = document.querySelectorAll('img');
            var srcs = [];
            imgs.forEach((img) => {
                if (img.src.length > 1) {
                    srcs.push({ src: img.src });
                }
            });
            return srcs;
        })
        .end()
        .then((srcs) => {
            complete(srcs);
        })
}

Crawler.prototype.getJDBikeImgs = function (complete) {
    const nightmare = Nightmare({
        show: true,
        waitTimeout: 60000,
    });
    nightmare
        .goto('https://www.jd.com/')
        .viewport(1280, 800)
        .type('#key', '自行车')
        .click('.photo-search-btn+button')
        .wait('#J_goodsList')
        .scrollTo(1000, 0)
        .wait(500)
        .scrollTo(2000, 0)
        .wait(500)
        .scrollTo(3000, 0)
        .wait(500)
        .scrollTo(4000, 0)
        .wait(500)
        .scrollTo(5000, 0)
        .wait(500)
        .scrollTo(6000, 0)
        .wait(500)
        .scrollTo(7000, 0)
        .wait(500)
        .scrollTo(8000, 0)
        .wait(500)
        .scrollTo(9000, 0)
        .wait(500)
        .scrollTo(10000, 0)
        .wait(500)
        .evaluate(() => {
            var imgs = document.querySelectorAll('#J_goodsList .gl-item .p-img img');
            var srcs = [];
            imgs.forEach((img) => {
                if (img.src.length > 1) {
                    srcs.push({ src: img.src });
                }
            });
            return srcs;
        })
        .end()
        .then((srcs) => {
            complete(srcs);
        })
}

module.exports = Crawler;