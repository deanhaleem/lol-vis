// Add a method to the graph model that returns an
// object with every neighbors of a node inside:
sigma.classes.graph.addMethod("neighbors", function(nodeId) {
  var k,
    neighbors = {},
    index = this.allNeighborsIndex[nodeId] || {};

  for (k in index) neighbors[k] = this.nodesIndex[k];

  return neighbors;
});

function setColors(e, dragging, s) {
  var gradient = generateColor("#cccccc", "#000000", 61);
  var please = e;
  var nodeId = e.data.node.id,
    toKeep = s.graph.neighbors(nodeId);

  var centerX = e.data.node.x;
  var centerY = e.data.node.y;
  toKeep[nodeId] = e.data.node;
  var numNodes = Object.keys(toKeep).length;

  plotKdaGraph(true, e.data.node);
  plotDmgPerMinGraph(true, e.data.node);
  plotGoldAt15Graph(true, e.data.node)
  plotGoldDiffAt15Graph(true, e.data.node)
  plotCSAt15Graph(true, e.data.node);
  plotCSDAt15Graph(true, e.data.node);

  // _.$("name").innerHTML = "<strong>" + e.data.node.id + "</strong>"
  // // var data = get data into object;
  // _.$("teammates").innerHTML = "<strong>Number of teammates: <center style='background-color: #ccc;'>" + e.data.node.id + "</center></strong>"
  // _.$("kda").innerHTML = "<strong>Kills/Deaths/Assists: " + e.data.node.id + "</strong>"
  // _.$("dmg-per-min").innerHTML = "<strong>Damage per minute: " + e.data.node.id + "</strong>"
  // _.$("gold-at-15").innerHTML = "<strong>Gold at 15: " + e.data.node.id + "</strong>"
  // _.$("cs-at-15").innerHTML = "<strong>CS at 15: " + e.data.node.id + "</strong>"
  // _.$("gd-at-15").innerHTML = "<strong>Gold differential at 15: " + e.data.node.id + "</strong>"
  // _.$("csd-at-15").innerHTML = "<strong>CS differential at 15: " + e.data.node.id + "</strong>"

  var j = 0;
  var numToKeep = 0;
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];

    if (toKeep[n.id]) {
      numToKeep++;
      n.color = n.originalColor;
      n.imageUrl =
        "https://opgg-static.akamaized.net/images/lol/champion/" +
        n.attributes.url +
        ".png?image=w_45&v=1";
      if (!dragging) {
        if (n.id != nodeId) {
          Object.assign(n, {
            nx: centerX + 10000 * Math.cos((Math.PI * 2 * j) / numNodes)
          });
          Object.assign(n, {
            ny: centerY + 10000 * Math.sin((Math.PI * 2 * j) / numNodes)
          });
          j++;
        }
      }
    } else {
      n.color = "#eee";
      n.imageUrl = "";
      if (!dragging) {
        if (
          12000 * 12000 >=
          (n.x - centerX) * (n.x - centerX) + (n.y - centerY) * (n.y - centerY)
        ) {
          var p = getNewPoint(n.x, n.y, centerX, centerY);
          n.nx = p.x;
          n.ny = p.y;
        }
      }
    }
  }

  s.graph.edges().forEach(function(e) {
    if (toKeep[e.source] && toKeep[e.target] && (e.source == please.data.node.id || e.target == please.data.node.id)){ e.color = "#" + gradient[e.weight]; console.log("#" + gradient[e.weight] + e.weight)}
    else e.color = "#fff";
    
  });

  // Since the data has been modified, we need to
  // call the refresh method to make the colors
  // update effective.
  s.refresh();
}

function resetColors(s) {
  s.graph.nodes().forEach(function(n) {
    n.color = n.originalColor;
    n.imageUrl =
      "https://opgg-static.akamaized.net/images/lol/champion/" +
      n.attributes.url +
      ".png?image=w_45&v=1";
  });

  s.graph.edges().forEach(function(e) {
    e.color = e.originalColor;
  });

  // Same as in the previous event:
  s.refresh();
}

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function generateColor(colorStart,colorEnd,colorCount){

	// The beginning of your gradient
	var start = convertToRGB (colorStart);    

	// The end of your gradient
	var end   = convertToRGB (colorEnd);    

	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;

	var saida = [];
	
	for (i = 0; i < len; i++) {
		var c = [];
		alpha += (1.0/len);
		
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];

		saida.push(convertToHex (c));
		
  }
  
  var reverse = [];
  for (var i = 0; i < 34; i++) {
    reverse.push(saida.pop());
  }
	
	return reverse;
	
}
