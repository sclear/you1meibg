<template>
  <div class="money">
    <div>
        <el-input v-model="serch" class='w240' size="small" placeholder="模糊搜索功能名称"></el-input>
      <el-button size="mini" @click="addss(3)" type="primary">+功能点</el-button>
    </div>
    <div class="fns">
        <div @click="modify(index)" v-for="(item,index) in serchs" :key="index" title="修改" class="control">{{item.function_name}}<i @click.stop="del(item.id)" title="删除" class="el-icon-close"></i></div>
    </div>

    <!-- model -->
    <model @CLOSE="CLOSE" v-if="model" Ttxt="添加">
      <div slot="modelBody">
        <!-- 添加功能 -->
        <div>
          <div class="mt10">
            <span class="spanName">功能名称:</span>
            <el-input class="w240" size="small" v-model="tabModel.function_name" placeholder="请输入功能名称"></el-input>
          </div>
          <div class="mt10">
            <span class="spanName">展示价格范围:</span>
            <el-input class="w240" size="small" v-model="tabModel.scope" placeholder="请输入价格范围"></el-input>
          </div>
          <div class="mt10">
            <span class="spanName">价格:</span>
            <el-input class="w240" size="small" v-model="tabModel.money" placeholder="请输入价格"></el-input>
          </div>
          <div class="mt10">
            <span class="spanName spanLH">功能简介:</span>
            <textarea v-model="tabModel.introduce" class="w240 textarea"></textarea>
          </div>
        </div>
        <el-button @click="addAll" class="Up" size="small" type="primary">提交</el-button>
      </div>
    </model>
  </div>
</template>

<script>
import { addFunction,getFun,delFunction,upFunction } from "./../../utils/baseUrl.js";
import model from "./../common/model";
export default {
  data() {
    return {
      model: false,
      function_name:'',
      scope:'',
      money:'',
      introduce:'',
      list:[],
      tabModel:{},
      add:false,
      serch:''
    };
  },
  mounted() {
    this.getInfo();
  },
  computed: {
      serchs() {
          if(!this.list.length) return 
          return this.list.filter(val=>{
              return val.function_name.indexOf(this.serch) != -1
          } )
      }
  },
  methods: {
    //拉取加载数据
    getInfo() {
        getFun()
        .then(res=>{
            if(res.status === 200){
                console.log(res)
                this.list = res.data.data;
            }
        })
    },
    //CLOSE
    CLOSE() {
      this.model = !this.model;
    },
    //删除单个功能
    del(res) {
        delFunction({id:res})
        .then(res=>{
            if(res.status === 200){
                this.$DIY('删除成功')
                this.getInfo()
            }
        })
    },
    //添加开启model
    addss() {
        this.CLOSE();
        this.tabModel={};
        this.add = true;
    },
    //添加单个功能
    addAll() {
        if(this.add && this.tabModel.function_name && this.tabModel.scope && this.tabModel.money && this.tabModel.introduce){
            this.tabModel.money = Number(this.tabModel.money)
            addFunction({data:JSON.stringify(this.tabModel)})
            .then(res=>{
                if(res.status === 200){ 
                    this.$DIY('添加功能成功');
                    this.CLOSE();
                    this.getInfo()
                 }
            })
        }
        else{
            this.tabModel.money = Number(this.tabModel.money);
            upFunction({
                id:this.tabModel.id,
                data:JSON.stringify(this.tabModel)
                })
            .then(res=>{
                if(res.data.code === 200){
                    this.$DIY('修改成功');
                    this.CLOSE();
                    this.getInfo();
                }
            })
        }
    },
    //修改功能
    modify(res) {
        this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
        this.CLOSE();
        this.add = false;
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
  color:rgb(37, 36, 36);
}
.spanLH {
//   height: 42px;
    float: left;
}
.textarea {
  display: inline-block;
  height: 42px;
  border:1px solid #dcdfe6;
  resize: none;
  padding:3px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left:5px;
}
.mt10 {
  margin-top: 10px;
}

tr {
  border: 1px solid black;
}
.fns{
    overflow: hidden;
    height:100%;
    width:100%;
    margin-top: 15px;
}
.control{
    margin:5px;
    padding:8px 6px 8px 13px;
    background:#ecf5ff;
    float: left;
    border-radius: 5px;
    color:#409eff;
    border:1px solid rgba(177, 172, 172, 0.315);
    cursor: pointer;
    font-size: 12px;
    i{
        margin-left: 5px;
        &:hover{
            color:red;
            transform: scale(1.5)
            // font-size: 16px;
        }
    }
}
</style>
