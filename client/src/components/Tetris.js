import React, { useState } from "react";
import StartButton from "./StartButton";
import Stage from "./Stage";
import Display from "./Display";
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { createStage, checkCollision } from "../gameHelpers";
const Tetris = () => {
  console.log("re-render");
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };
  const startGame = () => {
    //Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false)
  };
  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
    else {
        if (player.pos.y < 1){
            setGameOver(true);
            setDropTime(null)
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  const dropPlayer = () => {
    drop();
  };
  const move = e => {
    let { keyCode } = e;
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
      else if (keyCode === 38){
          rotatePlayer(stage, 1)
      }
    }
  };
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display text="Game Over" gameOver={gameOver} />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Levels" />
            </div>
          )}
          <StartButton onClick={startGame}>Start Button</StartButton>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
