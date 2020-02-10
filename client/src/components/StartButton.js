import React from 'react';
import {StyledStartButton} from './styles/StyledStartButton'

const StartButton = ({callback, children}) => (
    <StyledStartButton onClick = {callback}>
        {children}
    </StyledStartButton>
)

export default StartButton;