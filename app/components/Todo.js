import React, { Component } from 'react'

import styles from './Todo.css'
// api
import { getNote, reviewOver } from '../utils/fileUtil'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    let todos = this.props.todos
    this.state = {
      clickNote: '',
      todos: todos,
      cTodos: [],
      index: -1
    }
  }
  fetchItem(name) {
    // 如果点击同名笔记，直接return，不用再次去读取笔记
    if(this.state.clickNote === name) {
      return
    }
    this.setState({
      clickNote: name
    })
    let fileContent = getNote(name)
    // 获取到了内容，通知父组件
    this.props.onClick(fileContent, name)
  }
  reviewComplete(index, note, event) {
    event.stopPropagation()
    let ary = this.state.cTodos
    ary.push(note)
    this.setState({
      cTodos: ary
    })
    // 更新db.json
    reviewOver(note, ()=> {
      console.log('复习完成')
    })
  }
  render() {
    let todos = this.state.todos
    let list = []
    let i = 0
    let leftItem = todos.length - this.state.cTodos.length
    todos.forEach(note=> {
      let cln = inArray(this.state.cTodos, note) ? styles['todo-complete'] : styles['todo-item']
      list.push((<li key={i} 
        onClick = {this.fetchItem.bind(this, note)}
        className={cln}
        >
          <div 
            className={styles['todo-btn']}
            onClick={this.reviewComplete.bind(this, i, note)}
          ></div>
          {note}
        </li>))
      i = i + 1
    })
    let noteLen = todos.length
    return (
      <div className={styles['todo']}>
        <h3 className={styles['todo-head']}>待复习笔记</h3><span className={styles['todo-small']}>{leftItem}/{noteLen}条</span>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

function inArray(ary, item) {
  if(!ary || ary.length === 0) {
    return false
  }
  let temp = false
  ary.forEach(e=> {
    if(e === item) {
      temp = true
    }
  })
  return temp
}