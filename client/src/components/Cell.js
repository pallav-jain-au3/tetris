import React from 'react';
import {StyledCell} from './styles/StyledCell'
import {TETROMINUS} from '../tetrominus'

const Cell = ({type}) =>{ 
    return(
    <StyledCell type = {type} color = {TETROMINUS[type].color} />
)}

export default React.memo(Cell);