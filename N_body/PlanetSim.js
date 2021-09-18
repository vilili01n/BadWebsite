let p = [];
let cameraState = 0; // the state 0 = follow, 1 = centered
let universeState = 1; // 0 = active, 1 = paused
let trailState = 1; // 0 = on, 1 = off

// creates the website canvas
function setup(){
  canvas = createCanvas(700,640);
  // making the sun
  let force = new Vector(0,0); // initial velocity
  let Suncolor = [100,230,140];
  p.push(new Planet(height/2,width/2,16,Suncolor,30000000000,force)); // adds new planet
  // another planet
  let force2 = new Vector(0,3); // initial velocity
  let aColor = [173,255,47]
  p.push(new Planet(height/4,width/2,10,aColor,300,force2)); // adds new planet

  UI();// adds the UI
  CreatePlanetUi(); // adds the planet creating UI
}

function draw() {
  background(100,100,100); // draws the background a grey color
  // all the physics if the univers is ready to calculate them
  switch(universeState){
    case 0:
      for(let i = 0;i<p.length;i++){ // loops through all the planets
        for(let j = 0;j<p.length; j++){ // attracts the planet to all forces
          // checks that it dosent add the same planet togheter
          if(i != j){
            p[i].gForce(p[j]); // adds the gForce
          }
        }
      }
      break; // breaks the switch statement
    case 1:
      for(let i = 0;i<p.length;i++){
        p[i].pause(); // pauses the planet
      }
      break;
  }
   // updates the position of the planets
   for(let i = 0;i<p.length;i++){
      p[i].update(); // displays the planet
    }

  // displays the planets
  for(let i = 0;i<p.length;i++){
    p[i].display(); // displays the planet
    if(trailState == 0){
      p[i].trail(); // displays the trail behind the planet
    }
  }

  // makes the camera follow a certain index
  if(cameraState == 0){
  camera.position.x = p[0].get().x;
  camera.position.y = p[0].get().y;
}

}

// regieters globally if the mouse is pressed
function mousePressed(){
  for(let i = 0;i<p.length;i++){ // loops through all planets
     if (p[i].click()){
       cameraState = 1; // the camera is at a standstill
     }
 }

if(mouseButton === RIGHT){
  camera.zoom -= 0.1;
}

}
// regieters globally if the mouse is released
function mouseReleased(){
  for(let i = 0;i<p.length;i++){ // loops through all planets
    if (p[i].notclick()){

    }
}

}
function UI(){ // the UI of the simulaton
  run = createButton("Run"); // the run button
  run.position(705,580); // position of the run Button

  stop = createButton("stop"); // the stop button
  stop.position(750,580); // position of the stop Button

  camButton = createButton("Camera"); // the Camera
  camButton.position(800,580); // position of the camra button

  trailButton = createButton("Trail"); // the trail
  trailButton.position(705,550); // position of the trail button

  resetButton = createButton("Reset"); // the trail
  resetButton.position(750,550); // position of the trail button

  run.mousePressed(changeUniToZero);
  stop.mousePressed(changeUniToOne);
  camButton.mousePressed(changeCamera);
  trailButton.mousePressed(changeTrail);
  resetButton.mousePressed(reset);
}

function CreatePlanetUi(){
  // header
  headerText = createElement('h1','CreatePlanet');
  headerText.position(700,20);
  // creates all the input elements
  // radius Input
  radiusInput = createInput();
  radiusInput.position(755,100);
  radiusInput.size(50);
  radiusText = createElement('h4','Radius:');
  radiusText.position(700,81);
  // Mass Input
  massInput = createInput();
  massInput.position(742,130);
  massInput.size(100);
  massText = createElement('h4','Mass:');
  massText.position(700,110);
  // tangential velocity
  velocityXInput = createInput(); // x value of vector
  velocityYInput = createInput(); // y value of vector
  velocityXInput.position(760,159);
  velocityYInput.position(800,159);
  velocityXInput.size(25);
  velocityYInput.size(25);
  velocityText = createElement('h4','Velocity:');
  velocityText.position(700,139);
  commaText = createElement('h4',','); // the comma
  commaText.position(794,145);
  // the location
  locationXInput = createInput(); // x value of vector
  locationYInput = createInput(); // y value of vector
  locationXInput.position(765,189);
  locationYInput.position(805,189);
  locationXInput.size(25);
  locationYInput.size(25);
  locationText = createElement('h4','Location:');
  locationText.position(700,168);
  LcommaText = createElement('h4',','); // the comma
  LcommaText.position(799,175);
  // the submit button
  submitButton = createButton('Create Planet')
  submitButton.position(701,220);
  submitButton.mousePressed(spawnPlanet);
}

// functions to the UI and create planet
function changeUniToOne(){ // changes the universe state
  universeState = 1; // changes the universe to static
}
// changes the universe state
function changeUniToZero(){ // changes the universe state
  // adds the initial forces
  for(let i = 0;i<p.length;i++){
    p[i].addTanForce();
  }
  universeState = 0; // changes the universe to dynamic
}
// turns camera on or off
function changeCamera(){
  if(cameraState == 0){
    cameraState = 1;
  } else {
    cameraState = 0;
  }
}
// turns trail on or off
function changeTrail(){
  if(trailState == 0){
    trailState = 1;
  } else {
    trailState = 0;
  }
}
function reset(){
  universeState = 1; // makes the univers stand still
  // resets all the positions to the standard
  for(let i = 0;i<p.length;i++){
    p[i].resetPos();
  }
}
function spawnPlanet(){
  let check = true; // keeps track that it's all input correctly
  let error = []; // string that contains all error messages
  text = createP('');
  // gets the values as a integer
  let locationX = parseInt(locationXInput.value());
  let locationY = parseInt(locationYInput.value());
  let tanVector = new Vector(parseInt(velocityXInput.value()),parseInt(velocityYInput.value()));
  let mass = parseInt(massInput.value());
  let radius = parseInt(radiusInput.value());
  // makes a random Color
  let color = [random(0,255),random(0,255),random(0,255)];
  // checks that all inputs are correct
  // radius
  if(radius<= 0 || isNaN(radius)){
    check = false;
    error.push("radius has to be a natural number");
  }
  // mass
  if(mass< 0 || isNaN(mass)){
    check = false;
    error.push("mass has to be a positive number");
  }
  // tangential velocity vector
  if(isNaN(tanVector.getX())){ // x value
    check = false;
    error.push("x value of vector must have a value")
  }
  if(isNaN(tanVector.getY())){ // y value
    check = false;
    error.push("y value of vector must have a value")
  }
  // location
  if(isNaN(locationX)){ // x value
    check = false;
    error.push("x location value must have a value")
  }
  if(isNaN(locationY)){ // y value
    check = false;
    error.push("y location value must have a value")
  }
  // spawns the planet with a random Color, if the inputs are correct
  if(check){
    p.push(new Planet(locationX,locationY,radius,color,mass,tanVector)); // adds new planet
    console.log("spawned")
  }
    else{ // prints all the error messages
      // array that loops through all the text
      for(let i = 0;i<error.length;i++){
      console.log(error[i]);
  }
}
}
