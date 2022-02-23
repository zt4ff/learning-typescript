// manages the game state and the board state

const createGameBoard = (size: number) => {
    let board: Array<any>

    // create a 2d array with null
    const clear = () => {
        board = Array(size).fill(null).map(() => Array(size).fill(null))
    }

    clear()

    const getBoard = () => board

    const makeTurn = (x: any, y: any, color: string) => {
        board[y][x] = color
    }

    return {
        clear, getBoard, makeTurn
    }
}

export {createGameBoard}