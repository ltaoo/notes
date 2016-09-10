import { increment_note, decrement_note, choose_note, input_title, save_note } from '../actions/note';
import { indexOf, isExist } from '../utils/utils'

const initialState = {
  notes: [],
  currentNote: {
    id: '',
    title: '',
    content: ''
  }
}
export default function note(state = initialState, action) {
  switch (action.type) {
    case increment_note:
      return Object.assign({}, state, {
        notes: [
          ...state.notes,
          {
            id: action.id,
            title: action.title,
            content: action.content,
            createTime: action.createTime,
            todo: action.todo
          }
        ]
      })
    case choose_note:// 新增笔记后，选中该笔记
      // 首先要明确一点，这里是接收 action，就是别人告诉这里，要做什么，具体怎么做，由这里决定
      let index = indexOf(state.notes, action.id)
      return Object.assign({}, state, {
        currentNote: Object.assign({}, state.currentNote, {
          id: action.id,
          title: state.notes[index].title,
          content: state.notes[index].content
        })
      })
    case input_title:
      // 这里应该更新 title
      return Object.assign({}, state, {
        currentNote: Object.assign({}, state.currentNote, {
          title: action.title
        })
      })
    case save_note:
      let index2 = indexOf(state.notes, state.currentNote.id)
      // 虽然说不要在这里修改传过来的值，但是有时候还是需要啊！！在 action 中可以获取到 state 吗？
      const title = isExist(state.notes, state.currentNote.title)

      return Object.assign({}, state, {
        notes: [
          ...state.notes.slice(0, index2),
          Object.assign({}, state.notes[index2], {
            title,
            content: state.currentNote.content
          }),
          ...state.notes.slice(index2 + 1)
        ],
        currentNote: Object.assign({}, state.currentNote, {
          title
        })
      })
    default:
      return state;
  }
}
