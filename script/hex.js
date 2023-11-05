class hex {
    //stores verticies in sorted order for ease of comparison
    constructor(v, l) {
        //verticies are maintained in clockwise order starting from the top one
        //lines are in the same order
        this.verticies = v;
        this.lines = l;
        this._active = 0;
        this._valid = 0;
      }
    
    /*isEqual(hex2) {
      return this === hex2;
    }*/
  }