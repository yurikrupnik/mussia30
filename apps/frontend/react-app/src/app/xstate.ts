// import { useMachine } from '@xstate/react';
import { createMachine, assign, raise } from 'xstate';
import { User } from '@mussia30/node/nest/users-api';
import internal from 'stream';
import { ContextIdFactory } from '@nestjs/core';
import axios from 'axios';
export interface ContextToggleMachine {
  count: number;
  disabledCount: number;

  duration: number;
  elaspsed: number;

  users: Array<any>;
  // page: number;
  // data: Array<User>;
  // faved: boolean;
  // isPlaying: boolean;

  // selected: [string],
  // current: string;
}

function getProducts(q: any) {
  return axios.get('http://localhost:8080/api/grpc-users').then((res) => {
    // console.log({ data: res.data });
    return res.data;
  });
}

function getUsers(ctx: any, event: any) {
  console.log('event', event);
  console.log('ctx', ctx);
  return axios.get('http://localhost:8080/api/users').then((res) => {
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

function doSomething() {
  console.log('doSomething');
};

function createUser(data: any) {
  return axios.post('http://localhost:8080/api/users', data).then((res) => {
    console.log('createUsers', { data: res.data });
    return res.data;
  });
}
const isNotMax = (context: ContextToggleMachine) => context.count < 10;
const isNotMin = (context: ContextToggleMachine) => context.count >= 0;
const increment = (context: ContextToggleMachine) => {
  console.log('context', context);
  return context.count + 1;
};
const decrement = (context: ContextToggleMachine) => context.count - 1;

let internalId: any;

function startPlayer() {
  internalId = setInterval(() => {
    console.log('TICK', Date.now());
  }, 1000);
}

function stopPlayer() {
  clearInterval(internalId);
}

const playerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswGIBiAggGoCiA2gAwC6ioADqrAJbJOoB2tIAHogIwBmCgDoKAdjEAmAGxC+ATgAcAVkmSALABoQAT0TLpw+csV8+0yX3ViKipQF972tBmw4AqgDlCpSjSQgDMysHFy8CHwawoqSFBTG8erSiorqWrqIALTSysJWAorSRfJiAmUUfI7O6Fi4AMoA0gCSAAp+XEEsbJwB4YIi4lKyFUqqGtp6CJl8imLCGibq8tLxAmLKVSAutcJ0AIYArrCQOC0AMgQAmu0BnSE9oH3K8sJCYsY5qZKq6ZNCuRJ5OIBCZlOoKpUnFsathdpg9jomOwoDgACpNADCDRu9EYXVCvSysmEqmUfHiYmSlikigm-AMJOkSyk5PUygoymem22sLo8MRyNOBHcdXI1A6ePuYXpLzeH0W33GGQQ4L4JOUNLMAmkZkkIMcUPYqAgcC4PLAEuC3WlUzMatJ5JKVL4NLpCGkL3E8kkyx9klKigq3JhYF2h2OEEt+IePEQQgEoneTLsQnkQkUAjdAmWwiSZMKPosC2DrlDfIRSKgUalhKm2dElgo6hmNjMYgUWckilEcViy3WBS7GwNQA */
  createMachine({
    on: {
      FAVE: {
        // target: 'resolve',
        actions: assign({
          faved: true,
        }),
      },
      UNFAVE: {
        actions: [
          assign({
            faved: false,
          }),
          raise({ type: 'SKIP' }),
          // assign({
          //   elaspsed: 0,
          // }),
        ],
      },
      SKIP: {
        actions: [
          assign({
            elaspsed: 0,
          }),
          () => console.log('Skipping song!'),
        ],
      },
    },
    id: 'toggle',
    initial: 'paused',
    context: {
      duration: 300,
      elaspsed: 0,
      faved: false,
      isPlaying: false,
      count: 0,
      page: 0,
      disabledCount: 0,
      data: [],
    },
    states: {
      paused: {
        on: {
          PLAY: {
            target: 'playing',
            actions: 'startPlayer',
          },
        },
      },
      playing: {
        entry: 'startPlayer',
        invoke: {
          id: 'player',
          src: (ctx, e) => (sendBack, recieve) => {
            const internalId = setInterval(() => {
              sendBack({ type: 'TICK' });
            }, 1000);
            return () => {
              clearInterval(internalId);
            };
          },
        },
        on: {
          TICK: {
            actions: assign({
              elaspsed: (ctx, event) => {
                return ctx.elaspsed + 1;
              },
            }),
          },
          PAUSE: {
            target: 'paused',
          },
        },
        exit: 'stopPlayer',
      },
    },
  });

function createNotifier() {
  console.log('createNotifier', createNotifier);
}

function createLogger() {
  console.log('createLogger');
}

/** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgAIA5VAWzADoYAXABQCcB7CAV3WoBltZqBiCRvgp4AbowDWlGgFVYYerADaABgC6iUAAdGsbNWyCNIAB6IATAGZlFAKwAOAJwObymwDYAjDcsAWHwBoQAE9ECxsPCgc7CwtojwB2O3iPZQcfAF9MwNxmOCM0LDxCEnIjbV19QyQTRABaDwsfWzdkmwsHKzc3H2U3QJCEWrcskAKcfGIyKTBqWXlYLh4ynT0DXCNTBB8zfsQ7CJ87d3j7DwSW+xGxosnyKhmGZjZObmplirWNurs3Ztb2zrdXq7BCNJotBzKZQ+LoODyOHw2K4YcbFKYUfAAdwIPFQ1EIHneqyqoE2NhcFH2Zmc8XibgsLQ8DhBFkSFFZ0JidmU8VZViR6UC1wmJUoqAANvI3tVysT1tVNh4zL92i1XG4zPE-B4AsFzPFrD0HJqXDYfB0PN1MpkgA */
const toggleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE6wAoEMYDoBLAOxwGMAXQgNzAGIAVAeQHEWAZAUQG0AGAXUSgADgHtYhKqOJCQAD0QBGAEwBmfL1W9lATgAsexQA5VqvToBsAGhABPJXt74jAdhcBWVYt7vFF1e4uegC+wTaoGNh4YPjkVLSMrBw8ArJiElIySPJKvEb4KooGyi76pTpGNvYIijqK+Gaqyo4uqqWK7rwhYSARmLgEOAA2GBR0ENIxJNSiANYxfVGDI+gUCNOiZDiZfPy7aeKShNKyCggWbvjuOr4XfryaespViMoX+OZvxu4WvO2h4TQ-WisRWYww6FE6HwwiG2wAZlCALb4RYDGLDUbrYgzLY7AT7bLpI4nbJnC75N6lPK8SxeAIvBDKZRObR+HTlIxdCxGIwA3pApYxGAUKjEKAAVUF40mRBxc2FYAoUsihJEh0yp0QelUFnw+gsylcHV8vjajO86j0F3cnj0P0NOos-LRIJFYsl0ohUJhcIoiPQKJFKswapAxM1ZMQnT0BXczKeFl+8ea1jsiFMTmUilMRou+m0LhdgvR+AARpCAO4ScV0ABinAYAGEABIASQAciwwxHjllQGdvPlCsVSnpOYz6fh-DplPGzOOLiVi5FSxXRNWSFBEmwuD2NX2tQgALTeZQaWlGHVGN66VQ3Rlz2M-M1Xir6Fl8nqugjrze1zhaGICgAAJVH3DJDyjE9mXPB4KmvW8dHvdxHyvC8tEsW8LBzG5Qh6YhRAgOBZB-MADkg0kB0QY8SlZS9EMNZCH3TGp3H1IxjDcCwDCMH4XC-QFVxBEg4hociiQPKiciZcd8CNDo6kMdxHHjFwLXMD5xzqTwbm8WllBXYFBkocSKJJfsZOPW18HKd8XAeLxWkqVic3qXRNH8LxFBcG1BIFYTllGczI2o84eXk8cjUsQJriNSdan1fxdJUAIAj8IyhXwd0txDeBJMoyyzmaFx5M464ig6VSSknHxbK4p0nh8lRnW-EsQT-GsoBCqCwrMDQjAqQJvCKRwdUnAwMNpQ0Ztw9xMtLYgwErEDYAobYwBAxQeuks5j1jZp7WZWkoosH450fQ19UUIo6nvMbdCLfCgA */
  
/** @xstate-layout N4IgpgJg5mDOIC5QFdZgE6wAoEMYGIAxAQQDUBRAbQAYBdRUABwHtYBLAFzeYDsGQAHogCMAZgCcAOlGjqAdgBsAJgAcC0cICs44SoA0IAJ6IAtHLmSl4gCzjqChcOXDqNgL5uDqDNjxh8AKoAciQUNPRIICzsXLz8QghKwsKSjiqi5goqmprWWfpGpo6WwuKO4nKaroqaCh5eaJi4BADKANIAkljh-NGc3HyRCSbWStKumnLUGkqaBsYIJjqp6hWu1nJKCrVK9SDeTX6SbDw4AMZcAG7+ACoA8gDiDwAyVHS9rP1xQ4iaKUozTRbKaqFTUNTzRBbazSWTOcGiSaVPYHXwwSQ4AA2GA4+AgvDAxx4l2YAGtCajmoSsTiECcSWccLEeOEepE+sz4ogFOZJNo-jynNRpqNIYkeZJbFtdLV5DoUY00dTsehcRh0Mx0JJGJimQAzTUAW0klKONNVdOJzEZzNZ73Zn05PwQPJUlh5djBZQ0iLFSiU1Ek1CSCgq4nEYLyKhUCp8VMkMA4XB4UACirxBKJJPJCbAHDTPjZTEdAy5CGsogUkhsyhUci0fz+GTFLlEkp5OVE1lqygrdU8+0V8cTydT6fVmu1uo4BvQxsTBcwRaiJe+oASVRhWn9owc1CBSjyYpkgaSMlUHuswbkscO6IARhqAO7sFNEcg3ADCAAkOkEHsuHKls6LhusISTWKMcg2NBEbHmIqQSLMAKQYomw3gOpoPs+r5QPg9xPK8gGroM66mC4YzChGFYqFsVgSHMhSJLkfLbGIKi2CoNgBjGmFDkcOo4IYJx4VgxABC0bwRMWMTAWRLowgo1gcRkjELCYQKSjurj7oowj1uIt5KlOQkifhHSfm0xGyWuggiPWQahjI2iqWK1BGfGjA4N4ED4FgzzEAAmtZXykXZiyaGBoizDoh6VJF2jWGKSySCopTRkCmgSPYsweAOPDMBAcD8FhYAfDZYXDFogZUSptHKOIDHJWIUieuCylORx5geUcJznFcZUOhVZZiP8sj1mo4E8q4Yp2HyPpevWSibLxDRxmaFxsNc5WhWWGluo4sgApU0FdpMYqKEGp2lMKwaQcI1g9ei5ocDtTryQ4bpxaoZSTNoqjwa16hZbFiKIk4T2EiOImLvAQ27c6cWWGl2gPVoV5AnIx77pIE1yH2oz6VNkOSI+zAviJb1yeFXZBlx2T1tQD1XhWx6QUG0yuMo3MtZoJOCcJKZU7ZVXBhz1GiPV9HiGpvyVhzshlHRjiPXx63ol5PnC5V5Fi7VNF0Y1MtitNkp2FUmROBkqseEAA */
createMachine<ContextToggleMachine>(
    {
      invoke: [
        
        // {
        //   after: 'getUsers'
        // }
        
        // { 
        //   id: 'getUsers', // todo check what it does expect showing (to the src in ())
        //   src: "getUsers", 
        //   onEntry: () => {
        //     console.log("onEntry getUsers");
            
        //   },
        //   // onExit: "getUsers",
        //   // onEntry: "getUsers",
        //   onError: {
        //     // target: "alert",
        //     actions: {
        //       createNotifier
        //     },
        //   },
        //   onDone: {
        //     // target: "inactive",
        //     actions: {
        //       createLogger
        //     },
        //   },
        // },
        // onDone: {
        //   actions: [
        //     createLogger
        //   ]
        // },
        // after: {
        //   3000: "createLogger"
        // },
        // { id: 'getProducts', src: getProducts, onError: createNotifier, onDone: createNotifier },
        // { id: 'logger', src: createLogger, onError: createLogger }
      ],

      id: 'usersPage',

      context: {
        count: 0,
        disabledCount: 0,
        duration: 300,
        elaspsed: 0,
        users: []
      },

      states: {
        inactive: {
          // onError: "getUsers",
          entry: [
            // "getUsers"
          ],

          // onError: {
          //   target: "alert",
          //   actions: {
          //     createNotifier
          //   },
          // },
          // onDone: {
          //   target: "active",
          //   actions: {
          //     createLogger
          //   },
          // },
          // after: "createLogger",
          // exit: ["doSomething", "doSomething"], // actions func
          // after: ["doSomething"],
          // always: "getUser"
          // states: {
          //   hasData: {
          //     entry: assign({ disabledCount: (ctx) => {
          //       console.log('ctx.disabledCount + 1');
          //       ctx.disabledCount + 1
          //     } })
          //     // on: { TOGGLE: 'active' },
          //     // on: { TOGGLE: "active.hasData"}
          //   },
          // }
          on: {
            TOGGLE: "browsing"
          },

          type: "parallel"
        },

        // hasData: {

        // },
        active: {
          entry: assign({ count: (ctx) => ctx.count + 2 })
        },

        alert: {
          // initial: "",
          // is
          invoke: {
            
            src: (context, event) => () => {
              // eslint-disable-next-line no-alert
              // alert('Cannot divide by zero!');
              return Promise.resolve();
            },
            onDone: {
              // target: 'active',
              // actions: ['reset'],
            },
            onError: {
              target: "alert",
            }
          },

          type: "final"
        },

        // states: {
        //   gettingUsers: {
        //     // invoke: {
        //     //   src: getUserInfo,
        //     //   onDone: {
        //     //     target: 'gettingFriends',
        //     //     actions: assign({
        //     //       user: (context, event) => event.data
        //     //     })
        //     //   }
        //     // }
        //   },
        // }
        // },
        gettingUsers: {
          invoke: {
            id: 'getUsers',
            src: "getUsers",
            onEntry: getUsers,

            onError: {
              target: "alert"
            },

            onDone: {
              // target: 'success',
              actions: assign({
                users: (context, event) => event.data
              }),

              cond: "lenAbove0"
            }
          }
        },

        browsing: {
          on: {
            FETCHING: 'gettingUsers',
            TOGGLE: "active"
          },
          type: "parallel"
        },

        playing: {
          on: {
            PAUSE: "paused",

            TICK: {
              target: "playing",
              internal: true
            }
          }
        },

        paused: {
          on: {
            PLAY: "playing"
          }
        }
      },

      initial: "paused",

      on: {
        FAVE: {
          target: "#usersPage",
          internal: true
        },

        UNFAVE: {
          target: "#usersPage",
          internal: true
        },

        SKIP: {
          target: "#usersPage",
          internal: true
        }
      }
    },
    {
      guards: {},
      actions: {
        getUsers,
        // getUsers: function (ctx, event) {
        //   console.log('getUsers ctx, event', ctx, event);
        //   // getUsers({}).then((res) => {
        //   //   console.log('users', res);
        //   //   ctx.users = res;
        //   // })
        //   // ctx.disabledCount = 0; // can update context
        //   // ctx.count = 0;
        //   // return [];
        // },
        doSomething,
        createNotifier,
        createLogger
        // startPlayer,
        // stopPlayer,
      },
      delays: {},
      services: {
        getUsers,
        lenAbove0: (c) => {
          console.log('c', c);

        },
        // getUsers: function (ctx, event) {
        //   console.log('getUsers ctx, event', ctx, event);
        //   return [];
        // },
        // doit: assign({
        //   ds: () => {
        //     return;
        //   },
        // }),
      },
    }
  );

export default toggleMachine;

