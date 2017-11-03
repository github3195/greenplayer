<!-- PieChart.vue 饼状图表 -->
<style></style>

<template>
  <div class="">
    <canvas class="view _fullimg"></canvas>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      options: ''
    },
    mounted () {
      this.progress(this.options)
    },
    methods: {
      progress (options) {
        let opt = {
          container: this.$el.querySelector('.view'),
          rate: options.rate || 0,
          number: options.number || 0,
          bgColor: options.bgColor || '#ddd',
          borderColor: options.borderColor || '#32b847',
          fontColor: options.fontColor || '#32b847',
          text: options.text || '数量'
        }
        let ctx = opt.container.getContext('2d')
        let cWidth = opt.container.width = 150
        let cHeight = opt.container.height = 150
        // 清空画布
        ctx.clearRect(0, 0, cWidth, cHeight)
        // 绘制背景圆
        ctx.beginPath()
        ctx.moveTo(cWidth / 2, cHeight / 2)
        ctx.arc(cWidth / 2, cHeight / 2, cWidth / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = opt.bgColor
        ctx.fill()
        ctx.beginPath()   // 绘制白底圆
        ctx.moveTo(cWidth / 2, cHeight / 2)
        ctx.arc(cWidth / 2, cHeight / 2, cWidth / 2 - 10, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.beginPath()   // 绘制灰底圆
        ctx.moveTo(cWidth / 2, cHeight / 2)
        ctx.arc(cWidth / 2, cHeight / 2, cWidth / 2 - 18, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = opt.bgColor
        ctx.fill()
        ctx.font = '24px Arial'   // 设置字体并写字
        ctx.fillStyle = '#282828'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.moveTo(cWidth / 2, cHeight / 2)
        ctx.fillText(`${opt.number}`, cWidth / 2, cHeight / 2 - 15)
        ctx.fillText(`${opt.text}`, cWidth / 2, cHeight / 2 + 15)
        ctx.lineWidth = 7   // 线宽
        ctx.lineCap = 'round'   // 线型
        ctx.strokeStyle = opt.borderColor  // 线色
        function draw (cur) {
          ctx.beginPath()   // 绘制比率线
          ctx.arc(cWidth / 2, cHeight / 2, cHeight / 2 - 6, -Math.PI / 2, Math.PI * 2 * cur - Math.PI / 2)
          ctx.stroke()
        }
        let timer = null
        let n = 0
        ;(function (data) {
          timer = window.setInterval(function () {
            if (n > data) {
              window.clearInterval(timer)
            } else {
              draw(n)
              n += 0.005
            }
          }, 10)
        }(opt.rate / 100))
      }
    }
  }
</script>
