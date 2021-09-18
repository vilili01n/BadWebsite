class Doublepen {
  constructor(pendulum1, pendulum2) {
    // world based physcis
    this.gravity = 9.82;
    this.clicked1 = false; // pen 1
    this.clicked2 = false; // pen 2
    this.dampening = 0; // dampening effect
    //pendulum 1
    this.pendulum1 = pendulum1;
    // pendulum 2
    this.pendulum2 = pendulum2;
    // changes the hanger to fit togheter
    let x = myPendulum.sin(this.pendulum1.angle) * this.pendulum1.length + this.pendulum1.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.pendulum1.angle) * this.pendulum1.length + this.pendulum1.hang.y; // finds the y value of the rod
    this.pendulum2.changeHang(x, y);
  }

  // displays the two pendulums
  display() {
    // checks if it needs to be folowing the mouse
    if(this.clicked1 || this.clicked2){
      // makes a new vector thats between hanger and mouse
      let vec = new Vector(0,0);
      // mouse coordinates
      let mx = myPendulum.mouseX;
      let my = myPendulum.mouseY;
      // checks which pendulum has been clicked
      if(this.clicked1){
        // makes vector
        vec.vecPoint(this.pendulum1.hang.x,this.pendulum1.hang.y,mx,my);
        //find angle between vector and -y axis
        let y = myPendulum.acos(-vec.getY()/(myPendulum.sqrt(vec.getX()*vec.getX()+vec.getY()*vec.getY())));
        // sees what side of the y the pendlum should be at
        if(mx < this.pendulum1.hang.x){
          y *= -1; // changes it to the left side
        }
        // sets the angle to the pendulum
        this.pendulum1.angle = y;
      }
      // if the second pendulum is touched
      else if(this.clicked2){
        // makes vector
        vec.vecPoint(this.pendulum2.hang.x,this.pendulum2.hang.y,mx,my);
        //find angle between vector and -y axis
        let y = myPendulum.acos(-vec.getY()/(myPendulum.sqrt(vec.getX()*vec.getX()+vec.getY()*vec.getY())));
        // sees what side of the y the pendlum should be at
        if(mx < this.pendulum2.hang.x){
          y *= -1; // changes it to the left side
        }
        // sets the angle to the pendulum
        this.pendulum2.angle = y;
      }
    }

    // makes pendulums perpendicular
    let x = myPendulum.sin(this.pendulum1.angle) * this.pendulum1.rod_length + this.pendulum1.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.pendulum1.angle) * this.pendulum1.rod_length + this.pendulum1.hang.y; // finds the y value of the rod
    this.pendulum2.changeHang(x, y); // changes hang position of hang
    // displays the pendulums
    this.pendulum1.display();
    this.pendulum2.display();
  }

  // updates the physics
  update() {
      // calculating angular acceleration
      let angleA1 = 0;
      let angleA2 = 0;
      // constants needed
      let vel1 = this.pendulum1.angleV;
      let vel2 = this.pendulum2.angleV;
      let mass1 = this.pendulum1.mass;
      let mass2 = this.pendulum2.mass;
      let length1 = this.pendulum1.rod_length;
      let length2 = this.pendulum2.rod_length;
      let angle1 = this.pendulum1.angle;
      let angle2 = this.pendulum2.angle;
      // denominator
      let den = length1 * (2 * mass1 + mass2 - mass2 * myPendulum.cos(2 * angle1 - 2 * angle2));
      // angle 1
      let one = this.gravity * (2 * mass1 + mass2) * myPendulum.sin(angle1);
      let two = mass2 * this.gravity * myPendulum.sin(angle1 - 2 * angle2);
      let three = 2 * myPendulum.sin(angle1 - angle2) * mass2 * (vel2 * vel2 * length2 + vel1 * vel1 * length1 * myPendulum.cos(angle1 - angle2));
      angleA1 = (-one - two - three) / den;
      // angle 2
      one = 2 * myPendulum.sin(angle1 - angle2)
      two = vel2 * vel2 * 2 * length1 * (mass1 + mass2);
      three = this.gravity * (mass1 + mass2) * myPendulum.cos(angle1);
      let four = vel2 * vel2 * length2 * mass2 * myPendulum.cos(angle1 - angle2);
      angleA2 = (one * (two + three + four)) / (den);

      // add the acceleration
      this.pendulum1.addAcceleration(angleA1);
      this.pendulum2.addAcceleration(angleA2);
      // updates the physics
      this.pendulum1.update();
      this.pendulum2.update();
  }

  // makes a trail
  trail() {
    // displays trail
    //this.pendulum1.trail(); // trail 1(not that interesting)
    this.pendulum2.trail(); // trail 2
  }
  // if the mouse has clicked
  click() {
    // calculates position
    // rod 2
    let x = myPendulum.sin(this.pendulum2.angle) * this.pendulum2.rod_length + this.pendulum2.hang.x; // finds the x value of the rod
    let y = myPendulum.cos(this.pendulum2.angle) * this.pendulum2.rod_length + this.pendulum2.hang.y; // finds the y value of the rod
    if (myPendulum.mouseX <= x + 20 && myPendulum.mouseX >= x - 20 && myPendulum.mouseY <= y + 20 && myPendulum.mouseY >= y - 20) {
      this.clicked2 = true;
    }
    // rod 1
    x = myPendulum.sin(this.pendulum1.angle) * this.pendulum1.rod_length + this.pendulum1.hang.x; // finds the x value of the rod
    y = myPendulum.cos(this.pendulum1.angle) * this.pendulum1.rod_length + this.pendulum1.hang.y; // finds the y value of the rod
    if (myPendulum.mouseX <= x + 20 && myPendulum.mouseX >= x - 20 && myPendulum.mouseY <= y + 20 && myPendulum.mouseY >= y - 20) {
      this.clicked1 = true;
    }
  }
  // if the mouse is relesaed
  notClick() {
    this.clicked1 = false;
    this.clicked2 = false;
  }
  // resets the velocity and trail
  reset(){
    this.pendulum1.angleV = 0;
    this.pendulum2.angleV = 0;
    this.pendulum2.deleteTrail();
  }
  // get and change functions

  // changes gravity
  changeGrav(newGrav){
    this.gravity = newGrav; // changes the gravity
  }
  // get rod1Length
  getRod1(){
    return this.pendulum1.rod_length;
  }
  // changed rod1 length
  changeRod1(newLength){
    this.pendulum1.rod_length = newLength;
  }
  //get rod2length
  getRod2(){
    return this.pendulum2.rod_length;
  }
  // change rod2 length
  changeRod2(newLength){
    this.pendulum2.rod_length = newLength;
  }
  // get mass of pendulum 1
  getMass1(){
    return this.pendulum1.mass;
  }
  // changes mass of pendulum 1
  changeMass1(newMass){
    this.pendulum1.mass = newMass;
  }
  // get mass of pendulum 2
  getMass2(){
    return this.pendulum2.mass;
  }
  // changes mass of pendulum 2
  changeMass2(newMass){
    this.pendulum2.mass = newMass;
  }
  // get angel 1
  getAngel1(){
    return this.pendulum1.angle;
  }
  // change angel 1
  changeAngel1(newAngle){
    this.pendulum1.angle = newAngle;
  }
  // get angel 2
  getAngel2(){
    return this.pendulum2.angle;
  }
  // change angel 2
  changeAngel2(newAngle){
    this.pendulum2.angle = newAngle;
  }
  // changes the dampening values
  changeDamp(newDamp){
    this.pendulum1.changeDamp(newDamp);
    this.pendulum2.changeDamp(newDamp);
  }
  // gets the color of pendulum
  getColor(){
    return this.pendulum1.color;
  }
  // changes the color of the pendulum
  changeColor(newColor){
    this.pendulum1.changeColor(newColor);
    this.pendulum2.changeColor(newColor);
  }
  //changes the trail trailLimit
  changeTrailLimit(newLimit){
    this.pendulum1.trailLimit = newLimit;
    this.pendulum2.trailLimit = newLimit;
  }
}
