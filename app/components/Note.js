import React, { Component } from 'react'

import styles from './Note.css'

// api
import { readFileSync } from 'fs'

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickNote: ''
    }
    this.fetchItem.bind(this)
  }

  fetchList() {
    // 读取db.json ，获取到笔记列表
    let content = JSON.parse(readFileSync('./data/db.json', 'utf-8'))
    return content.notes
  }
  fetchItem(name) {
    // 如果点击同名笔记，直接return，不用再次去读取笔记
    if(this.state.clickNote === name) {
      return
    }
    this.setState({
      clickNote: name
    })
    let fileContent = readFileSync('./data/'+name+'.md', 'utf8')
    // 获取到了内容，通知父组件
    this.props.onClick(fileContent, name)
  }
  render() {
    let notes = this.fetchList()
    let list = []
    let i = 0
    notes.forEach(note=> {
      list.push((<li key={i++} 
        onClick = {this.fetchItem.bind(this, note.title)}
        className={styles['notes-item']}>{note.title}</li>))
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