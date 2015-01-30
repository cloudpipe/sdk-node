## Getting Started: Basic Usage
*WARNING: The Node.js API for CloudPipe and its implementation are in alpha.*

```javascript
var cloudpipe = require('cloudpipe');

// Initialize cloudpipe
var pipe = cloudpipe.init({
  url: 'http://192.168.59.103:8000/api/v1',
  username: 'admin',
  apiKey: '12345'
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

## TODO
* Process job creation request results
* Logging

## Testing
See [the Usage section in the cloudpipe/runner-node repo](https://github.com/cloudpipe/runner-node#usage).