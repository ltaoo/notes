import { increment_note, decrement_note } from '../actions/note';

const initialState = {
  notes: []
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
    default:
      return state;
  }
}
