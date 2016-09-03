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
// file util
import { getNotes, addNote, updateNote, deleteNote } from '../utils/fileUtil.js'


export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log('Home component is loaded')
    let notes = getNotes()
    this.state = {
      notes: notes,
      value: '',
      currentNote: null,
      title: '',
      edit: false
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
      currentNote: '',
      title: '',
      edit: false
    })
  }
  saveFile() {
    // 将第一行作为文件名进行保存
    // 根据当前状态是新增还是修改
    if(this.state.edit) {
      //如果是编辑状态， 就修改文件，而不是根据文件名新增
      let oldName = this.state.currentNote
      let newName = this.state.title

      // 如果两个不一样，就是修改了笔记标题，等于是删除原笔记，新建一篇同样内容的笔记
      if(oldName === newName) {
        // 如果只是更新内容
        updateNote(oldName, this.state.value, (note)=> {
          console.log('更新笔记成功')
        })
      }else {
        // 删除原来的，再新建笔记
        deleteNote(oldName)
        let name = this.isExist(newName)
        addNote(name, this.state.value, (notes)=> {
          this.setState({
            notes: notes,
            edit: true,
            currentNote: name,
            title: name
          })
          alert('更新笔记成功')
        })
      }
    }else {
      //let name = this.getTitle(this.state.value)
      let name = this.state.title
      if(!name) {
        return
      }
      name = this.isExist(name)
      addNote(name, this.state.value, (notes)=> {
        this.setState({
          notes: notes,
          edit: true,
          currentNote: name,
          title: name
        })
        alert('新建笔记成功')
      })
    }

  }
  getTitle(content) {
    let strAry = content.split('\n')
    return name = strAry[0].split('#')[1].trim()
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
  inputTitle(event) {
    this.setState({
      title: event.target.value 
    })
  }
  showEdit() {
  }
  showNote(value, name) {
    this.setState({
      value: value,
      currentNote: name,
      title: name,
      edit: true
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
            <input 
              type="text" 
              className={styles['markdown-title']}
              placeholder={'请输入标题'}
              value = {this.state.title}
              onChange = {this.inputTitle.bind(this)}
            />
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
