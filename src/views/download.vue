<template>
  <div class="appLoad">
    <index-header ></index-header>
    <div class="content clearfix">
      <div class="top-part">
        <div class="msg-box">
          <h3 class="tt1">
            ZHAOBI&nbsp;专业的数字资产交易网
          </h3>
          <p class="tt3">指尖行情，自由交易</p>
          <div class="btn-box">
            <div class="left-part">
              <img style="width:200px; height:200px;" src="../assets/img/home/download.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="middle-part">
        <h3 class="tt1">区块链数字资产交易平台</h3>
        <h4 class="tt2">多年安全运营、区块链技术安全防护、优质客服服务</h4>
        <div class="tip-box">
          <div class="item">
            <img src="../assets/img/app/a01.png">
            <h5>区块链资产存证</h5>
            <p>区块链数据加密、动态身份验证，多级风险识别控制，保障交易安全</p>
          </div>
          <!-- <div class="item">
            <img src="../assets/img/app/a02.png">
            <h5>充值提款迅速</h5>
            <p>充值、提款快速到账，资金可以随时充取</p>
          </div> -->
          <div class="item">
            <img src="../assets/img/app/a03.png">
            <h5>交易清算快</h5>
            <p>交易即时清算，无需清盘等待</p>
          </div>
          <div class="item">
            <img src="../assets/img/app/a04.png">
            <h5>优质专属客服</h5>
            <p>专业的客服团队，一对一专业服务</p>
          </div>
        </div>
      </div>
      <div class="bottom-part">
        <div class="box">
          <div class="tip">
            <h3 class="tt1">安全可靠</h3>
            <p>区块链数据加密、动态身份验证，多级风险识别控制，保障交易安全</p>
          </div>
        </div>
      </div>
    </div>
    <index-footer></index-footer>
  </div>
</template>

<script type="text/javascript">
import indexHeader from '../components/newheader.vue'
import indexFooter from '../components/newfooter.vue'
import { getcookie } from '../assets/js/common'
export default{
  data(){
    return{
      islogin:0,
    }
  },
  components: {
     indexHeader,
     indexFooter
  },
  mounted(){
    this.$nextTick(()=>{
      if(getcookie('username')){
        this.islogin = 4;
      }else{
        this.islogin = 0;
      }
    });
  },
  methods:{
    goload(){
      location.href="http://d.licai.cn/app/block-wallet-release.apk";
    }
  }
} 
</script>
<style type="text/css">
.appLoad{
  .content{
    /*padding-top: 10px;*/
  }
  .bottom-part{
    height: 390px;
    background-color: #f9f9f9;
    .box{
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      background: url("../assets/img/app/p01.png") no-repeat 175px center;
      padding-left: 648px;
      p{
        font-size: 18px;
        color: #999;
        width: 287px;
        margin-top: 20px;
      }
      .tip{
        padding-top: 125px;
      }
    }
  }
  .top-part{
    height: 560px;
    background-color: #444400;
    background: url("../assets/img/app/help-banner.png") no-repeat center center;
    background-size: auto 100%;
    .msg-box{
      width: 1200px;
      margin: 0 auto;
      padding-left: 40px;
      padding-top: 185px;
      .btn-box{
        display: flex;
        margin-top: 35px;
        .right-part{
          margin-left: 20px;
          height: 160px;
          img{
            height: 100%;
          }
        }
        .left-part{
          button{
            display: block;
            width: 150px;
            height: 50px;
            line-height: 50px;
            border-radius: 5px;
            font-size: 16px;
            color: #fff;
            border:0;
            
            padding-left: 35px;
          }
          button:first-child{
            background-color:#e62018;
            margin-bottom: 20px;
            cursor: pointer;
            background:#e62018 url("../assets/img/app/andriod.png") no-repeat 20px center;
          }
          button:last-child{
            background-color:#666;
            background:#666 url("../assets/img/app/ios.png") no-repeat 20px center;
          }
        }
      }
    }
  }
  .tt1{
    font-size: 30px;
    color: #333;
  }
  .tt2{
    font-size: 14px;
    color: #666;
    margin-bottom: 65px;
  }
  .tt3{
    font-size: 22px;
    color: #333;
    line-height: 1;
    margin-top: 30px;
  }
  .middle-part{
    text-align: center;
    padding: 85px 0; 
    
    .tip-box{
      display: flex;
      width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      .item{
        width: 190px;
        h5{
          color: #000;
          font-size: 14px;
          line-height: 1;
          margin-top: 20px;
          margin-bottom:8px; 
        }
        p{
          font-size: 12px;
          color: #999;
          line-height: 1.4;
        }
      }      
    }
  }
}
</style>