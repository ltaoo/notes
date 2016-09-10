// 首先定义 action
// 增加笔记
export const increment_note = 'increment_note'
// 删除笔记
export const decrement_note = 'decrement_note'

export function increment(title, content) {

  const now = new Date().getTime()
  const dayAry = [1, 3, 7, 15, 30]
  const ary = []
  dayAry.forEach(day=> {
    ary.push(new Date(now + 86400000*day).toLocaleString())
  })
  const todo = []
  ary.forEach(date=> {
    todo[date] = false
  })
  return {
    type: increment_note,
    title,
    content,
    createTime: new Date().toLocaleString(),
    todo: todo,
    id: new Date().getTime()
  }
}


export function decrement() {
  return {
    type: decrement_note
  }
}
