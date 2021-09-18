// creates the website canvas
let sigma = 10;
let rho = 28;
let beta = 8 / 3;
let dt = 0.01;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // a 3d canvas
  // creates a ball object
  ball = new Ball(255);
  angle = PI;
}

function draw() {
  background(100, 100, 100);
  calculate();
  scale(5);
  ball.display();
  ball.update();
  angle += 0.005;
  //angle = radians(angle);
  // converts the angle to radians
  rotateCam(angle,(height / 2) / tan(PI / 6));
}

// calculates the value(temporay Lorenz attractor)
function calculate() {
  // calculates the change in time
  let pos = ball.getPos()
  let dx = (sigma * (pos.y - pos.x)) * dt;
  let dy = (pos.x * (rho - pos.z) - pos.y) * dt;
  let dz = (pos.x * pos.y - beta * pos.z) * dt;
  // aplies the change
  ball.updateVelocity(new Vector3(dx, dy, dz));
}

// rotate the camera around the y axis
function rotateCam(angle, radius) {
  // calculates the new x and y based on the radius given (x^2+y^2=r^2)
  let x = radius * cos(angle);
  let z = radius * sin(angle);
  // changes the camera position
  camera(x,0,z, 1, 1, 1, 0, 1, 0)
}
