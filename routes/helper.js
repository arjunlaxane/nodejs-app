import { client } from '../index.js';

export async function createMovies(data) {
  return await client.db('guvi-db').collection('movies').insertMany(data);
}
export async function updateMovieById(id, data) {
  return await client
    .db('guvi-db')
    .collection('movies')
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db('guvi-db')
    .collection('movies')
    // .deleteOne({ id: '101' });
    .deleteOne({ id: id });
}
export async function getMovieById(id) {
  return await client
    .db('guvi-db')
    .collection('movies')
    // .findOne({ id: '101' });
    .findOne({ id: id });
}
export async function getAllMovies(request) {
  return await client
    .db('guvi-db')
    .collection('movies')
    .find(request.query) //mongodb filter
    .toArray();
}
