import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Counter from './components/Counter';
import Minesfield from './components/Minesfield';
import { resetGame } from './store/reducers/gameReducer';
import { resetMarked, setDefaultField } from './store/reducers/minesReducer';
import { addOneSecond, resetTimer } from './store/reducers/timeReducer';

function App() {
  const { gameStatus } = useSelector((state) => state.gameReducer);
  const { timer, isRunning } = useSelector((state) => state.timeReducer);
  const { minesNumber, markedMines } = useSelector((state) => state.minesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      isRunning && dispatch(addOneSecond());
    }, 1000);
    return () => { clearInterval(interval); }
  }, [dispatch, isRunning]);
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
