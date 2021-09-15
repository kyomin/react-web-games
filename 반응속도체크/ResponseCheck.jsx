import React, { useRef, useState } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);

  /*
    useRef를 이용해서 변수를 선언할 수 있다.
    다만, state 변수와 차이가 나는 것은
    state 변수가 변할 때에는 render가 다시 일어나는데,
    아래와 같이 선언한 변수가 변할 때에는 불필요하게 다시 렌더링되지 않는다.
  */
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');

        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);  // 2 ~ 3초 랜덤
    } else if (state === 'ready') {   // 성급하게 클릭
      clearTimeout(timeout.current);

      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {   // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, (endTime.current - startTime.current)];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <> 
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };

  return (
    <>
      <div 
        id="screen" 
        className={state} 
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;