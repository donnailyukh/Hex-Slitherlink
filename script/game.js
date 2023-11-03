class Game {
  constructor(numHex, w, margin) {
    this._numHex = numHex;
    this._gridWidth = w - 2 * margin;
    this.verticies = new objSet();
    this.lines = new objSet();
    this._makeGrid();
  }
  
  //todo: make a hex class that holds 6 lines and more properties
  _makeHexPointsLines(cX, cY, s) {
    const currHexVerticies = [
      new hexVertex(cX, cY + s),
      new hexVertex(cX + s*Math.sqrt(3)*0.5, cY + s*0.5),
      new hexVertex(cX + s*Math.sqrt(3)*0.5, cY - s*0.5),
      new hexVertex(cX, cY - s),
      new hexVertex(cX - s*Math.sqrt(3)*0.5, cY - s*0.5),
      new hexVertex(cX - s*Math.sqrt(3)*0.5, cY + s*0.5),
    ];

    
    for (var i = 0; i < currHexVerticies.length; i++) {
      //if vertex with current points already exists, update the 
      //currHexVerticies list to contain the correct object for line creation
      const newV = currHexVerticies[i];
      const oldV = this.verticies.getValue(newV);
      if (oldV === null) {
        this.verticies.add(newV);
      }
      else {
        currHexVerticies[i] = oldV;
      }
    }

    //console.log(currHexVerticies);
    
    for (var i = 0; i < currHexVerticies.length; i++) {
      const v1 = currHexVerticies[i];
      const v2 = i == currHexVerticies.length - 1 ? currHexVerticies[0] : currHexVerticies[i + 1];
      const newL = new hexLine(v1, v2);
      const oldL = this.lines.getValue(newL);
      if (oldL === null) {
        this.lines.add(newL);
      }
      else {
        //update hex object with proper current line objects
      }
    }


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