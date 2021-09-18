class Vector3 {
  constructor(xIn, yIn,zIn) {
    this.x = xIn; // the vectors x value
    this.y = yIn; // the vectors y value
    this.z = zIn
  }
  //adds to vectors togheter
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z
  }
  // subtracts two vectors
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z
  }
  // subtracts vector and point
  subP(x, y,z) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
  }
  // multiplies vector with value
  multi(v) {
    this.x *= v;
    this.y *= v;
    this.z *= v;
  }
  // divides vector with value
  div(v) {
    if (v != 0) {
      this.x /= v;
      this.y /= v;
      this.z /= v;
    }
  }
  // finds the magnitude(length) og the vectors
  mag() {
    return sqrt(this.x * this.x + this.y * this.y+this.z*this.z);
  }
  // finds the normal vectors
  nor() {
    let m = this.mag();
    if (m != 0) {
      return this.div(m);
    }
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
    let dz = vector.z - this.z; // dz
    let dist = sqrt(dx * dx + dy * dy+dz*dz); // calculates distance
    // makes sure it's a positive value
    if (dist < 0) {
      dist *= -1;
    }
    return dist;
  }
  // makes a vector between two points
  vecPoint(x_1, y_1,z_1,x_2, y_2,z_2) {
    this.x = x_1 - x_2;
    this.y = y_1 - y_2;
    this.z = z_1 - z_2;

  }

  // this function lets you change the values
  set(x, y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  // returns the vectors x value
  getX() {
    return this.x;
  }
  // returns the vectors y value
  getY() {
    return this.y
  }
  // returns the z value
  getZ(){
    return this.z;
  }
  // returns itself
  get() {
    return this;
  }


}
