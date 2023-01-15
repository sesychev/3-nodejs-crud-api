import { v4 as uuidv4, validate } from 'uuid';
import { Items } from './items.interface';
import { BaseItem } from "./item.interface";

export const Objects: Items = {
  objects: []
};

export const object = {
  username: 'myName',
  age: 69,
  hobbies: ['a', 'b', 'c'],
}

export const postobject = {
  username: 'myName',
  age: 99,
  hobbies: ['c', 'b', 'a'],
}

export function createObject(object: BaseItem) {
  let newObject = {
    id: uuidv4(),
    ...object,
  };
  Objects.objects.push(newObject);
}

export function isValidUUID(id: string): boolean {
  return validate(id);
}

export function isValidItem(item: BaseItem): boolean {
  if (Object.keys(item).length !== 3) return false;
  if (typeof item.username !== 'string' || typeof item.age !== 'number' || !Array.isArray(item.hobbies)) return false;
  item.hobbies.forEach(element => {
    if (typeof element !== 'string') return false;
  })

  return true;
}