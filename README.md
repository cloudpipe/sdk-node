*WARNING: This API and its implementation are in alpha.*

## API

```javascript
var cloudpipe = require('cloudpipe');

var pipe = cloudpipe.init({
  url: 'http://192.168.59.103:8000/api/v1',
  key: 'admin',
  secret: '12345'
});

var add = function(x, y, callback) {
  callback(null, x + y);
};

var cloudAdd = pipe.createFunction(add);
cloudAdd(2, 4, function(err, result) {
  // err == null
  // result == 6
});
```

## Restrictions

* No globals (free variables)
* No dependencies (yet!)
* Function should take callback `f(err, result)` as its final argument
