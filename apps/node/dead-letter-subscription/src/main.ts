// import { Storage } from "@google-cloud/storage";
//
// const storage = new Storage();

// /**
//  * Triggered from a change to a Cloud Storage bucket.
//  *
//  * @param {!Object} event Event payload.
//  * @param {!Object} context Metadata for the event.
//  */
// const deadLetterSubscription = (event: any, context: any) => {
//   const gcsEvent = event;
//   console.log(`Processing file: ${gcsEvent.name}`);
//   console.log(`Processing file: ${context}`);
// };

const deadLetterSubscription = (req, res) => {
  const message = req.query.message || req.body.message || 'Hello Sela1111!';
  res.status(200).send(message);
};

export { deadLetterSubscription };
