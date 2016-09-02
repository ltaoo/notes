import React, { Component } from 'react'

import styles from './Todo.css'

export default class Todo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles['todo']}>
        <h3 className={styles['todo-head']}>待复习笔记</h3>
      </div>
    )
  }
}