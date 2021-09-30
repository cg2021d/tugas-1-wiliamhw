class Cardboard
{
  constructor(gl, shaderProgram, data) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    this.center = data.center;
    this.width = data.width;
    this.height = data.height;
    this.curveWidth = data.curveWidth;
    this.color = data.color;
  }

  get vertices() {
    const right = this.center.x + this.width/2;
    const left = this.center.x - this.width/2;
    const top = this.center.y + this.height.top/2;
    const bottom = this.center.y - this.height.bottom/2;
    const middle = {
      right: [this.center.x + this.width/2 + this.curveWidth, this.center.y],
      left : [this.center.x - this.width/2 - this.curveWidth, this.center.y],
    }

    return [
      ...middle.right,  ...this.getRgba(),        // Middle-right
      right , top,      ...this.getRgba(),        // Top-right
      left  , top,      ...this.getRgba(),        // Top-left
      ...middle.left,   ...this.getRgba(),        // Middle-left
      left  , bottom,   ...this.getRgba(false),   // Bottom-left
      right , bottom,   ...this.getRgba(false),   // Bottom-rieght
    ];
  }

  getRgba(lighter = true) {
    let {R, G, B} = this.color;
    let opacity = (lighter) ? 0.15 : 1;
    return [R, G, B, opacity];
  }

  display(data = {}) {
    const vertices = this.vertices;

    this.gl.useProgram(this.shaderProgram);

    // Definisikan buffer untuk vertices
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  
    // Bind buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // Set aPosition
    const aPosition = this.gl.getAttribLocation(this.shaderProgram, "a_Position");
    this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    this.gl.enableVertexAttribArray(aPosition);

    // Set aColor
    const aColor = this.gl.getAttribLocation(this.shaderProgram, "aColor");
    this.gl.vertexAttribPointer(
        aColor,
        4,
        this.gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT,
    );
    this.gl.enableVertexAttribArray(aColor);

    if (data && Object.keys(data).length > 0) {
      if (data.delta[1] >= 1 - this.height.top/2 
        || data.delta[1] <= -1 + this.height.bottom/2
      ) {
        data.deltaY[0] = -data.deltaY[0];
      } 
      data.delta[1] += data.deltaY[0];
      this.gl.uniform2fv(data.uDelta, data.delta);
    }
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 6);
  }
}

export { Cardboard };
