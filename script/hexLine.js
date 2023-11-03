class hexLine {
  //stores verticies in sorted order for ease of comparison
  constructor(v1, v2) {
    if (v1.x + v1.y < v2.x + v2.y) {
      this.v1 = v1;
      this.v2 = v2;
    } else if (v1.x + v1.y == v2.x + v2.y) {
      if (v1.x < v2.x) {
        this.v1 = v1;
        this.v2 = v2;
      } else {
        this.v1 = v2;
        this.v2 = v1;
      }
    } else {
      this.v1 = v2;
      this.v2 = v1;
    }

    //active refers to if a line is selected and part of the link
    this._active = false;

    //valid refers to if the line cound be selected or if it violates the rules
    this._valid = true;
  }
  
  isEqual(l) {
    return this.v1.isEqual(l.v1) && this.v2.isEqual(l.v2);
  }

  addValidLinesToVerticies() {
    this.v1.addValidLine();
    this.v2.addValidLine();
  }
}