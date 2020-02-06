import React from 'react';
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display'
import {createStage} from '../gameHelpers';
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris'
const Tetris = () => {

    return (
            <StyledTetrisWrapper>
                <StyledTetris>
                    <Stage stage = {createStage()}/>
                    <aside>
                        <div>
                            <Display text = "Score" />
                            <Display text = "Rows" />
                            <Display text = "Levels" />
                        </div>
                        <StartButton />
                    </aside>
                </StyledTetris>    
            </StyledTetrisWrapper>

    )
}

export default Tetris;