import { Database } from '../database/database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    url: '/users',
    handler: (req, res) => {
      const users = database.select('users');
      return res.writeHead(200).end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    url: '/users',
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
  }
]