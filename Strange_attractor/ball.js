class Ball{
  constructor(color) {
    this.color = color; // the spheres starting color
    this.pos = new Vector3(1,1,1); // the position vector
    // the velocities of the diffrent coordinates
    this.velocity = new Vector3(0,0,0); // the velocity vector
    this.history = []; // stores the 4path of the ball
  }
  // display
  display(){
    // draws the sphere with the color
    stroke(this.color,0,0);
    point(this.pos.x,this.pos.y,this.pos.z);
    // stores the pos
    this.history.push(this.pos.x);
    this.history.push(this.pos.y);
    this.history.push(this.pos.z);
    // draws the trail
    colorMode(HSB);
    beginShape();
    noFill();
    let hu =0;
    // loops through the history
    for(let i =0;i<this.history.length;i+=3){
      stroke(hu,255,255);
      vertex(this.history[i],this.history[i+1],this.history[i+2]);
      hu %= i;
      if(hu > 255){
        hu =0;
      }
    }
    endShape();
    colorMode(RGB);
  }

  // changes the position of the spheres(must be called before translate)
  update(){
    this.pos.add(this.velocity)
  }

  // changes the position immideaetly
  updateVelocity(vector){
    this.velocity = vector;
  }
  // get the position of the Ball as a array
  getPos(){
    return this.pos;
  }
}
