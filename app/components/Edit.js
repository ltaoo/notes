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
    return (
      <div className={styles['edit']}>
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