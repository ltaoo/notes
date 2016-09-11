import { expect } from 'chai'
import { isExist, inArray } from '../../app/utils/utils.js'

const notes = [
  {
    id: 1,
    title: '未命名'
  },{
    id: 2,
    title: '及物动词'
  }
]

const notes2 = [{title: 'hello', content: 'world'}]

describe('根据名称与id计算名称的测试', function () {
  it('应该返回 未命名', function () {
    expect(isExist(notes, '未命名', 1)).to.be.equal('未命名')
  })

  it('测试 inArray 函数', function () {
    expect(inArray(notes2, {title: 'hello'})).to.be.equal(true)
  })
})

