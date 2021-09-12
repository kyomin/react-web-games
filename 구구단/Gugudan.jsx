const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
  /* hooks에서 state를 선언하는 방식 */
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (parseInt(value) === first * second) {
      setResult('정답: ' + value);
      setValue('');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    } else {
      setResult('땡');
      setValue('');
    }

    inputRef.current.focus();
  }

  // hooks는 state가 바뀔 때마다 위의 함수 부분이 통째로 재실행된다. => 나중에 최적화
  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  )
}

module.exports = Gugudan;