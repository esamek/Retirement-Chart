

(function($){
    function makePaper(el){
        var element = $(el).get(0);
        var w = $(el).innerWidth(),
            h = $(el).innerHeight();

        return new Raphael(element,w,h);
    }
    $.fn.paper = function(){
        return new makePaper(this);
    };
})(jQuery);














var HWChartOptions = {};

var HWGeneralOptions = {
    auto_adjust:true,
    color :{
        serie:["#00b2e9","#004b77","#de1c85","#f5871e","#f9c031","#4894bb"],
        dot:{
            fill:"#fff"
        },
        grid:'#333'
    },
    grid:{
        draw:{
            x:true
        }
    },
    graph:{
        curve:0,                        // make your chart more curved
        dot:{
            normal: 2,
            hover: 6,
            over:null,
            out:null
        },
        line:{
            strokeWidth:2               // line width
        }
    },
    textes: {
        tooltip: {
            title: {
                fill: '#575a5d'
            }
        }
    },
    tooltip: {
        renderer:function(data,x,y){
            return {    title:data.series[x].name,
                        sub:data.series[x].data[y]
            };
        },
        style: {
            fill: '#fff',
            stroke: '#ddd',
            strokeWidth:0
        }
    },
    events: {
        dot: {
            over:  null,
            out:   null,
            click: null
        },
        bar: {
            over:  null,
            out:   null,
            click: null
        },
        tooltip: {
            init: function(t){
                return t.forEach(function(el){

                    el.transform( el.type == 'text' ? 'T0,-10' : '...t0,-10' ).attr('opacity',0);
                });
            },
            enter: function(t){
                return t.forEach(function(el){
                    el.show().animate({transform: el.type == 'text' ? 'T0,10' : '...t0,10',opacity: 1},600,"elastic");
                });
            },
            leave: function(t){
                return t.forEach(function(el){
                        el.animate({transform: el.type == 'text' ? 'T0,-10' : '...t0,-10',opacity: 0},600,"elastic", function(){
                            el.hide();
                        });
                });

            }
        }
    }
};

HWChartOptions.line = {
    dot: {
        normal: 2,
        hover: 6
    },
    events:{
        dot:{
            over:function(d){
                d.animate({'r':6},300,"backOut");
            },
            out:function(d){
                d.animate({'r':2},300,"backOut");
            }
        },
    }
};


HWChartOptions.area = {
    dot: {
        normal: 1,
        hover: 6
    },
    grid:{
        x: {
            labels: {
                ticker: 5
            }
        },
        draw:{
            x:false
        }
    },
    events:{
        dot:{
            over:function(d){
                d.animate({'r':6},300,"backOut");
            },
            out:function(d){
                d.animate({'r':2},300,"backOut");
            }
        },
    }
};

HWChartOptions.bar = {
    gutter:{
        right:0
    },
    grid:{
        draw:{
            box: true,
            y: false
        }
    },
    legend:{
        display:null
    }
};


for(var op in HWChartOptions){

    var a = $.extend(true,{},HWGeneralOptions,HWChartOptions[op]);

    HWChartOptions[op] = a;
}



var it,myAreaChart,barChart;




$(function(){

   var options={
            data:'data-line',
            container:'line'

        };
    var linopts = $.extend(true,{},options,HWChartOptions.line);

    it =  new Line(linopts);


var dataArea=[{
        name: 'USA',
        data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
            1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
            27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
            26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
            22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
            10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
    }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null , null , null ,null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
            4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
            15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
            33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
            35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000]
    }]

var xLabels={           // x-labels are created with a function
    name: 'x-label',
    data: function(){
        labels=[];
        for (var i = 0, ii = dataArea[0].data.length; i < ii; i++){
            labels.push(1940+i);
        }
        return labels;
    }
}
dataArea.push(xLabels);


var labelCount = 0;
var areaoptions ={
    data: dataArea,
    container:'area',
    //auto_adjust:true,

};


var finalAreaOpts = $.extend(true,{},areaoptions, HWChartOptions.area);

myAreaChart = new Area(finalAreaOpts);



var BARoptions={
    data:'data-bar',
    container:'bar'

};

var finalBarOptions = $.extend(true,{},BARoptions, HWChartOptions.bar);

barChart = new Bar(finalBarOptions);










});





var xCount = 10;
var yCount = 1;

function testData(){

    var x = [];
    var y = [];
    for(var i = 0; i < xCount;i++){
        x.push( i );
    }

    if(yCount > 1){

        for(var i = 0; i < yCount;i++){
            var series = [];
            for(var z = 0; z < xCount;z++){
                series.push( Math.floor( Math.random() * 50 ) );
            }
            y.push(series);
        }
    }else{
        for(var z = 0; z < xCount;z++){
            y.push( Math.floor( Math.random() * 50 ) );
        }
    }

    return {'x': x, 'y':y};



}




