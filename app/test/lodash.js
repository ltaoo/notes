const _ = require('lodash')

var ary = [
  {
    title: '未命名',
    create: '2924332'
  }
]

console.log(_.indexOf(ary, {title: '未命名'}))