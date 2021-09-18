class Pendulum {
  constructor(hang, rod_length, startAngle, mass, color) {
    this.hang = hang;
    this.mass = mass;
    this.color = color; // starting color
    this.rod_length = rod_length;
    this.timeStep = 1 / 120; // 1 sec = 60 frames
    this.rod = new Vector(620 / 2, rod_length);
    this.gravity = 9.82;
    this.trailLimit = 0;
    this.history = [];
    this.dampening = 1;
    // angles
    this.angle = startAngle; // the angle
    this.angleV = 0; // angular velocity
    this.angleA = 0; // angular acceleration

    // calculates the position of the bob
    let x = myPendulum.sin(this.angle) * this.rod_length + this.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.angle) * this.rod_length + this.hang.y; // finds the y value of the rod
    this.rod.set(x, y);
  }
  // displays the Pendulum
  display() {
    // main pendulum
    myPendulum.strokeWeight(3); // thickness of line
    myPendulum.stroke(0, 0, 0); // color of outline
    let x = myPendulum.sin(this.angle) * this.rod_length + this.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.angle) * this.rod_length + this.hang.y; // finds the y value of the rod
    this.rod.set(x, y);
    myPendulum.fill(this.color[0], this.color[1], this.color[2]);
    myPendulum.ellipse(this.hang.x, this.hang.y, 3, 3); // small anchor point
    myPendulum.line(this.hang.x, this.hang.y, this.rod.x, this.rod.y); // pendulum rod
    myPendulum.ellipse(this.rod.x, this.rod.y, 20, 20); // the bob
  }
  // updates the physics
  update() {
    // applies physics
    this.angleV += this.angleA * this.timeStep; // changes velocity
    this.angle += this.angleV; // changes location
    // makes sure the angle never goes over 2PI or under -2PI
    if (this.angle < -2 * myPendulum.PI) {
      this.angle += 2 * myPendulum.PI;

    } else if (this.angle > 2 * myPendulum.PI) {
      this.angle -= 2 * myPendulum.PI;
    }

    this.angle *= this.dampening; // dampening
    let x = myPendulum.sin(this.angle) * this.rod_length + this.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.angle) * this.rod_length + this.hang.y; // finds the y value of the rod
    this.rod.set(x, y);
    this.angleA = 0; // resets acceleration
    // records trail
    this.history.push(x); // x value
    this.history.push(y); // y value

    // makes sure it stays within the limit
    if (this.history.length >= this.trailLimit) {
      // calculate how far it's off
      let loop = (this.history.length - this.trailLimit) + 1
      for (let i = 0; i < loop; i += 2) { // loop through the amount to be deleted
        // delete line
        this.history.shift();
        this.history.shift();
      }
    }
  }

  // changes the hang position
  changeHang(x, y) {
    let vector = new Vector(x, y)
    this.hang = vector; // changes the hang position

  }
  // add the acceleration
  addAcceleration(acceleration) {
    this.angleA += acceleration; // adds the acceleration
  }
  // change dampening
  changeDamp(newDamp) {
    this.dampening = newDamp;
  }
  // change newColor
  changeColor(newColor) {
    this.color = newColor;
  }
  // trail
  trail() {
    // customization
    myPendulum.stroke(this.color[0], this.color[1], this.color[2]);
    myPendulum.strokeWeight(2);
    // loops through the trail
    myPendulum.beginShape(); // begins the drawing
    myPendulum.noFill(); // the shape dosent have fill
    for (let i = 0; i < this.history.length; i += 2) {
      let x = this.history[i];
      let y = this.history[i + 1];
      myPendulum.vertex(x, y);
    }
    myPendulum.endShape(); // ends the shape
  }
  // deletes the trail
  deleteTrail() {
    // loops through and deletes all the history
    this.history = [];
  }

}
