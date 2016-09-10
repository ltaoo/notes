import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Note.css'


class Note extends Component {
  render() {
    const { currentNote } = this.props
    let notes = this.props.notes
    // 高亮

    let list = []
    notes.forEach(note=> {
      let style = styles['notes-item']
      if(note.id === currentNote.id) {
        style = styles['notes-item-active']
      }
      list.push((<li key={note.id}
        onClick = {e=> this.handleClick(e, note.id)}
        className={style}>{note.title}</li>))
    })
    let noteLen = notes.length
    return (
      <div className={styles['notes']}>
        <h3 className={styles['notes-head']}>个人笔记</h3><span className={styles['notes-small']}>{noteLen}条</span>
        <ul className={styles['notes-content']}>
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

// 在这里计算显示的笔记
function select(state) {
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(Note)