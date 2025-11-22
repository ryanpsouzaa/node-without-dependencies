import fs from 'node:fs/promises';

const DATABASE_PATH = new URL('db.json', import.meta.url); 

export class Database{

  #database = {}

  constructor(){
    fs.readFile(DATABASE_PATH, 'utf-8').then(data => {
      this.#database = JSON.parse(data);
      
    }).catch(() => {
      this.#persist()
    })
  }

  #persist(){
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));  
  }

  select(table){
    return this.#database[table] ?? []
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data);
    
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, id){
    console.log('IN - delete');
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
      console.log('APAGADO')
    }
    console.log('OUT - delete');
  }
}