import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform{
  
    _transform(chunk, encoding, callback){
      const transformed = Number(chunk.toString()) * -1

      console.log(transformed);
      
      //primeiro parametro eh uma function/exception caso a transformacao do lote de algum erro
      callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {

  const buffers = [];

  for await (const chunk of req){
    buffers.push(chunk)
  }

  const fullContentStream = Buffer.concat(buffers).toString();
  console.log(fullContentStream);

  return res.end(fullContentStream);
});

server.listen(3334);