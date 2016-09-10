import _ from 'lodash'
// 根据属性查询某个对象是否存在数组中
/*
  比如 notes = [{title: 'hello', content: 'world'}]
  现在有一个对象{title: 'hello'}，要求对 notes 数组该对象，应该返回 true
*/
export function inArray(ary, ele) {
  if(_.indexOf(ary, ele) < 0) {
    return false
  }

  ary.forEach(obj=> {
    for(let key in obj) {
      if(obj[key] === ele[0]) {
        return true
      }
    }
  })
}

// 根据 id 查询笔记详细信息
export function searchNote(notes, id) {
  let result = ''
  notes.forEach(note=> {
    // note 是 Object
    if(note.id === id) {
      // 遍历，如果是符合的
      result = note
    }
  })

  return result
}

// 根据 id 返回 index
export function indexOf(notes, id) {
  let index = -1
  for(let i = 0, len = notes.length; i < len; i++) {
    if(notes[i].id === id) {
      index = i
    }
  }

  return index
}

// 计算笔记名是否重复，并返回计算后的不重复笔记名
export function isExist(notes, name, id) {
  let i = 1

  let noteAry = []
  notes.forEach(obj=> {
    // 如果不传 id ，表示这是新增笔记
    if(!id) {
      noteAry.push(obj.title)
    }
    // 如果是 title，这里是获取每一篇笔记的 title，返回到 noteAry 数组中。
    else if(id && obj.id !== id) {
      noteAry.push(obj.title)
    }
  })
  console.log(noteAry)
  //let notes = getNotes()
  let lastName = ''
  function addNum(name) {
    if(fileExist(noteAry, name)) {
      let newname = originalName+'('+(i+1)+')'
      i = i+1
      addNum(newname)
    }else {
      lastName = name
    }
  }
  let originalName = name
  addNum(originalName)
  return lastName
}

// 根据笔记名查询是否存在
export function fileExist(ary, name) {
  let temp = false
  ary.forEach(item=> {
    if(item === name) {
      temp = true
    }
  })
  return temp
}