import http from 'http';
import { json } from '../middlewares/json.js';
import { routes } from '../routes/routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const routeFound = routes.find(route => {
    return route.method === method && route.url === url
  });

  if(!routeFound){
    return res.writeHead(404).end('Not Found');
  }

  routeFound.handler(req, res);

});

server.listen(3333);