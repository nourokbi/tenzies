import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [diceArr, setDiceArr] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let tenz = true;
    let value = diceArr[0].value;
    for (let i = 0; i < diceArr.length; i++) {
      if (diceArr[i].value === value && diceArr[i].isHeld) continue;
      else {
        tenz = false;
        break;
      }
    }
    setTenzies(tenz);
  }, [diceArr]);

  function allNewDice() {
    let numArr = [];
    for (let i = 0; i < 10; i++) {
      numArr.push(generateNewDie());
    }
    return numArr;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 9 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    setDiceArr((oldDices) =>
      oldDices.map((dice) => (dice.isHeld ? { ...dice } : generateNewDie()))
    );
  }

  function holdDice(id) {
    setDiceArr((oldDices) =>
      oldDices.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  function newGame() {
    setDiceArr(allNewDice());
  }
  const { width, height } = useWindowSize();

  return (
    <main>
      {tenzies ? <Confetti width={width} height={height} /> : ""}
      <div className="content">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="die-container">
        {diceArr.map((dice) => (
          <Die
            key={dice.id}
            value={dice.value}
            isHeld={dice.isHeld}
            holdDice={() => holdDice(dice.id)}
          />
        ))}
      </div>
      <div className="roll-btn">
        {tenzies ? (
          <button onClick={newGame}>New Game</button>
        ) : (
          <button onClick={rollDice}>Roll</button>
        )}
      </div>
    </main>
  );
}

export default App;
