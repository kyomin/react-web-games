const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',  // 개발 시 : eval, 배포 시 : hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx']
  },    // import 시에 확장자 생략할 수 있게 된다.
  entry: {
    app: './client'
  },  // 입력
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {   // 여러 브라우저 환경에서 최신 문법 지원하게 해주는 라이브러리
            targets: {
              browsers: ['> 1% in KR']  // browser list
            }
          }], 
          '@babel/preset-react'
        ],
        plugins: []
      }
    }]
  },  // 입력 후 모듈 설정을 입혀 출력으로 내보낸다.
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true })
  ],  // 추가적으로 하고 싶은 작업 기술
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }   // 출력
}