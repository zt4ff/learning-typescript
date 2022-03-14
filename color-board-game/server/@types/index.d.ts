declare global {
  type GameBoard = Array<Array<string | null>>;

  // generate a suite of random colors and usernames
  type User = {
    username: string;
    color: string;
    roomID: string;
    isSelected?: boolean;
  };
}

export {};
