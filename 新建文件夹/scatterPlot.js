 var w = 800;
      var h = 400;
      var padding = 30;
      
      var dataset = [
              ['US',36.5,88.6,3.3], 
              ['France',41.6,88.8,3.7],
              ['Italy',39.5,88.6,3.4],
              ['Spain',28.1,87.2,4.9],
              ['Portugal',26.1,88.2,5.5],
              ['Chile',21.4,86.6,5.6],
              ['Argentina',23.7,86.7,5.2],
              ['Austria',31,90.1,3.7],
              ['Australia',36.3,88.6,4.1],
              ['Germany',41.2,89.8,3.7],
              ['New Zealan',26.6,88.23,4.1],
              ['South Africa',24.5,87.7,4.9],
              ['Israel',31.6,88.2,3.6],
              ['Greece',21.9,87.2,4.7],
              ['Canada',35.7,89.2,3.1]
              ];

      //Create scale functions
      var xScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d[1]; }), d3.max(dataset, function(d) { return d[1]; })])
                 .range([padding, w - padding * 2]);

      var yScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d[2]; }), d3.max(dataset, function(d) { return d[2]; })])
                 .range([h - padding, padding]);

      var aScale = d3.scaleLinear()
                 .domain([d3.min(dataset, function(d) { return d[3]; }), d3.max(dataset, function(d) { return d[3]; })])
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

      var color = d3.scaleOrdinal(d3.schemeCategory20c);
      var colors = d3.scaleQuantize()
                     .domain([d3.min(dataset, function(d) { return d[1]; }), d3.max(dataset, function(d) { return d[1]; })])
                     .range(["#5E4FA2", "#3288BD","#8E44AD","#AF601A",'#515A5A',
                      '#1E8449',"#66C2A5", 
                            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);
      //Create circles
      svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
            return xScale(d[1]);
         })
         .attr("cy", function(d) {
            return yScale(d[2]);
         })
         .attr("r", function(d) {
            return aScale(d[3]);
         })
         .on("mouseover", function(d) {
          div.transition()
             .duration(200)
             .style('opacity',6)
          div.html(d[0]+','+d[3])
             .style('left',(d3.event.pageX+10)+'px')
             .style('top',(d3.event.pageY-28)+'px')
         })
         .on("mouseout", function() {
         div.transition()
            .duration(500)
            .style('opacity',0)        
         })
         .style("fill", 'none')
         .style('stroke', function(d) {return colors(d[1]);})
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