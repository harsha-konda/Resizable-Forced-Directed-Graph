// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/

function render(links,element){
var nodes = {};


var svg = d3.select(element).append("svg");
var force = d3.layout.force();

	
 // build the arrow.
svg.append("svg:defs").selectAll("marker")
.data(["end"])      // Different link/path types can be defined here
.enter().append("svg:marker")    // This section adds in the arrows
.attr("id", String)
.attr("viewBox", "0 -5 10 10")
.attr("refX", 25)
.attr("refY", 0)
.attr("markerWidth", 4)
.attr("markerHeight", 4)
.attr("orient", "auto")
.append("svg:path")
.attr("d", "M0,-5L10,0L0,5");

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

force
    .nodes(d3.values(nodes))
    .links(links)
     .linkDistance(70)
     .charge(-250)
    .on("tick", tick)
    .start();


var link = svg.selectAll(".link")
    .data(force.links())
  .enter().append("line")
    .attr("class", "link")
        .attr("marker-end", "url(#end)");




color = d3.scale.category20c();

var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag) 
;

node.append("circle")
    .attr("r", 8)
    .style("fill", function(d) { return color(d.name); });

node.append("text")
    .attr("x", 14)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

resize();
d3.select(window).on("resize", resize);


function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
 function resize() {

    width = window.innerWidth/1.3, height = window.innerHeight/1.5;
    console.log(height);
    svg.attr("width", width).attr("height", height);
    force.size([width, height])
    .resume();

  }

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
}

}