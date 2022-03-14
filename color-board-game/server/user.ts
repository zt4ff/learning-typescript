import { Board } from "./board";
import { names } from "./names";
import { Room } from "./room";

class RandomUser {
  public username: string;
  public color: string;
  public roomID: string;
  public board: Board | null;

  constructor() {
    this.username = this.getRandomName();
    this.color = this.convertStringToColor(this.username);
    this.roomID = "";
    this.board = null;
  }

  public async join(room: Room) {
    const data = await room.joinRoom();
    this.roomID = data.id;
    this.board = data.board;
    return this;
  }

  private getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
  }

  private convertStringToColor(st: string) {
    function hashCode(str: string) {
      // java String#hashCode
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    }

    function intToRGB(i: number) {
      const c = (i & 0x00ffffff).toString(16).toUpperCase();

      return `#${"00000".substring(0, 6 - c.length) + c}`;
    }
    return intToRGB(hashCode(st));
  }
}

export { RandomUser, User };
