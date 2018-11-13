'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(team) {
    if (team === "yellow") {
      this.symbol = '💛';
    } else {
      this.symbol = '💙';
    }
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }  
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  createCheckers() {
    const yellowPos = [
      [0,1], [0,3], [0,5], [0,7],
      [1,0], [1,2], [1,4], [1,6],
      [2,1], [2,3], [2,5], [2,7]
    ];
    const bluePos = [
      [5,0], [5,2], [5,4], [5,6],
      [6,1], [6,3], [6,5], [6,7],
      [7,0], [7,2], [7,4], [7,6] 
    ];
    yellowPos.forEach((position) => {
      const checker = new Checker("yellow");
      this.checkers.push(checker);
      this.grid[position[0]][position[1]] = checker;
    })
    bluePos.forEach((position) => {
      const checker = new Checker("blue");
      this.checkers.push(checker);
      this.grid[position[0]][position[1]] = checker;
    })
  }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  moveChecker(position1, position2) {
    const checker = this.board.grid[position1[0]][position1[1]];
    this.board.grid[position2[0]][position2[1]] = checker;
    this.board.grid[position1[0]][position1[1]] = null;
    const row1 = Number(position1[0]);
    const row2 = Number(position2[0]);
    const column1 = Number(position1[1]);
    const column2 = Number(position2[1]);
    if (Math.abs(row2 - row1) > 1) {
      const rowAvg = (row1 + row2) / 2;
      const columnAvg = (column1 + column2) / 2;
      const deadChecker = this.board.grid[rowAvg][columnAvg];
      this.board.checkers = this.board.checkers.filter(checker => {
        return checker !== deadChecker;
      })
      this.board.grid[rowAvg][columnAvg] = null;
    }

  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
