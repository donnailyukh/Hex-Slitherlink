class Game {
  constructor(numHex, w, margin) {
    this._numHex = numHex;
    this._gridWidth = w - 2 * margin;
    this.verticies = new objSet();
    this.lines = new objSet();
    this._makeGrid();
  }
  
  _makeHexPointsLines(cX, cY, s) {
    const v1 = new hexVertex(cX, cY + s);
    const v2 = new hexVertex(cX + s*Math.sqrt(3)*0.5, cY + s*0.5);
    const v3 = new hexVertex(cX + s*Math.sqrt(3)*0.5, cY - s*0.5);
    const v4 = new hexVertex(cX, cY - s);
    const v5 = new hexVertex(cX - s*Math.sqrt(3)*0.5, cY - s*0.5);
    const v6 = new hexVertex(cX - s*Math.sqrt(3)*0.5, cY + s*0.5);

    this.verticies.add(v1);
    this.verticies.add(v2);
    this.verticies.add(v3);
    this.verticies.add(v4);
    this.verticies.add(v5);
    this.verticies.add(v6);

    this.lines.add(new hexLine(v1, v2));
    this.lines.add(new hexLine(v2, v3));
    this.lines.add(new hexLine(v3, v4));
    this.lines.add(new hexLine(v4, v5));
    this.lines.add(new hexLine(v5, v6));
    this.lines.add(new hexLine(v6, v1));

  }

  _makeGrid() {
    const numHex = this._numHex;
    const widestHexs = 2 * numHex -1;
    const gridWidth = this._gridWidth;
    const hexWidth = gridWidth / widestHexs;
    const hexSide = hexWidth / Math.sqrt(3);
    const hexHeight = 2* hexSide;
    const gridSide = hexWidth * (numHex - 1);

    const c = w/2;
    var x = c - gridSide*0.5;
    var y = c - gridSide*Math.sqrt(3)*0.5;
    var rowStart = x;

    for (var i = 0; i < numHex; i++) {
      for (var j = 0; j < numHex + i; j++) {
        this._makeHexPointsLines(x, y, hexSide)
        x += hexWidth;
      }
      y += hexHeight * 0.75;
      x = rowStart - hexWidth / 2;
      rowStart = x;
    }

    x += hexWidth;
    rowStart = x;

    for (var i = widestHexs ; i > numHex; i--) {
      for (var j = 0; j < i - 1; j++) {
        this._makeHexPointsLines(x, y, hexSide)
        x += hexWidth;
      }
      y += hexHeight * 0.75;
      x = rowStart + hexWidth / 2;
      rowStart = x;
    }
  }
}