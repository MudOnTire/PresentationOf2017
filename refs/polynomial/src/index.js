var styles = require('./index.css');
var findRoots = require('durand-kerner');

var input = document.querySelector("#input");
var polynomial = document.querySelector('#polynomial');
var solveBtn = document.querySelector("#solveBtn");
var result = document.querySelector('#result');
var historyList = document.querySelector('#historyList');

//初始化历史存储
initHistory();

function parseInput() {
    var poly = input.value.replace(/\^(\d)+/g, '<sup>$1</sup>');
    polynomial.innerHTML = poly + ' = 0';
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

function solve() {
    var coefficients = getCoefficients(input.value);
    var roots = findRoots(coefficients);
    var rootsStr = '的解为：';
    if (roots[0].length <= 0) return;
    for (let i = 0; i < roots[0].length; i++) {
        var imgRoot = roots[1][i];
        if (imgRoot.toFixed(3) == 0) {
            rootsStr += '<b>' + roots[0][i].toFixed(3) + '</b>';
        } else {
            rootsStr += '<b>' + roots[0][i].toFixed(3) + '+' + roots[1][i].toFixed(3) + 'i' + '</b>';
        }
    }
    result.innerHTML = rootsStr;
    addHistory(input.value);
    console.log(roots);
}

// history
function initHistory() {
    var historys = [];
    localStorage.historys = JSON.stringify(historys);
}

function getHistorys() {
    return JSON.parse(localStorage.historys);
}

function addHistory(value) {
    var historys = getHistorys();
    if (historys.indexOf(value) < 0) {
        historys.push(value);
        localStorage.historys = JSON.stringify(historys);
    }
}

function showHistory(input) {
    historyList.innerHTML = '';
    historyList.style.display = "block";
    var historys = getHistorys().filter(function (item) {
        if (input) {
            return item.startsWith(input);
        } else {
            return true;
        }
    });
    if (historys.length <= 0) {
        hideHistory();
    } else {
        historys.forEach(function (item, index) {
            historyList.innerHTML += `<li class="history-item">${item}</li>`;
        });
    }
}

function hideHistory() {
    historyList.style.display = "none";
    historyList.innerHTML = "";
}

// events
input.onkeyup = function (event) {
    if (event.which === 13) {
        solve();
        hideHistory();
        return;
    }
    var text = this.value;
    if (text.length <= 0) {
        result.innerHTML = '';
        polynomial.innerHTML = '';
        hideHistory();
        return;
    }
    showHistory(text);
    parseInput();
}

input.onfocus = function () {
    showHistory();
}

input.onblur = function () {
    setTimeout(function () {
        hideHistory();
    }, 200);
}

solveBtn.onclick = function () {
    solve();
}

document.documentElement.onclick = function (event) {
    var className = event.target.className;
    if (className.indexOf("history-item") > -1) {
        input.value = event.target.innerHTML;
        parseInput();
    }
};