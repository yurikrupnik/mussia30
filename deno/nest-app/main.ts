// @deno-types="npm:@types/express@4.17.15"
import express from 'npm:express@4.18.2';
// import fastify from 'npm:fastify@4.18.2';
/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
 */
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Dinosaur API!');
});

app.listen(8000);
