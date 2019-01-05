const http = require('http');
const url = require('url');
const whatdog  = require('./index')

http.createServer(async function (request, response) {

    try
    {
        var params = url.parse(request.url, true).query;

        if(params.url)
        {
            const doggyData = await whatdog(params.url);
            
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            response.end(JSON.stringify(doggyData));

        }
        else
        {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('Hello World');
        }
    }
    catch(err)
    {
        console.error(err)
    }

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');