import React, { Component } from 'react'

import styles from './Todo.css'

export default class Todo extends Component {
  render() {
    let todos = this.props.todos
    let list = []
    todos.forEach(note=> {
      let cln = note.complete ? styles['todo-complete'] : styles['todo-item']
      list.push((<li 
          key={note.id} 
          className={cln}
          onClick = {()=> this.props.onView(note.id)}
        >
          <div 
            className={styles['todo-btn']}
            onClick = {(e)=> {
              e.stopPropagation()
              this.props.onComplete(note.id)
            }}
          ></div>
          {note.title}
        </li>))
    })
    let noteLen = todos.length
    return (
      <div className={styles['todo']}>
        <h3 className={styles['todo-head']}>待复习笔记</h3><span className={styles['todo-small']}>/{noteLen}条</span>
        <ul className={styles['todo-list']}>
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