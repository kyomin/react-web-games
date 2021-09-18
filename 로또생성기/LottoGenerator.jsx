import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidates = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];

  // 셔플
  while (candidates.length > 0) {
    shuffle.push(candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class LottoGenerator extends Component {
  state = {
    winNumbers: getWinNumbers(),  // 당첨 숫자들
    winBalls: [], // 당첨 숫자들에서 보너스 공 제외한 번호들
    bonus: null,  // 보너스 공
    redo: false
  };

  timeouts = [];

  runGenerator = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          }
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true
      });
    }, 7000);
  };

  componentDidMount() {
    this.runGenerator();
  }

  componentDidUpdate(prevProps, prevState) {
    /* 
      이 라이프사이클에서는 조건문이 중요하다.
      어떤 props, 어떤 state가 바뀌었을 때 실행될 것을 명시해야 할 것이 권장된다.
      아니면 무작위의 state나 props가 변경되었을 때 내부 로직이 항상 실행될 것이다.
    */
    if (this.state.winBalls.length === 0) {
      this.runGenerator();
    }
  }
  
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    // 초기화
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false
    });

    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default LottoGenerator;