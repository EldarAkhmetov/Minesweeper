import { useDispatch, useSelector } from 'react-redux';
import '../components-style/Cell.css';
import { generateNewField } from '../gameLogic';
import { setGameStatus, unsetFirstMove } from '../store/reducers/gameReducer';
import { setNewField } from '../store/reducers/minesReducer';
import { gameStatuses, minesfieldHeight, minesfieldWidth, numbers } from '../utils/consts';

const Cell = ({id}) => {
    const dispatch = useDispatch();
    const { isFirstMove } = useSelector((state) => state.gameReducer);
    const { minesNumber, field } = useSelector((state) => state.minesReducer);
    const onCellClick = () => {
        if (isFirstMove) {
            const newField = generateNewField(minesfieldHeight, minesfieldWidth, minesNumber, Math.floor(id / minesfieldHeight), id % minesfieldWidth);
            dispatch(unsetFirstMove());
            dispatch(setNewField(newField));
            console.log(newField);
        }
    }

    
    return (
        <div
            className={`Cell ${field[id] === -1 ? 'mine': numbers[field[id]]}`}
            onMouseDown={() => { dispatch(setGameStatus(gameStatuses.exiting)); }}
            onMouseUp={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            onTouchEnd={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            onMouseLeave={() => { dispatch(setGameStatus(gameStatuses.running)); }}
            onClick={onCellClick}
        />
    );
}

export default Cell;