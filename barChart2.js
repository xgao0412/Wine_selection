      var w1 = 850;
      var h1 = 500;
      padding1 =30
      
      var dataset1 = [['red blend',96],
                     ['White blend',95],
                     ['Pinot Noir', 93],
                     ['Chardonnay',91],
                     ['Riesling',86],
                     ['Muscat',84],
                     ['Bordeaux',90],
                     ['Malbex',81],
                     ['Sauvignon Blanc',84],
                     ['Cabernet France',86],
                     ['Cabernet Sauvignon',88]];

      var xScaleBar = d3.scaleOrdinal()
                        .domain(['A','B','C','D','E','F','G','H','I','J','K'])
                        .range([0, w1])
                        .paddingInner(0.05);

      var yScaleBar = d3.scaleLinear()
                        .domain([0, d3.max(dataset1, function(d) { return d[1]; })])
                        .range([0, h1]);
      
      //Create SVG element
      var svg1 = d3.select("#barChart2")
            .append("svg")
            .attr("width", w1)
            .attr("height", h1);

      //Create bars
      svg1.selectAll("rect")
         .data(dataset1)
         .enter()
         .append("rect")
         .text(function(d){return d[0];})
         .on("click", function() {
            sortBars();
         });

      //Define sort order flag
      var sortOrder = false
      
      //Define sort function
      var sortBars = function() {

        //Flip value of sortOrder
          sortOrder = !sortOrder;

        svg1.selectAll("rect")
           .sort(function(a, b) {
              if (sortOrder) {
                return d3.ascending(a[1], b[1]);
              } else {
                return d3.descending(a[1], b[1]);
              }
            })
           .transition()
           .delay(function(d, i) {
             return i * 50;
           })
           .duration(1000)
           .attr("x", function(d, i) {
              return xScaleBar(i);
           });

      };      


      var xAxis1 = d3.axisBottom()
                    .scale(xScaleBar);

      //Define Y axis
      var yAxis1 = d3.axisLeft()
                    .scale(yScaleBar);

     svg1.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h1 - padding1) + ")")
        .call(xAxis1);
      
      //Create Y axis
     svg1.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding1 + ",0)")
        .call(yAxis1);

     svg1.selectAll('rect')
         .data(dataset1)
         .enter()
         .append('svg:rect')
         .append('svg:title')
         .text(function(d){return d[0];});