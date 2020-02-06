import React from 'react';
import {StyledCell} from './styles/StyledCell'
import {TETROMINUS} from '../tetrominus'

const Cell = ({type}) =>{ 
    return(
    <StyledCell type = {'L'} color = {TETROMINUS['L'].color} />
)}

export default Cell;