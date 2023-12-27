import React, { useEffect, useState } from 'react';
import '../App.css';
import { Pages } from '../App';
import { setSourceMapRange } from 'typescript';

const MainBoard = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
]

interface won {
  results: boolean,
  winner?: String
}

interface Props {
  setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const App = (props: Props) => {
  const [vals, setVals] = useState<String[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [active, setActive] = useState<number>(4);
  const [bigResults, setBigResults] = useState<Array<String>>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  const [winner, setWinner] = useState<String | undefined>();

  const checkWin = (curr: Array<any>): won => {
    // Vertical
    for(let i = 0; i < 3; i++) {
      let pos1 = curr[0][i];
      let pos2 = curr[1][i];
      let pos3 = curr[2][i];
      if(pos1 && pos2 && pos3) {
        if(pos1 === pos2 && pos2 == pos3) {
          return {
            results: true,
            winner: pos1
          };
        }
      }
    }

    // Horizontal
    for(let i = 0; i < 3; i++) {
      let pos1 = curr[i][0];
      let pos2 = curr[i][1];
      let pos3 = curr[i][2];
      if(pos1 && pos2 && pos3) {
        if(pos1 === pos2 && pos2 == pos3) {
          return {
            results: true,
            winner: pos1
          };
        }
      }
    }
    // Major Diags
    for(let i = 0; i < 3; i++) {
      let pos1 = curr[0][0];
      let pos2 = curr[1][1];
      let pos3 = curr[2][2];
      if(pos1 && pos2 && pos3) {
        if(pos1 === pos2 && pos2 === pos3) {
          return {
            results: true,
            winner: pos1
          };
        }
      }
    }
    // Minor Diags
    for(let i = 0; i < 3; i++) {
      let pos1 = curr[0][2];
      let pos2 = curr[1][1];
      let pos3 = curr[2][0];
      if(pos1 && pos2 && pos3) {
        if(pos1 === pos2 && pos2 === pos3) {
          return {
            results: true,
            winner: pos1
          };
        }
      }
    }
    return {
      results: false,
      winner: undefined
    };
  }

  const outerWin = (): won => {
    let curr: any = [
      [],
      [],
      []
    ];
    for(let i = 0; i < 9; i++) {
      if(i < 3) {
        curr[0][i] = bigResults[i];
      } else if (i < 6) {
        curr[1][i - 3] = bigResults[i]; 
      } else if (i < 9) {
        curr[2][i - 6] = bigResults[i];
      }
    }
    return checkWin(curr);
  }

  const innerWin = (outer_index: number): won => {
    let curr: any = [
      [],
      [],
      []
    ];
    for(let i = 0; i < 9; i++) {
      if(i < 3) {
        curr[0][i] = vals[(outer_index * 100) + i];
      } else if (i < 6) {
        curr[1][i - 3] = vals[(outer_index * 100) + i]; } else if (i < 9) {
        curr[2][i - 6] = vals[(outer_index * 100) + i];
      }
    }
    return checkWin(curr);
  }

  const handleClick = (outer_index: number, inner_index: number) => {
    if(outer_index === active || active == 9) {
      const sum = (outer_index * 100) + inner_index
      if(turn % 2 === 0) {
        vals[sum] = "X"
      } else {
        vals[sum] = "O"
      }
      let bigWin = outerWin()
      if(bigWin.results && bigWin.winner) {
        setDialog(true)
        setWinner(bigWin.winner);
      }
      let won = innerWin(outer_index);
      if(won.results && won.winner) {
        bigResults[outer_index] = won.winner;
      }
      if(bigResults[inner_index] != undefined) {
        console.log("Won")
        setActive(9);
      } else {
        setActive(inner_index)
      }
      setTurn(turn + 1);
    } else {
      alert("Invalid Turn")
    }
  }

  const getClassName = (index: number): string => {
    if(index == active) return "activeGridItem"
    else if(bigResults[index] != undefined) return "deadGridItem"
    else return "gridItem"
  }

  return (
    <div>
      <dialog open={dialog}>
        <p>Great Job, The Game is Over! Player {winner} has won!</p>
        <button onClick={() => window.location.reload()}>Replay</button>
        <button onClick={() => props.setPage(Pages.RULES)}>Back to Rules</button>
      </dialog>
      <div className="GRID">
        {
          MainBoard.map((val, index) => (
                <div>
                  <div className={getClassName(index)}>
                  {
                    bigResults[index] != undefined ? <h1>{bigResults[index]}</h1> : 
                    MainBoard.map((_v, _i) => (
                      <div>
                        <div onClick={() => {handleClick(index, _i)}} className="innerItem">
                          <span className="text">{vals[(index * 100) + _i]}</span>
                        </div>
                      </div>
                    ))
                  }

                  </div>
                </div>
          ))
        }
      </div>
      <button onClick={() => props.setPage(Pages.RULES)}>Back to Rules Page</button>
    </div>
  );
}

export default App;
