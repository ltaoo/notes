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
      value: ''
    }
    this.input.bind(this)
  }
  input(value) {
    // 输入事件
    this.setState({
      value: value
    })
  }
  render() {
    console.log(this.state.value)
    return (
      <div>
        <div className={styles.container}>
          <Menu />
          <div className={styles.aside}>
            <Note />
            <Todo />
          </div>
          <Edit 
            onChange = {this.input.bind(this)}
            value = {this.state.value}
          />
          <Compile
            html = {this.state.value}
          />
        </div>
      </div>
    );
  }
}
