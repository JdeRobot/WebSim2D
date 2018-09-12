var fs = require('fs');
var http = require('http');
// Runs the server and sets 'handler' as callback function.
var server = http.createServer(handler).listen(8000);
console.log("------------- Server listening on port 8000 ------------- ");


function handler(req, res){
  if(req.url == "/"){
    fs.readFile(__dirname + '/webclient.html', (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }else if(req.url == "/myAlgorithm"){
    // Ajax request for the update of aframe

    if(req.method === 'POST'){
      var body = '';
      req.on('data', chunk =>{
        // Loading the request body
        body += chunk.toString();
      }).on('end', () =>{
        // Creates the file MyAlgorithm.js using as content the body
        // from Ajax request
         fs.writeFileSync('myAlgorithm.js', body, 'utf-8');
         fs.readFile(__dirname + '/prueba.html', (err, data) =>{
           if(err){
             res.writeHead(500);
             return res.end('Error loading page.');
           }
           res.setHeader('Content-Type', 'text/plain')
           res.writeHead(200);
           res.end(data.toString());
         });

      });
    }
  }else if(req.url == "/ice"){
    fs.readFile(__dirname + '/index.html', (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }else{
    fs.readFile(__dirname + req.url, (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}
