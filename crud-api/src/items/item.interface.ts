// src/items/item.interface.ts

export interface Item {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string> | [];
}

//https://stackoverflow.com/questions/43837659/guid-uuid-in-typescript-node-js-app