import styled from 'styled-components'

export const StyledDisplay = styled.div`
    box-sizing : border-box;
    display : flex;
    align-items : center;
    margin : 30px;
    padding:  10px 40px;
    border : 4px solid #333;
    min-height : 30px;
    width : 100%;
    border-radius: 20px;
    color : ${props => (props.gameOver ? 'red' : '#999')};
    background : #000;
    font-family : Pixel , Arial , sans-serif;
    fornt-size : 0.8rem; 
`