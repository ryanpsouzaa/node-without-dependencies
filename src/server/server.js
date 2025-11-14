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
    return res.end(JSON.stringify(users));
  }

  return res.end('Hello World!');
});

server.listen(3333);