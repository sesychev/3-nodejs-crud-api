export interface BaseItem {
  username: string;
  age: number;
  hobbies: Array<string> | [];
}

export interface Item extends BaseItem {
  id: string;
}