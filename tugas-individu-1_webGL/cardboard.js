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
    this.direction = data.direction

    this.right = this.center.x + this.width/2;
    this.left = this.center.x - this.width/2;
    this.top = this.center.y + this.height.top;
    this.bottom = this.center.y - this.height.bottom;
    this.middle = {
      right: [this.center.x + this.width/2 + this.curveWidth, this.center.y],
      left : [this.center.x - this.width/2 - this.curveWidth, this.center.y],
    }
  }

  get vertices() {
    return [
      ...this.middle.right,       ...this.getRgba(),        // Middle-right
      this.right , this.top,      ...this.getRgba(),        // Top-right
      this.left  , this.top,      ...this.getRgba(),        // Top-left
      ...this.middle.left,        ...this.getRgba(),        // Middle-left
      this.left  , this.bottom,   ...this.getRgba(false),   // Bottom-left
      this.right , this.bottom,   ...this.getRgba(false),   // Bottom-rieght
    ];
  }

  get topMiddleLines() {
    if (this.direction === 'horizontal') {
      const y = this.center.y + this.height.top/2;
      return  [
        this.middle.left[0] + this.curveWidth/2 , y, ...this.getRgba(false, 0.5),
        this.middle.right[0] - this.curveWidth/2, y, ...this.getRgba(false, 0.5),
      ];
    } 
    return [
      this.center.x, this.center.y, ...this.getRgba(false, 0.5),
      this.center.x, this.top     , ...this.getRgba(false, 0.5),
    ]
  }

  getRgba(lighter = true, op = 1) {
    let {R, G, B} = this.color[(lighter) ? 'light' : 'dark'];
    let opacity = (lighter) ? 0.7 : op;
    return [R, G, B, opacity];
  }

  makeTopBorder(positionBuffer) {
    const vertices = [
      this.right , this.top, ...this.getRgba(false, 0.45),   // Top-right
      this.left  , this.top, ...this.getRgba(false, 0.45),   // Top-left
      ...this.middle.left,   ...this.getRgba(false, 0.5125),   // Middle-left
      ...this.middle.right,  ...this.getRgba(false, 0.5125),   // Middle-right
    ];
    makeLine(this.gl, vertices, 4, positionBuffer);
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
      if (data.delta[1] >= 1 - this.top
        || data.delta[1] <= -1 - this.bottom
      ) {
        data.deltaY[0] = -data.deltaY[0];
      } 
      data.delta[1] += data.deltaY[0];
      this.gl.uniform2fv(data.uDelta, data.delta);
    }
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 6);

    makeLine(this.gl, this.topMiddleLines, 2, positionBuffer);
    this.makeTopBorder(positionBuffer);
  }
}

function makeLine(gl, vertices, verticesAmount, positionBuffer)
{
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.drawArrays(gl.LINE_LOOP, 0, verticesAmount);
}

export { Cardboard };
