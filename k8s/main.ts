export function add(a: number, b: number): number {
  return a + b;
}

export async function touchTxtFile(fileName: string = 'awesome') {
  const text = await Deno.readTextFile('./Taskfile.yaml').catch((err) => {
    console.log('err', err);
  });
  console.log(text);
  const p = Deno.run({ cmd: ['echo', 'internal echo'] });
  const pa = Deno.run({ cmd: ['ls'] });
  const paa = Deno.run({ cmd: ['ls'] });
  // All the aboce fail

  // const a = Deno.run({ cmd: ['task -a'] });
  // await a.status();

  // Deno.run({ cmd: ['docker ps'] });

  // const paa = Deno.run({ cmd: ['kubectl cluster-info'] });
  // await paa.status();
  await p.status();
  await pa.status();
  await paa.status();
  // await $`touch ${fileName}.txt`;
  // await $`touch ${fileName}.txt`;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await touchTxtFile();
  // console.log('Add 2 + 3 =', add(2, 3));
}
// https://github.com/japiirainen/vl
