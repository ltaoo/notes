import fs from 'fs'

// config 暂时硬编码，后面考虑增加配置文件
let dir = './data/'
let db = 'db.json'
export function getDb() {
  return JSON.parse(fs.readFileSync(db, 'utf-8'))
}


// 获取笔记列表
export function getNotes() {
  let data = getDb()
  return data.notes
}
// 读取单篇笔记
export function getNote(name) {
  return fs.readFileSync(dir+name+'.md', 'utf8')
}

// 增加新笔记
export function addNote(name, value, cb) {
  let now = new Date().toLocaleDateString()
  let temp = new Date().getTime() 
  let afterOne = new Date(temp+86400000*1).toLocaleDateString()
  let afterTwo = new Date(temp+86400000*3).toLocaleDateString()
  let afterThree = new Date(temp+86400000*7).toLocaleDateString()
  let afterFour = new Date(temp+86400000*15).toLocaleDateString()
  let afterFive = new Date(temp+86400000*30).toLocaleDateString()
  console.log(afterOne, afterTwo, afterThree, afterFour, afterFive)
  fs.writeFile(dir+name+'.md', value, (err)=> {
    if(err) throw err
    // 写入db.json
    let json = getDb()
    // 根据遗忘曲线来先写好要复习的时间
    json.notes.unshift({
      title: name,
      createTime: now,
      updateTime: [],
      todo: {
        [afterOne]: false,
        [afterTwo]: false,
        [afterThree]: false,
        [afterFour]: false,
        [afterFive]: false
      }
    })
    let notes = json.notes
    // 直接覆盖
    let str = JSON.stringify(json)
    fs.writeFile(db, str, (err)=> {
      if(err) throw err
      cb(notes)
    })
  })
}
// 修改笔记
export function updateNote(name, value, cb) {
  fs.writeFile(dir+name+'.md', value, (err)=> {
    if(err) throw err
    // 修改db.json
    let json = getDb()
    // 找到name
    let index = searchNote(name)
    // 笔记存在，这里一定存在
    let time = new Date().toLocaleDateString()
    // 不记录更新时间
    //json.notes[index].updateTime.push(time)
    let note = json.notes[index]
    // 直接覆盖
    let str = JSON.stringify(json)
    fs.writeFile(db, str, (err)=> {
      if(err) throw err
      cb(note)
    })
  })
}
export function deleteNote(name) {
  fs.unlink(dir + name + '.md')
  // 还要删除db.json
  let json = getDb()
  let index = searchNote(name)
  json.notes.splice(index, 1)
  let str = JSON.stringify(json)
  fs.writeFile(db, str, (err)=> {
    if(err) throw err
  })
}
// 搜索笔记，返回下标，如果没有找到，就返回 undefined
export function searchNote(name) {
  console.log('searchNote Function')
  let notes = getNotes()
  let index
  let len = notes.length
  for(let i = 0; i<len; i++) {
    if(notes[i].title === name) {
      // 找到
      index = i
    }
  }
  return index
}
// 根据时间计算出应该要复习的笔记
export function getTodos() {
  let todo = []
  let now = new Date().toLocaleDateString()
  let notes = getNotes()
  // notes 是数组
  notes.forEach(note=> {
    for(let key in note.todo) {
      // key 是时间
      if(key <= now && !note.todo[key]) {
        // 就是要复习的
        // 先判断笔记是否已经存在 todo 数组里
        if(!inArray(todo, note.title)) {
          // 如果不存在，才添加到数组中
          todo.push(note.title)
        }
      }
    }
  })
  return todo
}

// 完成指定笔记的复习
export function reviewOver(title, cb) {
  let now = new Date().toLocaleDateString()
  let json = getDb()
  json.notes.forEach(note=> {
    if(note.title === title) {
      // 该篇笔记完成复习
      for(let time in note.todo) {
        if(time <= now) {
          note.todo[time] = true
        }
      }
    }
  })
  // 写入db.json
  let str = JSON.stringify(json)
  fs.writeFile(db, str, (err)=> {
    if(err) throw err
    cb()
  })
}

// inArray() 判断值是否存在指定数组中
function inArray(ary, item) {
  if(!ary || ary.length === 0) {
    return false
  }
  let temp = false
  ary.forEach(e=> {
    if(e === item) {
      temp = true
    }
  })
  return temp
}