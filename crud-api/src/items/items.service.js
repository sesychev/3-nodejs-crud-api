"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidItem = exports.isValidUUID = exports.createObject = exports.putObject = exports.postObject = exports.object = exports.Objects = void 0;
const uuid_1 = require("uuid");
exports.Objects = {
    objects: []
};
exports.object = {
    username: 'object',
    age: 69,
    hobbies: ['a', 'b', 'c'],
};
exports.postObject = {
    username: 'postObject',
    age: 99,
    hobbies: ['b', 'b', 'b'],
};
exports.putObject = {
    username: 'putObject',
    age: 100,
    hobbies: ['c', 'c', 'c'],
};
function createObject(object) {
    let newObject = {
        id: (0, uuid_1.v4)(),
        ...object,
    };
    exports.Objects.objects.push(newObject);
}
exports.createObject = createObject;
function isValidUUID(id) {
    return (0, uuid_1.validate)(id);
}
exports.isValidUUID = isValidUUID;
function isValidItem(item) {
    if (Object.keys(item).length !== 3)
        return false;
    if (typeof item.username !== 'string' || typeof item.age !== 'number' || !Array.isArray(item.hobbies))
        return false;
    item.hobbies.forEach(element => {
        if (typeof element !== 'string')
            return false;
    });
    return true;
}
exports.isValidItem = isValidItem;
//netstat -ano | findstr :<PORT>
//taskkill /PID <PID> /F
//# sourceMappingURL=items.service.js.map