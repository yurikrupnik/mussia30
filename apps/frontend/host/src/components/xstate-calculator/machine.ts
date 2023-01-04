import {
  Machine,
  assign,
  StateMachine,
  MachineOptions,
  MachineSchema,
} from 'xstate';

const not =
  (fn: any) =>
  (...args: any) =>
    !fn(...args);
const isZero = (context: any, event: any) => event.key === 0;
const isNotZero = not(isZero);
const isMinus = (context: any, event: any) => event.operator === '-';
const isNotMinus = not(isMinus);
const divideByZero = (context: any, event: any) => {
  return (
    (!context.operand2 || context.operand2 === '0.') && context.operator === '/'
  );
};
const notDivideByZero = not(divideByZero);

function doMath(operand1: any, operand2: any, operator: any) {
  switch (operator) {
    case '+':
      return +operand1 + +operand2;
    case '-':
      return +operand1 - +operand2;
    case '/':
      return +operand1 / +operand2;
    case 'x':
      return +operand1 * +operand2;
    default:
      return Infinity;
  }
}

export type Context = {
  display: string;
  operand1?: string;
  operand2?: string;
  operator?: string;
};

const calMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAbZBZVyAWAlgHZgDEAwgDICiAggEoD61AatfQJoAqAEgJIA5AOIBtAAwBdRKAAOAe1gEALgTlFpIAB6IxAGhABPHQF9j+tJhz5iYAHSwlqAE5LSAgKpYAQu3FSkIPKKKmoa2gh6hiZmIBbYuIQk9o4ubp4+9CIAjP6yCsqq6gHhkUYRpuYY8dZJDs6uAPIACuy0XA2ZkhpBBaHFOvplYhWxVVaJdnWpACLU5HxYtJSMTQ2CXH7d+SFFoCWD0ZWWCTa2cjJgTqhEEFmkza3tnbmB24VhA1HlMXHjp+eXa63UgtejkagCLi0ITUTYBHo7D4RA7fI7VCZnC5XG53Kh0JgQricOF5YLvfrIr7DH5jE5JAHY262ABelzkaW8vi68LefT2iAA7AA2ADMtiFAE4RQAWAAcWWl0oArCKsgAmJUogC0iqV4qFat1YiFspFSol0pGvzpdgZQKyLLZpFm80Wy1W6xJrzJfK0gtF4qlcoVytVGu1uv1huVxtN5stNOONVtWPttgARmAAGZyJxgRgQMDIAgAWwwjHkxFcHk5zy2Pt2foQwrFkpl8t1Yc1Xx1yqjRpNZotVtpycxgJxGezufzheLZfQFbkVedcwWSxWa0hXoR5P5zYDbeDnfV3bKvb1QoNA7jw8T6P+qcnqCzSkuBaLpfLlaI1fSXJeXdfXCFtA3bEMVVPCM+yvaMlVjIcEzRP4khIKBUBUAA3fMiAAVxLTMnA5DId15Rt9ipEckwxNCMIIbDGDwgjLmI3wcnrXpyM+IYqIfVCwHQrCcPwwjV1dDcPW3blSU4pFSkOUZqNOWihMYkSWLxBhmEhYlpO9WSKXk1FFL4lNASUXNGDAX9Lkge5QTaDpSIbOSUWpZCbXHK4LKcKybLzCB7MeJz2J5FzDLc3iULM7zLOst8AtYuswoM-cjPckzoq8jC4v8uyaxI0KZMRCLKPvLK7R8vyErsl113dLcNj0oCuMpHjys8u0bjVIL6Ec5Lir3Jt0qizqnwgHqHj6p5skAsjXLKjyxy6ibSGoABFdwlgAZWc1LhsijrlvGnqNq2yhdqK-SSrSw6loxFaes0gkdI4PabqbHURTVWw1TVEVTVlWVjSyJV-ulbU-olWxZSlA0RTNNUxHggVZVG46Jwmx0nHZAqAI4j7wi+n6-oBgHgaFUHwchtVodhkV4cR5GxFR9GHpO7H2Tqt1N09Zr5opYnfv+wGKapmUabpuH-qZlG0aO9nMZ+zMczzD952-ZdfyS96hqJ6VvuFsmgZBsGJZ7KGYelhGweZ1mFcfJWp1V2dPwXJcV25iTGt14DECF0nRdN6mLdpq2GZl225bZx3GR+l8EvVr9Fx-P9a191qA5F8ng-N89Lfpxmo5Z+X7uUgS6IYpjCMYHq8YG669e4hTrTHFT6OE5jfLr-9MiulqFvasv+MEju1K72uxPq3mpLm8LbsWzLPPbqv1O7igaC0wldLn-aKKHpexzzWBcPQNOSP5+eDsX1uMWP0-z7Y3fCf9rIhVsAUlSBiUv4FaUxHBgDbUepvp-SFEqA0SoY5JHvmfEE7BwSQmhLCS+e9X6GhhkjH+CNJQKmNGqSWth-5qiFAKC0BshwA2gXYWBjQHIzVQS-ZsP0gYmn-rKJGXYUSSlsFkeUNtFQSjVHwz+1DbC0I3vibSRI3qMKbggEUAoBS2AlAA3+sN8FnkQBaX6YgxAimRlKWUAokYCjERgS4rgIBqDsMQTCcgADWdhb6nAsS4BAdi5BoB2H4DOSItSgzEEQkUFpILhgtiE2wYhYaUzlCaN+-8hSmBiEQOQhZ4ABBcSQAm8itRg1lEbIOlMzbagNEE0UiiJRXglHw0JYiphKByX7NqgokZiJWlkJprUBSgzAseUMUEewqjFAqeUSMTbqjMQ7ek40HSshxl0pEoEjwdgGeE88oNlGwRvJQ0uh9FaMgdCrGcSd3ap0WRSZZQZVlhK0QgLU-1eGf30WaNsuz2mzNsAnd8c5k4e1-Bc-cVzwInnWYgLIELbBhkUWQ2mJpRHTLsCvTuhFAWfTlCiWUSppREOMdKCF0oJSqPBh88yuUaoQDRfrWUKIJRAxUX-DhtM6ViGlJKUlccqX+zlEEwOOdikh3PKqZRlTmVvwBnwhmHKgQ-XmXILl9yDYk2zibAVedEAynflkY0iirzSjIYStU0rurOxOb8s5WtGkpSYVnY2YszYQy+Dy2w5pFFAwVJKExV5jVY2+b5c1msqwKttUU8WjqyjFKifKLIRKhTKljVkMRyLx41zVMGjFXwIWPLZaTQRAoWb6LEbQ9NNLM0amURaKp8aqliCMeY9AliS0oiyCEn6Bt81EuVKQ4xyTjBAA */
  Machine<Context>(
    {
      id: 'calcMachine',
      context: {
        display: '0.',
        operand1: undefined,
        operand2: undefined,
        operator: undefined,
      },
      strict: true,
      initial: 'start',
      on: {
        CLEAR_EVERYTHING: {
          target: '.start',
          actions: ['reset'],
        },
      },
      states: {
        start: {
          on: {
            NUMBER: [
              {
                cond: 'isZero',
                target: 'operand1.zero',
                actions: ['defaultReadout'],
              },
              {
                cond: 'isNotZero',
                target: 'operand1.before_decimal_point',
                actions: ['setReadoutNum'],
              },
            ],
            OPERATOR: {
              cond: 'isMinus',
              target: 'negative_number',
              actions: ['startNegativeNumber'],
            },
            DECIMAL_POINT: {
              target: 'operand1.after_decimal_point',
              actions: ['defaultReadout'],
            },
          },
        },
        operand1: {
          on: {
            OPERATOR: {
              target: 'operator_entered',
              actions: ['recordOperator'],
            },
            PERCENTAGE: {
              target: 'result',
              actions: ['storeResultAsOperand2', 'computePercentage'],
            },
            CLEAR_ENTRY: {
              target: 'operand1',
              actions: ['defaultReadout'],
            },
          },
          initial: 'zero',
          states: {
            zero: {
              on: {
                NUMBER: {
                  target: 'before_decimal_point',
                  actions: 'setReadoutNum',
                },
                DECIMAL_POINT: 'after_decimal_point',
              },
            },
            before_decimal_point: {
              on: {
                NUMBER: {
                  target: 'before_decimal_point',
                  actions: ['appendNumBeforeDecimal'],
                },
                DECIMAL_POINT: 'after_decimal_point',
              },
            },
            after_decimal_point: {
              on: {
                NUMBER: {
                  target: 'after_decimal_point',
                  actions: ['appendNumAfterDecimal'],
                },
              },
            },
          },
        },
        negative_number: {
          on: {
            NUMBER: [
              {
                cond: 'isZero',
                target: 'operand1.zero',
                actions: ['defaultNegativeReadout'],
              },
              {
                cond: 'isNotZero',
                target: 'operand1.before_decimal_point',
                actions: ['setNegativeReadoutNum'],
              },
            ],
            DECIMAL_POINT: {
              target: 'operand1.after_decimal_point',
              actions: ['defaultNegativeReadout'],
            },
            CLEAR_ENTRY: {
              target: 'start',
              actions: ['defaultReadout'],
            },
          },
        },
        operator_entered: {
          on: {
            OPERATOR: [
              {
                cond: 'isNotMinus',
                target: 'operator_entered',
                actions: 'setOperator',
              },
              {
                cond: 'isMinus',
                target: 'negative_number_2',
                actions: ['startNegativeNumber'],
              },
            ],
            NUMBER: [
              {
                cond: 'isZero',
                target: 'operand2.zero',
                actions: ['defaultReadout', 'saveOperand2'],
              },
              {
                cond: 'isNotZero',
                target: 'operand2.before_decimal_point',
                actions: ['setReadoutNum', 'saveOperand2'],
              },
            ],
            DECIMAL_POINT: {
              target: 'operand2.after_decimal_point',
              actions: ['defaultReadout'],
            },
          },
        },
        operand2: {
          on: {
            OPERATOR: [
              {
                cond: 'notDivideByZero',
                target: 'operator_entered',
                actions: [
                  'storeResultAsOperand2',
                  'compute',
                  'storeResultAsOperand1',
                  'setOperator',
                ],
              },
              {
                target: 'alert',
              },
            ],
            EQUALS: [
              {
                cond: 'notDivideByZero',
                target: 'result',
                actions: ['storeResultAsOperand2', 'compute'],
              },
              {
                target: 'alert',
              },
            ],
            CLEAR_ENTRY: {
              target: 'operand2.zero',
              actions: ['defaultReadout'],
            },
          },
          initial: 'zero',
          states: {
            zero: {
              on: {
                NUMBER: {
                  target: 'before_decimal_point',
                  actions: ['setReadoutNum'],
                },
                DECIMAL_POINT: 'after_decimal_point',
              },
            },
            before_decimal_point: {
              on: {
                NUMBER: {
                  target: 'before_decimal_point',
                  actions: ['appendNumBeforeDecimal'],
                },
                DECIMAL_POINT: 'after_decimal_point',
              },
            },
            after_decimal_point: {
              on: {
                NUMBER: {
                  target: 'after_decimal_point',
                  actions: 'appendNumAfterDecimal',
                },
              },
            },
          },
        },
        negative_number_2: {
          on: {
            NUMBER: [
              {
                cond: 'isZero',
                target: 'operand2.zero',
                actions: ['defaultNegativeReadout'],
              },
              {
                cond: 'isNotZero',
                target: 'operand2.before_decimal_point',
                actions: ['setNegativeReadoutNum'],
              },
            ],
            DECIMAL_POINT: {
              target: 'operand2.after_decimal_point',
              actions: ['defaultNegativeReadout'],
            },
            CLEAR_ENTRY: {
              target: 'operator_entered',
              actions: ['defaultReadout'],
            },
          },
        },
        result: {
          on: {
            NUMBER: [
              {
                cond: 'isZero',
                target: 'operand1',
                actions: ['defaultReadout'],
              },
              {
                cond: 'isNotZero',
                target: 'operand1.before_decimal_point',
                actions: ['setReadoutNum'],
              },
            ],
            PERCENTAGE: {
              target: 'result',
              actions: ['storeResultAsOperand2', 'computePercentage'],
            },
            OPERATOR: {
              target: 'operator_entered',
              actions: ['storeResultAsOperand1', 'recordOperator'],
            },
            CLEAR_ENTRY: {
              target: 'start',
              actions: ['defaultReadout'],
            },
          },
        },
        alert: {
          invoke: {
            src: (context, event) => () => {
              // eslint-disable-next-line no-alert
              alert('Cannot divide by zero!');
              return Promise.resolve();
            },
            onDone: {
              target: 'start',
              actions: ['reset'],
            },
          },
        },
      },
    },
    {
      guards: {
        isMinus,
        isNotMinus,
        isZero,
        isNotZero,
        notDivideByZero,
      },
      actions: {
        defaultReadout: assign({
          display: () => {
            console.log('defaultReadout');

            return '0.';
          },
        }),

        defaultNegativeReadout: assign({
          display: () => '-0.',
        }),

        appendNumBeforeDecimal: assign({
          display: (context, event) => {
            // from '123.' => '1234.'
            return `${context.display.slice(0, -1)}${event.key}.`;
          },
        }),

        appendNumAfterDecimal: assign({
          display: (context, event) => {
            return `${context.display}${event.key}`;
          },
        }),

        setReadoutNum: assign({
          display: (context, event) => {
            return `${event.key}.`;
          },
        }),

        setNegativeReadoutNum: assign({
          display: (context, event) => `-${event.key}.`,
        }),

        startNegativeNumber: assign({
          display: () => '-',
        }),

        recordOperator: assign({
          operand1: (context) => context.display,
          operator: (context, event) => event.operator,
        }),

        setOperator: assign({
          operator: (context, event) => context.operator,
        }),

        computePercentage: assign({
          display: (context, event) => (+context.display / 100).toString(),
        }),

        compute: assign({
          display: (context, event) => {
            const result = doMath(
              context.operand1,
              context.operand2,
              context.operator
            );

            console.log(
              `doing calculation ${context.operand1} ${context.operator} ${context.operand2} = ${result}`
            );

            return result.toString();
          },
        }),

        storeResultAsOperand1: assign({
          operand1: (context) => context.display,
        }),

        storeResultAsOperand2: assign({
          operand2: (context) => context.display,
        }),

        saveOperand2: assign({
          operand2: (context, event) => context.display,
        }),

        reset: assign({
          display: () => '0.',
          operand1: (context: any, event: any) => undefined,
          operand2: () => undefined,
          operator: () => undefined,
        }),
      },
    }
  );

export default calMachine;
