class Cardboard
{
  constructor(gl, center, width, height, curveWidth) {
    this.gl = gl;
    this.center = center;
    this.width = width;
    this.height = height;
    this.curveWidth = curveWidth;
  }

  get vertices() {
    const right = this.center['x'] + this.width/2;
    const left = this.center['x'] - this.width/2;
    const top = this.center['y'] + this.height/2;
    const bottom = this.center['y'] - this.height/2;
    const middle = {
      right: [this.center['x'] + this.width/2 + this.curveWidth, this.center['y']],
      left : [this.center['x'] - this.width/2 - this.curveWidth, this.center['y']],
    }

    return [
      ...middle['right'],   // Middle-right
      right , top,          // Top-right
      left  , top,          // Top-left
      ...middle['left'],    // Middle-left
      left  , bottom,       // Bottom-left
      right , bottom,       // Bottom-rieght
    ];
  }

  display() {
    const vertices = this.vertices;

    // Definisikan buffer untuk vertices
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  
    const vertextShaderCode =`
      attribute vec2 a_Position;
      void main(){
          gl_Position = vec4(a_Position, 0.0, 1.0);
          gl_PointSize = 20.0;
      }
    `;
  
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertexShader, vertextShaderCode);
    this.gl.compileShader(vertexShader);
  
    // Definisi fragment
    const fragmentShaderCode = `
      void main(){
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      }
    `;
  
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragmentShader, fragmentShaderCode);
    this.gl.compileShader(fragmentShader);
  
    // Definisi shader program
    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);
    this.gl.useProgram(shaderProgram);
  
    // Bind buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const aPosition = this.gl.getAttribLocation(shaderProgram, "a_Position");
    this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(aPosition);
  
    this.gl.clearColor(1.0, 1.0, 1.0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 6);
  }
}

export { Cardboard };
