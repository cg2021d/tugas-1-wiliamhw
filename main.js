import { Cardboard } from './cardboard.js';

const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");

const cardboardLeft = new Cardboard(gl, {x: -0.5, y: 0.0}, 0.6, 1, 0.1);
cardboardLeft.display();

const cardboardRight = new Cardboard(gl, {x: 0.5, y: 0.0}, 0.6, 1, 0.1);
// cardboardRight.display();
