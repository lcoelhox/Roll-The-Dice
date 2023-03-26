import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import { d4Image, d6Image, d9Image, d20Image, d100Image } from './images';

function App() {
  const [sides, setSides] = useState(0);
  const [result, setResult] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [isHistoryCleared, setIsHistoryCleared] = useState(false);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history')) || []
  );

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

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
      localStorage.setItem(
        'history',
        JSON.stringify([...history, res.data.result])
      );
    } catch (error) {
    
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
    setIsHistoryCleared(true);
  };

  const renderButtonsDice = (sides, image) => {
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
        {renderButtonsDice(4, d4Image)}
        {renderButtonsDice(6, d6Image)}
        {renderButtonsDice(9, d9Image)}
        {renderButtonsDice(20, d20Image)}
        {renderButtonsDice(100, d100Image)}
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
