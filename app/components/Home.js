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
import { readFileSync, writeFile } from 'fs'
// util
import { getNotes, addNote } from '../utils/fileUtil.js'


export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log('Home component is loaded')
    let notes = getNotes()
    this.state = {
      notes: notes,
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
    // 清空，应该还要有当前笔记的state，这里也要清除
    this.setState({
      value: '',
      currentNote: ''
    })
  }
  saveFile() {
    // 将第一行作为文件名进行保存
    let name = this.getTitle(this.state.value)
    if(!name) {
      return
    }
    addNote(name, this.state.value, (notes)=> {
      this.setState({
        notes: notes
      })
    })

  }
  getTitle(content) {
    let strAry = content.split('\n')
    let name = strAry[0].split('#')[1].trim()

    return this.isExist(name)
  }
  isExist(name) {
    let i = 1
    function fileExist(ary, name) {
      let temp = false
      ary.forEach(item=> {
        if(item.title === name) {
          temp = true
        }
      })
      return temp
    }
    let notes = getNotes()
    let lastName = ''
    function addNum(name) {
      if(fileExist(notes, name)) {
        let newname = originalName+'('+(i+1)+')'
        i = i+1
        addNum(newname)
      }else {
        lastName = name
      }
    }
    let originalName = name
    let result = addNum(originalName)
    return lastName
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
              notes={this.state.notes}
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
