import React, { Component } from 'react'
import { connect } from 'react-redux'

import Compile from './Compile'

import styles from './Edit.css'
//
import { inputTitle, inputContent, saveNote, deleteNote, chooseNote } from '../actions/note'
//
import { searchNote, indexOf } from '../utils/utils'


class Edit extends Component {
  render() {
    const id = this.props.currentNote.id
    // 通过传过来的 id 查询到笔记的详细信息
    const { dispatch, notes, currentNote } = this.props
    let title = currentNote.title
    let content = currentNote.content

    return (
      <div
        className = {styles['markdown']}
      >
        <button
          onClick = {e => {
            // 判断一下是否输入了内容
            let index = indexOf(notes, currentNote.id)
            if(notes[index].title === currentNote.title && notes[index].content === currentNote.content) {
              // 如果两个相等，就是没做任何修改
              console.warn('并没有修改笔记')
              return
            }else {
              // 不然
              dispatch(saveNote())
            }
          }}
        >保存笔记</button>
        <button
          onClick = {e => {
            if(confirm(`确认删除${currentNote.title}吗？`)) {
              // 确认删除
              dispatch(deleteNote())
              // 删除后选中第一条笔记吧，还是？
              if(notes.length !== 0) {
                dispatch(chooseNote(notes[0].id))
              }
            }
          }}
        >删除笔记</button>
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
          className = {styles['edit']}
          placeholder={"笔记内容...."}
          value = {content}
          onChange = {e => {
            dispatch(inputContent(id, e.target.value))
          }}
        ></textarea>
        <Compile
          html = {content}
        />
      </div>
    )
  }
}





function select(state) {
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(Edit)