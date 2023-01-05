import { createMachine, assign } from 'xstate';

function getUsers() {
  return fetch('http://localhost:5005/api/users').then((r) => r.json());
}

// const myChildMachine = createMachine({
//   id: 'myChildMachines',
//   initial: 'active',
//   states: {
//     active: {},
//     not_active: {},
//   },
// });

interface ToggleMachineContext {
  count: number;
}

export const toggleMachine = createMachine<ToggleMachineContext>(
  {
    id: 'toggle',
    initial: 'inactive',
    context: {
      count: 0,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
            actions: assign({
              count: (context) => context.count + 1,
            }),
          },
        },
      },
      active: { on: { TOGGLE: 'inactive' } },
    },
  },
  {
    services: {
      getUsers,
    },
  }
);
