const ADD_ONE_SECOND = 'ADD_ONE_SECOND';
const RESET_TIMER = 'RESET_TIMER';

const defaultState = {
    timer: 0
};

export default function timeReducer(state = defaultState, action) {
    switch(action.type) {
        case ADD_ONE_SECOND:
            return {
                ...state,
                timer: state.timer + 1
            };
        case RESET_TIMER:
            return { ...defaultState }
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
