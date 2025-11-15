import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable{
  index = 1;

  _read(){
    const i = this.index++

    setTimeout(() => {
      if (i > 100){
        this.push(null)

      } else {
        const indexBuffered = Buffer.from(String(i))
        this.push(indexBuffered)
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable{

  /**
   * chunk -> lote recebido
   * encoding -> como a info esta codificada
   * callback -> function que acontece ao acabar todos os lotes
   */

  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform{

  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1
    
    //primeiro parametro eh uma function/exception caso a transformacao do lote de algum erro
    callback(null, Buffer.from(String(transformed)))
  }
}

/**
 * OneToHundredStream -> leitura
 * InverseNumberStream -> transformacao
 * MultiplyByTenStream -> escrita
 */
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())