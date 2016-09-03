import React, { Component } from 'react'

//style
import styles from './Compile.css'
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
    //
    let html = this.compileMarkdown(this.props.html)
    return (
      <div 
        className={styles['compile']}
        dangerouslySetInnerHTML = {{__html: html}}
      ></div>
    )
  }
}