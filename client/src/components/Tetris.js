import React from 'react';
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display'
import {createStage} from '../gameHelpers';
import {StyledTetris} from './styles/StyledTetris'
const Tetris = () => {

    return (
 
                <StyledTetris>
                    <Stage stage = {createStage()}/>
                    <aside>
                        <div>
                            <Display text = "Score" />
                            <Display text = "Rows" />
                            <Display text = "Levels" />
                        </div>
                        <StartButton>Start Button</StartButton>
                    </aside>
                </StyledTetris>    
           

    )
}

export default Tetris;