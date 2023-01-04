import { onCleanup, batch } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import {
  DefaultContext,
  EventObject,
  interpret,
  MachineSchema,
  StateMachine,
  TypegenDisabled,
  MachineOptions,
} from 'xstate';

// WARNING: This is a PoC and a bit hacky
// I could have done a gone with treating the store as simple signal
// like Svelte, React, Vue implementations.
// Instead wanted to see if with a little hacking we could make
// it work granularly.This should improve performance on larger objects.
export function useMachine<Context>(
  machine: StateMachine<
    DefaultContext,
    any,
    EventObject,
    { value: any; context: DefaultContext },
    any,
    any,
    TypegenDisabled
  >,
  options: any
  // options: Partial<MachineOptions> = {
  //   actions: {},
  //   delays: {},
  //   guards: {},
  //   services: {},
  // }
) {
  const service = interpret(machine, options);

  const [state, setState] = createStore({
    ...service.initialState,
    matches(...args: any[]) {
      // access state to track on value access
      state.value;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return service.state.matches(...args);
    },
  });
  service.onTransition((s) => {
    // only focus on stuff that actually changes
    batch(() => {
      setState('value', s.value);
      // diff data to only update values that changes
      setState('context', reconcile(s.context));
    });
  });

  service.start();
  onCleanup(() => service.stop());

  return [state, service.send];
}
