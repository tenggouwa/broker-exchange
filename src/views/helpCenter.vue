<template>
  <div class="help-box">
    <index-header ></index-header>
    <div class="content clearfix">
      <div class="banner-box">
        <h3>{{title}}</h3>
        <h5>{{titleEnglish}}</h5>
      </div>
      <div class="middle-box">
        <ul class="left-nav">
          <!-- <li >
              <router-link to='/help/notice'>
               <a href=""  :class="{'active':isactive==1}">平台公告</a>
             </router-link>
          </li> -->
          <li >
              <router-link to='/help/newhelp'>
               <a href=""  :class="{'active':isactive==7}">新手帮助</a>
             </router-link>
          </li>
         <!--  <li>
             <router-link  to='/help/commonProblem' >
               <a href="" :class="{'active':isactive==2}">常见问题</a>
             </router-link>
          </li> -->
          <li>
            <router-link to='/help/coinIntroduce' >
             <a href="" :class="{'active':isactive==3}">币种介绍</a>
           </router-link>
          </li>
         <!--  <li>
            <router-link to='/help/rateDescript' >
             <a href="" :class="{'active':isactive==4}">费率说明</a>
           </router-link>
          </li> -->
          <!-- <li>
            <router-link to='/help/feedback'>
              <a href="" :class="{'active':isactive==5}">问题反馈</a>
            </router-link>
          </li> -->
          <!-- <li>
            <router-link to='/help/risk'>
              <a href="" :class="{'active':isactive==6}">风险提示</a>
            </router-link>
          </li> -->
          <!-- <li>
             <router-link to='/help/contactUs' :class="{'active':isactive==6}">
               <a href="">联系我们</a>
             </router-link>
          </li> -->
        </ul>
        <div class="right-part">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <index-footer></index-footer>
  </div>
</template>

<script type="text/javascript">
import indexHeader from '../components/newheader.vue'
import indexFooter from '../components/hellofoot.vue'
import { ajax,getcookie } from '../assets/js/common'
export default{
  data(){
    return{
      isactive:1,
      title:"平台公告",
      titleEnglish:"The announcement",
      userName:getcookie('username'),
      islogin:0,
    }
  },
  components: {
     indexHeader,
     indexFooter
  },
  created(){
    document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
  },
  mounted(){
    this.$nextTick(()=>{
      var path = this.$route.path;
      this.routerchange(path);
      if(getcookie('username')){
        this.islogin = 4;
      }else{
        this.islogin = 0;
      }
    });
  },
  methods:{
    golink(id){
      switch(id){
        case 1:
          this.isactive=id;
          this.title="平台公告";
          this.titleEnglish="The announcement";
          break;
        case 3:
          this.isactive=id;
          this.title="币种介绍";
          this.titleEnglish="Coin introduce";
        break;
        case 2:
          this.isactive=id;
          this.title="常见问题";
          this.titleEnglish="Common problem";
        break;
        case 4:
          this.isactive=id;
          this.title="费率说明";
          this.titleEnglish="Rate description";
        break;
        case 5:
          this.isactive=id;
          this.title="问题反馈";
          this.titleEnglish="Problem feedback";
        break;
        case 6:
          this.isactive=id;
          this.title="风险提示";
          this.titleEnglish="Risk prompt";
        break;
        case 7:
          this.isactive=id;
          this.title="新手帮助";
          this.titleEnglish="Novice help";
        break;
      }
    },
    routerchange(path){
      switch(path){
        case '/help/notice':
        this.golink(1);
        break;
         case '/help/commonProblem':
        this.golink(2);
        break;
         case '/help/coinIntroduce':
        this.golink(3);
        break;
         case '/help/rateDescript':
        this.golink(4);
        break;
         case '/help/feedback':
        this.golink(5);
        break;
        case '/help/risk':
        this.golink(6);
        break;
        case '/help/newhelp':
        this.golink(7);
        break;
      }
    }
  },
  watch:{
    '$route' (to, from){
      var path=to.path;
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
      this.routerchange(path);
    }
  },
} 
</script>

<style type="text/css">
.help-box{
  background-color: #f3f3f3;
  .content{
    padding-top: 60px;
  }
  .banner-box{
    position: relative;
    height: 200px;
    background: url("../assets/img/help/banner.jpg") center center no-repeat;
    padding-top: 75px;
    text-align: center;
    h3{
      color: #fff;
      font-size: 24px;
      font-weight: normal;
    }
    h5{
      color: #fff;
      font-size: 14px;
    }
  }
  .middle-box{
    width: 1200px;
    margin: 40px auto 40px;
    overflow: hidden;
    .left-nav{
      width: 210px;
      float: left;
      margin-right: 30px;
      background-color: #fff;
      text-align: center;
      li{
        font-size: 16px;
        color: #333;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        a{
        display: block;
        font-size: 16px;
        color: #333;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        }
      }
      li:hover a{
        color:#E61F19;
        background-color: #f7f7f7;
      }
      .active{
         color:#E61F19;
        background-color: #f7f7f7;
      }
    }
    .right-part{
      width: 960px;
      float:right;
      background-color: #fff;
      .tt{
        font-size: 18px;
        color: #000;
        height: 60px;
        line-height: 60px;
        margin: 0 40px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>