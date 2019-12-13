// DOM util functions
var _ = {
  // now $ can get elements by id
  $: function(id) {
    return document.getElementById(id);
  },

  all: function(selectors) {
    return document.querySelectorAll(selectors);
  },

  removeClass: function(selectors, cssClass) {
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for (i = 0; i < l; i++) {
      var el = nodes[i];
      // Bootstrap compatibility
      el.className = el.className.replace(cssClass, "");
    }
  },

  addClass: function(selectors, cssClass) {
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for (i = 0; i < l; i++) {
      var el = nodes[i];
      // Bootstrap compatibility
      if (-1 == el.className.indexOf(cssClass)) {
        el.className += " " + cssClass;
      }
    }
  },

  show: function(selectors) {
    this.removeClass(selectors, "hidden");
  },

  hide: function(selectors) {
    this.addClass(selectors, "hidden");
  },

  toggle: function(selectors, cssClass) {
    var cssClass = cssClass || "hidden";
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for (i = 0; i < l; i++) {
      var el = nodes[i];
      // Bootstrap compatibility
      if (-1 !== el.className.indexOf(cssClass)) {
        el.className = el.className.replace(cssClass, "");
      } else {
        el.className += " " + cssClass;
      }
    }
  }
};

// return a point on the same line and in the same direction as (currentX, currentY),
// 12000 units away from (centerX, centerY)
function getNewPoint(currentX, currentY, centerX, centerY) {
  var distance = Math.sqrt(
    Math.pow(currentX - centerX, 2) + Math.pow(currentY - centerY, 2)
  );
  var t = 20000 / distance;

  return {
    x: (1 - t) * centerX + t * currentX,
    y: (1 - t) * centerY + t * currentY
  };
}
