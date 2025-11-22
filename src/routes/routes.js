import { Database } from '../database/database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutesPath } from '../utils/buildRoutesPath.js';
import isUUID from 'is-uuid';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutesPath('/users'),
    handler: (req, res) => {
      const users = database.select('users');
      return res.writeHead(200).end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutesPath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name: name,
        email: email
      }

      database.insert('users', user);
      return res.writeHead(201).end(JSON.stringify(user));
    }
  },
  {
    method: 'DELETE',
    path: buildRoutesPath('/users/:id'),
    handler: (req, res) => {
      const id = req.params.id;
      console.log(`IN - handler DEL: id = ${id}`);

      if(isUUID.v4(id)){
        database.delete('users', id);
        res.writeHead(204).end();

      } else {

        res.writeHead(400).end('Id not valid')
        console.error(`Id not valid: ${id}`);
      }
      console.log('OUT - handler DEL')
    }
  },
  {
    method: 'PUT',
    path: buildRoutesPath('/users/:id'),
    handler: (req, res) => {
      const id = req.params.id;
      const { name, email } = req.body;
      console.log(`IN - handler PUT: id = ${id}`);

      if(isUUID.v4(id)){
        database.update('users', id, { name, email });
        res.writeHead(204).end();

      } else {
        res.writeHead(400).end('Id is not valid');
        console.error(`Id not valid: ${id}`);
      }

      console.log('OUT - handler PUT');
    }
  }
]