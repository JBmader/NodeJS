// ./handles.js
// Necessary imports
const url = require('url')
const qs = require('querystring')
module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (path === '/hello' && 'name' in params) {
    if (params['name'] == 'jb'){
      res.write('Hello\nMy name is jb I am 21 and I study engineering');
    }else{
      res.write('Hello ' + params['name']);
    }
  } else {
    res.write('404: Page not found');
  }

  res.end();
    } 
  }