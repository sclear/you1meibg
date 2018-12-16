<template>
  <div class="gldk">
    
    <div v-if="!list.length" class="noneMsg">暂无数据</div>
    <div v-for="(it,indexs) in list" :key="indexs">
      <el-input size="small" v-model="it.port_name" class="w240" placeholder="端口"></el-input>
      <el-select class="w240" size="small" v-model="it.port_img" clearable placeholder="选择端口图标">
        <el-option
          v-for="item in iconf"
          :key="item.port_img"
          :label="item.label"
          :value="item.port_img"
        ></el-option>
      </el-select>
      <el-button @click="setDk(indexs)" size="small" type="primary">更新</el-button>
      <el-button @click="del(indexs)" size="small" type="danger">删除</el-button>
    </div>
  </div>
</template>

<script>
import { getPort, upPort, delPort } from "./../../utils/baseUrl.js";
export default {
  data() {
    return {
      input: "1",
      iconf: [
        {
          port_img: "\ue63d",
          label: "IOS"
        },
        {
          port_img: "\ue64d",
          label: "Android"
        },
        {
          port_img: "\ue625",
          label: "后台管理系统"
        },
        {
          port_img: "\ue640",
          label: "网站建设"
        },
        {
          port_img: "\ue619",
          label: "小程序"
        },
        {
          port_img: "\ue615",
          label: "公众号"
        }
      ],
      icon: "",
      list: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getPort().then(res => {
        console.log(res);
        if (res.status === 200) {
          this.list = res.data.data;
        }
      });
    },
    //更新端口
    setDk(res) {
      console.log(res);
      console.log(this.list[res]);
      upPort(this.list[res]).then(res => {
        if (res.status === 200) {
          this.$DIY("更新端口成功");
        }
      });
    },
    del(res) {
      this.$confirm("此操作将永久删除该端口, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delPort({ port_id: this.list[res].port_id }).then(res => {
            if (res.status === 200) {
              this.getInfo();
              this.$DIY("删除成功");
            }
          });
        })
        .catch(() => {});
    }
  },
  components: {}
};
</script>

<style lang='less' scoped >
.w240 {
  width: 240px;
}
.gldk {
  box-sizing: border-box;
  padding-top: 20px;
  div {
    margin: 5px 0;
  }
  .noneMsg{
      color:#ccc;
      font-size: 14px;
      text-align:center;
  }
}
</style>
