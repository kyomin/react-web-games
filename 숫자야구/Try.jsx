import React, { memo } from 'react';

// memo를 사용하면, state나 props가 이전 상태와 달라졌을 때에만 다시 렌더링 한다.
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
})

export default Try;