"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const assert_1 = __importDefault(require("assert"));
const items_service_1 = require("../items/items.service");
const { server } = require('../dist/index.js');
describe('Example of test scenario:', () => {
    let id;
    it('1. Get all records with a GET api/users request (an empty array is expected)', async () => {
        const response = await (0, supertest_1.default)(server)
            .get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
    it('2. A new object is created by a POST api/users request', async () => {
        const response = await (0, supertest_1.default)(server)
            .post('/api/users')
            .send(items_service_1.postObject)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(201);
    });
    it('3. With a GET api/user/{userId} request, we try to get the created record by its id', async () => {
        const response = await (0, supertest_1.default)(server)
            .get('/api/users');
        expect(response.statusCode).toBe(200);
        id = response.body[0].id;
        expect((0, items_service_1.isValidUUID)(id)).toBe(true);
    });
    it('3a. With a GET api/user/{userId} request, we try to get the created record by its id', async () => {
        const response = await (0, supertest_1.default)(server)
            .get(`/api/users/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('postObject');
        expect(response.body.age).toBe(99);
        assert_1.default.deepEqual(response.body.hobbies, ['b', 'b', 'b']);
        expect(response.body.id).toBe(id);
    });
    it('4. We try to update the created record with a PUT api/users/{userId}request', async () => {
        const response = await (0, supertest_1.default)(server)
            .put(`/api/users/${id}`)
            .send(items_service_1.putObject)
            .set('Accept', 'application/json').expect(({ body }) => {
            id = body.id;
            const result = { ...items_service_1.putObject, id };
            expect(body).toEqual(result);
        });
        expect(response.statusCode).toBe(200);
    });
    it('4a. With a GET api/user/{userId} request, we try to get the created record with a PUT by its id', async () => {
        const response = await (0, supertest_1.default)(server)
            .get(`/api/users/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('putObject');
        expect(response.body.age).toBe(100);
        assert_1.default.deepEqual(response.body.hobbies, ['c', 'c', 'c']);
        expect(response.body.id).toBe(id);
    });
    it('5. With a DELETE api/users/{userId} request, we delete the created object by id', async () => {
        const response = await (0, supertest_1.default)(server)
            .delete(`/api/users/${id}`);
        expect(response.statusCode).toBe(204);
    });
    it('6. With a GET api/users/{userId} request, we are trying to get a deleted object by id', async () => {
        const response = await (0, supertest_1.default)(server)
            .get(`/api/users/${id}`);
        expect(response.statusCode).toBe(404);
    });
    server.close();
});
//# sourceMappingURL=server.test.js.map