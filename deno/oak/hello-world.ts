import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

app.use((ctx) => {
  ctx.response.body = 'Hello World from oak!';
});

await app.listen({ port: 8000 });
