// manages the game state and the board state

class GameBoard {
  private _board: Array<Array<string | null>>;
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

  public get board() {
    return this._board;
  }

  public makeTurn(x: number, y: number, color: string) {
    this._board[y][x] = color;
  }
}

export { GameBoard };
