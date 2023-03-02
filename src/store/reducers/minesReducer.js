import { Mask, minesfieldHeight, minesfieldWidth } from "../../utils/consts";

const SET_DEFAULT_FIELD = 'SET_DEFAULT_FIELD';
const SET_NEW_FIELD = 'SET_NEW_FIELD';
const SET_MASK_FIELD = 'SET_MASK_FIELD';
const INCREMENT_MARKED = 'INCREMENT_MARKED';
const DECREMENT_MARKED = 'DECREMENT_MARKED';
const RESET_MARKED = 'RESET_MARKED';

const defaultState = {
    field: new Array(minesfieldHeight * minesfieldWidth).fill(0),
    mask: new Array(minesfieldHeight * minesfieldWidth).fill(Mask.hide),
    minesNumber: 40,
    markedMines: 0
};

export default function minesReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_DEFAULT_FIELD:
            return {
                ...defaultState
            };
        case SET_NEW_FIELD:
            return {
                ...state,
                field: [...action.payload],
            };
        case SET_MASK_FIELD:
            return {
                ...state,
                mask: [...action.payload],
            };
        case INCREMENT_MARKED:
            return {
                ...state,
                markedMines: state.markedMines + 1
            };
        case DECREMENT_MARKED:
            return {
                ...state,
                markedMines: state.markedMines - 1
            };
        case RESET_MARKED:
            return {
                ...state,
                markedMines: 0
            };
        default:
            return state;
    }
}

export const setDefaultField = () => ({
    type: SET_DEFAULT_FIELD
});

export const setNewField = (field) => ({
    type: SET_NEW_FIELD,
    payload: field
});

export const setMaskField = (mask) => ({
    type: SET_MASK_FIELD,
    payload: mask
});

export const incrementMarked = () => ({
    type: INCREMENT_MARKED
});

export const decrementMarked = () => ({
    type: DECREMENT_MARKED
});

export const resetMarked = () => ({
    type: RESET_MARKED
});
