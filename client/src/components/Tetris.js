import React , {useState}from 'react';
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display'
import {useStage} from '../hooks/useStage'
import {usePlayer} from '../hooks/usePlayer'
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris'
import {createStage} from '../gameHelpers'
const Tetris = () => {
    console.log('re-render')
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);
    const movePlayer = (dir) => {
        updatePlayerPos({x: dir, y : 0})
    }
    const startGame = () => {
        //Reset everything
        setStage(createStage())
        resetPlayer();
    }
    const drop = () => {
        updatePlayerPos({x : 0, y : 1, collided : false})
    }
    const dropPlayer = () => {
        drop();
    }
    const move = ({key}) => {
        console.log("clicked")
        if(!gameOver){
            if(key === 37){
                movePlayer(-1)
            }
            else if (key === 39){
                movePlayer(1)
            }
            else if (key === 40){
                dropPlayer()
            }
        }
    }
    return (
                <StyledTetrisWrapper role = "button" onKeyDown = {(e) => move(e)}>
                <StyledTetris>
                    <Stage stage = {stage}/>
                    <aside>
                    {gameOver ? (<Display text = "Game Over" gameOver = {gameOver}/>) :
                        (<div>
                            <Display text = "Score" />
                            <Display text = "Rows" />
                            <Display text = "Levels" />
                        </div>)}
                        <StartButton onClick = {startGame}>Start Button</StartButton>
                    </aside>
                </StyledTetris>   
                
               </StyledTetrisWrapper> 
           

    )
}

export default Tetris;