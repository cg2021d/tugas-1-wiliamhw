import { Cardboard } from './cardboard.js';

const canvas = document.getElementById("myCanvas");
const gl = canvas.getContext("webgl");

gl.clearColor(1.0, 1.0, 1.0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const shaderProgramLeft = initShader(gl);
const shaderProgramRight = initShader(gl);

const cardboardLeft = new Cardboard(
  gl, shaderProgramLeft, {
    center: {
      x: -0.5,
      y: 0.0,
    },
    width: 0.3,
    height: {
      top: 0.7125,
      bottom: 0.7,
    },
    curveWidth: 0.1,
    color: {R: 0.0, G: 1.0, B: 0.0},
  }
);
const cardboardRight = new Cardboard(
  gl, shaderProgramRight, {
    center: {
      x: 0.5,
      y: 0.0,
    },
    width: 0.5,
    height: {
      top: 0.5,
      bottom: 0.7,
    },
    curveWidth: 0.1,
    color: {R: 0.0, G: 0.0, B: 1.0},
  }
);

const uDelta = gl.getUniformLocation(shaderProgramRight, "uDelta");
let delta = [0.0, 0.0];
let deltaY = [0.0087];

function render() {
  cardboardLeft.display();
  cardboardRight.display({uDelta, delta, deltaY});
  requestAnimationFrame(render);
}
render();


function initShader(gl) 
{
  // Definisi shader
  const vertextShaderCode =`
    attribute vec2 a_Position;
    attribute vec4 aColor;
    varying vec4 vColor;
    uniform vec2 uDelta;
    void main(){
        gl_Position = vec4(a_Position + uDelta, 0.0, 1.0);
        gl_PointSize = 20.0;
        vColor = aColor;
    }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertextShaderCode);
  gl.compileShader(vertexShader);

  // Definisi fragment
  const fragmentShaderCode = `
    precision mediump float;
    varying vec4 vColor;
    void main(){
        gl_FragColor = vec4(vColor);
    }
  `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Definisi shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  return shaderProgram;
}
