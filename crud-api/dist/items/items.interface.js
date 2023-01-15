"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = void 0;
// src/items/items.interface.ts
const uuid_1 = require("uuid");
exports.items = [
    {
        id: (0, uuid_1.v1)(),
        username: 'myName',
        age: 69,
        hobbies: ['a', 'b', 'c'],
    }
];
//# sourceMappingURL=items.interface.js.map