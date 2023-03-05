// import express from 'express';
// const app = express();
//
// export function add(a: number, b: number): number {
//   return a + b;
// }
//
// app.get('/', (req, res) => {
//   res.send('Welcome to the Dinosaur d!');
// });
//
// app.listen(8080);

import Fastify from 'fastify';
const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', (request, reply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
  // reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen({ port: 8080 }, (err, address) => {
  if (err) throw err;
  console.log(`address: ${address}`);
  // Server is now listening on ${address}
});
