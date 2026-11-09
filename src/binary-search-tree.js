const { NotImplementedError } = require("../lib");
const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (this._root === null) {
      this._root = new Node(data);
      return;
    }

    let cur = this._root;

    while (cur.data !== data) {
      const side = data < cur.data ? 'left' : 'right';

      if (cur[side] === null) {
        cur[side] = new Node(data);
        return;
      }

      cur = cur[side];
    }
  }

  find(data) {
    let cur = this._root;
    while (cur !== null && cur.data !== data) {
      cur = data < cur.data ? cur.left : cur.right;
    }

    return cur;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    function removeNode(node, value) {
      if (node === null) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
      } else {
        if (node.left === null) {
          return node.right;
        }

        if (node.right === null) {
          return node.left;
        }

        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }

        node.data = successor.data;
        node.right = removeNode(node.right, successor.data);
      }

      return node;
    }

    this._root = removeNode(this._root, data);
  }

  min() {
    let cur = this._root;
    while (cur !== null && cur.left !== null) {
      cur = cur.left;
    }

    return cur === null ? null : cur.data;
  }

  max() {
    let cur = this._root;
    while (cur !== null && cur.right !== null) {
      cur = cur.right;
    }

    return cur === null ? null : cur.data;
  }
}

module.exports = {
  BinarySearchTree,
};
