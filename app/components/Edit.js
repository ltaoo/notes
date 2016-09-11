import React, { Component } from 'react'
import { connect } from 'react-redux'

import Compile from './Compile'

import styles from './Edit.css'
//
import { 
  inputTitle, 
  inputContent, 
  saveNote, 
  deleteNote, 
  chooseNote,
  editNote,
  readNote
} from '../actions/note'
//
import { searchNote, indexOf } from '../utils/utils'


class Edit extends Component {
  readMode(id, title, content, notes, dispatch) {
    return (
      <div
        className = {styles['markdown']}
      >
        <button
          onClick = {e=> {
            // 这里改变视图的状态为编辑状态
            dispatch(editNote())
          }}
        >编辑</button>
        <button
          onClick = {e => {
            if(confirm(`确认删除${title}吗？`)) {
              // 确认删除
              dispatch(deleteNote(id))
              // 删除后选中第一条笔记吧，还是？
              // 选中上一条吧
            }
          }}
        >删除笔记</button>
        <input 
          type="text" 
          className={styles['markdown-title']}
          value = {title}
          readOnly
        />
        <Compile
          className = {styles['compile']}
          html = {content}
        />
      </div>
    )
  }
  editMode(id, title, content, notes, dispatch) {
    return (
      <div
        className = {styles['markdown']}
      >
        <button
          onClick = {e => {
            // 判断一下是否输入了内容
            let index = indexOf(notes, id)
            if(notes[index].title === title && notes[index].content === content) {
              // 如果两个相等，就是没做任何修改
              console.warn('并没有修改笔记')
              dispatch(readNote())
              return
            }else {
              // 不然
              dispatch(saveNote())
              dispatch(readNote())
            }
          }}
        >保存笔记并阅读</button>
        <button
          onClick = {e => {
            if(confirm(`确认删除${title}吗？`)) {
              // 确认删除
              dispatch(deleteNote(id))
              // 删除后选中第一条笔记吧，还是？
              // 如果有两条笔记，删除第一条时，这里的 notes 其实还是两条，所以有问题，当然，小问题，不影响
              // 所以其实可以在这里移除被删除的。当然，其实没什么影响，但是更好做判断。
              // 从数组中删除指定对象
              /*let index = indexOf(notes, id)
              notes.splice(index, 1)// 删除了
              if(notes.length !== 0) {
                console.log(notes)
                dispatch(chooseNote(notes[0].id))
              }*/
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
          className = {styles['compile-half']}
          html = {content}
        />
      </div>
    )
  }
  indexMode() {
    return (
      <div>
        <p> 这是首页 </p>
      </div>
    )
  }
  render() {
    const { dispatch, notes, currentNote } = this.props
    // 根据状态判断显示什么视图
    const id = currentNote.id
    let title = currentNote.title
    let content = currentNote.content
    if(notes.length === 0 || id === '') {
      return this.indexMode()
    }
    if(currentNote.isEdit) {
      // 如果是编辑状态
      return this.editMode(id, title, content, notes, dispatch)
    }else {
      return this.readMode(id, title, content, notes, dispatch)
    }
    
  }
}





function select(state) {
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(Edit)