class Planet {
  constructor(locX,locY,rad,color,mass,tanVelocity) {
    this.location = new Vector(locX,locY,); // location of object
    this.startLocation = new Vector(locX,locY); // the start location
    this.velocity = new Vector(0,0); // velocity of object
    this.acceleration = new Vector(0,0); // acceleration of object
    this.tanVelocity = tanVelocity; // the tangential velocity
    this.r = rad; // radius of ellipse
    this.color = color; // color of the ellipse
    this.clicked = false; // registers when the mouse is clicked on planet or not
    this.G = 0.0001; // the gravitatonal constant
    this.mass = mass;
    this.history = [];
    this.trailLimit = 150; // the limit of the length of the trail
  }
  // updates the physics of the object
  update(){
    if(this.clicked){ // follows physics of the mouse
      this.location.set(camera.mouseX,camera.mouseY);
    }

    else{ // follow physics of the world

      // adds the physcis
      this.velocity.add(this.acceleration); // applies acceleration to the velocit
      this.location.add(this.velocity);
      this.acceleration.multi(0); // resets the velocity
      this.history.push(this.location.getX(),this.location.getY());   // adds the trail
      if(this.history.length > this.trailLimit){ // makes the trail have a limit
        this.history.shift();
        this.history.shift();
      }
    }
  }
  // displays the object on screen
  display(){
    stroke(0);// sets the stroke
    fill(this.color[0],this.color[1],this.color[2]);// sets the color
    ellipse(this.location.x,this.location.y,this.r*2);  // creates a circle
  }

  // calculates force between this and other Vector
  gForce(planet_2){
  // finds the distance between the two planets
  let r = new Vector(0,0); // the vector between the two planets
  r.vecPoint(this.location.x,this.location.y,planet_2.get().x,planet_2.get().y); // makes the vector between the two planets
  let r_length = r.mag();
  // makes it m
  r_length *= 1000;
  // // calculates the force
  r.nor(); // normalises the vectors
  r.multi((this.G*this.mass*planet_2.getMass())/(r_length*r_length)); // calculates the gForce
  r.multi(-1); // makes it point the right direction
  // converts it to acceleration and then adds it
  this.acceleration.add(r);
}

  // gets the location x
  get(){
    return this.location;
  }
  // gets the mass of the objects
  getMass(){
    return this.mass;
  }

  click(){
    if(camera.mouseX <= this.location.x+this.r && camera.mouseX >= this.location.x-this.r && camera.mouseY <= this.location.y+this.r && camera.mouseY >= this.location.y-this.r){
      this.clicked = true;
      return true;
    }
  }
  notclick(){
    this.clicked = false;
    this.acceleration.multi(0); // resets the acceleration
    return true;
  }
  reset(){ // resets the acceleration
    this.acceleration.multi(0);
  }
  addForce(vector){ // adds a force
    this.acceleration.add(vector);
  }

  pause(){ // pauses the movemoent of the planet
    this.velocity.multi(0);
  }
  // draws the planet trail
  trail(){
    // draws the ellipses as a trail
    for(let i = 2;i<this.history.length;i += 2){
      stroke(this.color[0],this.color[1],this.color[2],255); // the color of the point
      let pos = new Vector(this.history[i],this.history[i+1])// the position that needs to get drawn
      point(pos.x,pos.y);
    }
  }
  // adds the tangential velocity
  addTanForce(){
    this.acceleration.add(this.tanVelocity)
  }

  // resets the planet to start location
  resetPos(){
    this.location.set(this.startLocation.getX(),this.startLocation.getY()); // makes the location the same
    this.history = []; // emptys the trail array
  }
}
