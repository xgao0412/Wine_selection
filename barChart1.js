 var w = 550;
      var h = 250;
      
      var dataset = [['red blend',96],
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

      var xScaleBar = d3.scaleBand()
              .domain(d3.range(dataset.length))
              .rangeRound([0, w])
              .paddingInner(0.05);

      var yScaleBar = d3.scaleLinear()
              .domain([0, d3.max(dataset, function(d) { return d[1]; })])
              .range([0, h]);
      
      //Create SVG element
      var svg = d3.select("#barChart1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      //Create bars
      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return xScaleBar(i);
         })
         .attr("y", function(d) {
            return h - yScaleBar(d[1]);
         })
         .attr("width", xScaleBar.bandwidth())
         .attr("height", function(d) {
            return yScaleBar(d[1]);
         })
         .attr("fill", function(d) {
          return "rgb(0, 0, " + Math.round(d[1] * 10) + ")";
         })
         .on("mouseover", function(d) {

          //Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x")) + xScaleBar.bandwidth() / 2;
          var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

          //Update the tooltip position and value
          d3.select("#bar-tooltip1")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")           
            .select("#value")
            .text(d[1]);
         
          //Show the tooltip
          d3.select("#bar-tooltip1").classed("hidden", false);

         })
         .on("mouseout", function() {
         
          //Hide the tooltip
          d3.select("#bar-tooltip1").classed("hidden", true);
          
         })
         .on("click", function() {
            sortBars();
         });

      //Define sort order flag
      var sortOrder = false
      
      //Define sort function
      var sortBars = function() {

        //Flip value of sortOrder
          sortOrder = !sortOrder;

        svg.selectAll("rect")
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