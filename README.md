*WARNING: This API and its implementation are in alpha.*

## API

```javascript
var cloudpipe = require('cloudpipe');
```

#### Convert a regular function into a cloud function

```javascript
var add = function(x, y, callback) {
  callback(null, x + y);
};

var cloudAdd = cloudpipe.create(add);
cloudAdd(2, 4, function(err, result) {
  // err == null
  // result == 6
});
```

#### Convert a function with free variable references into a cloud function

```javascript
var step = 3;
var increment = function(x, callback) {
    callback(null, x + step);
};

var cloudIncrement = cloudpipe.create(increment, { freeVariables: { step: step } });
cloudIncrement(14, function(err, result) {
  // err == null
  // result == 17
});
```
