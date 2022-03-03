class Board {
  private ctx: CanvasRenderingContext2D;
  private numOfCells: number;
  private canvasHeight: number;
  private canvasWidth: number;

  constructor(context: CanvasRenderingContext2D, numOfCells: number) {
    this.ctx = context;
    this.numOfCells = numOfCells;
    this.canvasHeight = this.ctx.canvas.clientHeight;
    this.canvasWidth = this.ctx.canvas.clientWidth;
  }

  /**
   * @description clears everything in the board
   */
  private clearBoard() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  /**
   * @description draws the board like a spreadsheet format
   * @param numCells the number of cells in each row of application
   */
  public drawBoard() {
    this.clearBoard();

    this.ctx.beginPath();
    for (let i = 0; i < this.numOfCells + 1; i++) {
      this.ctx.moveTo(i * this.numOfCells, 0);
      this.ctx.lineTo(i * this.numOfCells, this.canvasHeight);

      this.ctx.moveTo(0, this.numOfCells * i);
      this.ctx.lineTo(this.canvasWidth, i * this.numOfCells);
    }

    this.ctx.strokeStyle = "#333";
    this.ctx.stroke();
  }

  /**
   * @description loops through the logic state from the server and renders the color on the game board
   * @param board the board state which is an array of array with color strings
   */
  public renderBoardState(board: GameBoard = []) {
    this.drawBoard();
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        color && this.fillCell(x, y, color);
      });
    });
  }

  public fillCell(x: number, y: number, color: string) {
    if (color) {
      this.ctx.fillStyle = color;
    }
    this.ctx.fillRect(
      x * this.numOfCells,
      y * this.numOfCells,
      this.numOfCells,
      this.numOfCells
    );
  }

  /**
   * @description get the cordinates when click upon
   * @param element
   * @param eventObject
   * @returns
   */
  public getCellCordinates(element: Element, eventObject: MouseEvent) {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = eventObject;

    const x = clientX - left;
    const y = clientY - top;
    return {
      x: Math.floor(x / this.numOfCells),
      y: Math.floor(y / this.numOfCells),
    };
  }
}

export { Board };
