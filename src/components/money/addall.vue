<template>
  <div class="money">
    <div>
      <el-select @change="getDetail" size="mini" v-model="value4" clearable placeholder="选择端口">
        <el-option
          v-for="item in options"
          :key="item.port_id"
          :label="item.port_name"
          :value="item.port_id"
        ></el-option>
      </el-select>
      <el-button size="mini" @click="reoad()" type="primary">刷新</el-button>
      <el-button size="mini" @click="CLOSE(0)" type="primary">+添加端口</el-button>
      <el-button size="mini" @click="CLOSE(1)" type="primary">+添加分类</el-button>
      <el-button size="mini" @click="CLOSE(2)" type="primary">+添加模块</el-button>
    </div>
    <!-- table -->
    <el-table :data="list" stripe style="width: 100%;margin-top:20px;">
      <el-table-column prop="web_type" align='center' label="分类" width="130">
          <template slot-scope="scope">
              <div @click="changeflName(scope.row.web_id)" class="control">{{scope.row.web_type}}<i @click.stop="delfl(scope.row.web_id)" title="删除" class="el-icon-close"></i></div>
          </template>
      </el-table-column>
      <el-table-column prop="zi" label="模块" min-width="480">
          <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.zi" :key="index" @click='changeMk(item.level_id)' class="control">{{item.level_name}}<i @click.stop="delMk(item.level_id)" title="删除" class="el-icon-close"></i></div>
          </template>
      </el-table-column>
    </el-table>

    <!-- model -->
    <model @CLOSE="CLOSE" v-if="model" Ttxt="添加">
      <div slot="modelBody">
        <!-- 添加端口 -->
        <div v-if="nums === 0">
          <div>
            <span class="spanName">端口名称:</span>
            <el-input class="w240" size="small" v-model="Dkname" placeholder="请输入端口名称"></el-input>
          </div>
          <div>
            <span class="spanName mt10">选择端口图标:</span>
            <el-select class="w240" size="small" v-model="icon" clearable placeholder="选择端口">
              <el-option
                v-for="item in iconf"
                :key="item.port_img"
                :label="item.label"
                :value="item.port_img"
              ></el-option>
            </el-select>
          </div>
          <!-- <div>
            <span class="spanName mt10">端口图标:</span>
            <el-input class="w240" size="small" v-model="Dkname" placeholder="请输入端口图标"></el-input>
          </div>
          <div>
            <span class="spanName mt10">后台管理系统:</span>
            <div class="spanns"><span>&</span>#xe625;</div>
          </div>
          <div>
            <span class="spanName mt10">移动端:</span>
            <div class="spanns"><span>&</span>#xe63d;</div>
          </div>
          <div>
            <span class="spanName mt10">网站建设:</span>
            <div class="spanns"><span>&</span>#xe640;</div>
          </div>
          <div>
            <span class="spanName mt10">小程序:</span>
            <div class="spanns"><span>&</span>#xe619;</div>
          </div>
          <div>
            <span class="spanName mt10">公众号:</span>
            <div class="spanns"><span>&</span>#xe616;</div>
          </div>
          <div>
            <span class="spanName mt10">后台管理系统:</span>
            <div class="spanns"><span>&</span>#xe616;</div>
          </div> -->
        </div>
        <!-- 添加分类 -->
        <div v-if="nums === 1">
          <div>
            <span class="spanName">选择端口:</span>
            <el-select class="w240" size="small" v-model="dk" clearable placeholder="选择端口">
              <el-option
                v-for="item in options"
                :key="item.port_id"
                :label="item.port_name"
                :value="item.port_id"
              ></el-option>
            </el-select>
          </div>
          <div class="mt10">
            <span class="spanName">分类名称:</span>
            <el-input class="w240" size="small" v-model="flei" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!-- 添加模块 -->
        <div v-if="nums === 2">
          <div>
            <span class="spanName">选择端口:</span>
            <el-select @change="liandong" class="w240" size="small" v-model="dk" clearable placeholder="选择端口">
              <el-option
                v-for="item in options"
                :key="item.port_id"
                :label="item.port_name"
                :value="item.port_id"
              ></el-option>
            </el-select>
          </div>
          <div class="mt10">
            <span class="spanName">选择分类:</span>
            <el-select class="w240" size="small" v-model="fl" clearable placeholder="选择模块">
              <el-option
                v-for="item in optionfl"
                :key="item.web_id"
                :label="item.web_type"
                :value="item.web_id"
              ></el-option>
            </el-select>
          </div>
          <div class="mt10">
            <span class="spanName">模块名称:</span>
            <el-input class="w240" size="small" v-model="modus" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!-- 配置分类 -->
        <div v-if="nums === 4">
          <span class="spanName">修改分类名称:</span>
          <el-input class="w240" size="small" v-model="changeFlnames" placeholder="请输入分类名称"></el-input>
        </div>
        <div v-if="nums === 5">
          <div>
              <span class="spanName">修改模块名称:</span>
              <el-input class="w240" size="small" v-model="Mkname" placeholder="请输入模块名称"></el-input>
              <el-button @click="upMkname" size="small" type="primary">提交</el-button>
          </div>
          <span class="spanName mt10">已绑定功能:</span>
          <div class="continear">
              <div v-for="(item,index) in getChose" :key="index" class="getchose">{{item.function_name}}</div>
          </div>
          <div @click="choses(index)" :class="item.chose?'chose':''" v-for="(item,index) in fnlist" :key="index" class="chosefn">{{item.function_name}}</div>
        </div>

        <el-button @click="addAll" class="Up" size="small" type="primary">提交</el-button>
      </div>
    </model>
  </div>
</template>

<script>
import { addPort, getPort,addWeb,getPowe,addLevel,getFun,getPwl,getLevelFun,addFun,delLevel,delWeb,upWeb,upLevel } from "./../../utils/baseUrl.js";
import model from "./../common/model";
export default {
  data() {
    return {
      activeName: "first",
      Dkname: "",   //添加端口名称
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
      icon:'',
      //端口
      options: [
        {
          value: "APP",
          label: "APP"
        },
        {
          value: "IOS",
          label: "IOS"
        }
      ],
      value4: '',
      dk: "",
      //分类
      optionfl: [],
      fl: "",
      flei:'',
      //模块
      modus:'',

      model: false, //model状态
      nums: "",     //点击索引
      list: [],     //表单数据
      fnlist:[],    //功能数据
      bindFn:'',    //绑定/修改功能时 修改分类名 模块ID
      changeFlnames:'', //修改分类名
      Mkname:'',      //model修改模块时  模块name
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
        getPort().then(res => (this.options = res.data.data));
        getFun().then(res=>{
            let obj = res.data.data
            for(let i = 0;i < obj.length;i++){
                obj[i].chose = false;
            }
            this.fnlist = obj
        })
    },
    CLOSE(res) {
      this.dk = ''
      this.nums = res;
      this.model = !this.model;
      for(let i = 0;i < this.fnlist.length;i++){
        this.$set(this.fnlist[i],'chose',false)
      }
    },
    //刷新
    reoad() {
      if(!this.value4) return
      this.getInfo()
      getPwl({port_id:this.value4})
        .then(res=>{
          if(res.status = 200){
            this.list = res.data.data;
          }
        })
    },
    //拉去table数据
    getDetail() {
        if(!this.value4){
          return
        }
        getPwl({port_id:this.value4})
        .then(res=>{
          if(res.status = 200){
            this.list = res.data.data;
          }
        })
    },
    //添加 功能
    addAll() {
      //添加端口
      if (this.nums === 0) {
        if (this.Dkname) {
          addPort({ port_name: this.Dkname,port_img:this.icon }).then(res => {
            if(res.status === 200){
              this.$DIY('添加端口成功');
              this.CLOSE();
            }
          });
        }
      }

      //添加分类
      if(this.nums === 1){
        if(this.dk && this.flei){
          addWeb({
            web_type:this.flei,
            port_id:this.dk
          })
          .then(res=>{
            this.CLOSE();
            this.$DIY('添加分类成功');
          })
          
        }
      }

      //添加模块
      if(this.nums === 2){
        if(this.dk && this.fl && this.modus){
          addLevel({
              web_id:this.fl,
              level_name:this.modus
          })
          .then(res=>{
            this.CLOSE();
            this.$DIY('添加模块成功')
          })
        }
      }



      //修改分类名称
      if(this.nums === 4){
        console.log(this.changeFlnames)
        console.log(this.bindFn)
        upWeb({
          web_id:this.bindFn,
          web_type:this.changeFlnames
        })
        .then(res=>{
          this.CLOSE()
        })
      }

      //给模块绑定功能
      if(this.nums === 5){
        // addFun()
        let arr = [];
        for(let i = 0;i < this.getChose.length;i++) {
          arr.push(this.getChose[i].id)
        }
        if(arr.length === 0){
          this.$DIY('模块至少拥有一个功能');
          return
        }
        addFun({
          level_id:this.bindFn,
          data:JSON.stringify(arr)
        })
        .then(res=>{
          if(res.status === 200){
            this.$DIY('绑定成功');
            this.CLOSE()
          }
        })
      }
    },
    //删除模块
    delMk(res) {
      delLevel({level_id:res})
      .then(res=>{
        console.log(res)
      })
    },
    //删除分类
    delfl(res) {
      delWeb({web_id:res})
      .then(req=>{
        console.log(req)
      })
    },
    //model联动分类
    liandong() {
        getPowe({port_id:this.dk})
        .then(res=>{
            this.optionfl = res.data.data
        })
    },
    //修改分类名称
    changeflName(res) {
        this.CLOSE(4)
        this.bindFn = res;
    },
    //修改模块绑定功能
    changeMk(res) {
        this.bindFn = res;
        this.CLOSE(5);
        //获取以绑定功能
        getLevelFun({level_id:res})
        .then(res=>{
          for(let i = 0;i < this.fnlist.length;i++){
            if(res.data.data.indexOf(this.fnlist[i].id) != -1){
              this.$set(this.fnlist[i],'chose',true)
            }
          }
        })
    },
    //修改模块名称
    upMkname() {
      upLevel({
        level_id:this.bindFn,
        level_name:this.Mkname
      })
      .then(res=>{
        console.log(res)
      })
    },
    //为模块绑定功能
    choses(res) {
        this.fnlist[res].chose = !this.fnlist[res].chose;
    }
  },
  components: {
    model
  },
  computed:{ 
      getChose() {
          return this.fnlist.filter(val=>{
              return val.chose === true
          })
      }
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
  margin: 50px auto auto 150px;
}
.spanName {
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  width: 100px;
  color:rgb(37, 36, 36);
}
.spanns{
  width: 100px;
  display: inline-block !important;
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


.control{
    margin-right: 5px;
    padding:4px 6px 4px 13px;
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
        }
    }
}

//选中功能
.continear{
    width:100%;
    height:100px;
    overflow: auto;
    margin-top: 30px 0 30px 0 !important;
    outline: 1px solid rgba(137, 43, 226, 0.199);
    box-sizing: border-box;
    padding:5px;
}
.chosefn{
    margin-top: 5px;
    margin-right: 5px;
    padding:8px 13px 8px 13px;
    background:#ecf5ff;
    float: left;
    border-radius: 5px;
    color:#409eff;
    border:1px solid rgba(177, 172, 172, 0.315);
    cursor: pointer;
    font-size: 12px;
}
.chose{
    background: #F56C6C;
    color:white;
}
//选中  getchose
.getchose{
    margin-top: 5px;
    margin-right: 5px;
    padding:5px 10px;
    background:#ecf5ff;
    float: left;
    border-radius: 5px;
    color:#409eff;
    border:1px solid rgba(177, 172, 172, 0.315);
    cursor: pointer;
    font-size: 12px;
}
</style>
