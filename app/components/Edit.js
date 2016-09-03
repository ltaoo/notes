import React, { Component } from 'react'

import styles from './Edit.css'


export default class Edit extends Component {
  constructor(props) {
    super(props)
  }
  input(event) {
    this.props.onChange(event.target.value)
  }
  render() {
    let style 
    if(this.props.edit) {
      // 如果是编辑状态，就显示edit
      style = styles['edit']
    }else {
      style = styles['edit', 'edit-hidden']
    }
    return (
      <div className={style}>
        {/*<input 
          className={styles['edit-title']} 
          type="text" 
        />*/}
        <textarea
          className = {styles['edit-area']}
          value = {this.props.value}
          onChange = {this.input.bind(this)}
        ></textarea>
      </div>
    )
  }
}