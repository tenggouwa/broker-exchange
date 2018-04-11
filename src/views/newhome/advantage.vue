<template>
  <div class="advantage">
    <ul class="box_list">
      <li>
        <img src="../../assets/img/home/1.png" />
        <p>区块链资产存证</p>
        <div></div>
        <p>区块链数据加密，动态身份验证，多级风险识别控制，保障交易安全</p>
      </li>
      <!-- <li>
        <img src="../../assets/img/home/2.png" />
        <p>充值提款迅速</p>
        <div></div>
        <p>充值、提款快速到账，资金可以随时充取</p>
      </li> -->
      <li>
        <img src="../../assets/img/home/3.png" />
        <p>安全钱包存储</p>
        <div></div>
        <p>私钥存储于硬件蓝牙SIM卡和离线钱包，更加安全可靠</p>
      </li>
      <li>
        <img src="../../assets/img/home/4.png" />
        <p>优质专属客服</p>
        <div></div>
        <p>专业的客服团队，一对一专业服务</p>
      </li>
    </ul>
    <div class="bottom_img"><img src="../../assets/img/home/advantage.png" /></div>
  </div>
</template>

<script>
</script>

<style scoped>
.advantage{
  width: 1200px;
  height: 410px;
  margin: 70px auto 0;
  .box_list{
    width: 1200px;
    height: 360px;
    li{
      float: left;
      /*width: 300px;*/
      width: 400px;
      height: 360px;
      padding: 40px 20px 0;
      border-right: 1px solid #f0f0f0;
      background-color: #fff;
      text-align: center;
      p:nth-of-type(1){
        margin-top: 16px;
        font-size: 18px;
        color: #444;
      }
      div{
        width: 40px;
        height: 4px;
        border: 2px solid #ce181d;
        margin: 18px auto;
      }
      p:nth-of-type(2){
        font-size: 14px;
        color: #888;
      }
    }
  }
  .bottom_img{
    width: 700px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    top: -50px;
  }
}
</style>
