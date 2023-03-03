// @deno-types="npm:@types/express@4.17.15"
import express from 'npm:express@4.18.2';
/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
 */
export {
  add,
  multiply,
} from 'https://x.nest.land/ramda@0.27.0/source/index.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Dinosaur API!');
});

app.listen(8000);
