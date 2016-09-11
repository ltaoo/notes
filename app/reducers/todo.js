import { 
  complete_todo, 
  view_todo 
} from '../actions/todo'
// reducer
import * as fromNote from './note'
// file
import { getTodos, review } from '../utils/fileUtil'
// util
import { indexOf } from '../utils/utils'
let todoAry = getTodos()
// todoAry 仅仅是保存 id 的数组，还要笔记名
// 然后是对
const initialState = getTodos()


export default function todo(state = initialState, action) {
  switch(action.type) {
    case complete_todo:
      // 示例中是传入了 index，然后分割数组
      let index = indexOf(state, action.id)
      review(action.id)
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          complete: true
        }),
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}