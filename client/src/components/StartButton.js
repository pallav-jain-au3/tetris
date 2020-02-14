import React from 'react';
import {StyledStartButton} from './styles/StyledStartButton'

const StartButton = ({onClick, children}) => (
    <StyledStartButton onClick = {onClick}>
        {children}
    </StyledStartButton>
)

export default StartButton;