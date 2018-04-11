<template>
  <div class="hangqing">
    <ul class="nav">
      <li class="pointer" @click="ismarket=true">市场行情</li>
      <li class="pointer" @click="ismarket=false">平台行情</li>
    </ul>
    <div class="market_cont" v-if="ismarket==true">
      <ul class="title_list">
        <li>交易市场</li>
        <li>最新成交价</li>
        <li>买价</li>
        <li>卖价</li>
        <li>24h最高价</li>
        <li>24h最低价</li>
        <li>24h成交量</li>
      </ul>
      <ul class="icons">
        <li>
          <img src="../../assets/img/home/BTC.png" />
          <p>BTC/CNY</p>
        </li>
        <li>
          <img src="../../assets/img/home/ETH.png" />
          <p>ETH/CNY</p>
        </li>
        <li>
          <img src="../../assets/img/home/ETC.png" />
          <p>ETC/CNY</p>
        </li>
      </ul>
      <div class="cont_right">
        <div class="btc">
          <ul>
            <li>
              <img src="#" />
              <p>Licai.cn</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Poloniex</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Huobi</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Okcoin</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
        </div>
        <div class="eth">
          <ul>
            <li>
              <img src="#" />
              <p>Licai.cn</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Poloniex</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Yunbi</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Chbtc</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
        </div>
        <div class="etc">
          <ul>
            <li>
              <img src="#" />
              <p>Licai.cn</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Kraken</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Poloniex</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Yunbi</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
          <ul>
            <li>
              <img src="#" />
              <p>Chbtc</p>
            </li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
            <li>19759</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="platform_cont" v-if="ismarket===false">
      <ul class="title_list">
        <li>交易市场</li>
        <li>最新成交价</li>
        <li>涨跌幅</li>
        <li>买价</li>
        <li>卖价</li>
        <li>24h最高价</li>
        <li>24h最低价</li>
        <li>24h成交量</li>
      </ul>
      <div class="content">
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_1.png" />
            <p>BTC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_2.png" />
            <p>BCC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_3.png" />
            <p>ETH/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_4.png" />
            <p>ETC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_5.png" />
            <p>SC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_6.png" />
            <p>ZEC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_7.png" />
            <p>BTS/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
        <ul>
          <li>
            <img src="../../assets/img/home/26_1_8.png" />
            <p>LTC/CNY</p>
          </li>
          <li>19759.77</li>
          <li>-2.02%</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>19759.77</li>
          <li>75654521</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      ismarket: true,
    }
  },
  methods:{

  },
}
</script>

<style scoped>
.hangqing{
  width: 1200px;
  height: 610px;
  margin: 70px auto 0;
  .nav{
    width: 100%;
    height: 50px;
    background-color: #f8f8f8;
    li{
      float: left;
      width: 200px;
      height: 50px;
      line-height: 50px;
      font-family: "AdobeHeitiStd-Regular";
      font-size: 18px;
      color: #888;
    }
    li:hover{
      border-bottom: 4px solid #ce181d;
      color: #ce181d;
    }
  }
  .market_cont{
    background-color: #f8f8f8;
    .title_list{
      padding-left: 100px;
      width: 1200px;
      height: 40px;
      li{
        float: left;
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #888;
        text-align: right;
      }
      li:nth-of-type(1){
        width: 170px;
        text-align: center;
      }
    }
    .icons{
      float: left;
      width: 100px;
      height: 520px;
      li{
        width: 100px;
        padding-top: 40px;
        font-family: "Arial";
        font-weight: bold;
        font-size: 16px;
        color: #fff;
      }
      li:nth-of-type(1){
        background-color: #edd079;
        height: 160px;
      }
      li:nth-of-type(2){
        background-color: #93d3d5;
        height: 160px;
      }
      li:nth-of-type(3){
        background-color: #9edba7;
        height: 200px;
        padding-top: 60px;
      }
    }
    .cont_right{
      float: left;
      .btc,.eth,.etc{
        width: 1100px;
        height: 160px;
        background-color: #f8f6eb;
        ul{
          li{
            float: left;
            width: 150px;
            height: 40px;
            line-height: 40px;
            text-align: right;
            font-family: "Arial";
            font-size: 14px;
            color: #444;
            border-top: 1px solid #f0f0f0;
          }
          li:nth-of-type(1){
            width: 170px;
            padding-left: 40px;
            text-align: left;
            img{
              float: left;
            }
            p{
              float: left;
              font-family: "Arial";
              font-size: 14px;
              color: #444;
            }
          }
          li:nth-of-type(2){
            font-size: 16px;
            color: #ce181d;
          }
        }
      }
      .eth{
        background-color: #e6f8f8;
      }
      .etc{
        background-color: #eaf8ec;
        height: 200px;
      }
    }
  }
  .platform_cont{
    background-color: #f8f8f8;
    font-size: 14px;
    text-align: right;
    .title_list{
      width: 1200px;
      height: 40px;
      line-height: 40px;
      li{
        float: left;
        width: 150px;
        height: 40px;
        color: #888;
      }
      li:nth-of-type(1){
        width: 120px;
        margin-left: 30px;
        text-align: left;
      }
      li:nth-of-type(2){
        width: 120px;
      }
    }
    .content{
      width: 1200px;
      ul{
        width: 1200px;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #f0f0f0;
        li{
          width: 150px;
          height: 40px;
          float: left;
          color: #444;
        }
        li:nth-of-type(1){
          text-align: left;
          width: 120px;
          margin-left: 30px;
          img{
            float: left;
            margin-top: 7px;
            margin-right: 5px;
          }
          p{
            float: left;
          }
        }
        li:nth-of-type(2){
          width: 120px;
          color: #ce181d;
          font-family: "Arial-MT";
          font-size: 16px;
        }
        li:nth-of-type(3){
          color: #3a7a27;
          font-family: "Arial-MT";
          font-size: 16px;
        }
      }
      ul:nth-of-type(odd){
        background-color: #fff;
      }
    }
  }
}
</style>
