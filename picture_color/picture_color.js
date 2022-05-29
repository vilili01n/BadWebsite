// a class that makes a cell based on it's RGB value
class Og_cell {
  constructor(red,green,blue,alpha,rad,pos,depth) {
    // applies the color to the cell
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    this.rad = rad;
    this.pos = pos
    this.depth = depth;
  }
  display(){
    fill(this.red,this.green,this.blue,this.alpha);
    circle(this.pos.x,this.pos.y,this.rad);
  }
}
// function that preloads the test image
function preload(){
  test_img = loadImage('picture_color/images/test_img.jpg');
}

let pic_width = 64;
let pic_height = 64;
let rad = 7; // the radius of depth 0 cells
// setup
function setup(){
test_img.loadPixels(); // loads the pixels
test_img.resize(pic_width,pic_height); // resizes the picture to match the desired size




canvas = createCanvas(windowWidth,windowHeight); // creates canvas
// the array that stores all cells that should be visible
cells = new Array();
// Makes some basic cells with a position
// the vertical line
for(let j = 0;j<pic_height;j++){
  for(let i = 0;i<pic_width;i++){ // the horizontal line
    let r = pic_width*j*4;
    cells.push(new Og_cell(test_img.pixels[i*4+r],test_img.pixels[i*4+1+r],test_img.pixels[i*4+2+r],test_img.pixels[i*4+3+r],rad,new Vector(300+i*rad,25+j*rad),0));
    }
}
// merges the cells together
for(let l = 0;l<6;l++){ // determines the amount of layers to go to
rad = rad*2; // calculates new radius
// vertical
  for(let j = 0; j<pic_height; j+=2){
    //horizontal
    for(let i=0; i<pic_width; i+=2){
      // // finds the x and y value of the new cell
      let row = pic_width * j;
      let x = (cells[pic_width+i+1+row].pos.x-cells[i+row].pos.x)/2+cells[i+row].pos.x;
      let y = (cells[pic_width+i+1+row].pos.y-cells[i+row].pos.y)/2+cells[i+row].pos.y;
      // finds the new cell radius

      // adds new cell to array
      cells.push(new Cell(cells[i+row],cells[i+1+row],cells[pic_width+i+row],cells[pic_width+i+1+row],rad,new Vector(x,y),1));
    }
  }
  // removes layer and changes the pictures width and height
  cells.splice(0,pic_width*pic_height);
  pic_width = pic_width/2;
  pic_height = pic_height/2;
}
}

// draw function
function draw(){
background(255,255,255);
// draws all the cells
for(let i = 0; i<cells.length;i++){
  cells[i].display();
}
}

// function that splits the cell if the mouse is moved over it
function mouseMoved(){
  // looks if the mouse is above any of the cirles
  let mouse = new Vector(mouseX,mouseY);
  for(let i = 0;i<cells.length;i++){
    let dis = cells[i].pos.dist(mouse); // calculates the distance
    // checks if it's within the circle
    if(dis <= cells[i].rad && cells[i].depth > 0){
        slice(cells[i],i); // slices the cell
    }
  }
}
// splits the cell into it's 4 building blocks
function slice(cell,index){
  // adds the cells to the array
  cells.push(cell.cell1);
  cells.push(cell.cell2);
  cells.push(cell.cell3);
  cells.push(cell.cell4);
  // removes the original from the Array
  cells.splice(index,1);
}
