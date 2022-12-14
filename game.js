/*
    Classic Snake Game Html and Vanilla JavaScript
    Copyright (C) 2022  David Sosa

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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

// half a tile, useful for setting the apple's center
const half = gs / 2;

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
  ctx.beginPath();
  ctx.arc(ax * gs + half, ay * gs + half, half - 2, 0, 2 * Math.PI);
  ctx.fill();
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
