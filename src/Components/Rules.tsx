import React from 'react';
import { Pages } from '../App';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const Rules = (props: Props) => {
    return (
        <div>
            <center>
                <h1>Tic-Tac-Toe ^ 2</h1>
                <p>The rules are simple. Whichever grid item the previous player plays in the inner grid, the current player must play in that grid spot for the bigger grid.</p>
                <button onClick={() => props.setPage(Pages.GAME)}>Play</button>
            </center>
        </div>
    )
}

export default Rules;