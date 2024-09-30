let particles = [];
let num = 1000;
const noiseScale = 0.01/2;
let flowChangeRate = 0.001; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetParticles();
  
  noStroke();
  clear();
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(0, 0, 0, 0.1);

  for(let i = 0; i < num; i++) {
    let p = particles[i];
    fill(p.brightness);
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    triangle(0, -p.size/2, -p.size/2, p.size/2, p.size/2, p.size/2);
    pop();
    
   
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * flowChangeRate);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    p.rotation += p.rotationSpeed;
    
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
      p.brightness = color(random(360), 80, 80);
      p.size = random(2, 10); 
      p.rotation = random(TWO_PI);
      p.rotationSpeed = random(-0.05, 0.05);
    }
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetParticles();
}

function resetParticles() {
  particles = [];
  for(let i = 0; i < num; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      brightness: color(random(360), 80, 80),
      size: random(2, 20), 
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.05, 0.05)
    });
  }
}