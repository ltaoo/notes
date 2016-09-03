import React, { Component } from 'react'

import styles from './Menu.css'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '保存'
    }
    this.newFile.bind(this)
    this.saveFile.bind(this)
  }
  newFile() {
    console.log('create new file')
    this.props.create()
  }
  saveFile() {
    console.log('save file')
    if(this.state.text === '编辑') {
      console.log('编辑笔记')
      this.props.edit()
      this.setState({
        text: '保存'
      })
    }else {
      console.log('保存笔记')
      this.props.save()
      this.setState({
        text: '编辑'
      })
    }
  }
  render() {
    let btnText = ''
    if(this.props.editState) {
      // 如果是编辑状态
      btnText = '保存'
    }else {
      btnText = '编辑'
    }
    return (
      <div className={styles['menu']}>
        <button
          className={styles['btn']}
          onClick={this.newFile.bind(this)}
        >新建</button>
        <button
          className={styles['btn']}
          onClick={this.saveFile.bind(this)}
        >{btnText}</button>
      </div>
    )
  }
}