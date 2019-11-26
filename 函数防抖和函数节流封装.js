// 函数节流对象
const timeout = 0.3 * 1000
function Throttle(config) {
  this.flag = true
  this.config = config
}
Throttle.prototype.send = function(data, vm) {
  if (this.flag === true) {
    this.flag = false
    setTimeout(() => {
      this.flag = true
    }, timeout)
    return vm.$axios({
      ...this.config,
      data
    })
  } else {
    console.log('请勿频繁操作————函数节流')
  }
}
//函数防抖对象
function Quivered(config) {
  this.config = config
  this.timeout = null
}
Quivered.prototype.send = function(data, vm) {
  const that = this
  clearTimeout(this.timeout)
  return new Promise(function(resolve, reject) {
    that.timeout = setTimeout(function() {
      vm.$axios({
        ...that.config,
        data
      }).then((response) => {
        resolve(response)
      })
    }, 2000)
  })
}
//向外导出的
export const env = (() => {
  return new Quivered({ method: 'post', url: '/index/env' })
})()
//引入然后调用方式
env.send({},this).then((response) => {
      if (response.data.code === 200) {
        this.env = response.data.data
      }
    })
