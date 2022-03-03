import { names } from "./names";
// generate a suite of random colors and usernames
type User = {
  username: string;
  color: string;
  isSelected?: boolean;
};

class RandomUser {
  public username: string;
  public color: string;
  constructor() {
    this.username = this.getRandomName();
    this.color = this.convertStringToColor(this.username);
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
