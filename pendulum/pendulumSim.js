// instance mode
var pendulumSim = function(p) {
  // local variables
  p.universeState = false; // if the physics work
  p.pendulum = []; // holds pendulum arrays
  p.pendulum.length = 2; // two pendulums for double pendulum
  p.dPen = []; // array with double pendulums
  p.colors = [11,127,127];
  p.setup = function() {
    p.canvas = p.createCanvas(650, 740);
    //UI
    p.ui();
    // makes 1 pendulum
    p.spawn(1);
  }

  p.draw = function() {
    p.background(100, 100, 100);
    // loops through all the pendulums and updates the drawing
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].display()
      //console.log(dPen[i]);
    }
    // updates the physics
    if (p.universeState) {
      for (let i = 0; i < p.dPen.length; i++) {
        p.dPen[i].update(); // physics
        p.dPen[i].trail(); // trail
      }
    }
  }

  // calls when pendulums need to be spawned
  p.spawn = function(amount) {
    // calculates if it needs to spawn a despawn
    let penAmount = amount - p.dPen.length;

    // makes a bunch of pendulums if penAmount is positive
    if (penAmount > 0) {
      for (let i = 1; i < penAmount + 1; i++) {
        let hang = new Vector(650 / 2, 200); // the pendulum hang
        let angle = p.PI / 2; // the start angle
        p.pendulum[0] = new Pendulum(hang, p.rod1Slider.value(), angle, p.mass2Slider.value(),p.colors); // pendlum 1
        p.pendulum[1] = new Pendulum(hang, p.rod2Slider.value(), angle, p.mass2Slider.value(),p.colors); // pendulum 2
        p.dPen.push(new Doublepen(p.pendulum[0], p.pendulum[1])); // adds new Double pendulum
      }
    }
    // deletes pendulums if too many
    else if (penAmount < 0) {
      for (let i = 1; i > penAmount + 1; i--) {
        p.dPen.pop();
      }
    }
    // checks there is more then one pendulum
    if (p.dPen.length > 1) {
      p.changeAll(); // makes the changes
    }
  }
  // includes all the changes
  p.changeAll = function() {
    // angle 1
    p.dangel1_2();
    //angle 2
    p.dangel2_2();
    // mass 1
    p.dmass1_2();
    // mass 2
    p.dmass2_2();
    // rod 1
    p.drod1_2();
    // rod 2
    p.drod2_2();
    // color
    p.dcolor();
  }
  // calls if the mouse is pressed
  p.mousePressed = function() {
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].click();
    }
  }

  // calls if the mouse is released
  p.mouseReleased = function() {
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].notClick();
    }
  }
  // the ui DOM elements
  p.ui = function() {
    // stop button
    p.stopButton = p.createButton("Stop");
    p.stopButton.position(710, 570);
    p.stopButton.mousePressed(p.stop);
    //start button
    p.startButton = p.createButton("Start");
    p.startButton.position(660, 570);
    p.startButton.mousePressed(p.start);
    // gravity UI
    p.gravSlider = p.createSlider(0, 50, 9.82, 0.1);
    p.gravSlider.position(720, 20);
    p.gravSlider.size(100);
    p.gravInput = p.createInput(String(p.gravSlider.value()));
    p.gravInput.position(830, 20);
    p.gravInput.size(30);
    p.gravText = p.createElement('h4', 'Gravity:');
    p.gravText.position(660, -1);
    // rod length of pendulum 1
    p.rod1Slider = p.createSlider(1, 150, 50, 1);
    p.rod1Slider.position(720, 50);
    p.rod1Slider.size(100);
    p.rod1Input = p.createInput(String(p.rod1Slider.value()));
    p.rod1Input.position(830, 50);
    p.rod1Input.size(30);
    p.rod1Text = p.createElement('h4', 'length 1:');
    p.rod1Text.position(660, 29);
    // rod length of pendulum 2
    p.rod2Slider = p.createSlider(1, 150, 50, 1);
    p.rod2Slider.position(720, 80);
    p.rod2Slider.size(100);
    p.rod2Input = p.createInput(String(p.rod2Slider.value()));
    p.rod2Input.position(830, 80);
    p.rod2Input.size(30);
    p.rod2Text = p.createElement('h4', 'length 2:');
    p.rod2Text.position(660, 59);
    // mass of pendlum 1
    p.mass1Slider = p.createSlider(1, 150, 50, 1);
    p.mass1Slider.position(720, 110);
    p.mass1Slider.size(100);
    p.mass1Input = p.createInput(String(p.mass1Slider.value()));
    p.mass1Input.position(830, 110);
    p.mass1Input.size(30);
    p.mass1Text = p.createElement('h4', 'Mass 1:');
    p.mass1Text.position(660, 89);
    // mass of pendulum 2
    p.mass2Slider = p.createSlider(1, 150, 50, 1);
    p.mass2Slider.position(720, 140);
    p.mass2Slider.size(100);
    p.mass2Input = p.createInput(String(p.mass1Slider.value()));
    p.mass2Input.position(830, 140);
    p.mass2Input.size(30);
    p.mass2Text = p.createElement('h4', 'Mass 2:');
    p.mass2Text.position(660, 119);
    // dampening effect
    p.dampSlider = p.createSlider(-1, -0.99, -1, 0.001);
    p.dampSlider.position(720, 170);
    p.dampSlider.size(100);
    p.dampInput = p.createInput(String(p.dampSlider.value() * -1));
    p.dampInput.position(830, 170);
    p.dampInput.size(40);
    p.dampText = p.createElement('h4', 'Damp:');
    p.dampText.position(660, 149);
    // trail length
    p.trailSlider = p.createSlider(0, 5000, 0, 100);
    p.trailSlider.position(720, 200);
    p.trailSlider.size(100);
    p.trailInput = p.createInput(String(p.trailSlider.value()));
    p.trailInput.position(830, 200);
    p.trailInput.size(30);
    p.trailText = p.createElement('h4', 'Trail:');
    p.trailText.position(660, 179);
    // color picker
    p.colorPicker = p.createColorPicker('#0B7F7F');
    p.colorPicker.position(720, 230);
    p.colorText = p.createElement('h4', 'Color:');
    p.colorText.position(660, 209)

    // event handlers
    p.gravSlider.input(p.grav);
    p.gravInput.input(p.grav1);
    p.rod1Slider.input(p.rod1);
    p.rod1Input.input(p.rod1_1);
    p.rod2Slider.input(p.rod2);
    p.rod2Input.input(p.rod2_1);
    p.mass1Slider.input(p.mass1);
    p.mass1Input.input(p.mass1_2);
    p.mass2Slider.input(p.mass2);
    p.mass2Input.input(p.mass2_2);
    p.dampSlider.input(p.damp);
    p.dampInput.input(p.damp2);
    p.trailSlider.input(p.trail);
    p.trailInput.input(p.trail1);
    p.colorPicker.input(p.colorPic);

    // ui 2
    // amount
    p.amountSlider = p.createSlider(0, 10, 1, 1);
    p.amountSlider.position(1020, 21);
    p.amountSlider.size(100);
    p.amountInput = p.createInput(String(p.amountSlider.value()));
    p.amountInput.position(1130, 21);
    p.amountInput.size(30);
    p.amountText = p.createElement('h4', 'Amount:');
    p.amountText.position(960, 0);
    // rod 1 diffrende
    p.drod1Slider = p.createSlider(0, 1, 0, 0.01);
    p.drod1Slider.position(1020, 51);
    p.drod1Slider.size(100);
    p.drod1Input = p.createInput(String(p.drod1Slider.value()));
    p.drod1Input.position(1130, 51);
    p.drod1Input.size(30);
    p.drod1Text = p.createElement('h4', '\u0394 rod1:');
    p.drod1Text.position(960, 30);
    // rod 2 diffrences
    p.drod2Slider = p.createSlider(0, 1, 0, 0.01);
    p.drod2Slider.position(1020, 81);
    p.drod2Slider.size(100);
    p.drod2Input = p.createInput(String(p.drod2Slider.value()));
    p.drod2Input.position(1130, 81);
    p.drod2Input.size(30);
    p.drod2Text = p.createElement('h4', '\u0394 rod2:');
    p.drod2Text.position(960, 60);
    //  mass 1 diffrences
    p.dmass1Slider = p.createSlider(0, 1, 0, 0.01);
    p.dmass1Slider.position(1020, 111);
    p.dmass1Slider.size(100);
    p.dmass1Input = p.createInput(String(p.dmass1Slider.value()));
    p.dmass1Input.position(1130, 111);
    p.dmass1Input.size(30);
    p.dmass1Text = p.createElement('h4', '\u0394 mass1:');
    p.dmass1Text.position(960, 90);
    // mass 2 diffrences
    p.dmass2Slider = p.createSlider(0, 1, 0, 0.01);
    p.dmass2Slider.position(1020, 141);
    p.dmass2Slider.size(100);
    p.dmass2Input = p.createInput(String(p.dmass2Slider.value()));
    p.dmass2Input.position(1130, 141);
    p.dmass2Input.size(30);
    p.dmass2Text = p.createElement('h4', '\u0394 mass2:');
    p.dmass2Text.position(960, 120);
    // Angel 1 diffrence
    p.dAngel1Slider = p.createSlider(0, 1, 0, 0.01);
    p.dAngel1Slider.position(1020, 171);
    p.dAngel1Slider.size(100);
    p.dAngel1Input = p.createInput(String(p.dAngel1Slider.value()));
    p.dAngel1Input.position(1130, 171);
    p.dAngel1Input.size(30);
    p.dAngel1Text = p.createElement('h4', '\u0394 angel1:');
    p.dAngel1Text.position(960, 150);
    // Angel 2 diffrence
    p.dAngel2Slider = p.createSlider(0, 1, 0, 0.01);
    p.dAngel2Slider.position(1020, 201);
    p.dAngel2Slider.size(100);
    p.dAngel2Input = p.createInput(String(p.dAngel2Slider.value()));
    p.dAngel2Input.position(1130, 201);
    p.dAngel2Input.size(30);
    p.dAngel2Text = p.createElement('h4', '\u0394 angel2:');
    p.dAngel2Text.position(960, 180);
    // color diffrence
    p.dColorSlider = p.createSlider(0, 1, 0, 0.01);
    p.dColorSlider.position(1020, 231);
    p.dColorSlider.size(100);
    p.dColorText = p.createElement('h4', '\u0394 Color:');
    p.dColorText.position(960, 210);
    //events
    p.amountSlider.input(p.amount);
    p.amountInput.input(p.amount1);
    p.drod1Slider.input(p.drod1_1)
    p.drod1Input.input(p.drod1_2);
    p.drod2Slider.input(p.drod2_1)
    p.drod2Input.input(p.drod2_2);
    p.dmass1Slider.input(p.dmass1_1);
    p.dmass1Input.input(p.dmass1_2);
    p.dmass2Slider.input(p.dmass2_1);
    p.dmass2Input.input(p.dmass2_2);
    p.dAngel1Slider.input(p.dangel1_1);
    p.dAngel1Input.input(p.dangel1_2);
    p.dAngel2Slider.input(p.dangel2_1);
    p.dAngel2Input.input(p.dangel2_2);
    p.dColorSlider.input(p.dcolor);
  }
  // ui functions
  //colorPicker
  p.colorPic = function() {
    // converts the color from hex to RGB
    let hexString = p.colorPicker.value(); // the choosen color
    hexString = hexString.substring(1); // removes the hashtag
    p.colors[0] = parseInt(hexString.slice(0, 2), 16); // red
    p.colors[1] = parseInt(hexString.slice(2, 4), 16);
    p.colors[2] = parseInt(hexString.slice(4, 6), 16);
    // goes through all the pendulums
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeColor(p.colors);
    }
    p.dcolor();
  }
  //trail
  p.trail = function() {
    p.trailInput.value(p.trailSlider.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeTrailLimit(p.trailSlider.value());
    }
  }

  p.trail1 = function() {
    p.trailSlider.value(p.trailInput.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeTrailLimit(p.trailInput.value());
    }
  }
  // dampening
  p.damp = function() {
    p.dampInput.value(p.dampSlider.value() * -1);
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeDamp(p.dampSlider.value() * -1);
    }
  }

  p.damp2 = function() {
    p.dampSlider.value(p.dampInput.value() * -1);
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeDamp(p.dampInput.value());
    }
  }

  // functions for mass
  p.mass2 = function() {
    p.mass2Input.value(p.mass2Slider.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeMass2(p.mass2Slider.value());
    }
    p.dmass2_2();
  }

  p.mass2_2 = function() {
    p.mass2Slider.value(p.mass2Input.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeMass2(p.mass2Input.value());
    }
    p.dmass2_2();
  }

  p.mass1 = function() {
    p.mass1Input.value(p.mass1Slider.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeMass1(p.mass1Slider.value());
    }
    p.dmass1_2();
  }

  p.mass1_2 = function() {
    p.mass1Slider.value(p.mass1Input.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeMass1(p.mass1Input.value());
    }
    p.dmass1_2();
  }

  // functions for length
  p.rod1 = function() {
    p.rod1Input.value(p.rod1Slider.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeRod1(p.rod1Slider.value());
    }
    // changes length if needed
    p.drod1_2();
  }

  p.rod1_1 = function() {
    p.rod1Slider.value(p.rod1Input.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeRod2(p.rod1Input.value());
    }
    // changes length if needed
    p.drod1_2();
  }

  p.rod2 = function() {
    p.rod2Input.value(p.rod2Slider.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeRod2(p.rod2Slider.value());
    }
    // changes length if needed
    p.drod2_2();
  }

  p.rod2_1 = function() {
    p.rod2Slider.value(p.rod2Input.value());
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeRod1(p.rod2Input.value());
    }
    // changes length if needed
    p.drod2_2();
  }
  // function for gravity segment
  p.grav = function() {
    // sets the input value to the slider
    p.gravInput.value(p.gravSlider.value());
    // changes Gravity for all pendulums
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeGrav(p.gravSlider.value());
    }
  }

  p.grav1 = function() {
    // sets the input value to the slider
    p.gravSlider.value(p.gravInput.value());
    // changes Gravity for all pendulums
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].changeGrav(p.gravInput.value());
    }
  }
  // function for stop button
  p.stop = function() {
    p.universeState = false;
    // resets all the pendulums
    for (let i = 0; i < p.dPen.length; i++) {
      p.dPen[i].reset();
    }
  }

  p.start = function() {
    p.universeState = true;
  }

  // event funtions for UI 2
  // color
  p.dcolor = function() {
    // changes the colors on a spectrum
    let startColors = p.dPen[0].getColor(); // all the colors
    let startR = startColors[0]; // the red color
    let startG = startColors[1]; // the green color
    let startB = startColors[2]; // the blue color
    // calculates the diffrence margin
    let dif = parseInt(((255 / p.dPen.length) - 0.5) * (p.dColorSlider.value()));
    // loops through all pendulums
    for (let i = 1; i < p.dPen.length; i++) {
      // Holds the new color
      let color = [];
      color.length = 3;
      //RED
      startR += dif // adds the margin
      // checks that color dosent go over 255
      if (startR > 255) {
        startR -= 255;
      }
      color[0] = startR; // adds the color
      // //Green
      // startG += dif;
      // if (startG > 255) {
      //   startG -= 255;
      // }
      // color[1] = startG;
      // // Blue
      // startB += dif;
      // if (startB > 255) {
      //   startB -= 255;
      // }
      // color[2] = startB;
      // adds the colors  to the pendulum
      color[1] = startG;
      color[2] = startB;
      p.dPen[i].changeColor(color);
    }
  }

  // angel 2
  p.dangel2_1 = function() {
    // changes slider values
    p.dAngel2Input.value(p.dAngel2Slider.value());
    // finds starting number
    let start = p.dPen[0].getAngel2();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.dAngel2Slider.value();
      p.dPen[i].changeAngel2(start);
    }
  }

  p.dangel2_2 = function() {
    // changes slider values
    p.dAngel2Slider.value(p.dAngel2Input.value());
    // checks that the value is not empty
    if ((p.dAngel2Input.value() === "") == false) {
      // finds starting number
      let start = p.dPen[0].getAngel2();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.dAngel2Input.value());
        p.dPen[i].changeAngel2(start);
      }
    }
  }
  // angel 1
  p.dangel1_1 = function() {
    // changes slider values
    p.dAngel1Input.value(p.dAngel1Slider.value());
    // finds starting number
    let start = p.dPen[0].getAngel1();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.dAngel1Slider.value();
      p.dPen[i].changeAngel1(start);
    }
  }

  p.dangel1_2 = function() {
    // changes slider values
    p.dAngel1Slider.value(p.dAngel1Input.value());
    // checks that the value is not empty
    if ((p.dAngel1Input.value() === "") == false) {
      // finds starting number
      let start = p.dPen[0].getAngel1();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.dAngel1Input.value());
        p.dPen[i].changeAngel1(start);
      }
    }
  }
  // mass 2
  p.dmass2_1 = function() {
    // changes slider values
    p.dmass2Input.value(p.dmass2Slider.value());
    // finds starting number
    let start = p.dPen[0].getMass2();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.dmass2Slider.value();
      p.dPen[i].changeMass2(start);
    }
  }

  p.dmass2_2 = function() {
    // changes slider values
    p.dmass2Slider.value(p.dmass2Input.value());
    // checks that the value is not empty
    if ((p.dmass2Input.value() === "") == false) {
      // finds starting number
      let start = p.dPen[0].getMass2();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.dmass2Input.value());
        p.dPen[i].changeMass2(start);
      }
    }
  }
  // mass 1
  p.dmass1_1 = function() {
    // changes slider values
    p.dmass1Input.value(p.dmass1Slider.value());
    // finds starting number
    let start = p.dPen[0].getMass1();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.dmass1Slider.value();
      p.dPen[i].changeMass1(start);
    }
  }

  p.dmass1_2 = function() {
    // changes slider values
    p.dmass1Slider.value(p.dmass1Input.value());
    // checks that the value is not empty
    if ((p.dmass1Input.value() === "") == false) {
      // finds starting number
      let start = p.dPen[0].getMass1();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.dmass1Input.value());
        p.dPen[i].changeMass1(start);
      }
    }
  }
  // rod 2 length
  p.drod2_1 = function() {
    // changes slider values
    p.drod2Input.value(p.drod2Slider.value());
    // finds starting number
    let start = p.dPen[0].getRod2();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.drod2Slider.value();
      p.dPen[i].changeRod2(start);
    }
  }

  p.drod2_2 = function() {
    // changes slider values
    p.drod2Slider.value(p.drod2Input.value());
    // checks that the value is not empty
    if ((p.drod2Input.value() === "") == false) {
      // finds starting number
      let start = p.dPen[0].getRod2();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.drod2Input.value());
        p.dPen[i].changeRod2(start);
      }
    }
  }
  // rod 1 length
  p.drod1_1 = function() {
    // changes slider values
    p.drod1Input.value(p.drod1Slider.value());
    // finds starting number
    let start = p.dPen[0].getRod1();
    // loops trough all pendulum
    for (let i = 1; i < p.dPen.length; i++) {
      // changes the pen
      // adds diffrence to value
      start += p.drod1Slider.value();
      p.dPen[i].changeRod1(start);
    }
  }

  p.drod1_2 = function() {
    // changes slider values
    // checks that the value is not empty
    if ((p.drod1Input.value() === "") == false) {
      p.drod1Slider.value(p.drod1Input.value());
      // finds starting number
      let start = p.dPen[0].getRod1();
      // loops trough all pendulum
      for (let i = 1; i < p.dPen.length; i++) {
        // changes the pen
        // adds diffrence to value
        start += parseFloat(p.drod1Input.value());
        p.dPen[i].changeRod1(start);
      }
    }
  }

  // amount events
  p.amount = function() {
    // sets the input value to the slider
    p.amountInput.value(p.amountSlider.value());
    // changes amount of pendulums spawned
    p.spawn(p.amountSlider.value());
  }

  p.amount1 = function() {
    p.amountSlider.value(p.amountInput.value());
    // changes amount of pendulum spawned
    p.spawn(p.amountInput.value());
  }
}
// launches the application
var myPendulum = new p5(pendulumSim);
