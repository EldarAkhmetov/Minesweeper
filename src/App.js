import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Counter from './components/Counter';
import Minesfield from './components/Minesfield';
import { resetGame } from './store/reducers/gameReducer';
import { resetMarked, setDefaultField } from './store/reducers/minesReducer';
import { resetTimer } from './store/reducers/timeReducer';
import { gameStatuses } from './utils/consts';

function App() {
  const { gameStatus } = useSelector((state) => state.gameReducer);
  const { timer } = useSelector((state) => state.timeReducer);
  const { minesNumber, markedMines } = useSelector((state) => state.minesReducer);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Counter number={minesNumber - markedMines} />
      <button
        className={`start ${gameStatus}`}
        onClick={() => {
          dispatch(resetGame());
          dispatch(setDefaultField());
          dispatch(resetTimer());
          dispatch(resetMarked());
        }}
      />
      <Counter number={timer} />
      <Minesfield />
    </div>
  );
}

export default App;
