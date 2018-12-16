<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  height:100%;
}
*{
  margin:0;
  padding:0;
}
#app{
  height:100%;
}
.el-table td, .el-table th{
  padding:5px 0 !important;
}
.el-table .cell{
  font-size: 12px;
}
</style>
