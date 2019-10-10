class RAFStack {
  private _nameArray: string[] = [];
  private _functionArray: Function[] = [];
  private _functionCount: number = 0;

  private _isAnimating = false;
  private _currentRAF: number;

  private _isLogging = false;

  constructor() {
    // Binds
    this._RAF = this._RAF.bind(this);

    // Start
    this.startRAF();
  }

  startRAF() {
    if (!this._isAnimating) {
      this._isAnimating = true;
      this._currentRAF = requestAnimationFrame(this._RAF);
    }
  }

  stopRAF() {
    if (this._isAnimating) {
      this._isAnimating = false;
      cancelAnimationFrame(this._currentRAF);
    }
  }

  getFunctions() {
    return this._nameArray;
  }

  logTimes() {
    if (!this._isLogging) {
      this._isLogging = true;
    } else {
      console.warn("RAFStack", `Is logging performance please wait`);
      return;
    }
  }

  addFunction(name: String, func: Function) {
    if (this._nameArray.indexOf(String(name)) !== -1) {
      console.error(
        "RAFStack",
        `A function with the name ${name} already exists`
      );
      return;
    }

    if (typeof func !== "function") {
      console.error(
        "RAFStack",
        `Can't add to RAF stack, type is ${typeof func}`
      );
      return;
    }

    this._nameArray.push(String(name));
    this._functionArray.push(func);
    this._functionCount += 1;
  }

  removeFunction(name: String) {
    let index = this._nameArray.indexOf(String(name));

    if (index) {
      console.error("RAFStack", `No such function with name ${name}`);
      return;
    }

    this._nameArray.splice(index, 1);
    this._functionArray.splice(index, 1);
    this._functionCount -= 1;

    console.log(this._nameArray);
  }

  _RAF() {
    // Do nothing if no functions on stack
    if (this._functionCount != 0) {
      for (let i = this._functionCount; i > 0; i--) {
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
  }
}

// let test = new RAFStack();
