var RAFStack = /** @class */function () {
  function RAFStack() {
    this._nameArray = [];
    this._functionArray = [];
    this._functionCount = 0;
    this._isAnimating = false;
    this._isLogging = false;
    // Binds
    this._RAF = this._RAF.bind(this);
    // Start
    this.startRAF();
  }
  RAFStack.prototype.startRAF = function () {
    if (!this._isAnimating) {
      this._isAnimating = true;
      this._currentRAF = requestAnimationFrame(this._RAF);
    }
  };
  RAFStack.prototype.stopRAF = function () {
    if (this._isAnimating) {
      this._isAnimating = false;
      cancelAnimationFrame(this._currentRAF);
    }
  };
  RAFStack.prototype.getFunctions = function () {
    return this._nameArray;
  };
  RAFStack.prototype.logTimes = function () {
    if (!this._isLogging) {
      this._isLogging = true;
    } else
    {
      console.warn("RAFStack", "Is logging performance please wait");
      return;
    }
  };
  RAFStack.prototype.addFunction = function (name, func) {
    if (this._nameArray.indexOf(String(name)) !== -1) {
      console.error("RAFStack", "A function with the name " + name + " already exists");
      return;
    }
    if (typeof func !== "function") {
      console.error("RAFStack", "Can't add to RAF stack, type is " + typeof func);
      return;
    }
    this._nameArray.push(String(name));
    this._functionArray.push(func);
    this._functionCount += 1;
  };
  RAFStack.prototype.removeFunction = function (name) {
    var index = this._nameArray.indexOf(String(name));
    if (index) {
      console.error("RAFStack", "No such function with name " + name);
      return;
    }
    this._nameArray.splice(index, 1);
    this._functionArray.splice(index, 1);
    this._functionCount -= 1;
    console.log(this._nameArray);
  };
  RAFStack.prototype._RAF = function () {
    // Do nothing if no functions on stack
    if (this._functionCount != 0) {
      for (var i = this._functionCount; i > 0; i--) {
        if (this._isLogging) {
          console.time(this._nameArray[i - 1]);
        }
        this._functionArray[i - 1]();
        if (this._isLogging) {
          console.timeEnd(this._nameArray[i - 1]);
        }
      }
      if (this._isLogging) {
        this._isLogging = false;
      }
    }
    // Call RAF
    requestAnimationFrame(this._RAF);
  };
  return RAFStack;
}();
// let test = new RAFStack();