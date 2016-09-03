import React, { Component } from 'react'

import styles from './Menu.css'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.newFile.bind(this)
    this.saveFile.bind(this)
  }
  newFile() {
    console.log('create new file')
    this.props.create()
  }
  saveFile() {
    console.log('save file')
    this.props.save()
  }
  render() {
    return (
      <div className={styles['menu']}>
        <button
          onClick={this.newFile.bind(this)}
        >新建</button>
        <button
          onClick={this.saveFile.bind(this)}
        >保存</button>
      </div>
    )
  }
}