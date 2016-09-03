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

    json.notes.push({
      title: name,
      createTime: new Date().toLocaleDateString()
    })
    let notes = json.notes
    // 直接覆盖
    let str = JSON.stringify(json)
    fs.writeFile(db, str, (err)=> {
      if(err) throw err
      alert('保存成功')
      cb(notes)
    })
  })
}