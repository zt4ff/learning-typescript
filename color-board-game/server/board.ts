// manages the game state and the board state

class Board {
  private _board: GameBoard;
  private _size: number;

  constructor(size: number) {
    this._size = size;
    this._board = Array(this._size)
      .fill(null)
      .map(() => Array(this._size).fill(null));
  }

  public clear() {
    this._board = Array(this._size)
      .fill(null)
      .map(() => Array(this._size).fill(null));
  }

  public removeDisconnectedUserFromBoard(color: string) {
    this._board = this._board.map((row) => {
      return row.map((c) => (c === color ? null : c));
    });
  }

  private inBounds(x: number, y: number) {
    return (
      y >= 0 && y < this._board.length && x >= 0 && x < this._board[y].length
    );
  }

  private numMatchers(x: number, y: number, dx: number, dy: number) {
    let i = 1;
    while (
      this.inBounds(x + i * dx, y + i * dy) &&
      this._board[y + i * dy][x + i * dx] === this._board[y][x]
    ) {
      i++;
    }

    return i - 1;
  }

  public isWinningTurn(x: number, y: number) {
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        if (dx === 0 && dy === 0) {
          continue;
        }
        const count =
          this.numMatchers(x, y, dx, dy) + this.numMatchers(x, y, -dx, -dy) + 1;

        if (count >= 5) {
          return true;
        }
      }
    }

    return false;
  }

  public get getBoard() {
    return this._board;
  }

  public makeTurn(x: number, y: number, color: string) {
    this._board[y][x] = color;
    return this.isWinningTurn(x, y);
  }
}

export { Board };
