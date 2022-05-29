class Cell {
  constructor(cell1,cell2,cell3,cell4,rad,pos,depth) {
    this.cell1 = cell1;
    this.cell2 = cell2;
    this.cell3 = cell3;
    this.cell4 = cell4;
    this.rad = rad;
    this.pos = pos;
    this.depth = depth;
    // calculates the color of the cell
    this.red = this.clamp(0,255,(this.cell1.red+this.cell2.red+this.cell3.red+this.cell4.red)/4);
    this.green = this.clamp(0,255,(this.cell1.green+this.cell2.green+this.cell3.green+this.cell4.green)/4);
    this.blue = this.clamp(0,255,(this.cell1.blue+this.cell2.blue+this.cell3.blue+this.cell4.blue)/4);
    this.alpha = this.clamp(0,255,(this.cell1.alpha+this.cell2.alpha+this.cell3.alpha+this.cell4.alpha)/4);
  }
  display(){
    fill(this.red,this.green,this.blue,this.alpha);
    circle(this.pos.x,this.pos.y,this.rad);
  }

  // clamps a number between a min and max value
  clamp(min,max,num){
    if (num > max){ // if num is to high
      return num/max;
    }
    else if (num < min){ // if num is too low
      return num+max;
    }
    else return num;

  }
}
