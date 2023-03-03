import { useDispatch, useSelector } from 'react-redux';
import '../components-style/Cell.css';
import { checkVictory, clearMask, generateNewField } from '../gameLogic';
import { setGameStatus, unsetFirstMove } from '../store/reducers/gameReducer';
import { decrementMarked, incrementMarked, setAllMarked, setMaskField, setNewField } from '../store/reducers/minesReducer';
import { startTimer, stopTimer } from '../store/reducers/timeReducer';
import { gameStatuses, Mask, MINE, minesfieldHeight, minesfieldWidth, numbers } from '../utils/consts';

const Cell = ({id}) => {
    const dispatch = useDispatch();
    const { isFirstMove, gameStatus } = useSelector((state) => state.gameReducer);
    const { minesNumber, markedMines, field, mask } = useSelector((state) => state.minesReducer);
    const newField = isFirstMove
      ? generateNewField(minesfieldHeight, minesfieldWidth, minesNumber, Math.floor(id / minesfieldHeight), id % minesfieldWidth)
      : field.slice();
    const onCellClick = () => {
        if (isFirstMove) {
            dispatch(unsetFirstMove());
            dispatch(setNewField(newField));
            dispatch(startTimer());
        }
        if (mask[id] !== Mask.hide) return;
        if (newField[id] === MINE) {
            dispatch(setGameStatus(gameStatuses.lost));
            dispatch(stopTimer());
            const newMask = mask.map((cell, index) => {
                if (cell === Mask.flag) {
                    if (newField[index] === MINE) return Mask.flag;
                    return Mask.mineIncorrect; 
                } else {
                    return Mask.transparent;
                }
            });
            newMask[id] = Mask.mineBlow;
            dispatch(setMaskField(newMask));
            return;
        }
        const newMask = mask.slice();
        clearMask(id, newField, newMask, minesfieldWidth, minesfieldHeight);
        const isVictory = checkVictory(newMask, minesNumber, minesfieldWidth, minesfieldHeight);
        if (isVictory) {
            dispatch(setGameStatus(gameStatuses.win));
            dispatch(setAllMarked());
            dispatch(stopTimer());
            newMask
              .forEach((cell, index) => newMask[index] = (cell === Mask.hide || cell === Mask.flag)
                && newField[index] === MINE
                  ? Mask.flag : Mask.transparent);
        }
        dispatch(setMaskField(newMask));
    }

    const onCellRightClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (mask[id] === Mask.transparent
            || gameStatus === gameStatuses.win
            || gameStatus === gameStatuses.lost) return;
        if (mask[id] === Mask.hide) {
            const newMask = mask.slice();
            if (minesNumber - markedMines === 0) {
              newMask[id] = Mask.question;
            } else {
                newMask[id] = Mask.flag;
                dispatch(incrementMarked());
            }
            dispatch(setMaskField(newMask));
        } else if (mask[id] === Mask.flag) {
            const newMask = mask.slice();
            newMask[id] = Mask.question;
            dispatch(setMaskField(newMask));
            dispatch(decrementMarked());
        } else if (mask[id] === Mask.question) {
            const newMask = mask.slice();
            newMask[id] = Mask.hide;
            dispatch(setMaskField(newMask));
        }
    }
    
    return (
        <button
            className={`Cell ${mask[id]} ${field[id] === MINE ? 'mine': numbers[field[id]]}`}
            onMouseDown={(e) => { e.button === 0 && dispatch(setGameStatus(gameStatuses.exiting)); }}
            onMouseUp={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            onTouchEnd={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            onMouseLeave={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            disabled={gameStatus === gameStatuses.lost || gameStatus === gameStatuses.win || mask[id] !== Mask.hide}
            onClick={onCellClick}
            onContextMenu={onCellRightClick}
        />
    );
}

export default Cell;