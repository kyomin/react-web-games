import React, { useState } from 'react';
import Try from './Try';

function getNumbers() {   // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i=0; i<4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
    array.push(chosen);
  }

  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitFrom = (e) => {
    e.preventDefault();

    if (value === answer.join('')) {  // 바로 맞췄으면!
      setResult('홈런!');
      setTries((prevTries) => {   // 이전 값을 이용해 현재 값을 만드는 경우
        return [...prevTries, { try: value, result: '홈런!' }]
      });

      alert('게임을 다시 시작합니다!');

      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {    // 답이 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {   // 10번 틀렸다면
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);

        alert('게임을 다시 시작합니다!');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i=0; i<4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
        });
        setValue('');
      }
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>숫자야구 게임</h1>
      <h2>{result}</h2>
      <form onSubmit={onSubmitFrom}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try
              key={i}
              tryInfo={v}
              index={i}
            />
          );
        })}
      </ul>
    </>
  ); 
}

export default NumberBaseball;