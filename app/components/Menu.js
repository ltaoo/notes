import React, { Component } from 'react'

import styles from './Menu.css'

export default class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles['menu']}>
        <button>新建</button>
      </div>
    )
  }
}