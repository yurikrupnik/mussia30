import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';
import { useMachine, useInterpret, useActor } from '@xstate/react';
import { createMachine, assign, raise, spawn, send } from 'xstate';
import { User } from '@mussia30/node/nest/users-api';
// import { Create§ } from '@xstate';
// import toggleMachine from '../../xstate';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
//   useMutation,
// } from '@tanstack/react-query';
import { useQuery, useMutation } from 'react-query';
import { useEffect, useState } from 'react';

// todo check import wtf!
import {
  doit,
  promiseMachine,
  fetchMachine as Mac,
} from '@mussia30/node/state-machines';

function getUsers(q: any) {
  console.log('q getUsers', q);

  return axios.get<User[]>('http://localhost:8080/api/users').then((res) => {
    console.log({ data: res.data });
    return res.data;
  });
}
function getUser(id: string, q: any) {
  return axios
    .get<User>(`http://localhost:8080/api/users/${id}`)
    .then((res) => {
      // console.log({ data: res.data });
      return res.data;
    });
}
function deleteUser(id: string, q: any) {
  return axios.delete(`http://localhost:8080/api/users/${id}`).then((res) => {
    return res.data;
  });
}
function createUser(data: any) {
  return axios.post('http://localhost:8080/api/users', data).then((res) => {
    console.log('createUsers', { data: res.data });
    return res.data;
  });
}

// const context = {
//   data: undefined,
// };
const fetchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiALQBGJgGYcAdgAsATgUBWWaqnqAHDNkAaEAE9JUgGwqcS2SoBMKqRosX1K1wF9Px1JlwExCRoAIYATjBozGxIINy8-EIi4gjScoqqGlpOegbGZggKOLKyTBa6SrYV6lIV3r7o2DiwYMQYaJA4fth4glAAMniwaCQQQmD4ggBuXADWE5EAqi1hsNEi8XwCwrEpltYqWhYyrgoOrvb5iFL2OEwqena6ulqO+rr1IN24LW0dEF1GlhegMhiMwGEwlwwjgOIQQmhkNCALY4JYrNasDY8LZJXbXKw4Q5KY5lCxnewXK4IGRKHC6M6WKQqFRMe66FRKbw+ECCLgQOAib7YhLbZKSeyydQ4VxyEkqCq6Cyyey6akSezqCxE+yqclair2BSSz7ffBEMAi3E7UApaQMmUWOVWRXK1XUqQ2JjqI1lBS6MpOWwKU1AnD8ZGQADyAFc0FbEjaxOYHbKjgqlEqVWrTNdasUA-cFDolExM14eWaBcQOssIQmxfjUrUimn5a7s9T3PTzi8nE69CpQ-5mq0wO1IA28bbJEpbkXVEoFGdZJZ7kp1RoCwqzmWTqqQ5Ww79x-9Af4QYNhlOkylpazNd77PYyn2ytTdTh1Gz-U6mApV2NWRhyaE8JwBQguBCAUIBvcUEBKaVZA0KQ50lJQpBVJR1GpEoMmQzlAIUKx1BAn4x3AroQjwYhYNiTZE3gxDihQtCtEw3UcNzGlKS-I0X0qVdlTUQ8GhHSDoJBOCm10eklwfZlng5Bl1UsWSHiYTDXEqMsMO5TwgA */
  createMachine(
    {
      id: 'fetch',
      initial: 'selected',
      type: 'parallel',
      context: {
        userId: 0,
        user: undefined,
        error: undefined,
        data: [],
      },
      states: {
        idle: {
          on: {
            FETCH: { target: 'loading' },
            target: 'selected',
          },
          states: {},
        },
        timedOut: {
          meta: {
            error: 'Timeout error!',
          },
        },
        deleteUser: {},
        selected: {
          initial: 'fetchingList',
          states: {
            fetchingList: {
              // entry: {},
              invoke: {
                id: 'getUsers',
                src: getUsers,
                // onDone: 'loaded',
                after: {
                  5000: 'timedOut',
                },
                onDone: {
                  target: 'loaded',
                  actions: assign({
                    data: (context, event) => {
                      return event.data;
                    },
                  }),
                },
                onError: {
                  target: 'failed',
                  actions: assign({
                    data: (context, event) => {
                      alert(JSON.stringify(context, null, 2));
                      return event.data;
                    },
                  }),
                },
              },
            },
            loaded: {},
            failed: {
              on: {
                // "Event 1": "loading"
              },
            },
          },
        },
        // selected: {
        //   invoke: {
        //     id: 'getUsers',
        //     src: getUsers,
        //     onDone: 'loaded',
        //     onError: 'failed'
        //   }
        // },
        // loaded: {},
        loading: {},
        // failed: {}
      },

      // success: {},
      // failure: {
      //   on: {
      //     RETRY: { target: 'loading' },
      //   },
      // },
      // loading: {
      //   invoke: {
      //     id: 'getUsers',
      //     src: 'getUsers',
      //     // src: (context, event) => getUsers({}),
      //     onDone: {
      //       target: 'idle',
      //       // actions: assign({ user: (context, evnt) => event.data }),
      //     },
      //     // onError: {
      //     //   target: 'failure',
      //     //   actions: assign({ error: (context, event) => event.data }),
      //     // },
      //     states: {
      //       success: {},
      //       failure: {},
      //     },
      //   },
      // }
      // },
    },
    {
      actions: {
        getUsers,
      },
    }
  );

// const promiseMachine =
// /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdMmAHYTbFQDEASgKIDKA8gDIBqtA2gAwC6iK6WNgAu2dMX4gAHogC0AVgAs+AIzyAbJpUBOABwB2AMxdF67QBoQATzkAmFfn3qne2we3rDu5wF8fltCxcAiJScio6AClaAGEAFW4+JBBkQRExCWSZBAVlNU11HQNjUwtrRENtfHt5Q31bLl15eX0VW20-fxBidAg4SUCcPAG00XFJbNlbRS58XS5DeV02uv1tdv1LGxyVFVmuNq4lRUVDRe0vPwCMIYIAMzBhAGMACxGhMczQSZ1bOYWlit9GsNltEGpdPhDDN1ioZjpgUorikbsFCCQyBR3ulxlk5CpnPhFCpdF4uEYjCZNuUdspvJV5oVdupaupkYM0ag4OgADYAN0g2M+E0QTihwJJHkM6lsJWp2ymf3ktk8+npam0KjW+nZqLw+C5ACswE9hILkqkPhkRQgxatJZ4ZXKwQgvESNGYtcTtKdpZ0fEA */
// createMachine({
//   id: 'promise',
//   initial: 'pending',
//   states: {
//     // fetch: {
//     //   invoke: {
//     //     id: "fetchMachine",
//     //     src: fetchMachine,
//     //   }
//     // },
//     // video: {
//     //   invoke: {
//     //     id: 'fetchMachine',
//     //     src: fetchMachine,
//     //   },
//     // },
//     pending: {
//       on: {
//         RESOLVE: { target: 'resolved' },
//         REJECT: { target: 'rejected' },
//       },
//     },
//     resolved: {
//       type: 'final',
//     },
//     rejected: {
//       type: 'final',
//     },
//   },
// });

// const m1 = createMachine(promiseMachine, {});

const Users = () => {
  // const [localData, setLocalData] = useState([]);
  // const [state, send] = useMachine(fetchMachine, {
  const actor = useInterpret(promiseMachine, {
    actions: {
      // load: () => {
      getUsers,
      // getUsers: () => getUsers({}).then((res) => {
      //   console.log('res', res);

      //   send({ type: 'RESOLVE', data: res });
      // })
      // },
    },
    // devTools: true,
  });
  const [state, send] = useActor(actor);
  // const isLoading = state.matches('loading');
  // console.log('state', state);
  // console.log('state.context', state.context);
  // Queries
  // const { data } = useQuery(['users', {}], getUsers);
  // const { data } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: getUsers,
  //   initialData: [],
  //   onSuccess: (a, v, c) => {
  //     console.log('a, b', a, v, c);
  //     // todo send data to xstate
  //     // send('getUsers.onDone', a);
  //     // send('SET_DATA', a);
  //     // return [{}];
  //   },
  // });
  // console.log('state', state);
  // Mutations
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (queryClient, a, b) => {
      // Invalidate and refetch
      console.log('queryClient', queryClient);
      console.log('TVariables', a);
      console.log('TContenxt | undefined', b);
      // queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <div>
      This is the generated root route.{' '}
      <Link to="/page-2">Click here for page 2.</Link>
      <button onClick={() => send('TOGGLE')}>
        {state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'}
      </button>
      <div>
        <div>{state.context.count}</div>
        {/*<output>{state.context.duration - state.context.elaspsed}</output>*/}
        <Button onClick={() => send({ type: 'FAVE' })}>
          <ThumbUpAltIcon />
        </Button>
        <Button onClick={() => send({ type: 'UNFAVE' })}>
          <ThumbDownIcon />
        </Button>
        {state.can('PLAY') && (
          <Button onClick={() => send({ type: 'PLAY' })}>
            <PlayCircleOutlineIcon />
          </Button>
        )}
        {state.can('PAUSE') && (
          <Button onClick={() => send({ type: 'PAUSE' })}>
            {' '}
            <PauseIcon />
          </Button>
        )}
        <Button onClick={() => send({ type: 'SKIP' })}>
          <SkipNextIcon />
        </Button>
        <Button onClick={() => send('DEC')}>DEC</Button>
        <Button onClick={() => send('INC')}>INC</Button>
      </div>
      <Button
        onClick={() => {
          send('SAVE_USER', {
            name: 'ui name',
            email: 'aris@aris.com',
            password: '123456',
            tenantId: 'my tennant',
            provider: 'google',
            role: 'admin',
          });
          // mutation.mutate({
          // id: Date.now(),
          // name: 'ui name',
          // email: 'aris@aris.com',
          // password: '123456',
          // tenantId: 'my tennant',
          // provider: 'google',
          // role: 'admin',
          // });
        }}
        variant="contained"
      >
        Add user
      </Button>
      {/* <p>{JSON.stringify(data, null, 2)}</p> */}
      <h2>Data variable</h2>
      {/*{data.map((item) => {*/}
      {/*  return (*/}
      {/*    <div key={item._id}>*/}
      {/*      <div>da</div>*/}
      {/*      <div>{item.email}</div>*/}
      {/*      <Button*/}
      {/*        onClick={() => {*/}
      {/*          send('deleteUser', {*/}
      {/*            id: item._id,*/}
      {/*          });*/}
      {/*          // send('deleteUser', {*/}
      {/*          //   id: item._id,*/}
      {/*          // });*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Delete*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
      <h2>Context Data variable</h2>
      {state.context.data.map((item) => {
        return (
          <div key={item._id}>
            <div>da2</div>
            <div>{item.email}</div>
            <Button
              onClick={() =>
                send('deleteUser', {
                  id: item._id,
                })
              }
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
