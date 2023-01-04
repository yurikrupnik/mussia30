import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';
import { useMachine } from '@xstate/react';
import { createMachine, assign, raise } from 'xstate';
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
import { doit } from '@mussia30/node/state-machines';

function getUsers(q: any) {
  return axios.get<User[]>('http://localhost:8080/api/users').then((res) => {
    // console.log({ data: res.data });
    return res.data;
  });
}
function getUser(id: string, q: any) {
  return axios.get(`http://localhost:8080/api/users/${id}`).then((res) => {
    // console.log({ data: res.data });
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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiJgBoQATwkBfedNSZcyAIZ5CAVwBOpAErUDATWZskIbr35CR4hFNkLF0wVwhwRK7COt8BYUsHAFoAFgAOaTkEEIiAdhxIgFYANnjkiIBGLPj0zNcQH1wCYj8eALtgiWjEACYwpkLinEIudQg8QShym0D7GucEAGZ4sKSEsJywgE4ZpjrhsLDm9GwcWG0MDDh4S39bINAHXJws4Yj0rITk2oRkrNSkrLqZ1Iurm9XVHA0tPTAvUqRzEgxiqTCwySqTqi2WM3iTERw0UiiAA */
  createMachine({
    id: 'fetch',
    initial: 'idle',
    context: {
      userId: 42,
      user: undefined,
      error: undefined,
    },
    states: {
      idle: {
        on: {
          FETCH: { target: 'loading' },
        },
      },
      loading: {
        invoke: {
          // id: 'getUsers',
          // src: (context, event) => getUsers({}),
          onDone: {
            target: 'success',
            actions: assign({ user: (context, evnt) => event.data }),
          },
          onError: {
            target: 'failure',
            actions: assign({ error: (context, event) => event.data }),
          },
          states: {
            success: {},
            failure: {},
          },
        },
      },
      success: {},
      failure: {
        on: {
          RETRY: { target: 'loading' },
        },
      },
    },
  });

const promiseMachine = {
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

const m1 = createMachine(promiseMachine, {});

const Users = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [localData, setLocalData] = useState([]);
  const [state, send] = useMachine(fetchMachine, {
    // actions: {
    //   load: () => {
    //     getUsers({}).then((res) => {
    //       console.log('res', res);

    //       send({ type: 'RESOLVE', data: res });
    //     });
    //   },
    // },
    devTools: true,
  });
  console.log('state', state);
  // Queries
  // const { data } = useQuery(['users', {}], getUsers);
  // const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  // console.log('state', state);
  // Mutations
  // const mutation = useMutation({
  //   mutationFn: createUser,
  //   onSuccess: (queryClient, a, b) => {
  //     // Invalidate and refetch
  //     console.log('queryClient', queryClient);
  //     console.log('TVariables', a);
  //     console.log('TContenxt | undefined', b);
  //     // queryClient.invalidateQueries({ queryKey: ['users'] });
  //   },
  // });

  // useEffect(() => {
  // getUsers(1).then((res) => {
  //   console.log('res', res);
  //   setLocalData(res);
  // });
  // }, []);
  // console.log('data', data);
  return (
    <div>
      This is the generated root route.{' '}
      <Link to="/page-2">Click here for page 2.</Link>
      <button onClick={() => send('TOGGLE')}>
        {state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'}
      </button>
      {/*<button onClick={() => send('DOIT')}>DOIT command</button>*/}
      {/*<div>count: {state.context.count}</div>*/}
      <div>dam all users here</div>
      <div>
        {/*<div>{state.context.count}</div>*/}
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
      {/*<p>{JSON.stringify(data, null, 2)}</p>*/}
      {/*{Array.isArray(state.context.users) &&*/}
      {/*  state.context.users.map((item) => {*/}
      {/*    return <div key={item._id}>{item._id}</div>;*/}
      {/*  })}*/}
    </div>
  );
};

export default Users;
