import { For, createResource } from 'solid-js';
import axios from 'axios';
import { useMachine } from '../../components/useMachine';
// import { User, UserDocument } from '@nx-go-playground/api/usesssrs';
import { createMachine, assign } from 'xstate';
import { User } from '@mussia30/node/nest/users-api';

function getUsers() {
  return axios.get('http://localhost:8080/api/users').then((r: any) => r.data);
}
function deleteUser(id: string) {
  return axios.delete(`http://localhost:8080/api/users/${id}`);
}

interface MyChildMachineContext {
  data: Array<any>;
}
const myChildMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCeBhAFgSwDYQFkBDAYxwDswA6UgF2wDcwBiCAe0qu3IbYGtqMWgFVYYAE6wA2gAYAuolAAHNrGz0OikAA9EAdgCsVGQCYAHAE49ANgAstmbZMXrFgDQhUia0dtmTegDMZrYWfkEyBgC+UR5oWHiEpBTUdIwsEuJs4lRKuES0AGbZyFRCohLS8loqahrkWroIhsbmVnYOTi7unogAtAZmVHqWgWGBI9bWJgCMMzGxIORsEHBa8Tj4xGTcYDWq6tiaSDr9JgYmVGYGkSOBMmYzkbZ6Hl4IfTMGtlQGVgZ6J4GG5hJwxOIYTZJHacQpEPCQfZ1I4NE5NQIOKjmG6hWzBF4+axvM4zKhjPQyQKBVwzBzTaKLDaJbYpKiwACuJBIcHgJ1qh2OoHRmOxjnGIRsBiJvQQT0uZkMMgsFhm-hmbXBICZW2SuxoJHoTCRAtRQrOjiuNwBZnuj2erxlfWseioc1VFgueMCJmsNoWUSAA */
  createMachine(
    {
      id: 'myChildMachine',
      initial: 'active',
      // context: {data: []},
      states: {
        failed: {},
        success: {},
        active: {
          // fetchingList: {
          // entry: {},

          invoke: {
            // TODO context is making it seen as error
            id: 'getUsers',
            src: 'getUsers',
            // src: getUsers,
            // onDone: "success",
            // onEntry: "getUsers",

            // onDone: 'loaded',
            // after: {
            //   5000: 'timedOut',
            // },
            onDone: {
              target: 'success',
              actions: assign({
                data: (_context, event) => {
                  console.log('event', event.data); // log event

                  return event.data;
                },
              }),

              description: 'After successful action execution',
            },
            states: {
              // loaded: {},
            },
            onError: {
              target: 'failed',
              actions: assign({
                data: (_context, event) => {
                  alert(JSON.stringify(event.data, null, 2));
                  return event.data;
                },
              }),
              description: 'After failiure action execution',
            },
          },
          // },
        },
      },
    },
    {
      actions: {
        getUsers,
      },
      services: {
        getUsers,
      },
    }
  );

export const myParentMachine = createMachine(
  {
    id: 'myParentMachine',
    invoke: {
      src: `myChildMachine`,
      id: 'myInvokedMachineId',
      autoForward: true,
    },
  },
  {
    services: {
      myChildMachine,
    },
  }
);

const Users = () => {
  // const [data, setData] = createSignal([]);
  const [state, send] = useMachine<MyChildMachineContext>(myChildMachine, {});
  console.log('state', state.data);
  console.log('state', state.context);
  // const [data, { refetch }] = createResource(getUsers, { initialValue: [] });
  const dataa: Array<any> = [];
  function data() {
    return dataa;
  }
  // console.log('de', de);
  // console.log('data', data());
  // createEffect(() => {
  //   // getUsers();
  //   //   .then(setData);
  // });

  const deleteItem = (id: string) => {
    deleteUser(id).then(() => {
      // getUsers();
      // refetch();
    });
  };
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Users</h1>
      <div>
        data here
        <For each={data()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default Users;
