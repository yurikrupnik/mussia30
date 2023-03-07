export function add(a: number, b: number): number {
  return a + b;
}

export async function touchTxtFile(fileName: string = 'awesome') {
  await $`touch ${fileName}.txt`;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await touchTxtFile();
  console.log('Add 2 + 3 =', add(2, 3));
}
// https://github.com/japiirainen/vl
