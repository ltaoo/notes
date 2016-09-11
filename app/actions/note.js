// 首先定义 action
// 初始化笔记列表
export const fetch_notes = 'fetch_notes'
// 增加笔记
export const increment_note = 'increment_note'
// 删除笔记
export const decrement_note = 'decrement_note'
// 选择笔记
export const choose_note = 'choose_note'
// 输入笔记标题
export const input_title = 'input_title'
// 输入笔记内容
export const input_content = 'input_content'
// 保存笔记
export const save_note = 'save_note'
// 删除笔记
export const delete_note = 'delete_note'

export function increment(title) {
  const now = new Date().getTime()
  const dayAry = [1, 3, 7, 15, 30]
  const ary = []
  dayAry.forEach(day=> {
    ary.push(new Date(now + 86400000*day).toISOString())
  })
  const todo = {}
  ary.forEach(date=> {
    todo[date] = false
  })
  return {
    type: increment_note,
    title,
    content: '',
    createTime: new Date().toISOString(),
    todo: todo,
    id: new Date().getTime()
  }
}


export function decrement() {
  return {
    type: decrement_note
  }
}

// 选择笔记，需要将该笔记的 title、content 也同时复制到 currentNote 中
export function chooseNote(id) {
  return {
    type: choose_note,
    id
  }
}

export function inputTitle(id, title) {
  return {
    type: input_title,
    title,
    id,
  }
}

export function inputContent(id, content) {
  return {
    type: input_content,
    id,
    content
  }
}

// 保存，即将 current 的内容复制到 notes 中。
// 这样，可以比对笔记名是否重复。
export function saveNote() {
  // 在保存笔记前对笔记名做判断？

  return {
    type: save_note
  }
}

export function deleteNote() {
  return {
    type: delete_note
  }
}