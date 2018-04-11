<template>
   <div class="header" :class="{scrollClass:scroll==true}">
     <div class="cont">
     <div class='headerleft'>
       <a class="logo" href="index.html">
       </a>
       <p class="ptClass">区块链数字资产交易平台</p>
     </div> 
       <div class='contbox'>
         <ul class='box'>
            <li><router-link to="/index" class="label">首页</router-link></li>
            <li class='trade label'>
              <span>
                BTC交易
                <p class="arrowhead">
                  <img src="../assets/img/arrowhead.png" alt="">
                </p>
              </span>
              <p class='triangle'></p>
              <ul class='drop-down'>
                <li>
                  <router-link to="/usercenter/bcctrade">
                    <p class='iconfont icon-BCC2'></p>
                    <p>BCC/BTC</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/ethtrade">
                    <p class='iconfont icon-ETH2'></p>
                    <p >ETH/BTC</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/etctrade">
                    <p class='iconfont icon-ETC2'></p>
                    <p>ETC/BTC</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/zectrade">
                    <p class='iconfont icon-ZEC2'></p>
                    <p>ZEC/BTC</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/ltctrade">
                    <p class='iconfont icon-LTC2'></p>
                    <p>LTC/BTC</p>
                  </router-link>
                </li> 
              </ul>
            </li> 
            <li class='trade label'>
              <span>
                USDT交易
                <p class="arrowhead">
                  <img src="../assets/img/arrowhead.png" alt="">
                </p>
              </span>
              <p class='triangle'></p>
              <ul class='drop-down'>
                <li>
                  <router-link to="/usercenter/btyUSDTtrade" >
                    <p class='iconfont icon-BTY2'></p>
                    <P>BTY/USDT</P>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/yccUSDTtrade">
                    <p class='iconfont icon-YCC2'></p>
                    <P>BTY/USDT</P>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/btcUSDTtrade" >
                    <p class='iconfont icon-BTC2'></p>
                    <P>BTC/USDT</P>
                  </router-link>
                </li>
                <li>
                   <router-link to="/usercenter/bccUSDTtrade" >
                    <p class='iconfont icon-BCC2'></p>
                    <P>BCC/USDT</P>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/ethUSDTtrade">
                    <p class='iconfont icon-ETH2'></p>
                    <p>ETH/USDT</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/etcUSDTtrade">
                    <p class='iconfont icon-ETC2'></p>
                    <p>ETC/USDT</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/zecUSDTtrade">
                    <p class='iconfont icon-ZEC2'></p>
                    <p>ZEC/USDT</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="/usercenter/ltcUSDTtrade">
                    <p class='iconfont icon-LTC2'></p>
                    <p>LTC/USDT</p>
                  </router-link>
                </li> 
              </ul>
            </li> 
            <li>
               <router-link to="/traditional" class="label">K线交易</router-link>
            </li>
            <!-- <li>
              <router-link to="/innovate" class="label">闪电交易</router-link>
            </li> -->
            <li>
               <router-link to="/help/notice" class="label">帮助中心</router-link>
            </li>
            <li>
               <router-link to="/appload" class="label">APP下载</router-link>
            </li>
            <li v-if="quite!=4">
              <router-link class="label" to="/usercenter/fince">我的资产</router-link>
            </li>
            <li class='things-personal' v-if="quite==4">
              <p class='personal-icon'></p>
              <div class="pername">
                <p class='name'>{{username}}</p>
                <span class='indicator'></span>
                <span class='assist'></span>
                <ul class='mine'>
                 <li>
                   <router-link to="/usercenter/fince"><p class='property'></p><p>我的资产</p></router-link>
                 </li>
                 <li>
                 <router-link to="/usercenter/myaccount"><p class='account'></p> <p>账户认证</p></router-link>
                 </li>
                 <li>
                   <router-link to="/usercenter/safeset"><p class='safe'></p><p>安全设置</p></router-link>
                 </li>
                </ul>
              </div>
              <p class='drop-out' @click="goout()" style="cursor:pointer">退出</p>
            </li>
         </ul>
       </div>
     </div>
    </div>
</template>
<script>
import {ajax, getcookie,delatecookie } from '../assets/js/common'
  export default{
    props:['userName','quite'],
    data(){
      return{
        isshowname:0,
        username:getcookie('username'),
        dlogout:false,
        scroll:false,
        isIndex:true,
      }
    },
    mounted:function(){
      this.flashRoute();
      if(this.isIndex == true){
         window.addEventListener('scroll', this.menu);
      }
    },
    methods:{
      menu(){
        if($(document).scrollTop()>0){
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
          this.isshowname==0;
          break;
          default :
          this.isIndex=false;
          this.scroll=true;
          this.isshowname==1;
          break;
        }
      },
      goout(){
        var _this = this;
         this.$emit("change");
        ajax(_this,_this.extendApi.loginout,'',(response)=>{
          if(response.code == 200){
            delatecookie();
            this.username='';
            this.dlogout=false;
            this.$emit("change");
            this.$router.push({
              path: '/index'
            });
          }else{
            delatecookie();
            this.username='';
            this.dlogout=false;
            // this.$emit("change");
            this.$router.push({
              path: '/index'
            });
          }
        },'GET');
      },
    },
    watch:{
      '$route' (to, from){
        var path=to.path;
        switch(path){
           case '/index':
           // this.quite=0;
          this.isIndex=true;
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
<style>
   .header{
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0);
    position:fixed;
    top:0;
    left:0;
    z-index: 100;
   .cont{
     width: 1210px;
     height: 100%;
     margin:0 auto; 
     position: relative;
     .headerleft{
      height: 100%;
      width: 250px;
      float: left;
      position: relative;
      a{
        display: block;
        width:76px;
        height: 50px;
        background: url(../assets/img/index/ZHAOBI.png) no-repeat center;
        background-size: cover;
        float: left;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .ptClass{
        line-height: 60px;
        float: right;
        color: #000;
      }
     }
     .contbox{
      height: 60px;
      position: absolute;
      right: 0px;
      .box{
        li{
          float: left;
        }
      }
      .box .label{
        width: 101px;
        height: 35px;
        color: #000;
        line-height: 35px;
        text-align: center;
        float: left;
        font-size: 14px;
        margin-top: 12.5px;
      }
      .label:hover{
        color:#e61f19;
         background:  #e5eded;
      }
      .trade{
        position: relative;
        .arrowhead{
        position: absolute;
        right: 10px;top:-3px;
        display: none;
      }
      .triangle{
        width: 0px;
        height: 0px;
        border-top: 13px solid transparent;
        border-right: 13px solid transparent;
        border-left: 13px solid transparent;
        border-bottom: 13px solid #fff;
        position: absolute;
        left:40px;
        top:33px;
        display: none;
      }
       .drop-down{
          width: 160px;
          
          background: #fff;
          position: absolute;
          top:58px;
          right: -30px;
          display: none;
          li{
             height: 40px;
            width: 160px;
            line-height: 40px;
            p{
               width: 17px;
               height: 17px;
            }
            p:nth-child(2){
              float:left;
              font-size: 12px;
              margin-left: 15px;
            }
            p:nth-child(1){
              /*margin-top: 11.5px;*/
              margin-left: 20px;
              float:left;
            }
          .icon-BCC2,.icon-ETH2,.icon-ETC2,.icon-ZEC2,.icon-LTC2,.icon-BTY2,.icon-BTC2{
            font-size: 17px !important;
            color: #808080;
          }
        }
         li:hover{
            /*width: 17px;
            height: 17px;*/
            background: #e5eded;
            .icon-BCC2,.icon-ETH2,.icon-ETC2,.icon-ZEC2,.icon-LTC2,.icon-BTY2,.icon-BTC2{
              /*font-size: 17px !important;*/
              /*height: 17px;*/
              /*color: #808080;*/
              color: #ce181d;
            }
            P{
               color:#e61f19;
            }
           /* background: url(../assets/img/logo/ibts.png) no-repeat center;
            background-size: cover;*/
          }
         
       }
      }
       .trade:hover .arrowhead{
            display: block;
         }
         .trade:hover .drop-down{
          display: block;
         }
         .trade:hover .triangle{
          display: block;
         }
        .things-personal{
          width: 217px;
          height: 35px;
          border: 1px solid #e6e6e6;
          margin-top: 12.5px;
          background: rgba(255,255,255,0.1);
          p{
            float: left;
            line-height: 35px;
          }
         .personal-icon{
          margin-top: 10px;
          margin-left: 20px;
          width: 15px;
          height: 15px;
          background: url(../assets/img/personal.png) no-repeat center; 
          background-size: cover;
         }
         .pername{
          font-size: 12px;
          color: #000;
          position: relative;
          .name{
            margin-left: 10px;
            max-width: 110px;
            overflow: hidden;
          }
          .indicator{
            display: block;
            width: 0px;
            height: 0px;
            border-top: 13px solid transparent;
            border-right: 13px solid transparent;
            border-left: 13px solid transparent;
            border-bottom: 13px solid #fff;
            position: absolute;
            top:20px;
            left: 85px;
            display: none;
          }
          .assist{
            width: 150px;
            height: 13px;
            background: rgba(255,255,255,0);
            position: absolute;
            left: 25px;
            top:35px;
            display: none;
          }
         }
         .drop-out{
          margin-top: 7.5px;
           font-size: 12px;
           width: 48px;
           line-height: 20px;
           height: 20px;
           border-left: 1px solid #e6e6e6;
           text-align: center;
           float: right;
           color: #000;
         }
         .drop-out:hover{
           color: #e61f19;
         }
         .mine{
          width: 150px;
          height: 120px;
          background: #fff;
          margin-top: 35px;
          position: absolute;
          top:10px;
          left: 25px;
          display: none;
          li{
            clear:both;
            height: 40px;
            width: 100%;
            cursor:pointer
            p{
               color:#888;
               line-height: 40px;
            }
            p:nth-child(1){
              margin-top: 12.5px;
              margin-left: 20px;
            }
            p:nth-child(2){
              margin-left: 10px;
              color:#888;
            }
           .property{
            width: 15px;
            height: 15px;
            background: url(../assets/img/property.png) no-repeat center; 
            background-size: cover; 
           }
           .account{
            width: 15px;
            height: 15px;
            background: url(../assets/img/account.png) no-repeat center; 
            background-size: cover; 
           }
           .safe{
            width: 15px;
            height: 15px;
            background: url(../assets/img/safe.png) no-repeat center; 
            background-size: cover; 
           }
          }
          li:hover{
            background: #e5eded;
          }
          li:hover p{
            color:red;
          }
          li:hover  .property{
            width: 15px;
            height: 15px;
            background: url(../assets/img/property1.png) no-repeat center; 
            background-size: cover; 
           }
           li:hover .account{
            width: 15px;
            height: 15px;
            background: url(../assets/img/account1.png) no-repeat center; 
            background-size: cover; 
           }
           li:hover  .safe{
            width: 15px;
            height: 15px;
            background: url(../assets/img/safe1.png) no-repeat center; 
            background-size: cover; 
           }
         }
         .pername:hover .mine{
          display: block;
         }
         .pername:hover span{
          display: block;
         }
         .name:hover{
          color: red;
         }
        }
     }
   }
  }
  .scrollClass{
    background:#fff;
    opacity: 0.95;
    box-shadow: 0px 1px 0px #e6e6e6;
    .cont{
      .headerleft{
         .logo{
        width:76px;
        height: 50px;
        background: url(../assets/img/index/ZHAOBI.png) no-repeat center;
        background-size: cover; 
      }
      .ptClass{
        c:#000;
      } 
      }
      color:#000;
      .contbox{
        .box{
          .label{
            color: #000;
          }
        }
        .things-personal{
          background: #e5eded;
          .drop-out{
            color:#333;
          }
          .pername{
            color:#333;
          }
        }
         .trade{
          .drop-down{
            box-shadow:0px 0px 1px 1px #abcdef;
          }
        }
        .things-personal{
          .mine{
             box-shadow:0px 0px 1px 1px #abcdef;
          }
        }
      }
     .ptClass{
       color:#000;
      z-index: 100;
      }
    }
  }
</style>