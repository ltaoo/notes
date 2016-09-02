import React, { Component } from 'react'

import styles from './Note.css'

// api
import { readFileSync } from 'fs'

export default class Note extends Component {
  constructor(props) {
    super(props)
  }

  fetchList() {
    // 读取db.json ，获取到笔记列表
    let content = JSON.parse(readFileSync('./data/db.json', 'utf-8'))
    return content.notes
  }
  render() {
    let notes = this.fetchList()
    let list = []
    let i = 0
    notes.forEach(note=> {
      list.push((<li key={i++} className={styles['notes-item']}>{note.title}</li>))
    })
    let noteLen = notes.length
    return (
      <div className={styles['notes']}>
        <h3 className={styles['notes-head']}>个人笔记</h3><span className={styles['notes-small']}>{noteLen}条</span>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}