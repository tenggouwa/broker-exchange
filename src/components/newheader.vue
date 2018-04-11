<template>
  <div class="header" :class="{scrollClass:scroll==true}">
    <div class="header-banner" >  <!-- " -->
      <div class="logo"><i class="iconfont icon-zhaobi" /></div>
      <ul class="nav-list">
        <li><div class="nav" :class="{'active-nav-list':navIndex===1}" @click="navIndex=1"><router-link to="/index">首页</router-link></div></li>
        <li @mouseover="goFlash" @mouseout="goFlash">
          <div class="nav" :class="{'active-nav-list':navIndex===4}" @click="navIndex=4"> <router-link to="/usercenter/btyUSDTtrade">USDT交易</router-link></div>
          <div class="trans-center" v-show="isFlash===true">   
            <ul class="cont">
              <li>
                <router-link to="/usercenter/btyUSDTtrade">
                  <i class="iconfont icon-BTY3 "></i>
                  <span>BTY/USDT</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/usercenter/yccUSDTtrade">
                  <i class="iconfont icon-YCC2 "></i>
                  <span>YCC/USDT</span>
                </router-link>
              </li> -->
              <li>
                <router-link to="/usercenter/btcUSDTtrade">
                  <i class="iconfont icon-BTC3"></i>
                  <span>BTC/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/bccUSDTtrade">
                  <i class="iconfont icon-BCC3 "></i>
                  <span>BCC/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/ethUSDTtrade">
                  <i class="iconfont icon-ETH3"></i>
                  <span>ETH/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/etcUSDTtrade">
                  <i class="iconfont icon-ETC3"></i>
                  <span>ETC/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/zecUSDTtrade">
                  <i class="iconfont icon-ZEC3"></i>
                  <span>ZEC/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/ltcUSDTtrade">
                  <i class="iconfont icon-LTC3"></i>
                  <span>LTC/USDT</span>
                </router-link>
              </li>
              <li @mouseenter="dcrIcon=true;dcrsvg=false" @mouseleave="dcrsvg=true;dcrIcon=false;">
                <router-link to="/usercenter/dcrUSDTtrade">
                  <svg  class="icon" aria-hidden="true"  v-show="dcrsvg==true">
                    <use  xlink:href="#icon-DCR3"></use>
                  </svg>
                  <i v-show="dcrIcon==true" class="iconfont icon-DCR3" ></i>
                  <span>DCR/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/btsUSDTtrade">
                  <i class="iconfont icon-BTS3"></i>
                  <span>BTS/USDT</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/scUSDTtrade">
                  <i class="iconfont icon-SC3"></i>
                  <span>SC/USDT</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/usercenter/btcsUSDTtrade">
                  <i class="iconfont icon-BTCS2"></i>
                  <span>BTCS/USDT</span>
                </router-link>
              </li> -->
              <!-- <li>
                <router-link to="/usercenter/ltcUSDTtrade">
                  <i class="iconfont icon-LTC2"></i>
                  <span>LTC/USDT</span>
                </router-link>
              </li> -->
            </ul>
          </div>
        </li>
        <li @mouseover="goCenter" @mouseout="goCenter">
          <div class="nav" :class="{'active-nav-list':navIndex===2}" @click="navIndex=2"><router-link to="/usercenter/bcctrade">BTC交易</router-link></div>
          <div class="trans-center" v-show="isTrade===true">
            <ul class="cont">
              <li>
                <router-link to="/usercenter/bcctrade">
                  <i class="iconfont icon-BCC3"></i>
                  <span>BCC/BTC</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/ethtrade">
                  <i class="iconfont icon-ETH3 "></i>
                  <span>ETH/BTC</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/etctrade">
                  <i class="iconfont icon-ETC3 "></i>
                  <span>ETC/BTC</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/zectrade">
                  <i class="iconfont icon-ZEC3 "></i>
                  <span>ZEC/BTC</span>
                </router-link>
              </li>
              <li>
                <router-link to="/usercenter/ltctrade">
                  <i class="iconfont icon-LTC3 "></i>
                  <span>LTC/BTC</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        
        <li >  <!--  @mouseover="goPro" @mouseout="goPro" -->
          <div class="nav" :class="{'active-nav-list':navIndex===3}" @click="navIndex=3"><router-link to="/traditional">专业交易</router-link></div>
        </li>
        <li>
          <div class="nav" :class="{'active-nav-list':navIndex===5}" @click="navIndex=5"><router-link to="/usercenter/fince">我的资产</router-link></div>
        </li>
        <li @mouseover="goHelp" @mouseout="goHelp">
           <div class="nav" :class="{'active-nav-list':navIndex===6}" @naclick="navIndex=6" ><router-link to="/help/newhelp">帮助中心</router-link></div>
          <div class="trans-center" v-show="isHelp===true">
            <ul class="cont">
              <!-- <li>
                <router-link to="/help/notice">
                  <span>平台公告</span>
                </router-link>
              </li> -->
              <li>
                <router-link to="/help/newHelp">
                  <span>新手帮助</span>
                </router-link>
              </li>
              <li>
                <router-link to="/help/coinIntroduce">
                  <span>币种介绍</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/help/rateDescript">
                  <span>费率说明</span>
                </router-link>
              </li> -->
              <!-- <li>
                <router-link to="/help/feedback">
                  <span>问题反馈</span>
                </router-link>
              </li>
              <li>
                <router-link to="/help/risk">
                  <span>风险提示</span>
                </router-link>
              </li> -->
            </ul>
          </div>
        </li>
        <!-- <li>
          <div class="nav" :class="{'active-nav-list':navIndex===7}" @click="navIndex=7" id="appDown">
            <a @click="gotoindexPOS">APP下载</a>
            <div class="appDownBox">
              <div class="tri"></div>
              <div class="appDownload">
                <img src="../assets/img/home/appdownload.png" />
                <img  src="../assets/img/home/pwallet.png" />
              </div>
            </div>
          </div>
        </li> -->
      </ul>
      <div class="box-list">
        <div class="boxerweima mtlabone" v-show="showT1">
          <img src="../../static/img/qq.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima mtlabtwo" v-show="showT2">
          <img src="../../static/img/weixin.png" height="144" width="120" alt="">
           <img src="../../static/img/weixin1.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima mtlabthree" v-show="showT3">
         
        </div>
        <ul class="myinfo">
          <li v-if="loginin==true">
            <router-link to="/usercenter/myaccount"><i class="iconfont icon-touxiang"></i>{{phoneNumber}} {{username}}</router-link>
            <span  @click="goout()" style="cursor:pointer margin-left:10px;">退出</span>
          </li>
          <li v-if="loginin==false"   >
            <a @click="goLinkLogin" class="red-color" >登录 / 注册</a>
            <!-- <a @click="gotoregist" class="red-color" >注册</a> -->
          </li>
        </ul>
        <!-- <ul>
          <li >
             <div class="phone-num" @mouseover="showerweima(1)" @mouseout="noneerweima()"><a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1"><i class="iconfont icon-QQ1-copy"></i><span>QQ在线客服：400-1566-899</span></a></div>
          </li>
          
        </ul> -->
        <!-- <ul class="ul-box"> -->
          <!-- <li ><div class="phone-num" ><a target="_blank" href="https://t.me/bityuan"><i class="iconfont icon-qunzuguanli"></i><span>电报群</span></a></div></li> -->
          <!-- <li ><div class="phone-number"><i class="iconfont icon-weixin-copy"></i><span @mouseover="showerweima(2)" @mouseout="noneerweima()">zhaobikefu</span></div></li>
        </ul> -->
      </div>
    </div>
    <div class="login-BOX">
      <login-box/>
    </div>
  </div>
 
</template>

<script>
// import myInfo from './myInfo'
import {sublogion,subloginup,isNull,setcookie,getcookie,delatecookie,checkLogin,LoginOut,ajax,getUserInfo} from '../assets/js/common.js'
import Bus from '../assets/js/bus.js'
import loginBox from '../components/login/zhaobiLogin'
export default{
   props:['quite','userName'],
  // components:{
  //   myInfo
  // },
  data(){
    return{
      showT1:false,
      showT2:false,
      showT3:false,
      scroll:true,
      isshowname:0,
      username:getcookie('username'),
      dlogout:false,
      isIndex:true,
      navIndex: 1,  //当前激活的导航栏的index
      loginin: false,//checkLogin('loginin'), //登录标识  //!!!!!!!!!!!!!修改了，不确定改的对不对
      isLogin: false,
      isReg: false,
      isForget: false,
      isReset: false,
      isCountry: false,
      isChina: true,
      qqshow: false,
      wxshow: false,
      emailShow: false,
      isCoin: false,
      coinNum: 1,
      isTrade: false,
      isHelp:false,
      isPro:false,
      isFlash:false,
      islogin:'',
      dcrIcon:false,
      dcrsvg:true,
      loginin:false,
      phoneNumber:'',
    }
  },
  components:{
    loginBox,
  },
  methods:{
    showerweima(e){
      if(e == 1){
        this.showT1=true;
      }else if(e == 2){
        this.showT2=true;
      }else if(e == 3){
        this.showT3=true;
      }
      
    },
    noneerweima(){
      this.showT1=false;
      this.showT2=false;
      this.showT3=false;
    },
    //检测滚动事件
    menu(){
      if(document.body.scrollTop>0||document.documentElement.scrollTop>0||window.pageYOffset>0){
        this.scroll=true;
      }
      else{
        this.scroll=false;
      }
    },
    flashRoute: function() {
      var path = this.$route.path;
      switch(path){
        case '/index':
        this.isIndex=true;
        this.isshowname==0;
        if(document.documentElement.scrollTop==0||window.pageYOffset==0||document.body.scrollTop==0){
          this.scroll=false;
        }
        else{
          this.scroll=true;
        }
        break;
        default :
        this.isIndex=false;
        this.scroll=true;
        this.isshowname==1;
        break;
      }
    },
    //hover显示BTC交易中心下拉框
    goCenter(){
      this.isTrade=!this.isTrade;
      // this.navIndex=2;
    },
    goHelp(){
      this.isHelp=!this.isHelp;
    },
    //hover显示usdt交易下拉框
    goFlash(){
      this.isFlash=!this.isFlash;
       // this.navIndex=4;
    },
    gotoindexPOS(){
      //触发首页滚动事件
      Bus.$emit("scrollappdownload");
      if(this.$route.path!="index"){
        this.$router.push({
           path: '/index'
        })
      } 
    },
    goout(){
        var _this = this;
        Bus.$emit('turnOut',true);
        this.$emit("change");
        ajax(_this,_this.extendApi.loginout,'',(response)=>{
          if(response.code == 200){
            delatecookie();
            this.username='';
            this.dlogout=false;
            _this.loginin=false;
          }else{
            delatecookie();
            this.username='';
            this.dlogout=false;
          }
        },'GET');
    },
    goLinkLogin(){
      setcookie('loginorregist','login');
      this.$store.commit('openDialog',true);
      // Bus.$emit("loginBoxtrigger",'login');
      // this.$router.push({
      //   path: '/index'
      // });
      
    },
    gotoregist(){
      setcookie('loginorregist','regist');
      Bus.$emit("loginBoxtrigger",'regist');
      this.$router.push({
        path: '/index'
      });
    }
  },
  mounted(){
    Bus.$on('isLogined',(bool,user)=>{
    	if(bool){
    		this.isLogin = true;
    		this.phoneNumber = user;
    	}
    })
    this.flashRoute();
    if(this.isIndex === true&&this.$route.path==='/index'){
       window.addEventListener('scroll', this.menu);
    }
    if(this.$route.path!='/index'){
      this.scroll=true;
    }
    if(!getcookie('username')){
      this.loginin=false;
    }else{
      this.loginin=true;
    }
    //检测初始路由，改变navIndex的值，然后根据navIndex的值给当前激活的nav添加红色
    if(this.$router.history.current.path.indexOf('/usercenter/bcctrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/etctrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/ethtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/zectrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/ltctrade')!==-1){
      this.navIndex=2;
       this.scroll=true;
    }
    if(this.$router.history.current.path.indexOf('/traditional')!==-1){
      this.navIndex=3;

    }
    if(this.$router.history.current.path.indexOf('/usercenter/btyUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/btcUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/bccUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/etcUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/ethUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/zecUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/ltcUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/scUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/btsUSDTtrade')!==-1||this.$router.history.current.path.indexOf('/usercenter/dcrUSDTtrade')!==-1){
      this.navIndex=4;
       this.scroll=true;
    }
    if(this.$router.history.current.path.indexOf('/usercenter/fince')!==-1){
      this.navIndex=5;
       this.scroll=true;
    }
    if(this.$router.history.current.path.indexOf('/help')!==-1){
      this.navIndex=6;
       this.scroll=true;
    }
    if(this.$router.history.current.path.indexOf('/appload')!==-1){
      this.navIndex=7;
       this.scroll=true;
    }
  },
  watch:{
    isLogin(){
      if(this.isLogin = true){
        this.loginin = true;
      }else{
        this.loginin = false;
      }
    },
    username(value) {
      if (!getcookie('username')){
      this.loginin=false;
      } else {
      this.loginin=true;
      }
    },
    '$route' (to, from){
        var path=to.path;
        this.menu();
        switch(path){
          case '/index':
           // this.quite=0;
           this.navIndex=1
          this.isIndex=true;
          break;
          case '/usercenter/btyUSDTtrade':
          this.isIndex=false;
           this.scroll=true;
          this.navIndex=4;
          break;
          case '/usercenter/btcUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/bccUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/ethUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/etcUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/zecUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/ltcUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/scUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/btsUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/dcrUSDTtrade':
          this.navIndex=4;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/bcctrade':
          this.navIndex=2;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/ethtrade':
          this.navIndex=2;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/etctrade':
          this.navIndex=2;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/zectrade':
          this.navIndex=2;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/usercenter/ltctrade':
          this.navIndex=2;
          this.isIndex=false;
          break;
          case '/usercenter/fince':
          this.navIndex=5;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/help/notice':
          this.navIndex=6;
           this.scroll=true;
          this.isIndex=false;
          break;
          case '/help/newhelp':
          this.navIndex=7;
           this.scroll=true;
          this.isIndex=false;
          break;
          default :
          // this.quite=4;
          this.scroll=true;
           this.isIndex=false;
          break;
        }
      }
  },
}
</script>

<style scoped>
  .login-BOX{
    z-index: 2;
  }
.header{
  width: 100%;
  height: 100px;
  background: rgba(0,0,0,0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.header-banner{
  width: 1200px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  color: rgba(255,255,255,0.5);
  .logo{
    width: 155px;
    height: 100px;
    line-height: 100px;
    float: left;
    .icon-zhaobi{
      color: #fff;
      font-size: 76px;
      vertical-align: middle;
    }
    
  }
  .nav-list{
    float: left;
    width: 700px;
    height: 100px;
    li {
      float: left;
      width: 100px;
      height: 100px;
      line-height: 100px;
      font-size: 16px;
      text-align: center;
      .nav{
        margin: 30px 14px 0 14px;
        width: 75px;
        height: 35px;
        line-height: 40px;
        cursor: pointer;
        a{
          display: block;
          width: 100%;
          height: 100%;
          color:rgba(255,255,255,0.5);
          text-align: center;
        }
      }
      .nav:hover{
        a{
          color: #fff;
          border-bottom: 0px solid #fff;
        }
      }
    }
    /*缩短“首页”下方红线的长度*/
    li:nth-of-type(1)>div{
      width: 40px;
      margin-left: 30px;
    }
    /*导航栏样式*/
    .active-nav-list{
      a{
        border-bottom: 3px solid #fff;
        color: #fff !important ;
      }
    }
    .active-nav-list:hover{
      border-bottom: 3px solid #fff;
      color: #fff !important ;
    }
  }
  /*导航栏右侧的一堆样式*/
  .box-list{
    display: block;
    float: right;
    height: 100px;
    padding: 10px 0px;
    color: rgba(255,255,255,0.7);
    .boxerweima{
      position: fixed;
      width: 120px;
      height: 144px;
      border: 1px solid #f0f0f0;
      background: #fff;
      border-radius: 4px;
    }
    .mtlabone{
      top: 60px;
      margin-left: 60px;
    }
    .mtlabtwo{
      width: 250px;
      top: 90px;
      height: auto;
      margin-left: -40px;
    }
    .mtlabthree{
      top: 90px;
      margin-left: 110px;
    }
    .myinfo{
      cursor: pointer;
      li{
        height: 80px;
        line-height: 80px;
        vertical-align: middle;
        
      }
      a{
        margin-right: 10px;
        color: rgba(255,255,255,0.7);
      }
      a:hover,span:hover{
         color: #fff;
      }
    }
    .ul-box{
      /*margin-top: 10px;*/
      .phone-number{
        cursor: pointer;
        .icon-weixin-copy{
          color: rgba(16, 172, 16, 1);
          font-size: 16px;
          margin-right: 5px;
        }
        .icon-qqqun{
          color: rgba(0, 170, 238, 1);
          font-size: 16px;
          margin-right: 5px;
          margin-left: 15px;
        }
        span{
          font-size: 14px;
        }
      }
    }
    ul{
      height: 26px;
      text-align: right;
      li{
        display: block;
        div.phone-num{
          height:26px;
          border-radius: 4px;
          line-height: 20px;
          padding: 0px 12px;
          background-color: #ce181d;
          display: inline;
          float: right;
          a{
            display: inline-block;
            color: #ffffff;
            height: 26px;
            line-height: 26px;
            text-align:center;
            vertical-align: middle;
            i{
              display: inline-block;
              height: 26px;
             line-height: 26px;
             /*background-color: black;*/
              margin: -3px 5px 0;
              vertical-align: middle;
            }
          }
        }
      }

    }
    ul:nth-child(1){
      margin-top: 5.5px;
      margin-bottom: 2.5px;
    }
    ul:nth-child(2),ul:nth-child(3){
      margin-top: 0px;
      margin-bottom: 5.5px;
    }
  }
}
.scrollClass{
  background:#fff;
  /*opacity: 0.95;*/
  box-shadow: 0px 1px 0px #e6e6e6;
  .header-banner{
    color: #666;
    .logo{
      .icon-zhaobi{
        color: #ce181d;
      }
      
    }
    .nav-list{
      li{
        .nav{
          a{
            color: #666;
          }
        }
        .nav:hover{
          a{
            color: #ce181d;
            border-bottom: 0px solid #ce181d;
          }
        }
        .active-nav-list{
          a{
            border-bottom: 3px solid #ce181d;
            color: #ce181d !important ;
          }
          }
      }
    }
    .box-list{
      color: #666;
      .myinfo{
        a{
          color: #666;
        }
        a:hover,span:hover{
           color: #ce181d;
        }
      }

    }
  }
}
/*显示框上方的白色小三角*/
.tri{
  width: 10px;
  height: 10px;
  border: 5px solid transparent;
  border-bottom-color: #fff;
  margin: 0 auto;
}

/*交易中心下拉菜单*/
.trans-center{
  position: absolute;
  top:70px;
  z-index: 1;
  .cont{
    display: block;
    width: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius:4px;
    position: absolute;
    top: 100%;
    left: -50px;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: center;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #f0f0f0;
    li{
      width: 200px;
      height: 50px;
      color: #444;
      font-size: 16px;
      line-height: 50px;
      border-radius: 4px;
      a{
        display: inline-block;
        width: 130px !important;
      }
    }

    li:first-child:before {
      content: " ";
      display: inline-block;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid rgba(255, 255, 255, 1);
      position: absolute;
      top: -6px;
      left: 95px;
    }
    li>a>i{
      color: #ce181d;
      font-size: 26px !important;
      /*margin: 10px 10px 10px 0px;*/
      width: 30px;
      float: left;
    }
    li>a>svg{
      margin-left: 5px;
      vertical-align: 1em;
       /*font-size: 20px;*/
       width: 26px;
       height: 50px;
       float: left;
    }
    li>a>span{
      vertical-align: 3px;
      width: 80px;
    }
    li:hover{
      background-color: #ce181d;
      i,svg{color: #fff}

      span{color: #fff}
    }
    .icon-USDT3,.icon-USDT3 + p{
      color: #ff8f21;
    }
   
    .icon-BTC3,.icon-BTC3+p{
      color: #e6ac00;
    }
    .icon-ETC3,.icon-ETC3+p{
     color: #47ad50;
    }
    .icon-ETH3,.icon-ETH3+p{
      color: #3dabcb;
    }
    .icon-ZEC3,.icon-ZEC3+p{
      color: #366bb2;
    }
    .icon-ETH3,.icon-ETH3+p{
      color: #3dabcb;
    }
    .icon-LTC3,.icon-LTC3+p{
      color: #6353b3;
    }
    .icon-BCC3,.icon-BCC3+p{
      color: #ec712e;
    }
    .icon-BTY3,.icon-BTY3+p{
      color: #e14f55;
    }
    .icon-SC3,.icon-SC3+p{
      color: #0ea48a;
    }

    .icon-BTS3,.icon-BTS3+p{
      color: #7fb131;
    }
    .icon-BTCS3,.icon-BTCS3+p{
      color: #13a94f;
    }
  }
}

/* App下载hover */
#appDown{
  position: relative;
}
#appDown:hover .appDownBox{
  display: block;
}
.appDownBox{
  position: absolute;
  top:30px;
  left: -80px;
  display: none;
  z-index: 99;
}
.appDownload{
  width: 250px;
  height: 145px;
  /*vertical-align: middle;*/
  border: 1px solid #f0f0f0;
  background: #fff;
}

.icon-QQ1-copy,.icon-qunzuguanli{
  font-size: 16px;
}

::-webkit-input-placeholder { color:#888;font-size:12px; }
::-moz-placeholder { color:#888;font-size:12px; } /* firefox 19+ */
:-ms-input-placeholder { color:#888;font-size:12px; } /* ie */
input:-moz-placeholder { color:#888;font-size:12px; }

</style>
