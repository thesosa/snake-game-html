// render context
const canv = document.getElementById('game-canvas');
const ctx = canv.getContext('2d');
// input handler
document.addEventListener('keydown', keyPush);
// main loop
setInterval(game, 1000 / 12);

// snake's head position variables
let px = 10,
  py = 10;

// snake trail and tail
const trail = [];
let tail = 5;

// gs is the size (in pixels) of one tile (both width and height)
// tc is the number of tiles per row and column
// the canvas is 400x400 so we can have a grid of 20x20
const gs = 20,
  tc = 20;

// apple position
let ax = Math.floor(Math.random() * tc),
  ay = Math.floor(Math.random() * tc);

// velocity variables
let xv = 0,
  yv = 0;

// game loop function
function game() {
  // move snake
  px += xv;
  py += yv;

  // wrap around the grid
  if (px < 0) {
    px = tc - 1;
  }
  if (px > tc - 1) {
    px = 0;
  }
  if (py < 0) {
    py = tc - 1;
  }
  if (py > tc - 1) {
    py = 0;
  }

  // clear screen and draw background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  // draw snake
  ctx.fillStyle = 'lime';
  for (let t of trail) {
    ctx.fillRect(t.x * gs, t.y * gs, gs - 2, gs - 2); // leave 2 pixels out for spacing between tiles
    // check if the snake collides with trail, if so, reset tail
    if (t.x == px && t.y === py) {
      tail = 5;
    }
  }
  trail.push({ x: px, y: py });
  // reset trail to tail size (i.e.: tail got reset because of collision)
  while (trail.length > tail) {
    trail.shift();
  }

  // eat apple
  if (ax == px && ay == py) {
    tail++;
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }

  // draw apple
  ctx.fillStyle = 'red';
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

// input handler function
function keyPush(evt) {
  switch (evt.code) {
    case 'ArrowLeft': // left
      // only move left if it's not moving right
      if (xv === 0) {
        xv = -1;
        yv = 0;
      }
      break;
    case 'ArrowUp': // up
      // only move up if it's not moving down
      if (yv === 0) {
        xv = 0;
        yv = -1;
      }
      break;
    case 'ArrowRight': // right
      // only move right if it's not moving left
      if (xv === 0) {
        xv = 1;
        yv = 0;
      }
      break;
    case 'ArrowDown': // down
      // only move down if it's not moving up
      if (yv === 0) {
        xv = 0;
        yv = 1;
      }
      break;
  }
}
