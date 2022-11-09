/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Particle {
  constructor(angle) {
    this.x = 0;
    this.y = 0;
    this.angle = angle;
    this.offset = Math.random()*3;
  }
  move(size, now) {
    let zoom = 0.3;
    let noiseFactor = 0.1 * size;
    let xc = Math.cos(this.angle);
    let yc = Math.sin(this.angle);
    let n = simplex.noise3D(xc / zoom, yc / zoom, now / 1400 + this.offset) * noiseFactor;
    let r = size + n;
    this.x = r * 16 * Math.pow(Math.sin(this.angle), 3);
    this.y = -r * (13 * Math.cos(this.angle) - 5 * Math.cos(2 * this.angle) - 2 * Math.cos(3 * this.angle) - Math.cos(4 * this.angle));

    this.angle += 0.002;
  }
  draw(ctx, x0, y0) {
    ctx.fillRect(x0 + this.x, y0 + this.y, 1, 1);
  }
}

let canvas;
let ctx;
let simplex;
let particles;
let size;

function setup() {
  ticker = 0;
  simplex = new SimplexNoise();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  setupParticles();
}

function setupParticles() {
  particles = [];
  for(let angle = 0; angle < Math.PI * 2; angle += 0.001) {
    let p = new Particle(angle);
    particles.push(p);
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  size = Math.min(w, h) * 0.025;}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(184, 30, 110, 0.8)";
  particles.forEach(p => {
    p.move(size, now);
    p.draw(ctx, w / 2, h / 2);
  });
}

setup();
draw(1);

function toggleMute() {
   var myAudio = document.getElementById('audio_playo24');
   myAudio.muted = !myAudio.muted;
}