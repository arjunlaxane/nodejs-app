import express from 'express'; //importing 3rd party <pac></pac>kage
import { createUser, getUserByName } from './helper.js';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const router = express.Router();

// const jwt = require('jsonwebtoken');

//hashing password

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt, hashedPassword);
  return hashedPassword;
}

//signup
router.post('/signup', async function (request, response) {
  // const data = request.body;
  // console.log(data);

  //first validation and then create user
  const { username, password } = request.body;

  //user logic
  const useFromDB = await getUserByName(username);
  console.log(useFromDB);

  if (useFromDB) {
    //400-bad request
    response.status(400).send({ message: 'Username already exists' });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: 'Password must be atleast 8 character' });
  } else {
    //to get hash password:
    const hashedPassword = await generateHashedPassword(password);
    console.log(hashedPassword);
    //db.users.insertOne(data)

    //data we should send b4 create user
    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    response.send(result);
  }
});

//login
router.post('/login', async function (request, response) {
  const { username, password } = request.body;

  //user logic
  const useFromDB = await getUserByName(username);
  console.log(useFromDB);

  if (!useFromDB) {
    response.status(401).send({ message: 'Invalid credential' });
  } else {
    //check password
    const storedPassword = useFromDB.password;
    //here stored passwrd should match with destructured password but this will not happen as hash value is always different.
    //here we will use bcrypt to sort this matter out
    const isPasswordMatch = await bcrypt.compare(password, storedPassword); //it will take time to compare, so await
    console.log(isPasswordMatch);

    //401-unauthenticated
    if (isPasswordMatch) {
      const token = jwt.sign({ id: useFromDB._id }, process.env.SECRET_KEY);

      response.send({ message: 'Successful login', token: token });
    } else {
      response.status(401).send({ message: 'Invalid credential' });
    }
  }
});

export const usersRouter = router;
