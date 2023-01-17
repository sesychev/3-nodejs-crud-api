import request from 'supertest';
import assert from 'assert';
import { isValidUUID, postObject, putObject } from '../items/items.service';
import { server } from '../../src/index';

describe('Example of test scenario:', () => {
  let id: string;

  it('1. Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(server)
      .get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('2. A new object is created by a POST api/users request', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(postObject)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });

  it('3. With a GET api/user/{userId} request, we try to get the created record by its id', async () => {
    const response = await request(server)
      .get('/api/users')
    expect(response.statusCode).toBe(200);
    id = response.body[0].id;
    expect(isValidUUID(id)).toBe(true);
  });

  it('3a. With a GET api/user/{userId} request, we try to get the created record by its id', async () => {
    const response = await request(server)
      .get(`/api/users/${id}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('postObject');
    expect(response.body.age).toBe(99);
    assert.deepEqual(response.body.hobbies, ['b', 'b', 'b']);
    expect(response.body.id).toBe(id);
  });

  it('4. We try to update the created record with a PUT api/users/{userId}request', async () => {
    const response = await request(server)
      .put(`/api/users/${id}`)
      .send(putObject)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  it('4a. With a GET api/user/{userId} request, we try to get the created record with a PUT by its id', async () => {
    const response = await request(server)
      .get(`/api/users/${id}`)
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('putObject');
    expect(response.body.age).toBe(100);
    assert.deepEqual(response.body.hobbies, ['c', 'c', 'c']);
    expect(response.body.id).toBe(id);
  });

  it('5. With a DELETE api/users/{userId} request, we delete the created object by id', async () => {
    const response = await request(server)
      .delete(`/api/users/${id}`);
    expect(response.statusCode).toBe(204);
  });

  it('6. With a GET api/users/{userId} request, we are trying to get a deleted object by id', async () => {
    const response = await request(server)
      .get(`/api/users/${id}`)
    expect(response.statusCode).toBe(404);
  });

  server.close();
});





