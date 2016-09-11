export const complete_todo = 'complete_todo'
// 查看 todo 详情内容
export const view_todo = 'view_todo'

export function complete(id) {
  return {
    type: complete_todo,
    id
  }
}

export function view(id) {
  return {
    type: view_todo,
    id
  }
}