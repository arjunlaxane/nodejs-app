import { ObjectID } from 'bson';
import { client } from '../index.js';

export async function createMovies(data) {
  return await client.db('guvi-db').collection('movies').insertMany(data);
}

export async function createUser(data) {
  return await client.db('guvi-db').collection('users').insertOne(data);
}

export async function updateMovieById(id, data) {
  return await client
    .db('guvi-db')
    .collection('movies')
    .updateOne({ _id: ObjectID(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db('guvi-db')
    .collection('movies')
    // .deleteOne({ id: '101' });
    .deleteOne({ _id: ObjectID(id) });
}
export async function getMovieById(id) {
  console.log('the id is', id);

  return await client
    .db('guvi-db')
    .collection('movies')
    // .findOne({ id: '101' });
    .findOne({ _id: ObjectID(id) });
}

export async function getUserByName(username) {
  return await client
    .db('guvi-db')
    .collection('users')
    // .findOne({ username:username });
    .findOne({ username: username });
}

export async function getAllMovies(request) {
  return await client
    .db('guvi-db')
    .collection('movies')
    .find(request.query) //mongodb filter
    .toArray();
}
