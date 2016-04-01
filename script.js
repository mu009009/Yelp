//---------Setting up the canvas --------------//
var canvas0Width = document.getElementById('canvas-1').clientWidth,
    canvas0Height = document.getElementById('canvas-1').clientHeight;

var canvas3Width = document.getElementById('canvas-3').clientWidth,
    canvas3Height = document.getElementById('canvas-3').clientHeight;

var margin = {t: 10, r: 50, b: 15, l: 100};
var plotWidth = canvas0Width - margin.l - margin.r,
    plotHeight = canvas0Height - margin.t - margin.b;

var canvasWidth = canvas3Width - margin.l - margin.r,
    canvasHeight = canvas3Height - margin.t - [margin.b + 70];


var CategoriesDataRecord = [null];
var CategoriesNumberArrary = [null];
var TypeData = null;
var GroupData = null;
var GroupArrary = null;
var KeyWord = null;
var StatesName = null;

KeyWord = "PA";
BussinessDataLoad();
