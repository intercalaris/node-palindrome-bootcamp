const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

function checkPalindrome(word) {
  // Remove undesired characters 
  let removeChar = word.replace(/[^A-Z0-9]/ig, "").toLowerCase();

  /* reverse removeChar for comparison*/
  let checkPalindrome = removeChar.split('').reverse().join('');

  /* Check to see if str is a Palindrome*/
  if (removeChar === checkPalindrome) {
      return true
  } else {
      return false
  } 
}

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page === '/') { 
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Internal Server Error');
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == '/api') {
    if ('word' in params) {
      const wordToCheck = params['word'];
      if(checkPalindrome(wordToCheck) === true){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {isPalindrome: true}
        res.end(JSON.stringify(objToJson));
      }
      else if(checkPalindrome(wordToCheck) === false){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {isPalindrome: false}
        res.end(JSON.stringify(objToJson));
      }
    }
  } else if (page === '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if (page === '/css/reset.css') {
    fs.readFile('css/reset.css', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      res.end();
    })
  } else if (page === '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(8000);