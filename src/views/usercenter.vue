<template>
  <div class="user">
    <index-header ></index-header>
    <div class="user__content">
      <div class="user__wrap clearfix">
        <div class="navigation">
          <commonleft @symbolchange="symbolchange"></commonleft>
          <fixed v-if="conteact"></fixed>
        </div>
        <div class="warmpright">
          <router-view @updateUsename="upName()" :symbolname="symbols" :changeurl="changeurl"></router-view>
        </div>
      </div>
        
    </div>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '../components/newheader.vue'
import commonleft from '../components/commonleft.vue'
import fixed from '../components/fixedright.vue'
import indexFooter from '../components/hellofoot'
import { ajax,getcookie } from '../assets/js/common'
export default {
  data(){
    return{
      userName:getcookie('username'),
      islogin:'',//登录状态为1.未登录为0,
      quiter:0,
      conteact:false,
      symbols:'',
      changeurl:false,
    }
  },
  components: {
     indexHeader,
     commonleft,
     indexFooter,
     fixed
  },
  mounted:function(){
    this.$nextTick(function(){
      var Swidth=document.body.clientWidth;
      if(Swidth>1500){
        this.conteact=true;
      }else{
        this.conteact=false;
      }
    })
     
  },
  methods:{
    upName(){
      this.userName=getcookie('username');
    },
    symbolchange(val){
      this.symbols=val;
      this.changeurl=!this.changeurl;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .user{
    background: #f3f3f3;
  }
  .el-icon-close:hover{
    color: #c81118;
  }
  .user__content{
    background-color: #f3f3f3;
    padding-top: 120px;
  }
  .user__wrap{
    width: 1210px;
    margin: 0 auto;
  }
  .navigation{
    width: 210px;
    float: left;
    margin-bottom: 40px;
    background: #fff;
  }
  .warmpright{
    width: 974px;
    height: 100%;
    float: right;
    background-color: #ffffff;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }
  .el-button--primary{
    background: #c81118!important;
    border-color: #c81118!important;
  }
  .el-input__inner:focus{
    border:1px solid #c81118;
  }
  .el-message-box__title{
    color: #666;
  }
 .navigation .fixed{
    /*margin-left: 1300px;
    top: 30%;*/
  }
</style>
