<script lang="tsx">
import { defineComponent, ref, reactive, watch, onMounted, withModifiers } from 'vue'
import logo from '@/assets/logo.png' // 图片
import child from './child.vue' // 子组件（用于验证slot）
export default defineComponent({
  components: { child },
  // 定义props
  props: {
    msg: {
      type: String,
      default: () => '我是消息msg'
    }
  },
  // 定义emits
  emits: ['myEmit'],
  // setup 函数默认接收两个参数：1，props；2，ctx上下文，其中包含 slots、attrs、emit 等
  setup(props, { slots, attrs, emit }) {
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ props
    console.log('props', props.msg)
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ emits
    setTimeout(() => {
      emit('myEmit', '100')
    }, 2000)
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ data
    const name = ref('jsx')
    const divRef = ref(null) // ref的dom对象
    const list = reactive([1, 2, 3]) // 列表数据
    // 用于v-loading
    const loading = ref(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)
    // 用于slots
    const mySlots = {
      default: () => <div>默认slot-default-1</div>,
      bar: () => <span>具名slot-bar-1</span>
    }
    // 用于分页器
    const pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 100
    })
    // 用于v-show、v-if
    const visible = ref(true)
    setInterval(() => {
      visible.value = !visible.value
    }, 1000)
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ methods
    function click(e, param) {
      console.log('click', e.target, param)
    }
    function setName(param, e) {
      name.value = param
      console.log('setName', param, e.target)
    }
    function keyUp(e) {
      console.log('keyUp', e.key)
    }
    function handleCurrentChange(param) {
      console.log('handleCurrentChange', param)
    }
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ watch
    watch(name, (newVal, oldVal) => {
      console.log('watch', newVal, oldVal)
    })
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ 生命周期
    onMounted(() => {
      console.log('divRef', divRef.value)
    })
    // ◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎◀︎▶︎ jsx
    return () => (
      // <>代表fragment空节点，适用于不存在根节点的情况
      <>
        {
          // -----------------------------------------------------------------------图片
        }
        <img src={logo} alt="" />
        {
          // -----------------------------------------------------------------------样式
        }
        {/*class、className都能用*/}
        <div ref={divRef} class="a">
          定义class
        </div>
        {/*style的写法，有两种*/}
        <div style="color: green" style={{ background: 'pink' }}>
          定义style
        </div>
        {
          // -----------------------------------------------------------------------自定义属性
        }
        <div data-index={name.value}>自定义属性</div>
        {
          // -----------------------------------------------------------------------事件（自定义参数、事件修饰符）
        }
        <div onClick={click}>{name.value}，测试click事件</div>
        {/*通过withModifiers来添加事件修饰符（self、stop等）*/}
        <div onClick={withModifiers(click, ['stop'])}>{name.value}，测试事件修饰符</div>
        {/*加自定义参数，写法一*/}
        <div onClick={(e) => click(e, '自定义参数')}>{name.value}，测试事件的自定义参数</div>
        {
          // 加自定义参数，写法二
          // bind方法的第一个参数也可以用this
        }
        <div onClick={setName.bind(null, '自定义参数')}>{name.value}，测试事件的自定义参数（通过bind）</div>
        {/*等同于<input onKeyup={withModifiers(keyUp, ["enter"])}></input>*/}
        <input
          onKeyup={(e) => {
            // 键盘事件enter事件
            if (e.key === 'Enter') {
              keyUp(e)
            }
          }}
        ></input>
        {/*在element-plus组件中使用*/}
        <el-pagination
          v-model:current-page={pagination.currentPage}
          v-model:page-size={pagination.pageSize}
          total={pagination.total}
          page-sizes={[10, 20, 30, 40]}
          layout="total, sizes, prev, pager, next, jumper"
          onCurrentChange={handleCurrentChange}
        />
        {
          // -----------------------------------------------------------------------slot
        }
        {
          // --------------------------------获取父组件传递过来的slot
        }
        <h3>{slots.default ? slots.default() : 'WEB前端'}</h3>
        <h3>{slots.foo?.()}</h3>
        {
          // --------------------------------设置子组件的slot
        }
        {/*slot，写法一*/}
        <child v-slots={mySlots}></child>
        {/*slot，写法二*/}
        <child
          v-slots={{
            bar: () => <span>具名slot-bar-2</span>
          }}
        >
          <div>默认slot-default-2</div>
        </child>
        {/*slot，写法三*/}
        <child>
          {{
            default: () => <div>默认slot-default-3</div>,
            bar: () => <span>具名slot-bar-3</span>
          }}
        </child>
        {
          // -----------------------------------------------------------------------指令（v-test、v-html、v-show、v-if/v-else、v-for、v-model、指令修饰符）
        }
        {/*等同于<div>{name.value}</div>*/}
        <div v-text={name.value}></div>
        <div v-html={`<h1>${name.value}</h1>`}></div>
        <div v-show={visible.value}>{name.value}1</div>
        {/*v-if、v-else*/}
        {visible.value && <div>{name.value}2</div>}
        {visible.value || <div>{name.value}3</div>}
        {visible.value ? <div>显示4</div> : <div>不显示4</div>}
        {/*v-for*/}
        {list.map((item) => (
          <div key={item}>值为：{item}</div>
        ))}
        <el-input v-model={name.value} placeholder="Please input" />
        {/*v-xxx指令的修饰符（modifiers）用下划线_连接*/}
        <el-button type="primary" v-loading_fullscreen_lock={loading.value}>
          Loading
        </el-button>
      </>
    )
  }
})
</script>

<style lang="scss" src="./JsxComp.scss" scoped></style>
