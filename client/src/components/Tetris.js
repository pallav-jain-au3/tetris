import React, { useState, useEffect } from "react";
import StartButton from "./StartButton";
import Stage from "./Stage";
import Display from "./Display";
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { createStage, checkCollision } from "../gameHelpers";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/actions/scoreActions";
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  let highestScore = state.scoreData.highestScore;
  if (highestScore) {
    highestScore = highestScore.score;
  }

  const { authenticated } = state.user;

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  const startGame = () => {
    //Reset everything
    setStart(!start);
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setRows(0);
    setLevel(0);
    setScore(0);
  };
  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setStart(false);
        if (authenticated && score > 0) {
          addScore(score, dispatch);
        }
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };
  const move = e => {
    let { keyCode } = e;
    e.preventDefault();
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        rotatePlayer(stage, 1);
      }
    }
  };

  const keyUp = ({ keyCode }) => {
    if (keyCode === 40) {
      setDropTime(1000 / (level + 1) + 200);
    }
  };

  const pauseGame = () => {
    setDropTime(null);
    setPause(true);
  };

  const unpauseGame = () => {
    setDropTime(1000 / (level + 1) + 200);
    setPause(false);
  };

  useInterval(() => {
    drop();
  }, dropTime);
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={e => keyUp(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display text="Game Over" gameOver={gameOver} />
          ) : (
            <div>
              <Display text={`Score : ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Levels : ${level}`} />
              <Display text={`Highest Score : ${highestScore}`} />
            </div>
          )}
          {!start ? (
            <StartButton onClick={startGame}>Start Button</StartButton>
          ) : !pause ? (
            <StartButton onClick={pauseGame}>Pause Game</StartButton>
          ) : (
            <StartButton onClick={unpauseGame}>Play Game</StartButton>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
