import { gameStatuses } from '../../utils/consts';

const RESET_GAME = 'RESET_FIRST_MOVE';
const UNSET_FIRST_MOVE = 'UNSET_FIRST_MOVE';
const SET_GAME_STATUS = 'SET_GAME_STATUS';

const defaultState = {
  gameStatus: gameStatuses.running,
  isFirstMove: true
};

export default function gameReducer(state = defaultState, action) {
  switch(action.type) {
  case RESET_GAME:
    return {
      ...defaultState
    };
  case UNSET_FIRST_MOVE:
    return {
      ...state,
      isFirstMove: false
    };
  case SET_GAME_STATUS:
    return {
      ...state,
      gameStatus: action.payload
    };
  default:
    return state;
  }
}

export const resetGame = () => ({
  type: RESET_GAME
});

export const unsetFirstMove = () => ({
  type: UNSET_FIRST_MOVE
});

export const setGameStatus = (status) => ({
  type: SET_GAME_STATUS,
  payload: status
});