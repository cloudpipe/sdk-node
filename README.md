## API
*WARNING: This API and its implementation are in alpha.*

```javascript
var cloudpipe = require('cloudpipe');

// Initialize cloudpipe
var pipe = cloudpipe.init({
  url: 'http://192.168.59.103:8000/api/v1',
  key: 'admin',
  secret: '12345'
});

// Define the function you want to run in ze cloud
var add = function(x, y, callback) {
  callback(null, x + y);
};

// Cloudpipe your function
var cloudAdd = pipe.createFunction(add);

// Call your cloudpipe'd function
cloudAdd(2, 4, function(err, result) {
  // err == null
  // result == 6
});
```

## Restrictions

* No globals (free variables)
* No dependencies (yet!)
* Function should take callback `f(err, result)` as its final argument
