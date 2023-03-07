#!/usr/bin/env vl

import 'https://deno.land/x/violet/globals.d.ts';

Deno.env.set('FOO', 'bar');

await $`echo $FOO > tmp.txt`;
await $`cat tmp.txt`;
await $`echo ${os.homedir()}`;
await retry(5)`curl localhost`;

// or with a specified delay (500ms)
await retry(5, 500)`curl localhost`;

const flags = ['--oneline', '--decorate', '--color'];
const { exitCode } = await $`git log ${flags}`;

import 'https://deno.land/x/violet/globals.d.ts';

await $`echo "Hello, stdout!"`.pipe(
  fs.createWriteStream('/tmp/output.txt', {})
);

await $`cat /tmp/output.txt`;
