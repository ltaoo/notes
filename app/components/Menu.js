import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Menu.css'

import { isExist } from '../utils/utils'

class Menu extends Component {
  render() {
    return (
      <div className={styles['menu']}>
        <button
          className={styles['btn']}
          onClick={e=> this.handleClick(e)}
        >新增笔记</button>
      </div>
    )
  }

  handleClick(e) {
    const { dispatch, notes } = this.props
    // 这里应该要从 notes 中查询是否有同名笔记，如果有，就做处理
    let name = isExist(notes, '未命名')
    this.props.onAddClick(name, '')
  }
}


// 在这里计算显示的笔记
function select(state) {
  return {
    notes: state.note.notes
  }
}

export default connect(select)(Menu)