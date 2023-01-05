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

const Users = () => {
  // const [localData, setLocalData] = useState([]);
  // const [state, send] = useMachine(fetchMachine, {
  const actor = useInterpret(promiseMachine, {
    actions: {
      // load: () => {
      // getUsers,
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
