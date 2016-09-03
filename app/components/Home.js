import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

// components
import Menu from './Menu'
import Note from './Note'
import Todo from './Todo'
import Edit from './Edit'
import Compile from './Compile'

// api
import { readFile } from 'fs'


export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log('Home component is loaded')
    this.state = {
      value: '',
      currentNote: null,
      edit: false,
      new: true
    }
    this.input.bind(this)
    this.showEdit.bind(this)
    this.showNote.bind(this)
  }
  input(value) {
    // 输入事件
    this.setState({
      value: value
    })
  }
  createFile() {
    console.log('create file')
    // 清空，应该还要有当前笔记的state，这里也要清除
    this.setState({
      value: '',
      currentNote: ''
    })
  }
  saveFile() {
    let strAry = this.state.value.split('\n')
    // 将第一行作为文件名进行保存
    let name = this.getTitle(strAry[0])
  }
  getTitle(line) {
    return line.split('#')[1].trim()
  }
  searchFile(name) {
    
  }
  showEdit() {
  }
  showNote(value, name) {
    console.log('show notes', value)
    this.setState({
      value: value,
      currentNote: name
    })
  }
  render() {
    let showEdit = ''
    if(this.state.new) {
      showEdit = 'markdown-show'
    }else {
      showEdit = 'markdown-hidden'
    }
    return (
      <div>
        <div className={styles.container}>
          <Menu 
            create={this.createFile.bind(this)}
            save={this.saveFile.bind(this)}
          />
          <div className={styles.aside}>
            <Note 
              onClick={this.showNote.bind(this)}
            />
            <Todo />
          </div>
          <div className={styles['markdown']}>
            <Edit 
              className={styles['markdown-show']}
              onChange = {this.input.bind(this)}
              value = {this.state.value}
            />
            <Compile
              html = {this.state.value}
            />
          </div>
        </div>
      </div>
    );
  }
}
