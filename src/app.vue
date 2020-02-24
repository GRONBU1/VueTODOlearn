<template>
  <div id="app">
    <div id="cover"></div>
    <APP_Header></APP_Header>
    <APP_Footer></APP_Footer>
    <APP_Todo></APP_Todo>
  </div>
</template>

<script>
// 引入header.vue组件
import APP_Header from './todo/header.vue'
import APP_Footer from './todo/footer.jsx'
import APP_Todo from './todo/todo.vue'

export default {
  // 声明组件，之后便可以使用组件标签
  components: {
    APP_Header,
    APP_Footer,
    APP_Todo
  }
}
</script>

<style>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #555;
  opacity: 0.5;
  z-index: -1;
}
</style>

