const ADD_ONE_SECOND = 'ADD_ONE_SECOND';
const RESET_TIMER = 'RESET_TIMER';
const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';

const defaultState = {
  timer: 0,
  isRunning: false
};

export default function timeReducer(state = defaultState, action) {
  switch(action.type) {
  case ADD_ONE_SECOND:
    return {
      ...state,
      timer: state.timer + 1
    };
  case START_TIMER:
    return {
      ...state,
      isRunning: true
    };
  case STOP_TIMER:
    return {
      ...state,
      isRunning: false
    };
  case RESET_TIMER:
    return { ...defaultState };
  default:
    return state;
  }
}

export const addOneSecond = () => ({
  type: ADD_ONE_SECOND
});

export const resetTimer = () => ({
  type: RESET_TIMER
});

export const startTimer = () => ({
  type: START_TIMER
});

export const stopTimer = () => ({
  type: STOP_TIMER
});
