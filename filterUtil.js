var filter; // a hack, but gets the right filter in here
var filter2;
var filter3;
var s;

function applyMinDegreeFilter(e) {
  var v = e.target.value;
  _.$("min-degree-val").textContent = v;

  filter
    .undo("min-degree")
    .nodesBy(function(n) {
      return this.degree(n.id) >= v;
    }, "min-degree")
    .apply();
}

function updatePane(graph, _filter, _filter2, _filter3, _s) {
  // this always called before above, so assign filter here
  filter = _filter;
  filter2 = _filter2;
  filter3 = _filter3;
  s = _s;

  // get max degree
  var maxDegree = 0;

  // read nodes
  graph.nodes().forEach(function(n) {
    maxDegree = Math.max(maxDegree, graph.degree(n.id));
  });

  // min degree
  _.$("min-degree").max = maxDegree;
  _.$("max-degree-value").textContent = maxDegree;
}

function onRoleCheckClicked() {
  var roleChecked = _.$("role-check").checked;
  if (roleChecked) {
    filter3.undo().apply();
    _.$("role-check").checked = true;
    _.addClass("#class-list", "uunchecked")
    _.removeClass("#class-list", "cchecked");

    _.addClass("#role-list", "cchecked")
    _.removeClass("#role-list", "uuncchecked");
  } else {
    filter2.undo().apply();

    _.addClass("#role-list", "uunchecked")
    _.removeClass("#role-list", "cchecked");

    _.addClass("#class-list", "cchecked")
    _.removeClass("#class-list", "uuncchecked");
  }
}

function filterTopOnClick() {
  var topChecked = _.$("top").checked;
  if (!topChecked) {
    filterTop();
  } else {   
    filter2.undo("top-check");
    if (!_.$("jungle").checked) {
      filter2.undo("jungle-check");
      filterJungle();
    }
    if (!_.$("mid").checked) {
      filter2.undo("mid-check");
      filterMid();
    }
    if (!_.$("bot").checked) {
      filter2.undo("bot-check");
      filterBot();
    }
    if (!_.$("support").checked) {
      filter2.undo("support-check");
      filterSupport();
    }
    filter2.apply();
  }
}

function filterJungleOnClick() {
  var jungleChecked = _.$("jungle").checked;
  if (!jungleChecked) {
    filterJungle();
  } else {
    filter2.undo("jungle-check");
    if (!_.$("top").checked) {
      filter2.undo("top-check");
      filterTop();
    }
    if (!_.$("mid").checked) {
      filter2.undo("mid-check");
      filterMid();
    }
    if (!_.$("bot").checked) {
      filter2.undo("bot-check");
      filterBot();
    }
    if (!_.$("support").checked) {
      filter2.undo("support-check");
      filterSupport();
    }
    filter2.apply();
  }
}

function filterMidOnClick() {
  var midChecked = _.$("mid").checked;
  if (!midChecked) {
    filterMid();
  } else {
    filter2.undo("mid-check");
    if (!_.$("jungle").checked) {
      filter2.undo("jungle-check");
      filterJungle();
    }
    if (!_.$("top").checked) {
      filter2.undo("top-check");
      filterTop();
    }
    if (!_.$("bot").checked) {
      filter2.undo("bot-check");
      filterBot();
    }
    if (!_.$("support").checked) {
      filter2.undo("support-check");
      filterSupport();
    }
    filter2.apply();
  }
}

function filterBotOnClick() {
  var botChecked = _.$("bot").checked;
  if (!botChecked) {
    filterBot();
  } else {
    filter2.undo("bot-check");
    if (!_.$("jungle").checked) {
      filter2.undo("jungle-check");
      filterJungle();
    }
    if (!_.$("top").checked) {
      filter2.undo("top-check");
      filterTop();
    }
    if (!_.$("mid").checked) {
      filter2.undo("mid-check");
      filterMid();
    }
    if (!_.$("support").checked) {
      filter2.undo("support-check");
      filterSupport();
    }
    filter2.apply();
  }
}

function filterSupportOnClick() {
  var supportChecked = _.$("support").checked;
  if (!supportChecked) {
    filterSupport();
  } else {
    filter2.undo("support-check");
    if (!_.$("jungle").checked) {
      filter2.undo("jungle-check");
      filterJungle();
    }
    if (!_.$("top").checked) {
      filter2.undo("top-check");
      filterTop();
    }
    if (!_.$("mid").checked) {
      filter2.undo("mid-check");
      filterMid();
    }
    if (!_.$("bot").checked) {
      filter2.undo("bot-check");
      filterBot();
    }
    filter2.apply();
  }
}

function filterTop() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.role.split(",").includes("top")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("jungle").checked && n.attributes.role.split(",").includes("jungle")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mid").checked && n.attributes.role.split(",").includes("mid")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("bot").checked && n.attributes.role.split(",").includes("bot")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("support").checked && n.attributes.role.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter2
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "top-check")
    .apply();
}

function filterJungle() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.role.split(",").includes("jungle")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("top").checked && n.attributes.role.split(",").includes("top")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mid").checked && n.attributes.role.split(",").includes("mid")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("bot").checked && n.attributes.role.split(",").includes("bot")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("support").checked && n.attributes.role.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter2
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "jungle-check")
    .apply();
}

function filterMid() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.role.split(",").includes("mid")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("jungle").checked && n.attributes.role.split(",").includes("jungle")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("top").checked && n.attributes.role.split(",").includes("top")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("bot").checked && n.attributes.role.split(",").includes("bot")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("support").checked && n.attributes.role.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter2
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "mid-check")
    .apply();
}

function filterBot() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.role.split(",").includes("bot")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("jungle").checked && n.attributes.role.split(",").includes("jungle")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mid").checked && n.attributes.role.split(",").includes("mid")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("top").checked && n.attributes.role.split(",").includes("top")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("support").checked && n.attributes.role.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter2
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "bot-check")
    .apply();
}

function filterSupport() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.role.split(",").includes("support")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("jungle").checked && n.attributes.role.split(",").includes("jungle")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mid").checked && n.attributes.role.split(",").includes("mid")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("bot").checked && n.attributes.role.split(",").includes("bot")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("top").checked && n.attributes.role.split(",").includes("top")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter2
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "support-check")
    .apply();
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function filterAssassinOnClick() {
  var assassinChecked = _.$("assassin").checked;
  if (!assassinChecked) {
    filterAssassin();
  } else {
    filter3.undo("assassin-check");
    if (!_.$("fighter").checked) {
      filter3.undo("fighter-check");
      filterFighter();
    }
    if (!_.$("mage").checked) {
      filter3.undo("mage-check");
      filterMage();
    }
    if (!_.$("marksman").checked) {
      filter3.undo("marksman-check");
      filterMarksman();
    }
    if (!_.$("supp").checked) {
      filter3.undo("supp-check");
      filterSupp();
    }
    if (!_.$("tank").checked) {
      filter3.undo("tank-check");
      filterTank();
    }
    filter3.apply();
  }
}

function filterFighterOnClick() {
  var fighterChecked = _.$("fighter").checked;
  if (!fighterChecked) {
    filterFighter();
  } else {
    filter3.undo("fighter-check");
    if (!_.$("mage").checked) {
      filter3.undo("mage-check");
      filterMage();
    }
    if (!_.$("assassin").checked) {
      filter3.undo("assassin-check");
      filterAssassin();
    }
    if (!_.$("marksman").checked) {
      filter3.undo("marksman-check");
      filterMarksman();
    }
    if (!_.$("supp").checked) {
      filter3.undo("supp-check");
      filterSupp();
    }
    if (!_.$("tank").checked) {
      filter3.undo("tank-check");
      filterTank();
    }
    filter3.apply();
  }
}

function filterMageOnClick() {
  var mageChecked = _.$("mage").checked;
  if (!mageChecked) {
    filterMage();
  } else {
    filter3.undo("mage-check");
    if (!_.$("fighter").checked) {
      filter3.undo("fighter-check");
      filterFighter();
    }
    if (!_.$("assassin").checked) {
      filter3.undo("assassin-check");
      filterAssassin();
    }
    if (!_.$("marksman").checked) {
      filter3.undo("marksman-check");
      filterMarksman();
    }
    if (!_.$("supp").checked) {
      filter3.undo("supp-check");
      filterSupp();
    }
    if (!_.$("tank").checked) {
      filter3.undo("tank-check");
      filterTank();
    }
    filter3.apply();
  }
}

function filterMarksmanOnClick() {
  var marksmanChecked = _.$("marksman").checked;
  if (!marksmanChecked) {
    filterMarksman();
  } else {
    filter3.undo("marksman-check");
    if (!_.$("fighter").checked) {
      filter3.undo("fighter-check");
      filterFighter();
    }
    if (!_.$("mage").checked) {
      filter3.undo("mage-check");
      filterMage();
    }
    if (!_.$("assassin").checked) {
      filter3.undo("assassin-check");
      filterAssassin();
    }
    if (!_.$("supp").checked) {
      filter3.undo("supp-check");
      filterSupp();
    }
    if (!_.$("tank").checked) {
      filter3.undo("tank-check");
      filterTank();
    }
    filter3.apply();
  }
}

function filterSuppOnClick() {
  var suppChecked = _.$("supp").checked;
  if (!suppChecked) {
    filterSupp();
  } else {
    filter3.undo("supp-check");
    if (!_.$("fighter").checked) {
      filter3.undo("fighter-check");
      filterFighter();
    }
    if (!_.$("mage").checked) {
      filter3.undo("mage-check");
      filterMage();
    }
    if (!_.$("marksman").checked) {
      filter3.undo("marksman-check");
      filterMarksman();
    }
    if (!_.$("assassin").checked) {
      filter3.undo("assassin-check");
      filterAssassin();
    }
    if (!_.$("tank").checked) {
      filter3.undo("tank-check");
      filterTank();
    }
    filter3.apply();
  }
}

function filterTankOnClick() {
  var tankChecked = _.$("tank").checked;
  if (!tankChecked) {
    filterTank();
  } else {
    filter3.undo("tank-check");
    if (!_.$("fighter").checked) {
      filter3.undo("fighter-check");
      filterFighter();
    }
    if (!_.$("mage").checked) {
      filter3.undo("mage-check");
      filterMage();
    }
    if (!_.$("marksman").checked) {
      filter3.undo("marksman-check");
      filterMarksman();
    }
    if (!_.$("supp").checked) {
      filter3.undo("supp-check");
      filterSupp();
    }
    if (!_.$("assassin").checked) {
      filter3.undo("assassin-check");
      filterAssassin();
    }
    filter3.apply();
  }
}

function filterAssassin() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("assassin")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("fighter").checked && n.attributes.class.split(",").includes("fighter")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mage").checked && n.attributes.class.split(",").includes("mage")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("marksman").checked && n.attributes.class.split(",").includes("marksman")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("supp").checked && n.attributes.class.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("tank").checked && n.attributes.class.split(",").includes("tank")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "assassin-check")
    .apply();
}

function filterFighter() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("fighter")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("assassin").checked && n.attributes.class.split(",").includes("assassin")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mage").checked && n.attributes.class.split(",").includes("mage")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("marksman").checked && n.attributes.class.split(",").includes("marksman")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("supp").checked && n.attributes.class.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("tank").checked && n.attributes.class.split(",").includes("tank")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "fighter-check")
    .apply();
}

function filterMage() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("mage")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("fighter").checked && n.attributes.class.split(",").includes("fighter")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("assassin").checked && n.attributes.class.split(",").includes("assassin")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("marksman").checked && n.attributes.class.split(",").includes("marksman")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("supp").checked && n.attributes.class.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("tank").checked && n.attributes.class.split(",").includes("tank")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "mage-check")
    .apply();
}

function filterMarksman() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("marksman")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("fighter").checked && n.attributes.class.split(",").includes("fighter")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mage").checked && n.attributes.class.split(",").includes("mage")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("assassin").checked && n.attributes.class.split(",").includes("assassin")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("supp").checked && n.attributes.class.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("tank").checked && n.attributes.class.split(",").includes("tank")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "marksman-check")
    .apply();
}

function filterSupp() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("support")) {
      if (!nodesToFilter.includes(n)) {
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("fighter").checked && n.attributes.class.split(",").includes("fighter")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mage").checked && n.attributes.class.split(",").includes("mage")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("marksman").checked && n.attributes.class.split(",").includes("marksman")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("assassin").checked && n.attributes.class.split(",").includes("assassin")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("tank").checked && n.attributes.class.split(",").includes("tank")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "supp-check")
    .apply();
}

function filterTank() {
  var nodesToFilter = [];
  for (var i = 0; i < s.graph.nodes().length; i++) {
    var n = s.graph.nodes()[i];
    if (n.attributes.class.split(",").includes("tank")) {
      if (!nodesToFilter.includes(n)) {       
        nodesToFilter.push(n);
      }
    } else {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    }

    if (_.$("fighter").checked && n.attributes.class.split(",").includes("fighter")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("mage").checked && n.attributes.class.split(",").includes("mage")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("marksman").checked && n.attributes.class.split(",").includes("marksman")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("supp").checked && n.attributes.class.split(",").includes("support")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 

    if (_.$("assassin").checked && n.attributes.class.split(",").includes("assassin")) {
      if (nodesToFilter.includes(n)) {
        nodesToFilter.pop();
      }
    } 
  }

  filter3
    .nodesBy(function(n) {
      return !nodesToFilter.includes(n);
    }, "tank-check")
    .apply();
}
