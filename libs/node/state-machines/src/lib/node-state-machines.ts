import { assign, createMachine } from 'xstate';
import axios from 'axios';
import { User } from '@mussia30/node/nest/users-api';
export function doit() {
  return 'do it';
}

function getUsers(q: any) {
  console.log('q getUsers', q);
  return axios.get<User[]>('http://localhost:8080/api/users').then((res) => {
    console.log({ data: res.data });
    return res.data;
  });
}
function getUser(id: string) {
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

type PromiseMachineContext = {
  data: Array<any>;
  count: number;
};

export const promiseMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdAIYDGALtgG5gDEAKgPIDijAMgKIDaADALqIrpY2cugB2-EAA9EAJgAsAZnwA2AIzKA7HLkBOHQFZVqjTIA0IAJ6IAHKvxzr+5csWbN+jdYC+X82iy4BNiiJORUdEysnLwSyILC2GIS0ggyqjr4GqoyzsaK6nJcyuZWCKoKdgblWlz6Cgb6XN6+IP44ePjIYKIQwVDUAEpsAMr0LABq0XxIrfEi4jMpaRlZOWpaFS5FJbIK+pkKygpcOrWqhocaPn4Y7QRdPX2DbABSbADCtNzTAkLzybJ0plsrkNgVtpZEKprDJ7MYmgoajIFIpmjcAh1YIQqABVPCoajDACCkwA+jjhmwBt9YnNEgtQEsgatQfktsVIalrMp8DIuHzoRpERodDIdFcWm1AvgAGZgUjEAAWfRYuFIAElSGBMNQIGIgqIKOgANYEGCkPFgVA0mZxP70gGpRoqMUeDRHTSC-Q7BAmOT4BQwsU6OTItKea6tW7SuUK5WiKCq2CkXX6-DBI2m-Dmy2oWA234JJKLRDOj1FHIyPkaLgVH0o-bGRwihTHbSKOSRqUdWNKlVqzXa6hWjCoToAG0IpBl6FQmGz8tzBdm9uLjKhanstnkyhDMNDZk5bt51gqOVPqlqcgl6LusvlfYTSZTI9nE6nM7nC4t+PzMVtdJrlIiAALRCj6+j6LCB5FIGMgaIYcjKD4LSiOgEBwLE0Z4LSq4MsBCAgdkqg+iBPJcBRXBGO2JzGOKXbYQQoSUGAuFFvhKSXPg3LWFwcjpKKXo+qc+C1MofHWFk1EnMhkqMemIRkCxbH-CWZS1vg+hyIY8E8coUEoj6kmaU4ElSaohQGAxGL3N0vQJipDpqZedjaScoZ6JshQcqU0IZAofK8RZ8IBTo1l3qgcDoOOVAQI5QGcZo3HKLx-F6Gkknepy8iwi4FlChoNbBbJt7SpFABWYBkJA8UcYgXE8XxAkZQhPrQnY+nWIUrY6M4RTaeF0pYri+K1Y6orJalvVpPoMK1j6MjcioOhGJoF6hicg09g+8aJgOWqYGNanXj6Lg8nyWkmCGaiaFtBC9rtz5HeuCAONxhTwScvUnIiWWlNosK9QJ4meLo2R3fgohgAA7gABMmU5gLDqjPQRrZcCo+koqGcHbn9paFAG3KhtYp7HFwEYoUAA */
  createMachine<PromiseMachineContext>(
    {
      id: 'promise',
      initial: 'fetchingList',
      context: {
        data: [],
        count: 0,
        // login,
        // logout
      },
      states: {
        active: {
          // after: "pending",
          on: {
            TOGGLE: { target: 'inactive' },
          },
        },

        inactive: {
          on: {
            TOGGLE: { target: 'active' },
          },
        },

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

        saveUser: {
          on: {
            SAVE_USER: { target: 'resolved' },
          },
        },

        fetchingListItem: {
          // entry: {},
          states: {
            // failed: {},
            // loaded: {},
          },
          invoke: {
            id: 'getUser',
            src: 'getUser',
            onDone: {
              target: 'loaded-selected',
              actions: assign({
                data: (context, event) => {
                  console.log('fetchingListItem context', context, event);
                  return event.data;
                },
              }),
            },

            onError: {
              target: 'failed',
              actions: assign({
                data: (context, event) => {
                  alert(JSON.stringify(event.data, null, 2));
                  return event.data;
                },
              }),
            },
          },
        },
        failed: {},
        'loaded-selected': {},
        fetchingList: {
          // entry: {},
          invoke: {
            id: 'getUsers',
            src: 'getUsers',

            // onDone: 'loaded',
            // after: {
            //   5000: "timedOut",
            // },
            // onError: {
            //   target: 'failed',
            //   actions: assign({
            //     data: (context, event) => {
            //       alert(JSON.stringify(context, null, 2));
            //       return event.data;
            //     },
            //   }),
            // },
            onDone: {
              // target: 'loaded',
              actions: assign({
                data: (context, event) => {
                  console.log('context', context, event);
                  return event.data;
                },
              }),
            },

            onError: 'fetchingListItem',
          },
        },

        'new state 1': {},
      },
    },
    {
      services: {
        getUsers,
        getUser,
      },
    }
  );

export const fetchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiAIwB2AKw4AbAE4AzDMUyAHBvkAmZUwAsUgDQgAnog0ScBjTPmyr0h5oC+r06ky4CxEmgBDACcYNGY2JBBuXn4hEXEEaTklVXUtXX0jUwsEHU0cPPtlXQkZHSZFRXl3T3RsHFgwYgw0SBwvbDxBKAAZPFg0EgghMHxBADcuAGtR0IBVRqDYcJFovgFhSISjeRxNZWL5ZUUDQx1FE3NEcsUcE6lFCR0dCXkJbTKakA7cRubWiDtOpYLq9fqDMBBIJcII4DiEAJoZAwgC2OHmi2WrFWPHWcS2iB2ew0B3kRxOZwu2UQ+h0OCkygkyh0GiqBj0ygM7g8IEEXAgcBEPxxMQ28UQAFp5NSEFKvj98EQwCK8ZtQNsdDKtDhlKzjpytPZ5BV5cCcPwUZAAPIAVzQKtiarEhM1V1yTDkxXZr1sZKe6lN3hwAuIrQWkIdYoJCHZMokBl2Gik8g0hkUSc0AZ5Cr+YBakEj+PV13kBj2MiejN17KkDIMceeNl0elLhgM7yztSDufzgJ+oL6A0LToSjLpMgreiZGhrdZlzzpqnOVdOMlUCcD9R7AJwhC4AQFEGH4oQpbpTD0jysFbsE-njL26ketlOSg0Oi52bN27ayACeGII9IjWR0TzPHAL2Od5SneCcZBlZky2UB4DlKLQpAMCtN1wPcD1BY9oxZDQCkeHQHGOGQmAkdRlC1awLlsD9FA9CisO5IA */
  createMachine({
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
      deleteUser: {
        entry: 'getUsers',
        on: {
          FETCH: { target: 'selected' },
          target: 'getUsers',
        },
      },
      selected: {
        initial: 'fetchingList',
        states: {
          fetchingList: {
            // entry: {},
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
      loading: {},
    },
  });
