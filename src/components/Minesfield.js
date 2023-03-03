import { useSelector } from 'react-redux';
import '../components-style/Minesfield.css';
import Cell from './Cell';

const Minesfield = () => {
  const { field } = useSelector((state) => state.minesReducer);
  return (
    <div className="Minesfield">
      {field.map((cell, index) => <Cell key={index} id={index}/>)}
    </div>
  );
};

export default Minesfield;