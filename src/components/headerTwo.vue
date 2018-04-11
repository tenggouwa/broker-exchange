<template>
	<div class="headerTwo">
		<div class="cont">
			<a class="logo" href='index.html'></a>
			<p class="ptClass">区块链数字资产交易平台</p>
			 <div class='contbox'>
          <ul class='box'>
           <li style=" letter-spacing:10px;"><router-link to="/index" class="label">首页</router-link></li>
           <li class='trade label'>
                <span class="title">交易
                 <p class="arrowhead">
                   <img src="../assets/img/arrowhead.png" alt="">
                 </p>
                </span>
                <p class='triangle'></p>
                 <ul class='drop-down'>
                  <li>
                   <router-link to="/usercenter/btctrade">
                    <p class='btc'></p>
                    <p >比特币BTC</p>
                   </router-link>   
                  </li>
                  <li>
                   <router-link to="/usercenter/ethtrade">
                    <p class='eth'></p>
                    <p >以太坊ETH</p>
                   </router-link>
                  </li>
                  <li>
                   <router-link to="/usercenter/etctrade">
                   <p class='stara'></p>
                   <p>以太坊经典ETC</p>
                   </router-link>
                  </li>
                  <li>
                   <router-link to="/usercenter/sctrade">
                   <p class='sc'></p>
                   <p>云储币SC</p>
                   </router-link>
                  </li>
               </ul>
           </li> 
           <li class="label">
            <router-link to="" class="label">传统交易</router-link>
           </li>
           <li class="label">
            <router-link to="/innovate" class="label">闪电交易</router-link>
           </li>
           <li>
            <div class="sign trade">
         	  <i class="icom user1"></i>
         	 <input type="text" class="usercom inputuser" id="loginusername" autocomplete="off" name="username" required="">
            <span class="quit">退出</span>
             <p class='triangle tran'></p>
              <ul class='drop-down'>
               <li>
                <router-link to="">
                <p class='assets'></p>
                <p >我的资产</p>
                </router-link>   
               </li>
               <li>
                <router-link to="">
                <p class='account'></p>
                <p >账户认证</p>
                </router-link>
               </li>
               <li>
                <router-link to="">
                <p class='security'></p>
                <p>安全认证</p>
                </router-link>
               </li>
               </ul>
             </div>
           </li>
         </ul>
      </div>
	 </div>
	</div>
</template>
<script>
import { getcookie,delatecookie } from '../assets/js/common'
	 export default{
    props:['userName'],
    data(){
      return{
        
      }
   }
}
</script>
<style>
	.headerTwo{
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.1);
    position:fixed;
    top:0;
    left:0;
    z-index: 100;  
    .cont{
      width: 1200px;
      height: 100%;
      margin:0 auto;
      display: flex;
      align-items: center;
      position: relative;
     .logo{
        width:127px;
        height: 38px;
        background: url(../assets/img/logo.png) no-repeat center;
        background-size: cover; 
      }
      p{
        font-size: 12px;
        color: #fff;
        margin-left: 15px;
      }
     .contbox{
        width:auto;
        height: 60px;
        margin-left: 30px;
        position: absolute;
        right: 0px;
        top:0px;
      .box{
      	 float: right;
         width: 100%;
         height:100%;
         display: flex;
         justify-content: flex-end;
         align-items:center;
         .sign{
         	 height: 35px;
         	/*margin-left: 20%!important;*/
           margin-left: 10px;
           position:relative;
           .icom{
             display: inline-block;
             position: absolute;
             width: 40px;
             height: 34px;
              /*margin-left:10px; */
             }
            .user1{
             background: url(../assets/img/header/wo.png) no-repeat center;
              }
         	  .usercom{
              height: 35px;
         		  width: 217px;
         		  border:2px solid #e6e6e6;
              background: rgba(255,255,255,0.3) no-repeat 24px center;
              padding-left: 35px;
              padding-right: 48px;
              }
              .quit{
                font-size: 12px;
                color: #333333;
                font-weight: 600;
                letter-spacing: 2px;
                display: inline-block;
                position:absolute;
                top:0px; 
                right: 0px;
                text-align: center;              
                width: 48px;
                height:20px;
                line-height: 20px;
                border-left:1px solid #F00;
                margin-top: 7.5px;
              }
              .quit:hover{
                color: #e61f19
              }
              .tran{
                margin-left: 30%;
              }
              .drop-down{
                position:absolute;
                top:60px;
                right: 45px;
              li{
                height: 40px;
                line-height: 40px;
              }
            }
          }
       .label{
          width: 101px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #fff;
          line-height: 60px;
         }
      .label:hover{
          color:#e61f19;
          height: 35px;
          line-height: 35px;
          background:  #e5eded;
         }
        .trade{
          position: relative;
          .triangle{
            width: 0px;
            height: 0px;
            border-top: 13px solid transparent;
            border-right: 13px solid transparent;
            border-left: 13px solid transparent;
            border-bottom: 13px solid #fff;
            position: absolute;
            top:34px;
            left:20px;
            display: none;
          }
          .arrowhead{
            position: absolute;
            top:0px;
            right: 10px;
            display: none;
          }
         }
         .trade span{
            display: block;
         }
         .trade:hover .title{
            display: block;
            text-align: center;
            line-height: 35px;
            width: 101px;
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
      }
     .drop-down{
          width: 150px;
          height: 160px;
          background: #fff;
          position: absolute;
          top:57px;
          right:-20px;
          display: none;
        li{
            height: 40px;
            width: 150px;
            display: flex;
            align-items: center;
          }
          .btc{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao1-1.png) no-repeat center;
            background-size: cover;
          }
           .eth{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao2-2.png) no-repeat center;
            background-size: cover;
          }
           .stara{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao3-3.png) no-repeat center;
            background-size: cover;
          }
           .sc{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao4-4.png) no-repeat center;
            background-size: cover;
          }
           .zec{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao5-5.png) no-repeat center;
            background-size: cover;
          }
           .bts{
            margin-top: 8px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao6-6.png) no-repeat center;
            background-size: cover;
          }
           .assets{
            margin-top:10px;
            width: 17px;
            height: 17px;
            background:url(../assets/img/header/zc.png) no-repeat center;
            background-size: cover;
           }
           .account{
            margin-top: 11px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/header/rz.png) no-repeat center;
            background-size: cover;
           }
           .security{
            margin-top: 11px;
            width: 17px;
            height: 17px;
            background: url(../assets/img/header/aq.png) no-repeat center;
           }
          li:hover .btc{
             width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao1.png) no-repeat center;
            background-size: cover;
          }
          li:hover .eth{
            width: 17px;
            height: 17px;

            background: url(../assets/img/dao/dao2.png) no-repeat center;
            background-size: cover;
          }
          li:hover .stara{
             width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao3.png) no-repeat center;
            background-size: cover;
          }
          li:hover .sc{
             width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao4.png) no-repeat center;
            background-size: cover;
          }
          li:hover .zec{
             width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao5.png) no-repeat center;
            background-size: cover;
          }
          li:hover .bts{
             width: 17px;
            height: 17px;
            background: url(../assets/img/dao/dao6.png) no-repeat center;
            background-size: cover;
          }
          li:hover{
            background: #e5eded;
          }
          li:hover .assets{
            width: 17px;
            height: 17px;
            background:url(../assets/img/header/zc1.png) no-repeat center; 
            background-size: cover;
          }
          li:hover .account{
            width: 17px;
            height: 17px;
            background:url(../assets/img/header/rz1.png) no-repeat center;
            background-size: cover;
          }
          li:hover .security{
            width: 17px;
            height: 17px;
            background: url(../assets/img/header/aq1.png) no-repeat center;
            background-size: cover;
          }
          li p{
            color:#000;
            font-size: 12px;
            float: left;
          }
          li p:hover{
            color:#e61f19;
          }
          }
         .xiala:hover{
          display: block;
         }
       }
     }
   }
  .scrollClass{
    background:#fff;
    opacity: 0.95;
    box-shadow: 0px 1px 0px #e6e6e6;
    .cont{
     .logo{
        width:127px;
        height: 38px;
        background: url(../assets/img/index/logo.png) no-repeat center;
        background-size: cover; 
      }
      p{
        c:#000;
      } 
      color:#000;
      .contbox{
        .box{
          .label{
            color: #000;
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