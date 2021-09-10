const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',
  devtool: 'eval',
  // import 시에 확장자 생략할 수 있게 된다.
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: './client'
  },  // 입력
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }]
  },  // 입력 후 모듈 설정을 입혀 출력으로 내보낸다.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }   // 출력
}