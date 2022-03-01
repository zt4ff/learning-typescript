class Board {
  ctx: CanvasRenderingContext2D;
  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  fillCell(x: number, y: number, color: string) {
    if (color) {
      this.ctx.fillStyle = color;
    }
    this.ctx.fillRect(x * 20, y * 20, 20, 20);
  }

  // gets board state from the server and renders it
  renderBoardState(board: Array<Array<string>> = []) {
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        color && this.fillCell(x, y, color);
      });
    });
  }

  drawBoard(numCells: number) {
    this.clearBoard();

    this.ctx.beginPath();
    for (let i = 0; i < numCells + 1; i++) {
      this.ctx.moveTo(i * numCells, 0);
      this.ctx.lineTo(i * numCells, 400);

      this.ctx.moveTo(0, numCells * i);
      this.ctx.lineTo(400, i * numCells);
    }

    this.ctx.strokeStyle = "#333";
    this.ctx.stroke();
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, 400, 400);
  }

  // get the cordinates when click upon
  getClickCordinates(element: Element, eventObject: MouseEvent) {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = eventObject;

    return {
      x: clientX - left,
      y: clientY - top,
    };
  }

  getCellCordinates(x: number, y: number) {
    return {
      x: Math.floor(x / 20),
      y: Math.floor(y / 20),
    };
  }
}

export { Board };
