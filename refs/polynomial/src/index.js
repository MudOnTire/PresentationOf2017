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
    var formattedP = text.replace(/([+-])/g, ' $1');
    var parts = formattedP.split(' ').filter(function (item, index) {
        return item.length > 0;
    });
    var pairs = [];
    parts.forEach(function (part, index) {
        var pattern1 = /^([+-]?\d*)x\^(\d)+$/;
        var pattern2 = /^([+-]?\d*)x$/;
        var pattern3 = /^([+-]?\d+)$/;
        let coefficient = null;
        let power = null;
        if (pattern1.test(part)) {
            let match = part.match(pattern1);
            coefficient = match[1] === "" ? "1" : match[1];
            power = match[2];
        } else if (pattern2.test(part)) {
            let match = part.match(pattern2);
            coefficient = match[1] === "" ? "1" : match[1];
            power = 1;
        } else if (pattern3.test(part)) {
            coefficient = part;
            power = 0;
        }
        if (coefficient !== null && power !== null) {
            pairs.push({ c: Number(coefficient), p: Number(power) });
        }
    });
    // console.log(pairs);
    var maxPower = getMaxOfArray(pairs.map((pair, index) => pair.p));
    console.log('max power: ' + maxPower);
    var coefficients = [];
    for (let i = 0; i <= maxPower; i++) {
        (function (p) {
            let pairWithPowerI = pairs.filter((pair, index) => pair.p === p);
            // console.log(pairWithPowerI);
            if (pairWithPowerI.length === 1) {
                coefficients.push(pairWithPowerI[0].c);
            } else {
                coefficients.push(0);
            }
        })(i);
    }
    console.log(coefficients);
    return coefficients;
}

var input = document.querySelector("#input");
input.onkeyup = function () {
    var text = this.value;
    parseInput(text);
}

var solveBtn = document.querySelector("#solveBtn");
solveBtn.onclick = function () {
    var coefficients = getCoefficients(input.value);
    var roots = findRoots(coefficients);
    console.log(roots);
}