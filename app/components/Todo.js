import React, { Component } from 'react'

import styles from './Todo.css'
// api
import { getNote, reviewOver } from '../utils/fileUtil'

export default class Todo extends Component {
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