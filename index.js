const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => { 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 }

const grid = new Grid();

function setup() {

}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(grid != null) {
    grid.draw();
    
    canvas.classList.toggle('dragging', grid.dragging);
  }
}

setup();
draw();