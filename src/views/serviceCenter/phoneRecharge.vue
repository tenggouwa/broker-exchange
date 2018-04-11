<template>
  <div class="pRecharge">
    <div class="pcontent">
      <ul class="rechange">
        <li class="pleft">话费充值</li>
        <li class="pright"></li>
      </ul>
      <div class="rechinfo">
        <div class="sinfo" v-if="issatrt==1">
          <div class="group-col">
            <label>手机号码</label>
            <input class="validate-integer" type="text" maxlength="11" id="mobile" data-validate="required phone" data-label="手机号码">
          </div>
          <div class="group-col">
            <label class="leball">充值方式</label>
            <ul class="rechtype">
              <li>比特元充值11158.813652</li>
              <li>人民币充值4125.68</li>
            </ul>
          </div>
          <div class="group-col">
            <label>BTY汇率</label>
            <span class="newprice">0.12</span>
          </div>
          <div class="group-col">
            <label class="leball">充值金额</label>
            <ul class="rechtype pp">
              <li>10元</li>
              <li>20元</li>
              <li>30元</li>
              <li>50元</li>
              <li>100元</li>
            </ul>
          </div>
          <div class="group-col">
            <input type="button" id="recharge" value="话费充值">
            <div class="phone">
              <div class="prompt">
                <p>注意：</p>
                <p>如果由于渠道维护，导致充值不成功，系统会在24小时后自动退款。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="sinfo" v-if="issatrt==0">
          <div class="group-col">
            <label>订单号</label>
            <span class="newprice">EpUozOnQZu3mIl2T</span>
          </div>
          <div class="group-col">
            <label>支付交易号</label>
            <span class="newprice">201702086DYBMF</span>
          </div>
          <div class="group-col">
            <label>支付方</label>
            <span class="newprice">133193</span>
          </div>
          <div class="group-col">
            <label>收款方</label>
            <span class="newprice"> 话费充值</span>
          </div>
          <div class="group-col">
            <label>充值手机号</label>
            <span class="newprice">13018993903</span>
          </div>
          <div class="group-col">
            <label>充值金额</label>
            <span class="newprice">10元</span>
          </div>
          <div class="group-col">
            <label>充值方式</label>
            <span class="newprice">比特元充值</span>
          </div>
          <div class="group-col">
            <label>支付总额</label>
            <span class="newprice">83.02 BTY</span>
          </div>
          <div class="group-col">
            <label>验证码</label>
            <input class="yzm" type="text" maxlength="6" data-validate="required phone">
            <input class="send-btn" type="button" value="发送验证码">
          </div>
          <div class="group-col">
            <label></label>
            <input class="yzm phok" type="button" value="话费充值">
            <input class="send-btn" type="button" value="返回充值界面">
          </div>
        </div>
      </div>
      <ul class="rechange">
        <li class="pleft">充值记录</li>
        <li class="pright"></li>
      </ul>
      <table class="phone-recharge">
        <thead>
          <tr>
            <th class="width1">交易号</th>
            <th class="width2">充值号码</th>
            <th class="width3">充值时间</th>
            <th>充值面额</th>
            <th>充值方式</th>
            <th>充值状态</th>
            <th class="width2">操作选项</th>
          </tr>
          <tr>
            <td class="width1">yJLlfUZEhgwXN9tc</td>
            <td class="width2">130****3903</td>
            <td class="width3">2017-02-08 11:01:27</td>
            <td>10</td>
            <td>比特元充值</td>
            <td>待付款</td>
            <td class="width2"><span class="alink">撤单</span></td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
   data(){
    return{
      issatrt:1,
    }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .pRecharge{
    width: 974px;
    height: 100%;
    float: right;
    background-color: #ffffff;
    margin-bottom: 40px;
    padding-bottom: 40px;
    .pcontent{
      width: 835px;
      height: 100%;
      margin: 0 auto;
      .rechinfo{
        width: 835px;
        padding: 15px 42px 40px 42px;
        margin: 0px auto;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        color: #000000;
        .sinfo{
          .group-col {
            position: relative;
            margin-top: 30px;
            padding-left: 80px;
            ul{
              margin: 0px;
              padding: 0px;
            }
            label{
              width: 125px;
              font-size: 14px;
              display: inline-block;
              color: #000000;
              /*line-height: 30px;*/
            }
            input{
              border-radius: 5px;
              height: 30px;
              width: 260px;
              text-align: right;
              padding-right: 10px;
              border: 1px solid #cccccc;
            }
            .yzm{
              width:90px; 
            }
            .send-btn{
              padding-right: 0;
              text-align: center;
              width: 90px;
              background: #fff;
              border: 1px solid #ccc;
              /*margin-left: 10px;*/
            }
            .phok{
              padding-right: 0;
              color: #fff;
              background: #c81118;
              border: 0;
              /*border-radius: 0;*/
              text-align: center;
            }
            .newprice{
              font-size: 14px;
            }
            .rechtype{
              display: inline-block;
              li{
                float: left;
                padding: 0 24px;
                border: 1px solid #ccc;
                margin-right: 15px;
                line-height: 30px;
                font-size: 12px;
              }
            }
            .pp{
              li{
                font-size: 16px;
                padding: 0 18px;
              }
            }
            .leball{
              position: relative;
              top:-6px;
            }
            #recharge{
              margin-left: 80px;
              margin-top: 15px;
              width: 180px;
              background-color: #c81118;
              color: #fff;
              border-radius: 3px;
              padding: 0 10px;
              height: 30px;
              text-align: center;
              border: 0;
            }
            .phone{
              width: 402px;
              margin-bottom: 0px;
              float: right;
              margin-top: 12px;
              margin-left: 0px;
              p{
                font-size: 12px;
                color: #000;
                display: inline-block;
                margin-left: 30px;
              }
            }
          }
        }
      }
      .phone-recharge{
        margin-top: 15px;
        tr:nth-child(2n+1){
          background: rgb(235,235,235);
        };
        tr{
          height: 30px;
          line-height: 30px;
          th,td{
            width: 108px;
            text-align: left;
            .alink{
              color: blue;
            }
          }
          .width1{
            width: 150px;
            padding-left: 25px;
          }
          .width2{
            width: 113px;
          }
          .width3{
            width: 138px;
          }
        }
      }
    }
  }
</style>
