<template>
  <ul class="sidebar-menu">
    <li>
      <a class="main trade" @click="canshow(0)">USDT交易</a>
      <img class="ro-control" :class="{'rotate': isshow[0]==false}" src="../assets/img/user/arrows.png" alt="">
      <ul class="submenu" v-if="isshow[0]">
        <li>
          <router-link to="/usercenter/btyUSDTtrade" :class="{'active':isactive==29}">
            <span>BTY/USDT</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/usercenter/yccUSDTtrade" :class="{'active':isactive==30}">
            <span>YCC/USDT</span>
          </router-link>
        </li> -->
        <li>
          <router-link to="/usercenter/btcUSDTtrade" :class="{'active':isactive==28}">
            <span>BTC/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/bccUSDTtrade" :class="{'active':isactive==23}">
            <span>BCC/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/ethUSDTtrade" :class="{'active':isactive==24}">
            <span>ETH/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/etcUSDTtrade" :class="{'active':isactive==25}">
            <span>ETC/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/zecUSDTtrade" :class="{'active':isactive==26}">
            <span>ZEC/USDT</span>
          </router-link>
        </li> 
        <li>
          <router-link to="/usercenter/ltcUSDTtrade" :class="{'active':isactive==27}">
            <span>LTC/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/dcrUSDTtrade" :class="{'active':isactive==35}">
            <span>DCR/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/btsUSDTtrade" :class="{'active':isactive==32}">
            <span>BTS/USDT</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/scUSDTtrade" :class="{'active':isactive==33}">
            <span>SC/USDT</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/usercenter/btcsUSDTtrade" :class="{'active':isactive==34}">
            <span>BTCS/USDT</span>
          </router-link>
        </li> -->
      </ul>
    </li>
    <li>
      <a class="main trade" @click="canshow(1)">BTC交易</a>
      <img class="ro-control" :class="{'rotate': isshow[1]==false}" src="../assets/img/user/arrows.png" alt="">
      <ul class="submenu" v-if="isshow[1]">
        <li>
          <router-link to="/usercenter/bcctrade" :class="{'active':isactive==16}">
            <span>BCC/BTC</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/ethtrade" :class="{'active':isactive==1}">
            <span>ETH/BTC</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/etctrade" :class="{'active':isactive==2}">
            <span>ETC/BTC</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/zectrade" :class="{'active':isactive==13}">
            <span>ZEC/BTC</span>
          </router-link>
        </li> 
        <li>
          <router-link to="/usercenter/ltctrade" :class="{'active':isactive==15}">
            <span>LTC/BTC</span>
          </router-link>
        </li>
        <li>
          <router-link to="/traditional" :class="{'active':isactive==5}">
              <span>专业交易</span>
          </router-link>
        </li>
        <li>
          <router-link to="/innovate" :class="{'active':isactive==6}">
            <span>闪电交易</span>
          </router-link>
        </li>
      </ul>
    </li>
    <li class='userbox'>
      <a class="main user" @click="canshow(2)">用户中心</a>
      <img class="ro-control" :class="{'rotate': isshow[2]==false}" src="../assets/img/user/arrows.png" alt="">
      <ul class="submenu" v-if="isshow[2]">
        <li>
          <router-link to="/usercenter/fince" :class="{'active':isactive==7}">
            <span>我的资产</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/myaccount" :class="{'active':isactive==8}">
            <span>账户认证</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/safeset" :class="{'active':isactive==9}">
            <span>安全设置</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/usercenter/share" :class="{'active':isactive==31}">
            <span>分享有奖</span>
          </router-link>
        </li> -->
      </ul>
    </li>
    <!-- <li class="lastlist">
      <img class="erweimaone" src="../assets/img/app/download.png" alt="">
    </li>
    <li class="discribe">
      <span>App下载</span>
    </li> -->
  </ul>
  
</template>
<script>
import {getcookie,ajax} from '../assets/js/common'
  export default{
    data(){
      return{
        showT1:true,
        showT2:false,
        showT3:false,
        showT4:false,
        showT5:false,
        showT6:false,
        isshow:[true,true,true,true],
        isactive:1,
        wxShow:false,
        // dialogshow:false,
        Jurisdiction:false,//是否有公私募权限
      }
    },
    mounted:function(){
      this.$nextTick(()=>{
        this.flashRoute();
        // this.getpeopse();
      });
    },
    watch:{
      '$route' (to, from){
        var path=to.path;
        this.routerchanges(path);
      },
    },
    methods:{
      showerweima(e){
        if(e == 1){
          this.showT1=true;
        }else if(e == 2){
          this.showT2=true;
        }else if(e == 3){
          this.showT3=true;
        }else if(e == 4){
          this.showT4=true;
        }else if(e == 5){
          this.showT5=true;
        }else if(e == 6){
          this.showT6=true;
        }
      },
      noneerweima(){
        this.showT1=false;
        this.showT2=false;
        this.showT3=false;
        this.showT4=false;
        this.showT5=false;
        this.showT6=false;
      },
      canshow(num){
        this.isshow[num]==true?this.$set(this.isshow, num, false):this.$set(this.isshow, num, true);
      },
      dialogshow(){
        this.$alert('资询客服需要通过大型社交应用Slack，您需要使用邮箱注册Slack后才能获取帮助。','提示',{
          confirmButtonText:'前往注册',
          callback:  (action, instance) => {
            if(action=='confirm'){

             window.open('https://join.slack.com/t/fxeework/shared_invite/enQtMjUzMTUxMTg3NzEyLTAyMGM1YTU5NmEzYWRjNWE2ZjYxYzU4YjE3ZTcxZjRjMGM3YzE5ZWRkMjA1ZWVhYjA5MjYyZGY3ODVlZjg5NDk');
            }
            if(action=='cancel'){
              instance.confirmButtonLoading = false;
            }
          }
        });
      },
      golink(linknum,symboles){
        this.isactive=linknum;
        if(symboles){
          sessionStorage.setItem("symbol", symboles);//存放货币对
          this.$emit('symbolchange',symboles);
        }
      },
      routerchanges(path){
        switch(path){
          case '/usercenter/ethtrade':
          this.golink(1,"ETHBTC");
          break;
          case '/usercenter/etctrade':
          this.golink(2,"ETCBTC");
          break;
          // case '/usercenter/btytrade':
          // this.golink(3,"BTY");
          // break;
          // case '/usercenter/btctrade':
          // this.golink(4,"BTC");
          // break;
          case '/traditional':
          this.golink(5);
          break;
           case '/innovate':
          this.golink(6);
          break;
          case '/usercenter/fince':
          this.golink(7);
          break;
          case '/usercenter/myaccount':
          this.golink(8);
          break;
          case '/usercenter/safeset':
          this.golink(9);
          break;
          // case '/usercenter/sctrade':
          // this.golink(10,"SC");
          // break;
          // case '/usercenter/noticeSet':
          // this.golink(10);
          // break;
          case '/usercenter/phoneRecharge':
          this.golink(11);
          break;
          case '/usercenter/btytrade':
          this.golink(12);
          break;
          case '/usercenter/zectrade':
          this.golink(13,"ZECBTC");
          break;
          // case '/usercenter/btstrade':
          // this.golink(14,"BTS");
          // break;
          case '/usercenter/ltctrade':
          this.golink(15,"LTCBTC");
          break;
          case '/usercenter/bcctrade':
          this.golink(16,"BCCBTC");
          break;
          case '/usercenter/selfSettlement':
          this.golink(17);
          break;
          // case '/usercenter/subBTCtrade':
          // this.golink(18,"BTC");
          // break;
          // case '/usercenter/subETHtrade':
          // this.golink(20,"ETH");
          // break;
          
          case '/usercenter/bccUSDTtrade':
          this.golink(23,"BCCUSDT");
          break;
          case '/usercenter/ethUSDTtrade':
          this.golink(24,"ETHUSDT");
          break;
          case '/usercenter/etcUSDTtrade':
          this.golink(25,"ETCUSDT");
          break;
          case '/usercenter/zecUSDTtrade':
          this.golink(26,"ZECUSDT");
          break;
          case '/usercenter/ltcUSDTtrade':
          this.golink(27,"LTCUSDT");
          break;
          case '/usercenter/btcUSDTtrade':
          this.golink(28,"BTCUSDT");
          break;
          case '/usercenter/btyUSDTtrade':
          this.golink(29,"BTYUSDT");
          break;
          case '/usercenter/yccUSDTtrade':
          this.golink(30,"YCCUSDT");
          break;
          case '/usercenter/btsUSDTtrade':
          this.golink(32,"BTSUSDT");
          break;
          case '/usercenter/scUSDTtrade':
          this.golink(33,"SCUSDT");
          break;
          case '/usercenter/btcsUSDTtrade':
          this.golink(34,"BTCSUSDT");
          break;
          case '/usercenter/dcrUSDTtrade':
          this.golink(35,"DCRUSDT");
          break;
          case '/usercenter/share':
          this.golink(31);
          break;
          }
          if(path=='/usercenter/ethtrade' || path=='/usercenter/etctrade' || path=='/usercenter/zectrade'|| path=='/usercenter/ltctrade'|| path=='/usercenter/bcctrade'|| path=='/usercenter/etcUSDTtrade'|| path=='/usercenter/bccUSDTtrade'|| path=='/usercenter/btcUSDTtrade'|| path=='/usercenter/ethUSDTtrade'|| path=='/usercenter/zecUSDTtrade'|| path=='/usercenter/ltcUSDTtrade'|| path=='/usercenter/btyUSDTtrade'|| path=='/usercenter/yccUSDTtrade'|| path=='/usercenter/btsUSDTtrade'|| path=='/usercenter/scUSDTtrade'|| path=='/usercenter/btcsUSDTtrade'|| path=='/usercenter/dcrUSDTtrade'){
       
          }else{
          if(getcookie('token') == null){
            this.$alert(
                '您还未登录，请先登录',
                '提示',
            ).then(() => {
              this.$router.push({
                path: '/'
              });
            });
          }
        }
      },
      flashRoute: function() {
        var path = this.$route.path;
        this.routerchanges(path);
      },
    }
  }
</script>
<style>
  ul,p{
    margin:0;
    padding: 0;
  }
  .sidebar-menu{
    /*height: 1180px;*/
    .boxerweima{
      padding-left: 45px;
    }
    a{
      text-decoration: none;
      height: 55px;
      line-height: 55px;
      text-align: left;
      padding-left: 74px;
      cursor: pointer;
    }
    
    li{
      position: relative;
      list-style: none;
      .ro-control{
        position: absolute;
        right: 28px;
        top: 25px;
      }
      .rotate{
        transform: rotate(-90deg);
      }
      a{
        font-size: 16px;
        color: #000;
        display: block;
      }
      a:hover{
        color: #c81118;
      }
      .trade{
        background: url(../assets/img/user/trade.png) no-repeat 23px center;
      }
      .tradesub{
        background: url(../assets/img/user/subtrade.png) no-repeat 23px center;
      }
      .user{
        background: url(../assets/img/user/user.png) no-repeat 23px center;
      }
      .serve{
        background: url(../assets/img/user/serve.png) no-repeat 23px center;
      }
      .sidemu-help{
        display: block;
        /*width: 175px!important;*/
        width: 185px!important;
        height: 35px;
        margin-left: 15px;
        background-color: #e6e6e6!important;
        color: #000;
        font-size: 12px;
        margin-bottom: 5px;
        text-align: left;
        padding-left: 60px;
        line-height: 35px;
        border-radius: 4px;
        cursor: default;
        background: url(../assets/img/slack.png) no-repeat 8% center;
        background-size:15px 15px;
        i{
          font-size: 18px;
          margin-right: 5px;
        }

      }
     .sidemenu-dh{
        margin-top: 10px;
        background: url(../assets/img/dh15.png) no-repeat 8% center;
      }
      .sidemenu-kf{
        margin-top: 10px;
        background: url(../assets/img/kf15.png) no-repeat 8% center;
      }
      .sidemenu-ptyx{
        margin-top: 10px;
        background: url(../assets/img/yx15.png) no-repeat 8% center;
      }
      .sidemenu-ptwx{
        margin-top: 10px;
        background: url(../assets/img/wx15.png) no-repeat 8% center;
        position: relative;
        .comleftcode{
          position: absolute;
          bottom: 33px;
          left:40px;
        }
      }
      .tishi{
        text-align: center;
        margin-bottom:8px;
        padding: 0;
      }
      .submenu{
        li{
          a{
            display: block;
            height: 35px;
            font-size: 14px;
            line-height: 35px;
            padding-left: 74px;
            color: #888;
            text-align: left;
          }
          a:hover{
            color: #c81118;
          }
        }
      }
    }
    .userbox{
      margin-bottom: 10px;
    }
    .discribe{
      text-align: center;
      padding-bottom: 20px;
      /*line-height: 40px;*/
      color: #333;
      span{
        font-size: 14px;
      }
    }
    .lastlist{
      clear: both;
      height: auto;
      width: 100%;
      overflow: hidden;
      margin:0 30px;
      img{
        display: block;
        float: left;
      }
      .erweimaone{
        width:150px;
        height:150px;
        
      }
    }
    .active{
      background: #f7f7f7;
      font-weight: bold;
      color: #c81118!important;
    }
  }
  .el-dialog--small{
    width: 500px;
  }
  .el-dialog__header{
    padding: 26px 26px 0;
  }
  .el-dialog__title{
    display: inline-block;
    height: 18px;
    color: #666;
  }
  .el-dialog__body{
    padding: 10px 26px 26px;
  }
  .el-form-item__label{
    padding-right: 5px;
    color: #000;
  }
  .el-dialog__close{
   /**/
    font-size: 14px;
  }
  .btn{
    .el-dialog__headerbtn{
      line-height: 20px;
    }
  }
  .xian{
      width: 448px;
      ul{
        width: 448px;
        padding-bottom: 10px;
        .frist1{
          width: 120px;
          background: #c81118;
        }
        .two1{
          width: 328px;
          background: #e6e6e6;
        }
        li{
          float: left;
          height: 3px;
        }
      }
    }
</style>