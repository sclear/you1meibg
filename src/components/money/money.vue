<template>
  <div class="money">
    <el-tabs v-model="activeName">
      <el-tab-pane label="案例" name="first"></el-tab-pane>
      <el-tab-pane label="添加功能" name="sec"></el-tab-pane>
      <el-tab-pane label="管理端口" name="three"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  
  </div>
</template>

<script>
import { addPort, getPort,addWeb } from "./../../utils/baseUrl.js";
import model from "./../common/model";
export default {
  watch:{
    activeName(val) {
      if(val === 'first'){
        this.$router.push('/money')
      } 
      if(val === 'sec'){
        this.$router.push('/money/addfn')
      }
      if(val === 'three'){
        this.$router.push('/money/gldk')
      }
    }
  },
  data() {
    return {
      activeName: "first",
      Dkname: "",   //添加端口名称
      //端口
      options: [
        // {
        //   value: "APP",
        //   label: "APP"
        // },
        // {
        //   value: "IOS",
        //   label: "IOS"
        // }
      ],
      value4: "APP",
      dk: "",
      //分类
      optionfl: [
        // {
        //   value: "m",
        //   label: "m"
        // },
        // {
        //   value: "m2",
        //   label: "m2"
        // }
      ],
      fl: "",
      flei:'',
      //模块
      optionmk: [
        {
          value: "mm1",
          label: "mm1"
        },
        {
          value: "mm2",
          label: "mm2"
        }
      ],
      mk: "",
      modus:'',

      model: false,
      nums: "", //点击索引
      list: [
        {
          date: "端口",
          name: ['11']
        }
      ]
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getPort().then(res => (this.options = res.data.data));
    },
    CLOSE(res) {
      this.nums = res;
      this.model = !this.model;
    },
    //添加 功能
    addAll() {
      //添加端口
      if (this.nums === 0) {
        if (this.Dkname) {
          addPort({ port_name: this.Dkname }).then(res => {
            if(res.status === 200){
              this.$DIY('添加端口成功')
            }
          });
        }
      }

      //添加分类
      if(this.nums === 1){
        if(this.dk && this.flei){
          // this.fl this.flei
          addWeb({
            web_type:this.flei,
            port_id:this.dk
          })
          .then(res=>console.log(res))
          this.$DIY('添加分类成功')
        }
      }

      //添加模块
      if(this.nums === 2){
        if(this.dk && this.fl && this.modus){
          this.$DIY('添加模块成功')
          console.log(this.dk)
          console.log(this.fl)
          console.log(this.modus)
        }
      }
    }
  },
  components: {
    model
  }
};
</script>

<style lang='less' scoped >
.money {
}

//modle
.w240 {
  width: 240px;
}
.Up {
  margin: 20px auto auto 150px;
}
.spanName {
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  width: 100px;
}
.spanLH {
  height: 42px;
}
.textarea {
  display: inline-block;
  height: 42px;
}
.mt10 {
  margin-top: 10px;
}

tr {
  border: 1px solid black;
}
</style>
