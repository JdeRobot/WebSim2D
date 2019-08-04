var http=require('http');
var url=require('url');
var fs=require('fs');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var server=http.createServer(function(request,response){
    var objeturl = url.parse(request.url);
    var path=objeturl.pathname;
    if (path=='/teleoperator'){
        path='teleoperator/teleoperator.html';}
    else if (path=="/"){
        path='JavaScript-Editor/index.html'
    }
    else{
      path = path.slice(1)
      console.log(path);
    }
    fs.exists(path,function(exists){
        if (exists) {
            fs.readFile(path,function(error,content){
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write('Internal error: '+ error);
                    response.end();
                } else {

                    var vec = path.split('.');
                    var ext=vec[vec.length-1];
                    var mimearchive=mime[ext];
                    response.writeHead(200,{'Content-Type': mimearchive});

                    response.write(content);
                    response.end();
                }
            });
        } else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write('<!doctype html><html><head></head><body>404 Not Found</body></html>');
            response.end();
        }
    });
});

var port = 8000;
server.listen(port);

console.log('Runnig on http://localhost:'+port);
