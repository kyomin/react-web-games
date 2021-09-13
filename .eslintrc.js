module.exports = {
  // 현재 eslintrc 파일 위치를 기준으로 하위 파일에 ESLint 규칙을 적용
  root: true,
  // 사전 정의된 전역 변수 사용 정의
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 코드 정리 플러그인 추가
  plugins: ['prettier'],
  // 위에서 추가한 플러그인에서 사용할 규칙을 구체적으로 정의
  extends: ['@nuxtjs', 'prettier/standard', 'plugin:prettier/recommended'],
  // 사용자 편의 규칙 추가
  rules: {}
};
