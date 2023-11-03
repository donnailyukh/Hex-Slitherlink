class objSet extends Set {
  constructor() {
    super();
  }
  
  /*add(obj) {
    for (const obj2 of this) {
      if (obj.isEqual(obj2)) {
        return;
      }
    }
    super.add(obj);
  }*/

  has(obj) {
    for (const obj2 of this) {
      if (obj.isEqual(obj2)) {
        return true;
      }
    }
    return false;
  }

  getValue(obj) {
    for (const obj2 of this) {
      if (obj.isEqual(obj2)) {
        return obj2;
      }
    }
    return null;
  }
  
}