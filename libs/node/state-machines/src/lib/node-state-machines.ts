// import { assign, createMachine } from 'xstate';
export function doit() {
  return 'do it';
}

export const promiseMachine = {
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' },
      },
    },
    resolved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
};

// export const fetchMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiJgBoQATwkBfedNSZcyAIZ5CAVwBOpAErUDATWZskIbr35CR4hFNkLF0wVwhwRK7COt8BYUsHAFoAFgAOaTkEEIiAdhxIgFYANnjkiIBGLPj0zNcQH1wCYj8eALtgiWjEACYwpkLinEIudQg8QShym0D7GucEAGZ4sKSEsJywgE4ZpjrhsLDm9GwcWG0MDDh4S39bINAHXJws4Yj0rITk2oRkrNSkrLqZ1Iurm9XVHA0tPTAvUqRzEgxiqTCwySqTqi2WM3iTERw0UiiAA */
//   createMachine({
//     id: 'fetch',
//     initial: 'idle',
//     context: {
//       userId: 42,
//       user: undefined,
//       error: undefined,
//     },
//     states: {
//       idle: {
//         on: {
//           FETCH: { target: 'loading' },
//         },
//       },
//       loading: {
//         invoke: {
//           // id: 'getUsers',
//           // src: (context, event) => getUsers({}),
//           onDone: {
//             target: 'success',
//             actions: assign({ user: (context, event) => event.data }),
//           },
//           onError: {
//             target: 'failure',
//             actions: assign({ error: (context, event) => event.data }),
//           },
//           states: {
//             success: {},
//             failure: {},
//           },
//         },
//       },
//       success: {},
//       failure: {
//         on: {
//           RETRY: { target: 'loading' },
//         },
//       },
//     },
//   });
