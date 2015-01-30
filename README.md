*WARNING: This API and its implementation are in alpha.*

## API

```javascript
var cloudpipe = require('cloudpipe');
```

### Convert a regular function into a cloud function

```javascript
var add = function(x, y) {
  return x + y;
};

var cloudAdd = cloudpipe.create(add);

cloudAdd.call(2, 4); // ==> 6
```

### Convert a function with free variable references into a cloud functoin

```javascript
var step = 3;
var increment = function(x) {
    return x + step;
};

var cloudIncrement = cloudpipe.create(increment, { freeVariables: { step: step } });

cloudIncrement.call(14); // ==> 17
```
