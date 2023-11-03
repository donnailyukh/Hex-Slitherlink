class hexVertex {
  //round to avoid points being slightly different bc of sqrt function
  constructor(x, y) {
    this.x = x.toFixed(4);
    this.y = y.toFixed(4);
    this._validLines = 0;
  }
  
  isEqual(v) {
    return this.x == v.x && this.y == v.y;
  }

  addValidLine() {
    this._validLines++;
  }

  getValidLines() {
    return this._validLines;
  }
}