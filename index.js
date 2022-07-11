import express from 'express'; //importing 3rd party package
import { MongoClient } from 'mongodb';

// const express = require('express');//3rd party package
// const { MongoClient } = require('mongodb');
const app = express();

const PORT = 4000;

// const movies = [
//   {
//     id: '100',
//     name: 'RRR',
//     poster:
//       'https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG',
//     rating: 8.8,
//     summary:
//       'RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.',
//     trailer: 'https://www.youtube.com/embed/f_vbAtFSEc0',
//   },
//   {
//     id: '101',
//     name: 'Iron man 2',
//     poster:
//       'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg',
//     rating: 7,
//     summary:
//       'With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.',
//     trailer: 'https://www.youtube.com/embed/wKtcmiifycU',
//   },
//   {
//     id: '102',
//     name: 'No Country for Old Men',
//     poster:
//       'https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg',
//     rating: 8.1,
//     summary:
//       "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//     trailer: 'https://www.youtube.com/embed/38A__WT3-o0',
//   },
//   {
//     id: '103',
//     name: 'Jai Bhim',
//     poster:
//       'https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg',
//     summary:
//       'A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case',
//     rating: 8.8,
//     trailer: 'https://www.youtube.com/embed/nnXpbTFrqXA',
//   },
//   {
//     id: '104',
//     name: 'The Avengers',
//     rating: 8,
//     summary:
//       "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//     poster:
//       'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg',
//     trailer: 'https://www.youtube.com/embed/eOrNdBpGMv8',
//   },
//   {
//     id: '105',
//     name: 'Interstellar',
//     poster: 'https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg',
//     rating: 8.6,
//     summary:
//       'When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.',
//     trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
//   },
//   {
//     id: '106',
//     name: 'Baahubali',
//     poster: 'https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg',
//     rating: 8,
//     summary:
//       'In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.',
//     trailer: 'https://www.youtube.com/embed/sOEg_YZQsTI',
//   },
//   {
//     id: '107',
//     name: 'Ratatouille',
//     poster:
//       'https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=',
//     rating: 8,
//     summary:
//       'Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.',
//     trailer: 'https://www.youtube.com/embed/NgsQ8mVkN8w',
//   },
// ];
//app.use->intercept->apllies express.json() (inbuilt middleware)

//so in future post operrations...no worry. app.use , will intercept it and convert data body to json

app.use(express.json());

// const MONGO_URL="mongodb://localhost";//nodejs version 16
// const MONGO_URL = 'mongodb://127.0.0.1';

import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGO_URL); //see url in console now put in MONGO_URL value instead of empty string

const MONGO_URL = process.env.MONGO_URL; //connection string deleted put empty string it it's place

//nodejs version 16+
async function createConnection() {
  const client = new MongoClient(MONGO_URL); //like dialing
  await client.connect(); //we will've to wait
  console.log('Mongo is connected');
  return client;
}
const client = await createConnection(); //connection done

//home-welcome page
app.get('/', function (request, response) {
  response.send('Hello World,Arjun😁');
}); //this is our first api

//movies
app.get('/movies', async function (request, response) {
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

  const movies = await client
    .db('guvi-db')
    .collection('movies')
    .find(request.query) //mongodb filter
    .toArray();
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

app.get('/movies/:id', async function (request, response) {
  console.log(request.params);
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  //query for particular movie alone from db
  //db.movies.findOne({id:101})

  const movie = await client
    .db('guvi-db')
    .collection('movies')
    // .findOne({ id: '101' });
    .findOne({ id: id });
  console.log(movie);
  //we use await bcoz it will take time ti go and get data. app crashes if async not use for function. put async on line 134
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: 'movie not found' });
});

//delete operation

app.delete('/movies/:id', async function (request, response) {
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  //query for particular movie alone from db
  //db.movies.deleteOne({id:101})

  const result = await client
    .db('guvi-db')
    .collection('movies')
    // .deleteOne({ id: '101' });
    .deleteOne({ id: id });
  console.log(result);
  //we use await bcoz it will take time ti go and get data. app crashes if async not use for function. put async on line 134
  result.deletedCount > 0
    ? // ? response.send(result)
      response.send({ msg: 'Movie deleted successfully' })
    : response.status(404).send({ msg: 'movie not found' });
});

//update operation
app.put('/movies/:id', async function (request, response) {
  console.log(request.params);
  //params is object--param:{id:"104"}
  const { id } = request.params;
  console.log(request.param, id);
  const data = request.body;

  //query for particular movie alone from db
  //db.movies.updateOne({id:101},{$set:data})

  const result = await client
    .db('guvi-db')
    .collection('movies')
    .updateOne({ id: id }, { $set: data });
  response.send(result);
  console.log(result);
});

//creating data-creating api

//use middleware(inbuilt)-express.json()
//it converts body to json

// app.post('/movies',express.json(),async
app.post('/movies', async function (request, response) {
  //data is coming to body,see postman
  const data = request.body;
  console.log(data); //node doesnt know that it is json data from postman. It will be undefined if middleware doesn't use

  //we have to db operation now
  //db.movies.insertMany(data)

  //now u have to write same query such that node understands it
  const result = await client
    .db('guvi-db')
    .collection('movies')
    .insertMany(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`App started in ${PORT}`));

//whenever u make changes , cut the server as it will not automatically restart server ctrl+c
