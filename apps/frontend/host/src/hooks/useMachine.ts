import { onCleanup, batch } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import {
  EventObject,
  interpret,
  StateMachine,
  // DefaultContext,
  // TypegenDisabled,
  // MachineOptions,
} from 'xstate';

export function useMachine<T>(
  machine: StateMachine<
    T,
    any,
    EventObject,
    { value: any; context: T },
    any,
    any
    // TypegenDisabled
  >,
  // options: Partial<MachineOptions> = {}
  options: any = {
    actions: {},
    delays: {},
    guards: {},
    services: {},
  }
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
