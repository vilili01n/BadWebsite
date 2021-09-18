var pendulumGraph = function(g) {
  // variable that makes the graph watchable or not
  g.showGraph = false;
  g.history = []; // history of the trail
  g.trailLimit = 3000; // the trail limir
  //setup function
  g.setup = function() {
    // calculates the relationship between the two graphs
    g.rel_x = (2 * g.PI) / 175;
    g.rel_y = (2 * g.PI) / 200;
    g.canvas = g.createCanvas(400, 350);
    g.canvas.position(880, 259);
    // UI
    g.ui();
  }

  // draw function
  g.draw = function() {
    if (g.showGraph) {
      g.background(100, 100, 100); // grey
      // the coordinate system
      g.stroke(206, 156, 171);
      // x
      g.line(190, 20, 220, 20);
      // -x
      g.line(190, 330, 220, 330);
      // y
      g.line(380, 165, 380, 185);
      //-y
      g.line(20, 165, 20, 185);
      // lines between
      g.line(205, 20, 205, 330);
      g.line(20, 175, 380, 175);
      // text for the axis
      g.strokeWeight(1);
      g.text("Angle 1",335,195);
      g.text("Angle 2",210,35);

      // getting the angle information from the pendulum
      let anglex = myPendulum.dPen[0].pendulum1.angle;
      let angley = myPendulum.dPen[0].pendulum2.angle;

      // Getting the value to the window values
      let window_x = (anglex / g.rel_x) + 200;
      let window_y = 175 - (angley / g.rel_y);
      // checks if it needs to add or remove 20
      // x angle
      // adds the trail
      if (g.history.length < g.trailLimit) {
        g.history.push(window_x);
        g.history.push(window_y);
      } else {
        // removes a part of the trail
        g.history.shift();
        g.history.shift();
      }
      g.circle(window_x, window_y, 5);
      g.trail();
    } else {
      g.background(255, 255, 255);
    }
  }
  // the UI
  g.ui = function() {
    // show button '
    g.show = g.createButton("Show graph");
    g.show.position(760, 570);
    // axis text
    // event handler
    g.show.mousePressed(g.show1);
  }

  g.show1 = function() {
    // either turns the graph on er off
    if (!g.showGraph) {
      g.showGraph = true;
      g.show.html("Hide graph"); // changes text
    } else {
      g.showGraph = false;
      g.show.html("Show graph");
      // delets all the history
      for(let i = 0;i<g.history.length;i+2){
        g.history.shift();
        g.history.shift();
      }
    }
  }

  g.trail = function() {
    // customization
    g.stroke(206, 200, 200);
    g.strokeWeight(2);
    // loops through the trail
    g.beginShape(); // begins the drawing
    g.noFill(); // the shape dosent have fill
    for (let i = 0; i < g.history.length; i += 2) {
      let x = g.history[i];
      let y = g.history[i + 1];
      g.point(x, y);
    }
    g.endShape(); // ends the shape
  }
}
// launches the script
var myPendulumGraph = new p5(pendulumGraph);
