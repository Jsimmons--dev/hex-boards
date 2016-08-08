console.log("hello hex!");

let colors = d3.interpolateCubehelixDefault

let zoom = d3.zoom()
  .scaleExtent([1,10])
  .on("zoom", zoomed);

let svg = d3.select("body")
  .append("svg")
  .attr("width",1060)
  .attr("height",1900)
  .style("background","black")
  .call(zoom)

let container = svg.append("g");

function zoomed(){
  let t = d3.zoomIdentity.translate(d3.event.transform.x,d3.event.transform.y).scale(d3.event.transform.k);
  container.attr("transform","translate(" + t.x + "," + t.y + ")scale(" + t.k + ")");
}

let num = 10
let circle = container.selectAll(".circle")
  .data(new Array(num).fill().map((d,i)=>i/num))
  .enter()
  .append("circle")
  .attr("r",20)
  .attr("fill",(d)=>colors(d))
  .attr("cx",100)
  .attr("cy",100)

circle.call(d3.drag()
  .on("start",function(){
    d3.select(this).raise()
})
  .on("drag",function(){
    d3.select(this)
      .attr("cx",d3.event.x)
      .attr("cy",d3.event.y)
  }));
