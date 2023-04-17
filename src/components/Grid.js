import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { Spacer } from "./helpers";
import "../styles.css";

export default function Grid({ rows, columns }) {
  let SOLUTIONARRAY = [];
  const [solutionRowCounts, setSolutionRowCounts] = useState([]);
  const [solutionColumnCounts, setSolutionColumnCounts] = useState([]);
  let RowArray = Array(rows);
  let ColArray = Array(columns);
  for (let i = 0; i < rows; ++i) {
    //for loops: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
    RowArray[i] = i;
  }
  for (let i = 0; i < columns; ++i) {
    ColArray[i] = i;
  }
  const [grid, setGrid] = useState(
    Array(rows).fill(Array(columns).fill(false))
  ); //for array and fill: https://stackoverflow.com/questions/22876978/loop-inside-react-jsx?page=1&tab=scoredesc#tab-top

  const [hasNotWon, setHasNotWon] = useState(true);
  const [isViewable, setViewable] = useState(false);

  function randomBool() {
    if (Math.random() > 0.5) return 1;
    else return 0;
  }
  // for useCallback to avoid warning https://stackoverflow.com/questions/56492261/the-function-makes-the-dependencies-of-useeffect-hook
  const getColumnCount = useCallback(
    (i, array) => {
      let total = 0;
      for (let j = 0; j < rows; ++j) {
        total += array[j][i];
      }
      return total;
    },
    [rows]
  );

  const getRowCount = useCallback(
    (i, array) => {
      let total = 0;
      for (let j = 0; j < columns; ++j) {
        total += array[i][j];
      }
      return total;
    },
    [columns]
  );

  function setSolutionGrid() {
    SOLUTIONARRAY = [];
    for (let i = 0; i < rows; ++i) {
      let newArray = [];
      for (let j = 0; j < columns; ++j) {
        newArray.push(randomBool());
      }
      SOLUTIONARRAY.push(newArray);
    }
    getSolutionColumnCounts();
    getSolutionRowCounts();
  }

  function getSolutionColumnCounts() {
    let tempSolutionColumnCounts = [];
    for (let i = 0; i < columns; ++i) {
      tempSolutionColumnCounts.push(getColumnCount(i, SOLUTIONARRAY));
    }
    setSolutionColumnCounts(tempSolutionColumnCounts);
  }

  function getSolutionRowCounts() {
    let tempSolutionRowCounts = [];
    for (let i = 0; i < rows; ++i) {
      tempSolutionRowCounts.push(getRowCount(i, SOLUTIONARRAY));
    }
    setSolutionRowCounts(tempSolutionRowCounts);
  }

  const getGridColumnCounts = useCallback(() => {
    let tempGridColumnCounts = [];
    for (let i = 0; i < columns; ++i) {
      tempGridColumnCounts.push(getColumnCount(i, grid));
    }
    return tempGridColumnCounts;
  }, [columns, grid, getColumnCount]);

  const getGridRowCounts = useCallback(() => {
    let tempGridRowCounts = [];
    for (let i = 0; i < rows; ++i) {
      tempGridRowCounts.push(getRowCount(i, grid));
    }
    return tempGridRowCounts;
  }, [rows, grid, getRowCount]);

  function updateGrid(rowVal, colVal) {
    if (hasNotWon) {
      let tempGrid = [];
      for (let i = 0; i < rows; ++i) {
        let tempArray = [];
        for (let j = 0; j < columns; ++j) {
          if (i === rowVal && j === colVal) {
            tempArray.push(!grid[i][j]);
          } else {
            tempArray.push(grid[i][j]);
          }
        }
        tempGrid.push(tempArray);
      }
      setGrid(tempGrid);
    }
  }

  const win = useCallback(() => {
    let gridRowCounts = getGridRowCounts();
    let gridColumnCounts = getGridColumnCounts();
    for (let i = 0; i < rows; ++i) {
      if (gridRowCounts[i] !== solutionRowCounts[i]) {
        return false;
      }
    }
    for (let j = 0; j < columns; ++j) {
      if (gridColumnCounts[j] !== solutionColumnCounts[j]) {
        return false;
      }
    }
    setHasNotWon(false);
    return true;
  }, [
    columns,
    rows,
    getGridColumnCounts,
    getGridRowCounts,
    solutionColumnCounts,
    solutionRowCounts
  ]);

  function makeGameGrid() {
    setGrid(Array(rows).fill(Array(columns).fill(false)));
    setSolutionGrid();
  }

  function sumBoxes() {
    let total = 0;
    for (let i = 0; i < rows; ++i) {
      total += solutionRowCounts[i];
    }
    return total;
  }

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setHasNotWon(true);
          setViewable(true);
          makeGameGrid();
        }}
      >
        New Game
      </Button>
      <Spacer size={20} />
      {isViewable && (
        <GridContainer>
          <ColumnCountWrap>
            <Box key={"sum"} className="textBox">
              {sumBoxes()}
            </Box>
            {solutionColumnCounts.map((value, index) => (
              <Box key={[index, "c"]} className="textBox">
                {value}
              </Box>
            ))}
          </ColumnCountWrap>
          <RowCountWrap>
            {solutionRowCounts.map((value, index) => (
              <Box key={[index, "r"]} className="textBox row">
                {value}
              </Box>
            ))}
          </RowCountWrap>
          <GameWrapper>
            {RowArray.map((rowValue) =>
              ColArray.map((colValue) => (
                <BoxWrapper>
                  {grid[rowValue][colValue] && (
                    <Box
                      key={[rowValue, colValue, true]}
                      row={rowValue}
                      column={colValue}
                      className="filled"
                      onClick={() => updateGrid(rowValue, colValue)}
                    ></Box>
                  )}
                  {!grid[rowValue][colValue] && (
                    <Box
                      key={[rowValue, colValue, false]}
                      row={rowValue}
                      column={colValue}
                      className="not-filled"
                      onClick={() => updateGrid(rowValue, colValue)}
                    ></Box>
                  )}
                </BoxWrapper>
              ))
            )}
          </GameWrapper>
        </GridContainer>
      )}
      {useEffect(() => {
        //from https://stackoverflow.com/questions/37401635/how-can-i-wait-for-setstate-to-finish-before-triggering-a-function-in-react
        setHasNotWon(!win());
      }, [win])}
      {!hasNotWon && <h2>Solved!</h2>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 350px;
`;

const GridContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-areas:
    "head head"
    "side game";
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr 6fr;

  border: black 2px solid;
  border-radius: 0;
  .textBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-size: 1.5rem;
    padding-top: 0;
  }
  @media (max-width: 300px) {
    .textBox {
      font-size: 1rem;
    }
  }
  .not-filled {
    background-color: white;
  }
  .filled {
    background-color: #6e6d6b;
  }
`;

const RowCountWrap = styled.div`
  grid-area: side;
  display: grid;
  grid-template-areas:
    "box"
    "box"
    "box"
    "box"
    "box"
    "box";
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const ColumnCountWrap = styled.div`
  grid-area: head;
  display: grid;
  grid-template-areas: "box box box box box box box";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const GameWrapper = styled.div`
  grid-area: game;
  display: grid;
  grid-template-areas:
    "box box box box box box"
    "box box box box box box"
    "box box box box box box"
    "box box box box box box"
    "box box box box box box"
    "box box box box box box";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  cursor: pointer;
`;

const BoxWrapper = styled.div``;
const Box = styled.div`
  border: solid black 2px;
  border-radius: 0;
  margin: 0;
  width: 100%-2px;
  padding-top: 95%; /*for aspect ratio control https://www.geeksforgeeks.org/maintain-the-aspect-ratio-of-a-div-with-css/*/
`;

const Button = styled.button`
  font-size: 1.25rem;
  border: 2px solid black;
  background: white;
  cursor: pointer;
  &:hover {
    /*got & from https://react.school/styled-components*/
    background: black;
    color: white;
  }
  &:active {
    background: revert;
    color: revert;
  }
`;
