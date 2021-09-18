class Vector {
  constructor(xIn, yIn) {
    this.x = xIn; // the vectors x value
    this.y = yIn; // the vectors y value

  }
  //adds to vectors togheter
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }
  // subtracts two vectors
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  // subtracts vector and point
  subP(x, y) {
    this.x -= x;
    this.y -= y;
  }
  // multiplies vector with value
  multi(v) {
    this.x *= v;
    this.y *= v;
  }
  // divides vector with value
  div(v) {
    if (v != 0) {
      this.x /= v;
      this.y /= v;
    }
  }
  // finds the magnitude(length) og the vectors
  mag() {
    return sqrt(this.x * this.x + this.y * this.y);
  }
  // finds the normal vectors
  nor() {
    let m = this.mag();
    if (m != 0) {
      return this.div(m);
    }
  }
  // finds the angle between vector and x axis in radians
  anglex(){
        let angle = 0; // the angle to be found
        angle = acos(this.x/(sqrt(this.x * this.x + this.y * this.y)));
        return angle; // returns the angle
    }


  // limits a values
  limit(value) {
    if (this.mag() > value) {
      this.nor();
      this.multi(value);
    }
  }
  // finds the distance between two vectors
  dist(vector) {
    let dx = vector.x - this.x; // dx
    let dy = vector.y - this.y; // dy
    let dist = sqrt(dx * dx + dy * dy); // calculates distance
    // makes sure it's a positive value
    if (dist < 0) {
      dist *= -1;
    }
    return dist;
  }
  // makes a vector between two points
  vecPoint(x_1, y_1, x_2, y_2) {
    this.x = x_1 - x_2;
    this.y = y_1 - y_2;

  }

  // this function lets you change the values
  set(x, y) {
    this.x = x;
    this.y = y;
  }
  // returns the vectors x value
  getX() {
    return this.x;
  }
  // returns the vectors y value
  getY() {
    return this.y
  }
  // returns itself
  get() {
    return this;
  }


}
