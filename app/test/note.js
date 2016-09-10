import { createStore } from 'redux'
import note from '../reducers/counter'
import { increment } from '../actions/note'

let store = createStore(note)

// 打印初始状态
console.log(store.getState())

// 每次更新 state时，打印日志
let unsubscribe = store.subscribe(()=> {
  console.log(store.getState())
})

store.dispatch(increment('first', 'note content'))
store.dispatch(increment('second', 'note content'))
store.dispatch(increment('third', 'note content'))

unsubscribe()