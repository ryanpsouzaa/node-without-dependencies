import http from 'http';
import { json } from '../middlewares/json.js';
import { routes } from '../routes/routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const routeFound = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if(routeFound){
    const routeParams = req.url.match(routeFound.path);

    req.params = { ...routeParams.groups };

    return routeFound.handler(req, res);
  }

  return res.writeHead(404).end('Not Found');
});

server.listen(3333);