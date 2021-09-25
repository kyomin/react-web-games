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
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;