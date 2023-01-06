// import { useContext } from 'react';
import { useMachine } from '@xstate/react';
// import { GlobalStateContext } from '../../context';
import { toggleMachine } from '@mussia30/node/xstate-machines';
// import { createMachine } from 'xstate';
/* eslint-disable-next-line */
export interface AboutProps {}

export function About(props: AboutProps) {
  const [state, send] = useMachine(toggleMachine, {});
  // const globalServices = useContext(GlobalStateContext);
  // const [state, send] = useActor(globalServices.toggleService);

  return (
    <div>
      <div>{state.context.count}</div>
      <button onClick={() => send('TOGGLE')}>
        {state.matches('inactive') ? 'Off' : 'On'}
      </button>
      <h1>Welcome to About!</h1>
    </div>
  );
}

export default About;
