import http from 'http';
import { json } from '../middlewares/json.js';
import { Database } from '../database/database.js';
import { randomUUID } from 'crypto';

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if(method === 'POST' && url === '/users' ){
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name: name,
      email: email
    }
    database.insert('users', user)

    return res.writeHead(201).end(JSON.stringify(user));

  } else if(method === 'GET' && url === '/users' ){
    const users = database.select('users');
    return res.writeHead(200).end(JSON.stringify(users));

  }

  return res.writeHead(404).end('Not Found');
});

server.listen(3333);