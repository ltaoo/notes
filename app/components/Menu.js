import React, { Component } from 'react'
import { connect } from 'react-redux'

import { increment, chooseNote, saveNote, editNote } from '../actions/note'

import styles from './Menu.css'

import { isExist, indexOf } from '../utils/utils'

class Menu extends Component {
  render() {
    const { dispatch, notes, currentNote } = this.props
    return (
      <div className={styles['menu']}>
        <button
          className={styles['btn']}
          onClick={e=> this.handleClick(e, dispatch, notes, currentNote)}
        >新增笔记</button>
      </div>
    )
  }

  handleClick(e, dispatch, notes, currentNote) {
    const title = '未命名'
    // 广播新建笔记
    console.log(currentNote)
    // 如果是第一次点击
    if(currentNote.id === '') {
      onAddClick(title)
      return false
    }
    // 不再是第一次点击，这里应该要从 notes 中查询是否有同名笔记，如果有，就做处理
    // 这里要除开本身啊，不然本身肯定名字相同
    let index = indexOf(notes, currentNote.id)
    if(notes[index].title === currentNote.title && notes[index].content === currentNote.content) {
      // 如果两个相等，就是没做任何修改
      onAddClick(title)
    }else {
      // 不然
      if(confirm('需要对更改的内容保存吗？')) {// 用confirm 体验不好，只有是否，不能取消，如果用户以为取消是取消这次操作，那就尴尬了。
        // 如果要保存
        dispatch(saveNote())
        onAddClick(title)
      }else {
        onAddClick(title)
      }
    }
    function onAddClick(title) {
      title = isExist(notes, title)
      let note = increment(title)
      const id = note.id
      dispatch(note)
      // 应该还要设置“当前笔记”
      dispatch(chooseNote(id))
      dispatch(editNote())
    }
  }
}



// 在这里计算显示的笔记
function select(state) {
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(Menu)