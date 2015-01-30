var serialize = require('node-serialize'),
    request = require('request'),
    url = require('url'),
    btoa = require('btoa');

exports.init = function(initOptions) {

  // initOptions.url
  // initOptions.username
  // initOptions.apiKey
  if (!initOptions
      || !initOptions.url
      || !initOptions.username
      || !initOptions.apiKey) {
    throw new Error("Please specify url, username and apiKey");
  }
  
  // Normalize initOptions.url
  initOptions.url = initOptions.url.trim();
  if (initOptions.url[initOptions.url.length - 1] !== '/') {
    initOptions.url += '/';
  }

  // Constants
  const JOB_CMD = "/usr/local/bin/cloudpipe-node-runner";
  const JOB_RESULT_SOURCE = "file:/tmp/.result";
  const JOB_RESULT_TYPE = "binary";
  
  // Private functions
  var _request = function(requestOptions, callback) {
    requestOptions.auth = {
      username: initOptions.username,
      password: initOptions.apiKey
    };
    requestOptions.json = true;

    console.log(requestOptions);
    request(requestOptions, callback);
  };
  
  // Public API
  return {

    create: function(f, createOptions) {
      
      createOptions = createOptions || {};
      
      var payload = {
        f: f,
        options: createOptions
      };

      // This is the function that the user will call as if it was being
      // executed locally, passing in any arguments.
      return function() {

        // Add arguments to payload
        payload.args = arguments

        // Create job
        _request({
          url: url.resolve(initOptions.url, 'job'),
          method: 'POST',
          body: {
            jobs: [
              {
                "cmd": JOB_CMD,
                "result_source": JOB_RESULT_SOURCE,
                "result_type": JOB_RESULT_TYPE,
                "stdin": btoa(serialize.serialize(payload)) // base-64 encoded, serialized payload
              }
            ]
          }
        }, function (err, response) {
        });
      };
    }
  };
};
