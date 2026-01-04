import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYERS = { X: "Player 1", O: "Player 2" };

const driveGameTurns = (gameTurns) => {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
};

const driveGameWinner = (players, gameBoard) => {
  console.log(players, gameBoard);
  for (const combination of WINNING_COMBINATIONS) {
    const a = gameBoard[combination[0].row][combination[0].column];
    const b = gameBoard[combination[1].row][combination[1].column];
    const c = gameBoard[combination[2].row][combination[2].column];
    if (a && a === b && a === c ) {
      return players[a];
    }
  }
};

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = driveGameTurns(gameTurns);

  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);
  
gameTurns.forEach(({ square: { row, col }, player }) => {
  gameBoard[row][col] = player;
});

  const winner = driveGameWinner(players, gameBoard);

  const hasDraw = gameTurns.length === 9 && !winner;

  function selectActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: driveGameTurns(prevTurns),
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handleSetPlayers(symbol, newPlayerName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newPlayerName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players["X"]}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onSetPlayers={handleSetPlayers}
          />
          <Player
            name={players["O"]}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onSetPlayers={handleSetPlayers}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} resetGame={setGameTurns} />
        )}
        <GameBoard onSelectSquare={selectActivePlayer} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
