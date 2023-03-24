import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import { d4Image, d6Image, d9Image, d20Image, d100Image } from './images';

function App() {
  const [sides, setSides] = useState(0);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [isHistoryCleared, setIsHistoryCleared] = useState(false);

  const handleButtonClick = (sides) => {
    setSides(sides);
    setClicked(sides);
    setIsHistoryCleared(false);
  };

  const rollDice = async () => {
    try {
      const res = await axios.post('http://localhost:3001/roll', { sides });
      setResult(res.data.result);
      setHistory([...history, res.data.result]);
      setIsHistoryCleared(false);
    } catch (error) {
    
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setIsHistoryCleared(true);
  };

  const renderButtons = (sides, image) => {
    const isActiveValidation = clicked === sides;
    const buttonClasses = `btn btn-primary ${isActiveValidation ? 'btn-clicked' : ""}`;
    return (
      <button className={buttonClasses} onClick={() => handleButtonClick(sides)}>
        <p>{`D${sides}`}</p>
        <img src={image} alt={`D${sides}`} />
      </button>
    );
  };

  const renderRollHistory = () => {
    if (history.length === 0 || isHistoryCleared) {
      return null;
    }
    return (
      <div className="roll-history">
        <div className="h2-roll-history">
          <h2>Roll History:</h2>
        </div>
        <ul className="ul-roll-history">
          {history.map((result, index) => (
            <li className="li-roll-history" key={index}>
              <b>Result {index + 1}: </b>
              {result}
            </li>
          ))}
        </ul>
        <div className="btn-clear">
          <button className="btn btn-danger" onClick={handleClearHistory}>
            Clear
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Roll the Dice</h1>
      <div className="container-buttons">
        {renderButtons(4, d4Image)}
        {renderButtons(6, d6Image)}
        {renderButtons(9, d9Image)}
        {renderButtons(20, d20Image)}
        {renderButtons(100, d100Image)}
      </div>
      <button
        className="btn btn-success"
        id="btn6"
        onClick={rollDice}>
        Roll
      </button>
      {result && <h3 className="roll-result"><b>Result: {result}</b></h3>}
      {renderRollHistory()}
    </div>
    );
};

export default App;
