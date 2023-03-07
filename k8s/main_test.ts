import { assertEquals } from 'https://deno.land/std@0.178.0/testing/asserts.ts';
import { add, touchTxtFile } from './main.ts';

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
Deno.test(function addTest() {
  assertEquals(touchTxtFile('test'), '');
});
