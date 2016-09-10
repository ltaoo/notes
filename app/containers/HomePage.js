import React, { Component } from 'react';
import { connect } from 'react-redux'
// actions
import { increment, chooseNote, saveNote } from '../actions/note'
// utils
import { indexOf } from '../utils/utils'
// style
import styles from './HomePage.css';
// components
import Menu from '../components/Menu'
import Note from '../components/Note'
import Todo from '../components/Todo'
import Edit from '../components/Edit'
import Compile from '../components/Compile'

class HomePage extends Component {
  render() {
    // 调用 connect() 才能获取到 dispatch 以及 note
    const { dispatch, notes, currentNote } = this.props
    return (
      <div className={styles.container}>
        <Menu 
          onAddClick = {
            (title, content)=> {
              // 广播新建笔记
              let note = increment(title, content)
              console.log(note)
              const id = note.id
              dispatch(note)
              // 应该还要设置“当前笔记”
              dispatch(chooseNote(id))
            }
          }
        />
        <div className={styles.aside}>
          <Note
            notes={notes}
            onClick={(id)=> {
              // 选择其他笔记前，先保存当前正在编辑的
              // 最好还是提示一下，还未保存，那就还要判断用户是否改变了，就是 input 是否发生
              let index = indexOf(notes, currentNote.id)
              if(notes[index].title === currentNote.title && notes[index].content === currentNote.content) {
                // 如果两个相等，就是没做任何修改
                dispatch(chooseNote(id))
              }else {
                // 不然
                if(confirm('需要对更改的内容保存吗？')) {// 用confirm 体验不好，只有是否，不能取消，如果用户以为取消是取消这次操作，那就尴尬了。
                  // 如果要保存
                  dispatch(saveNote())
                  dispatch(chooseNote(id))
                }else {
                  dispatch(chooseNote(id))
                }
              }
            }}
          />
        </div>
        <div className={styles['markdown']}>
          <Edit
            currentNote = {currentNote}
          />
        </div>
      </div>
    );
  }
}
// 在这里计算显示的笔记
function select(state) {
  //console.log(state)// 这里打印出了两个属性，是合并两个 reduce 时的名字，所以这里有一个 note 和一个 routing
  return {
    notes: state.note.notes,
    currentNote: state.note.currentNote
  }
}

export default connect(select)(HomePage)