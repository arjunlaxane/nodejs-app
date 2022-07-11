import express from 'express'; //importing 3rd party <pac></pac>kage
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  createMovies,
} from './helper.js';
const router = express.Router();

//movies api's

//all movies
router.get('/', async function (request, response) {
  //db.movies.find({})

  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  //request is object
  console.log(request.query);

  //find doesn't return array. it returns curson. curson is called pagination
  //find will give u 1st 20 results but here we want all data single time.check compass / command-type mongo, use guvi-db,use find command
  //convert cursor to array with toArray()

  //So, now i dont need data i.e. const movies=[] locally as it is comming from mongodb

  const movies = await getAllMovies(request);
  // console.log('Movies', movies);
  response.send(movies);
});

//individual movies

// app.get('/movies/:id', function (request, response) {
//   console.log(request.params);
//   //params is object--param:{id:"104"}
//   const { id } = request.params;
//   console.log(request,id);
//   const movie = movies.find(mv => mv.id === id);
//   movie
//     ? response.send(movie)
//     : response.status(404).send({ msg: 'movie not found' });
// });

//to remove array we use find instead of filter

//to convert api into mongo db

router.get('/:id', async function (request, response) {
  console.log(request.params);
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  //query for particular movie alone from db
  //db.movies.findOne({id:101})

  const movie = await getMovieById(id);
  console.log(movie);
  //we use await bcoz it will take time ti go and get data. app crashes if async not use for function. put async on line 134
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: 'movie not found' });
});

//delete operation

router.delete('/:id', async function (request, response) {
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  //query for particular movie alone from db
  //db.movies.deleteOne({id:101})

  const result = await deleteMovieById(id);
  console.log(result);
  //we use await bcoz it will take time ti go and get data. app crashes if async not use for function. put async on line 134
  result.deletedCount > 0
    ? // ? response.send(result)
      response.send({ msg: 'Movie deleted successfully' })
    : response.status(404).send({ msg: 'movie not found' });
});

//update operation
router.put('/:id', async function (request, response) {
  console.log(request.params);
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  const data = request.body;

  //query for particular movie alone from db
  //db.movies.updateOne({id:101},{$set:data})

  const result = await updateMovieById(id, data);
  response.send(result);
  console.log(result);
});

//creating data-creating api

//use middleware(inbuilt)-express.json()
//it converts body to json

// app.post('/movies',express.json(),async
router.post('/', async function (request, response) {
  //data is coming to body,see postman
  const data = request.body;
  console.log(data); //node doesnt know that it is json data from postman. It will be undefined if middleware doesn't use

  //we have to db operation now
  //db.movies.insertMany(data)

  //now u have to write same query such that node understands it
  const result = await createMovies(data);
  response.send(result);
});

export const moviesRouter = router;
