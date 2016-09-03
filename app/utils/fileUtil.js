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

// 增加新笔记
export function addNote(name, value, cb) {
  fs.writeFile(dir+name+'.md', value, (err)=> {
    if(err) throw err
    // 写入db.json
    let json = getDb()

    json.notes.unshift({
      title: name,
      createTime: new Date().toLocaleDateString(),
      updateTime: []
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
    json.notes[index].updateTime.push(time)
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