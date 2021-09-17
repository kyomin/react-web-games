import React, { useState, useRef, useEffect } from 'react';

// 가위 바위 보가 그려진 이미지를 각 종류에 맞게 나타낼 수 있도록 기준 좌표를 정리한다.
const rspCords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
};

// 플레이어의 점수표
const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const computerChoice = (imgCord) => {
  return Object.entries(rspCords).find((v) => {
    return v[1] === imgCord;
  })[0];
};

const RockScissorsPaper = () => {
  const [result, setResult] = useState('');
  const [imgCord, setImgCord] = useState(rspCords.바위);
  const [score, setScore] = useState(0);
  const [flag, setFlag] = useState(false);
  const interval = useRef();

  useEffect(() => {   // class 컴포넌트의 componentDidMount
    interval.current = setInterval(changeHand, 100);

    // componentWillUnmount 역할
    return () => {
      clearInterval(interval.current);
    }
  }, [imgCord]);   // componentDidUpdate의 역할. imgCord가 바뀔 때마다 useEffect의 콜백 함수 실행.

  const changeHand = () => {
    if (imgCord === rspCords.바위) {
      setImgCord(rspCords.가위);
    } else if (imgCord === rspCords.가위) {
      setImgCord(rspCords.보);
    } else if (imgCord === rspCords.보) {
      setImgCord(rspCords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    if (flag) {
      return;
    }
    
    setFlag(true);

    clearInterval(interval.current);   // 잠시 가위바위보를 멈추고

    // 점수 계산
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }

    // 2초 뒤 다시 가위바위보 재개
    setTimeout(() => {
      setFlag(false);
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0` }}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RockScissorsPaper;