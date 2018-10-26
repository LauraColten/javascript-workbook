'use strict';

/* Function planning
function movePiece will move from start stack to end stack 
function isLegal will test whether the move is legal- will return true or false
function checkForWin will check each move for a win- will return true or false
function reset will reset the game is checkForWin is true
2 new tests - test if the startStack is empty
            - small block onto larger block
*/


const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  if (startStack === 'a' && endStack === 'b') {
    let mover = stacks.a.pop();
    stacks.b.push(mover);
  } else if (startStack === 'a' && endStack === 'c') {
    let mover = stacks.a.pop();
    stacks.c.push(mover);
  } else if (startStack === 'b' && endStack === 'a') {
    let mover = stacks.b.pop();
    stacks.a.push(mover);
  } else if (startStack === 'b' && endStack === 'c') {
    let mover = stacks.b.pop();
    stacks.c.push(mover);
  } else if (startStack === 'c' && endStack === 'a') {
    let mover = stacks.c.pop();
    stacks.a.push(mover);
  } else {
    let mover = stacks.c.pop();
    stacks.b.push(mover);
  }
}

function isLegal(start, end) {
  const startStack = stacks[start];
  const endStack = stacks[end];
  if (startStack.length === 0) {
    return false;
  }
  if (endStack.length === 0) {
    return true;
  } else if (startStack[startStack.length - 1] > endStack[endStack.length - 1]) {
    return false;
  } else {
    return true;
  }
}

function checkForWin() {
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    console.log('You win!')
    return true;
  } else {
    return false;
  }
}

function reset() {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

function towersOfHanoi(startStack, endStack) {
  movePiece(startStack, endStack);
  isLegal(startStack, endStack);
  if (checkForWin()) {
    reset();
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a small block on a big block', () => {
      stacks = {
        a: [4, 3],
        b: [1],
        c: [2],
      };
      assert.equal(isLegal('b', 'c'), true);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('should only move if startStack is not empty', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('b', 'c'), false);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
