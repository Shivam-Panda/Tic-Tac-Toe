import React, { useEffect, useState } from 'react';
import './App.css'
import Rules from './Components/Rules';
import Game from './Components/Game';

export enum Pages {
    RULES,
    GAME
}

const App = () => {
    const [page, setPage] = useState<Pages>(Pages.RULES);
    const [display, setDisplay] = useState<JSX.Element>(<Rules setPage={setPage} />);

    useEffect(() => {
        switch(page) {
            case Pages.RULES: {
                setDisplay(<Rules  setPage={setPage}/>);
                break;
            }

            case Pages.GAME: {
                setDisplay(<Game setPage={setPage}/>);
                break;
            }

            default: {
                setDisplay(<Rules setPage={setPage} />);
            }
        }
    }, [page])
    
    return (
        <div className="all">
            {display}
        </div>
    )
}

export default App;