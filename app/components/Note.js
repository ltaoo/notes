import React, { Component } from 'react'

import styles from './Note.css'


export default class Note extends Component {
  render() {
    let notes = this.props.notes
    let list = []
    notes.forEach(note=> {
      list.push((<li key={note.id}
        onClick = {e=> this.handleClick(e, note.id)}
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

  handleClick(e, id) {
    // 在点击前，对现在的做保存
    this.props.onClick(id)
  }
}