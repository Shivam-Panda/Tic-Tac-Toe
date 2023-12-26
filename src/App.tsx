import React, { useEffect, useState } from 'react';
import './App.css';

const MainBoard = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
]

function App() {
  const [vals, setVals] = useState<String[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [active, setActive] = useState<number>(4);

  const handleClick = (outer_index: number, inner_index: number) => {
    if(outer_index === active) {
      const sum = (outer_index * 100) + inner_index
      if(turn % 2 === 0) {
        vals[sum] = "X"
      } else {
        vals[sum] = "O"
      }
      setActive(inner_index)
      setTurn(turn + 1);
    } else {
      alert("Invalid Turn")
    }
  }

  return (
    <div className="GRID">
      {
        MainBoard.map((val, index) => (
              <div>
                <div className="gridItem">
                {
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
  );
}

export default App;
