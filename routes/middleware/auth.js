//this is the 1st time we r building custom middleware

// import { request, response } from 'express';

import jwt from 'jsonwebtoken';

//export this middleware.
export const auth = (request, response, next) => {
  try {
    const token = request.header('x-auth-token');
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    next(); //it get excutes write after auth
    //if u didint call next then it will sending only in postman but in console it will show token
    //next is callback
  } catch (err) {
    response.status(401).send({ error: err });
  }
};
