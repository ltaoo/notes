import React, { Component } from 'react'

//style
import styles from './Compile.css'
import 'github-markdown-css'
// api
import marked from 'marked'

export default class Compile extends Component {
  constructor(props) {
    super(props)
  }

  compileMarkdown(string) {
    return marked(string)
  }

  render() {
    let style
    if(this.props.edit) {
      // 如果是编辑状态
      style = styles['compile-half']
    }else {
      style = styles['compile-all']
    }
    let html = this.compileMarkdown(this.props.html)
    return (
      <div 
        className={style}
      >
        <div
          className={styles['compile-inner'] + ' markdown-body'}
          dangerouslySetInnerHTML = {{__html: html}}
        ></div>
      </div>
    )
  }
}