var styles = require('./index.css');
var findRoots = require('durand-kerner');

function parseInput(text) {
    var poly = text.replace(/\^(\d)+/g, '<sup>$1</sup>');
    var p = document.querySelector('#polynomial');
    p.innerHTML = poly;
}

function getMaxOfArray(arr) {
    return Math.max.apply(null, arr);
}

function getCoefficients(text) {
    var p = '-5x^4+3x^2-x-9';
    var formattedP = p.replace(/([+-])/g, ' $1');
    var parts = formattedP.split(' ').filter(function (item, index) {
        return item.length > 0;
    });
    var pairs = [];
    parts.forEach(function (part, index) {
        var pattern1 = /^([+-]\d+)x\^(\d)+$/;
        var pattern2 = /^([+-]\d+)x$/;
        var pattern3 = /^([+-]\d+)$/;
        let coefficient, power = null;
        if (pattern1.test(part)) {
            let match = part.match(pattern1);
            coefficient = match[1];
            power = match[2];
        } else if (pattern2.test(part)) {
            let match = part.match(pattern2);
            coefficient = match[1];
            power = 1;
        } else if (pattern3.test(part)) {
            coefficient = part;
            power = 0;
        }
        if (coefficient !== null && power !== null) {
            pairs.push({ c: coefficient, p: power });
        }
    });
    var completePaires = [];
    var maxPower = getMaxOfArray(pairs.map((pair, index) => pair.p));
    var coefficients = [];
    for (let i = 0; i <= maxPower; i++) {
        let pairWithPowerI = pairs.filter((pair, index) => pair.p === i);
        if (pairWithPowerI) {
            coefficients.push(pairWithPowerI.c);
        }else{
            coefficients.push(0);
        }
    }
    return coefficients;
}

var input = document.querySelector("#input");
input.onkeyup = function () {
    var text = this.value;
    parseInput(text);
}

var solveBtn = document.querySelector("#solveBtn");
solveBtn.onclick = function () {
    var roots = findRoots([-4, 0, 1]);
    console.log(roots);
}