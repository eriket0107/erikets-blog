---
title: 'Introduction to WebAssembly with Rust'
date: '2025-06-26'
author: 'Erik Oliveira'
tags: ['Backend', 'WebAssembly', 'Rust']
isPublished: true
imgSrc: 'https://picsum.photos/600/400?random=7'
description: 'Learn how to run high-performance code in the browser by compiling Rust to WebAssembly (Wasm).'
---

# Introduction to WebAssembly with Rust

WebAssembly (Wasm) is a binary instruction format that allows you to run code written in languages like C++, C#, and Rust on the web at near-native speed. This tutorial will guide you through setting up a Rust environment and compiling your first Rust program into a Wasm module that can be called from JavaScript.

- Podemos nos referis a pilha/stack literalmente como uma pilha de livros
  - Pilhas/stacks seguem o princípio LIFO (Last In First Out)
  - Todas as operações irão envolver adicionar e/ou remover coisas no topo da pilha
  - Através de métodos `pop()`, `push()`, `isEmpty()` , `peek()` , `size()` , `clear()` temos controle sobre a pilha de elementos
    - `pop()` : deleta o último elemento;
    - `push()` : adiciona um elemento a última posição da pilha;
    - `isEmpty()` : checa se a pilha está vazia;
    - `peek()` :  pega elemento do topo da pilha;
    - `size()` : checa o tamanho da pilha

## Podemos também utilizar pilhas com Objetos

```js
class StackObj {
  constructor() {
    this.count = 0
    this.items = {}
  }

  push(element) {
    this.items[this.count] = element
    this.count++
  }

  pop() {
    if (this.isEmpty()) return undefined

    this.count--

    const result = this.items[this.count]

    delete this.items[this.count]
    return result
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items[this.count - 1]
  }

  clear() {
    this.items = {}
    this.count = 0
  }

// Em arrays podemos usar o próprio método toString
  toString() {
    if (this.isEmpty()) return ''

    let objString = `${this.items[0]}`

    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }

    return objString
  }
}
```

## Podemos também utilizar pilhas com Objetos

Ambas as abordagens vão ter os mesmos resultados, tanto array como objetos.
As ações de Array tem notação Big O O(1) porque acessam tanto começo quanto fim das pilhas, assim da mesma forma como os objetos que utilizam `key-values` .

## References

- [WebAssembly Official Site](https://webassembly.org/)
- [The Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)
- [Fira Code](https://fonts.google.com/specimen/Fira+Code)
