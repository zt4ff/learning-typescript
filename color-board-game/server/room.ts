// this is where the room id is created and managed

// an array is probably not the best structure for this code so this is me
// trying stuff up
import { v4 as uuidv4 } from "uuid";
type Rooms = { users: number; id: string; board: Board };
let rooms: Array<Rooms> = [];
import { Board } from "./board";

export const joinRoom = () => {
  // loops through rooms and find if there's any room with less user
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].users < 5) {
      rooms[i].users++;
      return { id: rooms[i].id, board: rooms[i].board };
    }
  }

  // creates a new room
  const newID = uuidv4();
  const board = new Board(20);
  rooms.push({
    id: newID,
    users: 1,
    board,
  });

  return { id: newID, board };
};

export const leaveRoom = (roomID: string) => {
  // filter through the rooms and reduce the rooms user by one or filter out the number of user in
  // the room is 1
  rooms = rooms.filter((room) => {
    if (room.id === roomID) {
      if (room.users === 1) return false;
      else {
        room.users--;
      }
    }
    return true;
  });
};

export const onlineRooms = () => rooms;
