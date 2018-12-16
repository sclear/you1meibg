<template>
  <div class="page">
      <bar class="bars"></bar>
      <router-view class="roots"></router-view>
  </div>
</template>

<script>
import bar from './bar'
export default {
  data() {
    return {

    }
  },
  components: {
      bar
  }
}
</script>

<style lang='less' scoped >
.page{
    height:100%;
    .bars{
        float: left;
    }
    .roots{
        overflow: hidden;
        padding:15px;
        height:100%;
        box-sizing:border-box;
        position: relative;
    }
}
</style>
