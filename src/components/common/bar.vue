<template>
  <div class="bar" :class="menu?'':'_width'">
    <div class="LOGO">
      <!-- <span>YOUEMEI</span> -->
      <i @click="CLOSE" class="el-icon-tickets MENU" :class="menu?'':'left_15'"></i>
    </div>
    <div
      v-if="menu"
      v-for="(item,index) in ROUTESETTING"
      :key="index"
      :class="chose===index?'ChoseParent':''"
      class="bar_Parent"
    >
      <div v-for="(items,indexs) in item" :key="indexs">
        <div
          @click.stop="ChoseParent(index,item)"
          v-if="indexs === 0"
          class="bar_HSH"
          :class="chose===index?'choseBG':''"
        >
          <i :class="items[1]" class="left_icon"></i>
          <span>{{items[0]}}</span>
          <i
            v-if="item.length > 1"
            class="right_icon"
            :class="chose===index?'el-icon-minus color-white':'el-icon-plus '"
          ></i>
        </div>
        <div
          @click.stop="toRoute(items,indexs,index)"
          v-else-if="item.length > 1 && index===chose"
          class="bar_HSH animations"
        >
          <i
            class="el-icon-caret-right left_icon _left_Bar"
            :class="parBG===index && sonBG===indexs ?'sonBG':''"
          ></i>
          <span
            class="_left_txt"
            :class="parBG===index && sonBG===indexs ?'sonBG':''"
          >{{items[0]}}</span>
          <!-- >{{items[0]}}{{sonBG,parBG}}</span> -->
        </div>
      </div>
    </div>

    <div v-if="!menu" v-for="(item,index) in ROUTESETTING" :key="index" class="HOVER_bar">
      <div @click="ChoseParent(index,item)" :class="chose===index?'blueColor':''">
        <i :class="[item[0][1],chose===index?'blueColor':'']"></i>
      </div>
      <div class="hover_visible">
        <div v-for="(items,indexs) in item" :key="indexs">
          <div @click="ChoseParent(index,item)" v-if="indexs === 0">
            <div>{{items[0]}}</div>
          </div>
          <div v-else @click.stop="toRoute(items,indexs,index)">
            <div>{{items[0]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "bar",
  mounted() {
    // if (localStorage.getItem("setIn")) {
    //   this.Floading(JSON.parse(localStorage.getItem("setIn")));
    // }
  },
//   watch:{
//     '$route'(to,from,next){
//       if(to.path == '/page/cases'){
//         return
//       }
//     }
//   },
  data() {
    return {
      chose: "",
      parBG: "",
      sonBG: "",
      menu: false,
      ROUTESETTING:[
          [['客户管理','el-icon-star-on','/client']],
          [['案例','el-icon-document','/cases']],
          [['报价','el-icon-edit','/money']],
      ]
    };
  },
  methods: {
    // ...mapActions(["Floading"]),
    ChoseParent(res, req) {
      if (res === this.chose) {
      } else {
        this.chose = res;
      }
      if (req.length === 1) {
          this.$router.push(req[0][2])
      }
    },
    //为跳转路由做准备
    toRoute(res, num, par) {
      this.chose = par;
      this.parBG = par;
      this.sonBG = num;
      // console.log(res[1])
      this.$router.push(res[1])
    },
    //控制双菜单
    CLOSE() {
      this.menu = !this.menu;
    }
  },
  components: {},
  computed: {
    // ...mapGetters(["ROUTESETTING"])
  }
};
</script>

<style lang='less' scoped >
._width {
  width: 45px !important;
}
.left_15 {
  left: 11px !important;
}
@keyframes barVisible {
  0%{
    margin-left: -45px;
  }
  100%{
    margin-left: 0;
  }
}
.bar {
  width: 249px;
  height: 100%;
  // background: rgba(0, 0, 0, 0.753);
  background:#2b333e;
  animation: barVisible .3s linear forwards;
  transition: all 0.3s linear;
  .LOGO {
    height: 45px;
    width: 249px;
    color: #aeb7c2;
    line-height: 45px;
    position: relative;
    span {
      position: absolute;
      margin-left: 55px;
    }
    .MENU {
      font-size: 25px;
      color: #aeb7c2;
      left: 209px;
      top: 10px;
      position: absolute;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
  .bar_Parent {
    font-size: 14px;
    max-height: 39px;
    transition: all 0.3s linear;
    overflow: hidden;
    .bar_HSH {
      height: 39px;
      width: 100%;
      // width:249px;
      position: relative;
      color: #aeb7c2;
      cursor: pointer;
      z-index: 999;
      span {
        position: absolute;
        height: 39px;
        line-height: 39px;
        z-index: 10;
        left: 60px;
        color: #aeb7c2;
        // font-weight: bold;
      }
      ._left_txt {
        left: 70px;
        // font-weight: normal;
        color: #f3f3f4;
      }
      ._leftBar {
        position: absolute;
        height: 39px;
        line-height: 39px;
        z-index: 10;
        left: 80px;
        color: #f3f3f4;
        // font-weight: bold;
      }
      // &:hover {
      //     width: 249px;
      // }
      &:after {
        content: "";
        position: absolute;
        left: -100%;
        top: 0;
        height: 39px;
        width: 100%;
        z-index: 0;
        transition: all 0.1s linear;
        background:#252c35;
        // background: -webkit-linear-gradient(
        //   left,
        //   rgba(0, 0, 0, 0.603),
        //   rgba(212, 207, 207, 0.308)
        // );
      }
      &:hover:after {
        left: 0;
        position: absolute;
        // width:300px;
        // z-index: 30;
      }
      .left_icon {
        font-size: 16px;
        line-height: 39px;
        position: absolute;
        z-index: 20;
        left: 15px;
        // font-weight: bold;
      }
      ._left_Bar {
        left: 45px;
      }
      .right_icon {
        font-size: 10px;
        line-height: 39px;
        position: absolute;
        z-index: 20;
        left: 210px;
        font-weight: 1000;
        color: rgba(0, 0, 0, 0.603);
      }
    }
  }
  .HOVER_bar {
    width: 45px;
    height: 39px;
    line-height: 39px;
    color: #aeb7c2;
    font-size: 16px;
    text-align: center;
    position: relative;
    cursor: pointer;
    &:hover {
      background: #2c344f !important;
    }
    &:hover .hover_visible {
      display: block;
      animation: HOVER_menu 0.5s linear forwards;
    }
    .hover_visible {
      position: absolute;
      left: 45px;
      top: 0;
      width: 210px;
      height: auto;
      background: #2b333e;
      color: #aeb7c2;
      display: none;
      z-index: 999;
    }
  }
}

.ChoseParent {
  max-height: 240px !important;
}
.choseBG {
  background:#252c35;
  i,span{
    color:#409eff !important;
  }
  // background: -webkit-linear-gradient(
  //   left,
  //   rgba(0, 0, 0, 0.603),
  //   rgba(212, 207, 207, 0.308)
  // );
}
.sonBG {
  color: aqua !important;
}
.color-white {
  color: white !important;
}
.animations {
  opacity: 0;
  animation: animationsT 0.3s linear forwards;
}
@keyframes animationsT {
  0% {
    opacity: 0;
    margin-left: -20px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
  }
}
@keyframes HOVER_menu {
  0% {
    display: block;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.blueColor{
  color:#409eff !important;
  background:#2c344f !important;
}
</style>
