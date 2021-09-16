import React, { Component } from 'react';

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

/*
  클래스의 경우 : constructor -> render -> ref -> componentDidMount
  -> (state/props 바뀔 때) -> shouldComponentUpdate(true) -> re-render -> componentDidUpdate
  -> 부모가 나(컴포넌트)를 없앴을 때 -> componentWillUnmount -> 소멸
*/
class RockScissorsPaper extends Component {
  state = {
    result: '',
    imgCord: '0',
    score: 0,
    flag: false
  };

  interval;

  // 첫 렌더링 후에 실행되는 라이프 사이클이다.
  // 리렌더링 시에는 실행되지 않는다.
  // 비동기 요청을 이 부분에서 한다.
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  // 컴포넌트가 제거되기 직전
  // 비동기 요청 정리를 여기서 한다.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCord } = this.state;

    if (imgCord === rspCords.바위) {
      this.setState({
        imgCord: rspCords.가위
      });
    } else if (imgCord === rspCords.가위) {
      this.setState({
        imgCord: rspCords.보
      });
    } else if (imgCord === rspCords.보) {
      this.setState({
        imgCord: rspCords.바위
      });
    }
  }

  onClickBtn = (choice) => {
    const { imgCord, flag } = this.state;

    if (flag) {
      return;
    }
    
    this.setState({
      flag: true
    });

    clearInterval(this.interval);   // 잠시 가위바위보를 멈추고

    // 점수 계산
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼습니다!'
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1
        };
      });
    }

    // 2초 뒤 다시 가위바위보 재개
    setTimeout(() => {
      this.setState({
        flag: false
      });
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0` }}></div>
        <div>
          <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RockScissorsPaper;