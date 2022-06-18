const protocolName = 'http';
const protocol = require(protocolName);
const fs = require('fs');



const port  = 3001;
const localhostname = '127.0.0.1'

const writeStream = fs.createWriteStream('log.txt',{flags:'w+'});

const requestHandler = ((request,response)=>{
    console.log(request.url);

    writeStream.write(`request on address ${request.url}\n`);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain')
    response.end("response message\n");
})

const server = protocol.createServer(requestHandler);

server.listen(port,localhostname,(err)=>{
    if(err){
        return console.err("Error happend",err);
    }
    console.log(`Server running at ${protocolName}://${localhostname}:${port}/`)
})