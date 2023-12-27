import React from 'react';
import { Pages } from '../App';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const Rules = (props: Props) => {
    return (
        <div>
            Rules Page
            <button onClick={() => props.setPage(Pages.GAME)}>Play!</button>
        </div>
    )
}

export default Rules;