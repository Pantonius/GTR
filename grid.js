class Grid {
  
  constructor() {
    this.xmin = -10;
    this.xmax = 10;
    this.xscale = 1;

    this.ymin = -3;
    this.ymax = 3;
    this.yscale = 1;

    this.points = [];
    this.points.push(new Point(0, 0));

    this.functions = [];
    this.functions.push((x) => Math.sin(x));

    // the position is always considered the middle of the grid
    this.pos = new Vector((this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2);
    //this.normalizeGrid();

    this.mousePos = new Vector(0, 0);
    this.dragging = false;

    addEventListener('mousedown', (e) => this.mousedown(e.clientX, e.clientY));
    addEventListener('mouseup', () => this.mouseup());
    addEventListener('mousemove', (e) => this.mousemove(e.clientX, e.clientY));
  }

  draw() {
    ctx.strokeStyle = '#555';
    ctx.fillStyle = '#fff';
    ctx.font = "24px 'Arial'";

    // GridPos to Canvas-Coordinates
    let canvasPos = this.toCanvasPos(this.pos.x, this.pos.y);
    let stepX = (canvas.width / this.getWidth()) * this.xscale;
    let stepY = (canvas.height / this.getHeight()) * this.yscale;

    // begin at 0 + what remains until the next full step and walk in stepX steps to the canvas.width
    for(let x = (1-canvasPos.x) % stepX; x < canvas.width + stepX; x += stepX) {
      let gridX = Math.round((this.pos.x + this.toPoint(x, 0).x));

      ctx.lineWidth = 1;
      if(gridX === 0) ctx.lineWidth = 8;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      ctx.closePath();

      ctx.textBaseline = 'bottom';
      ctx.fillText(gridX, x, canvas.height);
    }

    // begin at 0 + what remains until the next full step and walk in stepY steps to the canvas.height
    for(let y = (1-canvasPos.y) % stepY; y < canvas.height + stepY; y += stepY) {
      let gridY = Math.round((this.pos.y + this.toPoint(0, y).y));

      ctx.lineWidth = 1;
      if(gridY === 0) ctx.lineWidth = 8;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      ctx.closePath();

      ctx.textBaseline = 'middle';
      ctx.fillText(gridY, 0, y);
    }

    this.drawFunctions();
    this.drawPoints();
  }

  drawPoints() {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'deeppink';
    ctx.lineWidth = 4;
    for(let point of this.points) {
      ctx.strokeStyle = point.color;
      let canvasPoint = this.toCanvasPos(point.x - this.pos.x, point.y - this.pos.y);
      ctx.beginPath();
      ctx.arc(canvasPoint.x, canvasPoint.y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawFunctions() {
    for(let func of this.functions) {
      this.drawFunction(func);
    }
  }

  drawFunction(func) {
    ctx.strokeStyle = 'deeppink';
    ctx.lineWidth = 2;

    ctx.beginPath();

    let step = this.xscale / 10;
    for(let x = this.xmin; x < this.xmax + step; x += step) {
      let gridY = func(this.pos.x + x);

      let canvasPoint = this.toCanvasPos(x, gridY - this.pos.y);
      ctx.lineTo(canvasPoint.x, canvasPoint.y);
      ctx.moveTo(canvasPoint.x, canvasPoint.y);
    }
    ctx.stroke();
    ctx.closePath();
  }

  mousedown(clientX, clientY) {
    this.mousePos = this.toPoint(clientX, clientY);

    this.dragging = true;
  }

  mouseup() {
    if(this.dragging)
      this.dragging = false;
  }

  mousemove(clientX, clientY) {
    if(this.dragging) {
      let clientPoint = this.toPoint(clientX, clientY);
      let point = new Vector(this.mousePos.x - clientPoint.x, this.mousePos.y - clientPoint.y);
      this.pos.add(point);

      this.mousePos = clientPoint;
    }
  }

  getWidth() {
    return this.xmax - this.xmin;
  }

  getHeight() {
    return this.ymax - this.ymin;
  }

  // Calculates Canvas-Coordinates from given Grid-Coordinates
  toCanvasPos(x, y) {
    return new Vector(x * canvas.width / this.getWidth() + (canvas.width / 2), -1 * y * canvas.height / this.getHeight() + (canvas.height / 2));
  }

  // Calculates Grid-Coordinates from given Canvas-Coordinates
  toPoint(x, y) {
    return new Vector((x - canvas.width / 2) * (this.getWidth() / canvas.width), -1 * (y - canvas.height / 2) * (this.getHeight() / canvas.height));
  }

  // change yscale so that ystep equals xstep
  normalizeGrid() {
    let dx = this.xmax - this.xmin;
    let dy = this.ymax - this.ymin;

    let xratio = canvas.width / dx;

    this.yscale = (dy * xratio) / canvas.height;
  }
}