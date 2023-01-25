import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
console.log("Current Deno version", Deno.version.deno);
console.log("Current TypeScript version", Deno.version.typescript);
// console.log("Current TypeScript version", "12");
console.log("Current V8 version", Deno.version.v8);
const data = [
  {
    name: "aris"
  },
  {
    name: "nir"
  }
];

const handler = async (request: Request): Promise<Response> => {
  console.log("body", request.body);
  console.log("url", request.url);
  const resp = await fetch("https://api.github.com/users/denoland", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

console.log("Listening on http://localhost:8000");
serve(handler);
// /**
//  * read.ts
//  */
// const text = await Deno.readTextFile("./people.json");
// console.log(text);
//
//
// export { };
// /**
//  * Output:
//  *
//  * [
//  *   {"id": 1, "name": "John", "age": 23},
//  *   {"id": 2, "name": "Sandra", "age": 51},
//  *   {"id": 5, "name": "Devika", "age": 11}
//  * ]
//  */
