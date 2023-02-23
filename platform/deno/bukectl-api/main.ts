import { autoDetectClient } from 'https://deno.land/x/kubernetes_client/mod.ts';
const kubernetes = await autoDetectClient();

export const podList = await kubernetes.performRequest({
  method: 'GET',
  path: `/api/v1/namespaces/default/pods`,
  expectJson: true, // run JSON.parse on the response body
});
console.log(podList);

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log('Add 2 + 3 =', add(2, 3));
}
