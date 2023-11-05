class Game {
  constructor(numHex, w, margin) {
    this._numHex = numHex;
    this._gridWidth = w - 2 * margin;
    this.verticies = new objSet();
    this.lines = new objSet();
    this.hexagons = new objSet();
    this._makeGrid();
  }
  
  //todo: make a hex class that holds 6 lines and more properties
  _makeHexPointsLines(cX, cY, s) {
    const hexVerticies = [
      new hexVertex(cX, cY - s),
      new hexVertex(cX + s*Math.sqrt(3)*0.5, cY - s*0.5),
      new hexVertex(cX + s*Math.sqrt(3)*0.5, cY + s*0.5),
      new hexVertex(cX, cY + s),
      new hexVertex(cX - s*Math.sqrt(3)*0.5, cY + s*0.5),
      new hexVertex(cX - s*Math.sqrt(3)*0.5, cY - s*0.5),
    ];

    
    for (var i = 0; i < hexVerticies.length; i++) {
      //if vertex with current points already exists, update the 
      //hexVerticies list to contain the correct object for line creation
      const newV = hexVerticies[i];
      const oldV = this.verticies.getValue(newV);
      if (oldV === null) {
        this.verticies.add(newV);
      }
      else {
        hexVerticies[i] = oldV;
      }
    }

    //console.log(hexVerticies);
    const hexLines = [];
    
    for (var i = 0; i < hexVerticies.length; i++) {
      const v1 = hexVerticies[i];
      const v2 = i == hexVerticies.length - 1 ? hexVerticies[0] : hexVerticies[i + 1];
      const newL = new hexLine(v1, v2);
      const oldL = this.lines.getValue(newL);
      if (oldL === null) {
        this.lines.add(newL);
        hexLines.push(newL);
      }
      else {
        //update list for hex object with current line objects
        hexLines.push(oldL);
      }
    }
    
    const newHex = new hex(hexVerticies, hexLines);
    //console.log(newHex);
    this.hexagons.add(newHex);
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