<script lang="tsx">
// import { defineComponent, ref, reactive, watch, onMounted, withModifiers } from 'vue'
import { defineComponent } from 'vue'
import logo from '@/assets/logo.png' // 图片
import child from './child.vue' // 子组件（用于验证slot）

export default defineComponent({
  name: 'Jsx',
  // 定义props、emits
  props: {
    msg: {
      type: String,
      default: () => '我是消息msg'
    }
  },
  emits: ['myEmit'],
  setup() {
    // return () => (
    //   <>
    //     <div>jsx</div>
    //   </>
    // )
    return () => h('p', null, [h('span', null, 'VNode by h函数')])
  },
  render(props, { slots, attrs, emit }) {
    console.log(props)
    // return (
    //   <>
    //     <div>我是一个div</div>
    //     <img src={logo} alt="" />
    //   </>
    // )
    // return h('p', null, [
    //   h('span', null, 'Message can be '),
    //   h('i', { style: 'color: teal' }, 'VNode'),
    // ])
  }
})
</script>

<style lang="scss" src="./JsxComp.scss" scoped></style>
