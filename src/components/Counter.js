import '../components-style/Counter.css';
import Number from './Number';
import { maxNumber, numbers } from '../utils/consts';

const Counter = ({number}) => {
  const units = number > maxNumber ? 9 : number % 10;
  const dozens = number > maxNumber ? 9 : Math.floor(number / 10) % 10;
  const hundreeds = number > maxNumber ? 9 : Math.floor(number / 100);
    
  return (
    <div className="Counter">
      <Number number={numbers[hundreeds]}/>
      <Number number={numbers[dozens]}/>
      <Number number={numbers[units]}/>
    </div>
  );
};

export default Counter;