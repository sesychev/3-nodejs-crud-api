// src/items/items.interface.ts
import { v1 as uuidv1 } from 'uuid';
import { Item } from "./item.interface";

export const items: Item[] = [
  {
    id: uuidv1(),
    username: 'myName',
    age: 69,
    hobbies: ['a', 'b', 'c'],
  }
];