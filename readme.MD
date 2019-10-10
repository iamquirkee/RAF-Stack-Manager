# RAF Manager #
Manages RAF functions on a stack

## Usage ##
Add and remove functions by name to an RAF stack eliminating the need to create multiple RAF calls.

If the stack is empty nothing happens

## Todo ##
Setup gulp to compile for ES6

----------

## Example ##
```typescript
let stack = new RAFStack();

let testFunc = function() {
  object.update();
}

// Adding function
stack.addFunction("testFunctionName", testFunc);
```

----------

## Functions ##

### startRAF() ###
Manually starts the RAF if stopped
```typescript
stack.startRAF();
```

----------

### stopRAF() ###
Stops the RAF loop
```typescript
stack.stopRAF();
```

----------

### getFunctions() ###
Lists functions on the stack by name
```typescript
stack.getFunctions();
```

----------

### logTimes() ###
Logs in console the timings of all the functions on the stack
```typescript
stack.logTimes();
```

----------

### addFunction(functionName, function) ###
Adds functions to the stack
```typescript
let testFunc = function() {
  object.update();
}

stack.addFunction("testFunctionName", testFunc);
```

----------

### removeFunction(functionName) ###
Removes functions on the stack
```typescript
stack.removeFunction("testFunctionName", testFunc);
```
