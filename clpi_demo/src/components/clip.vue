<template>
  <canvas
    id="myCanvas"
    :width="clipWidth"
    :height="clipHeight"
    :style="'width:' + clipWidth + 'px;height:' + clipHeight + 'px;border:1px solid black'"
    @mousedown="mousedown"
    @mouseup="mouseup"
  ></canvas>
</template>

<script>
export default {
  components: {},
  props: ['file', 'clipWidth', 'clipHeight'],
  data() {
    return {
      width: 'auto',
      height: 'auto',
      minWidth: 0,
      minHeight: 0,
      src: '',
      imgDom: {},
      canvas: {},
      canvasDom: {},
      move: false,
      dx: 0,
      dy: 0,
      client: { oldX: 0, oldY: 0, newX: 0, newY: 0 }
    }
  },
  watch: {
    file(file) {
      this.clean()
      this.initImg(file)
    }
  },
  mounted() {
    this.canvasInit()
  },
  methods: {
    canvasInit() {
      this.canvasDom = document.getElementById('myCanvas')
      this.canvas = this.canvasDom.getContext('2d')
      this.canvasDom.addEventListener('mousewheel', this.onScroll, false)
      this.canvasDom.addEventListener('DOMMouseScroll', this.onScroll, false)
      this.canvasDom.addEventListener('mousemove', this.mousemove, false)
      this.initImg(this.file)
    },
    initImg(file) {
      // 创建图片
      this.imgDom = new Image()
      const fileread = new FileReader()
      // 读取blob或者src
      fileread.onload = e => {
        this.imgDom.src = this.src = e.target.result
      }
      if (typeof file === 'string') {
        this.imgDom.src = this.src = file
      } else if (file instanceof Blob) {
        fileread.readAsDataURL(file)
      }
      // canvas渲染图片
      this.imgDom.onload = () => {
        this.imgAuto(true)
        this.canvas.drawImage(this.imgDom, 0, 0, this.width, this.height)
      }
    },
    imgAuto(init) {
      if (init) {
        // 初始大小的设置
        const hw = this.imgDom.height / this.imgDom.width
        if (this.imgDom.height > this.imgDom.width) {
          this.minWidth = this.clipWidth
          this.minHeight = hw * this.clipWidth
        } else {
          this.minWidth = this.clipWidth / hw
          this.minHeight = this.clipHeight
        }
        this.width = this.minWidth
        this.height = this.minHeight
      } else {
        // 最小缩放的设置
        !(this.width < this.minWidth) || (this.width = this.minWidth)
        !(this.height < this.minHeight) || (this.height = this.minHeight)
      }
    },
    rectifyImg(mutch) {
      this.clean()
      this.height += mutch
      this.width += mutch
      this.imgAuto()
      // 拖拽的设置，不准拖拽出现空隙，强制可拖拽范围
      if (this.dx > 0) {
        this.dx = 0
      }
      if (this.dx < -(this.width - this.clipWidth)) {
        this.dx = -(this.width - this.clipWidth)
      }
      if (this.dy > 0) {
        this.dy = 0
      }
      if (this.dy < -(this.height - this.clipHeight)) {
        this.dy = -(this.height - this.clipHeight)
      }
      this.canvas.drawImage(this.imgDom, this.dx, this.dy, this.width, this.height)
    },
    clean() {
      // 清除画布
      this.canvasDom.height = this.canvasDom.height + ''
    },
    onScroll(evevt) {
      // 滚轮事件设置大小
      event.stopPropagation()
      event.preventDefault()
      this.rectifyImg(-evevt.deltaY / 10)
    },
    mousemove(event) {
      // 按下鼠标后移动并记录移动的最后位置
      if (!this.move) return
      this.client.newX = event.clientX
      this.client.newY = event.clientY
    },
    mouseup() {
      // 鼠标抬起，计算移动距离并调整图片位置
      if (!this.move) return
      this.dy = this.dy + this.client.newY - this.client.oldY
      this.dx = this.dx + this.client.newX - this.client.oldX
      this.rectifyImg(0, this.client.newY - this.client.oldY)
      this.move = false
    },
    bs64toBlob(bs64Data, contentType, sliceSize) {
      // base64位转blob
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = window.atob(bs64Data) // WindowOrWorkerGlobalScope.atob() 对用base-64编码过的字符串进行解码，基本兼容所有浏览器
      var byteArrays = []

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        var byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }
      var blob = new Blob(byteArrays, { type: contentType })
      return blob
    },
    mousedown(event) {
      // 鼠标按下记录起始位置
      this.client.oldX = event.clientX
      this.client.oldY = event.clientY
      this.move = true
    },
    createPng() {
      // 返回图片blob格式以及base64位格式
      const result = {}
      result.base = this.canvasDom.toDataURL('image/png')
      result.blob = this.bs64toBlob(result.base.replace('data:image/png;base64,', ''), 'png')
      this.$emit('input', result)
      return result
    }
  }
}
</script>

<style></style>
