import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

// table의 상수의 의미를 코드로 정리
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0 이상이면 다 opened
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {}
});

const initialState = {
  tableData: [],
  timer: 0,
  result: ''
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);

  // 0 <= x < (row*cell)의 정수 채우기
  const size = row * cell;
  const candidate = Array(size).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while(candidate.length > (row * cell) - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  // code.NORMAL로 셋팅된 2차원 배열 만들기
  const data = [];
  for (let i=0; i<row; i++) {
    const rowData = [];
    data.push(rowData);

    for(let j=0; j<cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // shuffle에 랜덤으로 뽑은 위치에 지뢰 심기
  for (let k=0; k<shuffle.length; k++) {
    const r = Math.floor(shuffle[k] / cell);
    const c = shuffle[k] % cell;

    data[r][c] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      };
    }
    default: {
      return state;
    }
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* 
    context value 최적화하기.
    state가 변경될 때마다 리렌더링 되면서 context value 객체가 새로 생성되고,
    그러면 자식 컴포넌트도 자동으로 리렌더링 된다.
    그래서 useMemo로 값을 캐싱해둔다.

    아래에서는 state.tableData가 바뀔 때에 갱신해 준다.
  */
  const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

  return (
    // 이 안에 묶인 컴포넌트에서 다이렉트로 현 컴포넌트의 데이터에 접근할 수 있게 된다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;