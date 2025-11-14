import http from 'http';


const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if(method === 'POST' && url === '/users' ){
    users.push({
      id: 1,
      name: 'bob',
      email: 'bob@example.com'
    });

    res.setHeader('Content-Type', 'application/json');
    return res.writeHead(201).end(JSON.stringify(users));

  } else if(method === 'GET' && url === '/users' ){
    res.setHeader('Content-Type', 'application/json');
    return res.writeHead(200).end(JSON.stringify(users));
  }

  return res.writeHead(404).end('Not Found');
});

server.listen(3333);