import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Edit.css'
//
import { inputTitle, saveNote } from '../actions/note'
//
import { searchNote } from '../utils/utils'


class Edit extends Component {
  //
  constructor(props) {
    super(props)
    //
    this.handleInput.bind(this)
  }
  render() {
    const id = this.props.currentNote.id
    // 通过传过来的 id 查询到笔记的详细信息
    const { dispatch, notes, currentNote } = this.props
    let title = currentNote.title

    return (
      <div>
        <button
          onClick = {e => {
            dispatch(saveNote())
          }}
        >保存笔记</button>
        <input 
          type="text" 
          className={styles['markdown-title']}
          placeholder={'请输入标题'}
          value = {title}
          onChange = {e => {
            dispatch(inputTitle(id, e.target.value))
          }}
        />
        <textarea
          className = {styles['edit-area']}
          placeholder={"笔记内容...."}
        ></textarea>
      </div>
    )
  }

  handleInput(e) {
    // 获取到 title
    const title = e.target.value
    // 这里还是要 dispatch 一个输入事件
  }
}





function select(state) {
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(Edit)