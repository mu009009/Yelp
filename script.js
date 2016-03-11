
//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width + margin.l + margin.r)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','plot-area')
    .attr('transform','translate('+margin.l+','+margin.t+')');


d3.csv("data/yelp-business.csv", function(d){
     return {

         //PARSING DATA HERE:

         //seqId:d.seq_id,
         //status: d.status,
         //duration: +d.duration,
         //start: d.strt_statn,
         //end: d.end_statn,
         //startDate: new Date()
     }


}, function(err, rows){



});
