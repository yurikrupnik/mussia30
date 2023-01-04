import { For, createResource } from 'solid-js';
import axios from 'axios';
// import { User, UserDocument } from '@nx-go-playground/api/usesssrs';
import {
  createMachine,
  assign,
  Machine,
  MachineConfig,
  MachineOptions,
} from 'xstate';
import { useMachine } from '../../components/useMachine';
// import { json } from 'stream/consumers';

function getUsersGrpc() {
  return (
    axios
      // .get('http://localhost:8080/todo')
      .get('http://localhost:8080/api/grpc-users')
      // .get('/api/projects')
      .then((r: any) => r.data)
  );
}

function getUsers() {
  return (
    axios
      // .get('http://localhost:8080/todo')
      .get('http://localhost:8080/api/users')
      // .get('/api/projects')
      .then((r: any) => r.data)
  );
}

function deleteTodo(id: string) {
  return axios.delete(`http://localhost:8080/api/grpc-users/${id}`);
}

interface Context {
  retries: number;
}

const fetchMachine = createMachine<Context>(
  {
    id: 'Machine Name',
    initial: 'First State',
    // tsTypes: {} as import("./todos.typegen").Typegen0,
    schema: {
      context: {
        retries: 1,
      },
      // services: {},
      // actions: {},
      // events: {},
      // guards: ""
    },
    states: {
      'First State': {
        on: {
          Event: {
            target: 'Second State',
          },

          'Event 2': 'new state 3',
        },
      },

      'Second State': {},
      Login: {},

      'HTTP Request': {
        on: {
          'Event 1': 'new state 4.new state 2',
        },
      },

      'new state 2': {},
      'new state 3': {},
      'new state 4': {
        states: {
          'new state 1': {
            on: {
              'Event 1': 'new state 2',
            },
          },

          'new state 2': {},
          'new state 3': {},
        },

        initial: 'new state 1',

        on: {
          'Event 1': '.new state 3',
        },
      },
    },
    on: {
      'Event 1': {},
    },
  },
  {}
);

interface ToggleContext {
  count: number;
  disabledCount: number;
  selected: Array<string>;
  // selected: Todo
}

// 5 parts states, events, transitions

const toggleMachine = createMachine<ToggleContext>(
  {
    id: 'toggle',
    initial: 'inactive',
    context: {
      count: 0,
      disabledCount: 0,
      selected: [],
    },
    states: {
      inactive: {
        entry: assign({ disabledCount: (ctx) => ctx.disabledCount + 1 }),
        on: { TOGGLE: 'active' },
      },
      active: {
        entry: assign({ count: (ctx) => ctx.count + 1 }),
        on: { TOGGLE: 'inactive' },
      },
    },
  },
  {
    actions: {
      focusTitle: function (ctx) {
        // console.log({ ctx });
        return 1;
      },
      somefunction: function (ctx) {
        console.log({ ctx });
      },
      getUsers: function (ctx) {
        return 1;
      },
    },
  }
);

const Todos = () => {
  // const [data, setData] = createSignal([]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [fetchMachineState, fetchMachineSend] = useMachine(fetchMachine, {});
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state, send] = useMachine<ToggleContext>(toggleMachine, {});
  // state.matches('active');
  // state.context.
  const [data] = createResource(getUsers, { initialValue: [] });
  // fetchMachineSend.send("HTTP Request");
  // console.log('data', data());
  // createEffect(() => {
  //   // getUsers();
  //   //   .then(setData);
  // });
  const toggle = () => send('TOGGLE');

  const deleteItem = (id: string) => {
    deleteTodo(id).then(() => {
      getUsers();
    });
  };
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Users</h1>
      <main>
        <h1>XState Solid Example</h1>
        <h2>Granular State Machine</h2>
        {/* <div>{JSON.stringify(state.context, null, 2)}</div> */}
        <button onClick={toggle}>
          Click me ({state.matches('active') ? '✅' : '❌'})
        </button>{' '}
        <code>
          Toggled <strong>{state.context.count}</strong> timesss
        </code>
      </main>
      <div>
        data heress
        <For each={data()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <input type="checkbox" />
                <div class="py-6 w-full">{item.lastName}</div>
                <div class="py-6 w-full">{item.firstName}</div>
                <div class="py-6 w-full">{state.context.count}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
        <div>
          <button onclick={() => getDataByPage('')}></button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
