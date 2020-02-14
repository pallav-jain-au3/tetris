import { useState, useCallback } from "react";
import { randomTetrominus ,TETROMINUS} from "../tetrominus";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINUS[0].shape,
    collided: false
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    console.log("reached")
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: (STAGE_WIDTH / 2) - 2, y: 0 },
      tetromino: randomTetrominus().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
