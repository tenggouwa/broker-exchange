<template>
  <div class="rate-box">
    <h2>费率说明</h2>
    <!-- <p class="title">充值提款</p>
    <p class="main">充值、提款免手续费！</p> -->
    <p class="title">提币矿工费</p>
    <!-- <p class="main">各币种交易、提币的手续费：</p> -->
    <div>
      <table>
        <thead>
          <tr>
            <th class="th1"><span>币种</span></th>
            <!-- <th class="th2"><span>交易手续费</span></th> -->
            <th class="th3"><span>提币矿工费</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td1"><span>BTC</span></td>
            <!-- <td rowspan="7"><span>1‰</span></td> -->
            <td class="td1"><span>0.0001BTC~0.001BTC</span></td>
          </tr>
          <tr>
            <td class="td1-1"><span>BCC</span></td>
            <td><span>0.0001BCC</span></td>
          </tr>
          <tr>
            <td class="td1"><span>ETH</span></td>
            <td class="td1"><span>0.001ETH</span></td>
          </tr>
          <tr>
            <td class="td1-1"><span>ETC</span></td>
            <td class="td1-1"><span>0.01ETC</span></td>
          </tr>
          <!-- <tr>
            <td class="td1-1"><span>SC</span></td>
            <td><span>每次10个SC</span></td>
          </tr> -->
          <tr>
            <td class="td1"><span>ZEC</span></td>
            <td class="td1"><span>0.001ZEC</span></td>
          </tr>
          <!-- <tr>
            <td class="td1-1"><span>BTS</span></td>
            <td><span>每次5个BTS</span></td>
          </tr> -->
          <tr>
            <td class="td1-1"><span>LTC</span></td>
            <td class="td1-1"><span>0.001LTC</span></td>
          </tr>
          <tr>
            <td class="td1-1"><span>DCR</span></td>
            <td class="td1-1"><span>0.005DCR</span></td>
          </tr>
          <tr>
            <td class="td1-1"><span>SC</span></td>
            <td class="td1-1"><span>10SC</span></td>
          </tr>
          <tr>
            <td class="td1-1"><span>BTS</span></td>
            <td class="td1-1"><span>5BTS</span></td>
          </tr>
          <!-- <tr>
            <td class="td1-1"><span>BTCS</span></td>
            <td class="td1-1"><span>暂未开放</span></td>
          </tr> -->
          <tr>
            <td class="td1-1"><span>BTY</span></td>
            <td class="td1-1"><span>0.001BTY</span></td>
          </tr>
        </tbody>
      </table>
      <div class="bottom">
        <p class="title">交易手续费</p>
        <p class="main">所有交易的手续费均为千分之一;</p>
      </div>
    </div>
  </div>
</template>
<script>
  
</script>
<style>
.rate-box {
    background-color: #fff;
    min-height: 500px;
    margin: 0 auto;
    width: 887px;
    h2{
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      color: #000;
      border-bottom:1px solid  #e6e6e6;
    }
    .title{
      margin-top: 40px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
    .main{
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
    table{
      text-align: center;
      margin-top: 20px; 
      th{
        text-align: center;
        border: 1px solid #edeff4;
      }
      td{
        border: 1px solid #edeff4;
      }
      span{
        font-size: 14px;
        color: #333;
      }
      .th1,.td1,.td1-1{
        height: 40px;
      }
      .th1{ width: 160px; }
      .th2{ width: 232px; }
      .th3{ width: 495px; }
      .td1{
        background: #edeff4;
      }
    }
    .bottom{
      padding-bottom: 77px; 
    }
}
</style>