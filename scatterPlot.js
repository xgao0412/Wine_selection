      var w = 900;
      var h = 550;
      var padding = 100;
      
      var dataset = [
              {'A':'US','B':36.5,'C':88.6,'D':0.41}, 
              {'A':'France','B':41.6,'C':88.8,'D':0.46},
              {'A':'Italy','B':39.5,'C':88.6,'D':0.44},
              {'A':'Spain','B':28.1,'C':87.2,'D':0.32},
              {'A':'Portugal','B':26.1,'C':88.2,'D':0.29},
              {'A':'Chile','B':21.4,'C':86.6,'D':0.24},
              {'A':'Argentina','B':23.7,'C':86.7,'D':0.27},
              {'A':'Austria','B':31,'C':90.1,'D':0.34},
              {'A':'Australia','B':36.3,'C':88.6,'D':0.41},
              {'A':'Germany','B':41.2,'C':89.8,'D':0.45},
              {'A':'New Zealand','B':26.6,'C':88.2,'D':0.30},
              {'A':'South Africa','B':24.5,'C':87.7,'D':0.27},
              {'A':'Israel','B':31.6,'C':88.2,'D':0.35},
              {'A':'Greece','B':21.9,'C':87.2,'D':0.25},
              {'A':'Canada','B':35.7,'C':89.2,'D':0.4}
              ];
      //Create scale functions
      var xScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d.B; }), d3.max(dataset, function(d) { return d.B; })])
                 .range([padding, w - padding * 2]);

      var yScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d.C; }), d3.max(dataset, function(d) { return d.C; })])
                 .range([h - padding, padding]);

      var aScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d.D; }), d3.max(dataset, function(d) { return d.D; })])
                 .range([10,20]);

      //Define X axis
      var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(5);

      //Define Y axis
      var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5);

      //Create SVG element
      var svg = d3.select("#scatterPlot")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      var div = d3.select('#scatterPlot')
                  .append('div')
                  .attr('class','tooltip')
                  .style('opacity',0);

      var color = d3.scaleOrdinal(d3.schemeCategory20);
      var colors = d3.scaleQuantize()
                     .domain([d3.min(dataset, function(d) { return d.D; }), d3.max(dataset, function(d) { return d.D; })])
                     .range(['red','orange','pink','chocolate','lime','darkgreen','royablue','violet','powderblue','tomato','sienna','plum','slategray','brown','hotpink','beige']);

      var colorss = d3.scaleQuantize()
                     .domain([d3.min(dataset, function(d) { return d.B; }), d3.max(dataset, function(d) { return d.B; })])
                     .range(["#5E4FA2", "#3288BD","#8E44AD","#AF601A",'#515A5A',
                      '#1E8449',"#66C2A5", '#00ffff', '#ff5050', '#cc66ff',
                            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142",'#00ffff']);

      var symbols = d3.scaleOrdinal(d3.symbols);
      var symbol = d3.symbol().size(180);              
      //Create circles
      svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
            return xScale(d.B);
         })
         .attr("cy", function(d) {
            return yScale(d.C);
         })
         .attr("r", function(d) {
            return aScale(d.D);
         })
         .on("mouseover", function(d) {
          div.transition()
             .duration(200)
             .style('opacity',6)
          div.html(d.A+','+d.D)
             .style('left',(d3.event.pageX+10)+'px')
             .style('top',(d3.event.pageY-28)+'px')
         })
         .on("mouseout", function() {
         div.transition()
            .duration(500)
            .style('opacity',0)        
         })
         .style("fill", 'none')
         .style('stroke', function(d) {return colors(d.D);})
         .style('stroke-width',5);
          


      //Create X axis
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
      
      //Create Y axis
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

      svg.append('text')
        .attr('x', padding+5)
        .attr('y', padding)
        .attr('class', 'label')
        .text('ratings');

      svg.append('text')
        .attr('x', w-130)
        .attr('y', h-100)
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text('price($)');

    svg.selectAll(".symbol")
        .data(dataset)
        .enter().append("path")
        .attr("class", "symbol")
        .attr("d", function(d, i) { return symbol.type(symbols(d.B))(); })
        .style("fill", function(d) { return colors(d.D); })
        .attr("transform", function(d) { 
          return "translate(" + xScale(d.B) + "," + yScale(d.C) +")"; 
        });

  var pad = 50;
  var legend = svg.selectAll(".legend")
    .data(dataset)
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + (i * 50+20) + "," + (h-pad) + ")"; })
    .attr('font-size','85px');


  var clicked = "";

  legend.append("path")
    .style("fill", function(d) { return colors(d.D); })
      .attr("d", function(d, i) { return symbol.type(symbols(d.B))(); })
      .on("click",function(d){
   d3.selectAll(".symbol,circle").style("opacity",1)
   
   if (clicked !== d){
     d3.selectAll(".symbol,circle")
       .filter(function(e){
       return e.A !==d.A;
     })


       .style("opacity",0.001)
     clicked = d
   }
    else{
      clicked = ""
    }
  });



    legend.append("text")
      .attr("x", 15)
      .attr("y", 25)
      .style("text-anchor", "middle")
      .style('font-size','10px')
      .style('rotate','10deg')
      .attr("transform", function(d) {
                return "rotate(35)" 
                })
      .text(function(d) { return d.A; });