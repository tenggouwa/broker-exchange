<template>
  <div class="skdata">
    <ul class="coinListclass">
      <li :class="{liactive:liactive=='btc'}"  @mouseover="hovecoin('btc')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/btc.png" alt=""> BTC/CNY
          <p>{{coinlastdata.btclastdata}}</p>
        </div>
        
      </li>
      <li :class="{liactive:liactive=='eth'}" @mouseover="hovecoin('eth')">
        <div class="title" align="center" >
          <img src="../../assets/img/newicon/eth.png" alt=""> ETH/CNY 
          <p>{{coinlastdata.ethlastdata}}</p>
        </div>
       
      </li>
      <li :class="{liactive:liactive=='etc'}" @mouseover="hovecoin('etc')">
        <div class="title" align="center" >
          <img src="../../assets/img/newicon/etc.png" alt=""> ETC/CNY
          <p>{{coinlastdata.etclastdata}}</p>
        </div>
        
      </li>
      <li :class="{liactive:liactive=='sc'}" @mouseover="hovecoin('sc')">
        <div class="title" align="center" > <!--  @mouseover="hovecoin('sc')" -->
          <img src="../../assets/img/newicon/sc.png" alt=""> SC/CNY
          <img src="../../assets/img/newicon/new.png" class="tip" >
          <!-- <p>即将上线</p> -->
          <p>{{coinlastdata.sclastdata}}</p>
        </div>
       
      </li>
      <li :class="{liactive:liactive=='zec'}">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/zec.png" alt=""> ZEC/CNY
          <img src="../../assets/img/newicon/new.png" class="tip" >
           <p>即将上线</p>
        </div>
       
      </li>
      <li :class="{liactive:liactive=='bts'}">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/bts.png" alt=""> BTS/CNY
          <img src="../../assets/img/newicon/new.png" class="tip">
          <p>即将上线</p>
        </div>
        
      </li>
    </ul>
    <div id="kdata" class="echarts">
    </div>
    <div class="allmarket">
      <table>
        <thead>
          <tr class="trheader">
            <th class="fristth ">交易市场</th>
            <th>币种</th>
            <th>最新成交价</th>
            <th>买价</th>
            <th>卖价</th>
            <th>成交量</th>
            <th>24H最高价</th>
            <th>24H最低价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in btcdata">
            <td class="fristth" v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-huobi':isiconhuobi(index),'icon-okcoin':isiconokcoin(index),'icon-yunbi':isiconyunbi(index),'icon-chinabit':isiconchinabit(index),'icon-kraken':isiconkraken(index),'ico-bitfinex':isiconbitfinex(index)}" >
               <a  @click="goTO('BTC')">{{index | iconname}}</a>
            </td>
            <td>BTC/CNY</td>
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
          </tr>
          <tr v-for="(item,index) in ethdata">
            <td class=" fristth " v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-huobi':isiconhuobi(index),'icon-okcoin':isiconokcoin(index),'icon-yunbi':isiconyunbi(index),'icon-chinabit':isiconchinabit(index),'icon-kraken':isiconkraken(index),'ico-bitfinex':isiconbitfinex(index)}">
              <a target="_blank"  @click="goTO('ETH')">{{index | iconname}}</a>
            </td>
            <td>ETH/CNY</td>
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
          </tr>
          <tr v-for="(item,index) in etcdata">
            <td class="fristth" v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-huobi':isiconhuobi(index),'icon-okcoin':isiconokcoin(index),'icon-yunbi':isiconyunbi(index),'icon-chinabit':isiconchinabit(index),'icon-kraken':isiconkraken(index),'ico-bitfinex':isiconbitfinex(index)}">
              <a  @click="goTO('ETC')">{{index | iconname}}</a>
            </td>
            <td>ETC/CNY</td>
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
          </tr>
          <tr v-for="(item,index) in scdata">
            <td class="fristth" v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-yunbi':isiconyunbi(index)}">
              <a onclick="javascript:$.cookie('symbol','SC');" >{{index | iconname}}</a><!-- @click="goTO('SC')" -->
            </td>
            <td>SC/CNY</td>
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
          </tr>
          <!-- <tr v-for="(item,index) in btydata">
            <td class="fristth" v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-huobi':isiconhuobi(index),'icon-okcoin':isiconokcoin(index),'icon-yunbi':isiconyunbi(index),'icon-chinabit':isiconchinabit(index),'icon-kraken':isiconkraken(index),'ico-bitfinex':isiconbitfinex(index)}">
              <a onclick="javascript:$.cookie('symbol','ETC');" href="traditional-trading.html">{{index |capitalize}}</a>
            </td>
            <td>BTY/CNY</td>
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <div class="selectReason">
      <p>为什么选择区块链</p>
      <ul class="Reason">
        <li>
          <img src="../../assets/img/ico1-1.png" alt="">
          <h2>成本低</h2>
          <p>区块链是一个几乎无法更改的分布式数据库，黑客或内部人员都无法更改交易记录，安全维护成本低</p>
        </li>
        <li>
          <img src="../../assets/img/ico2-2.png" alt="">
          <h2>纠纷少</h2>
          <p>用户隐私信息加密保存，任何交易都需要经由用户私钥加密签名，无需在网络上传递密码，可大量减少纠纷</p>
        </li>
        <li>
          <img src="../../assets/img/ico3-3.png" alt="">
          <h2>信用足</h2>
          <p>数字货币的发行、提取及交易信息全部实时写入区块链，可全面实现无纸化交易，用户可自行查询区块链进行监督，提升了交易所的可信度</p>
        </li>
        <li>
          <img src="../../assets/img/ico4-4.png" alt="">
          <h2>安全高</h2>
          <p>多服务器同时提供服务，对部分服务器维护或服务器被攻击时，交易都可以正常运行</p>
        </li>
        <li>
          <img src="../../assets/img/ico5-5.png" alt="">
          <h2>管理易</h2>
          <p>方便用户身份管理，可采用更安全高效的用户帐户管理规则，减少帐户被盗用的可能性</p>
        </li>
        <li>
          <img src="../../assets/img/ico6-6.png" alt="">
          <h2>应用广</h2>
          <p>区块链系统连续在线，交易所可随时推出新品，不受时间地域限制</p>
        </li>
        <li>
          <img src="../../assets/img/ico7-7.png" alt="">
          <h2>清算快</h2>
          <p>交易一旦完成，即时逐笔清算交易资金，无需停盘等待清算</p>
        </li>
        <li>
          <img src="../../assets/img/ico8-8.png" alt="">
          <h2>成本低</h2>
          <p>区块链智能合约可以灵活实施更多管理权限和交易规则，比如可设置灵活的计费规则</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '../../config/api-config'
import ECharts from "echarts"
export default{
  data(){
    return{
      liactive:'btc',
      luntime:0,
      coinlastdata:{
        btclastdata:'',
        ethlastdata:'',
        etclastdata:'',
        sclastdata:''
      },
      coindata:{},
      btcdata:{},
      etcdata:{},
      scdata:{},
      ethdata:{},
      xdata:[],
      chartdata:[],
      chart:null,
      cointype:'btc',
    }
  },
  mounted:function(){
    var _this=this;
     this.getlastdata();
     this.chart = ECharts.init(document.querySelector('.echarts'));
      this.chart.setOption({
        title: { text: '' },
        tooltip: {
          trigger: 'axis'
        },
        grid: {  
          left: '0%',  
          right: '0%',  
          bottom: '0%',// 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。  
          containLabel: true  
        },
        xAxis: { 
            type : 'category', 
            axisLine:{
              width: 1,
              shadowOffsetX:0,
              interval:0 
            },
            data : []// X轴的定义  
        },
        yAxis: {
            type:'value',

        },
        series: [{
            name: '',
            type: 'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                  color: 'rgb(131, 198, 248)'
              }
            },
            areaStyle: {
              normal: {
                  color: ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgb(32, 160, 255)'
                  }, {
                      offset: 1,
                      color: 'rgb(22, 131, 211)'
                  }])
              }
            },
            data: []
        }]
      });
      _this.getkdata(_this.cointype);
      _this.luntime=setInterval(function () {
         _this.getlastdata();
         _this.getkdata(_this.cointype);
        }, 5000)
  },
  destroyed:function(){
    clearInterval(this.luntime);
  },
  filters:{
    iconname: function (str) {
      if(str=="33.cn"){
        str="Licai.cn"
      }
       return str
    }
  },
  methods:{
    hovecoin(cointype){
      this.liactive=cointype;
      this.cointype=cointype;
      this.getkdata(cointype);
    },
    isicon33(e){
      if(e.indexOf('33')>=0||e.indexOf('Bityuan')>=0){
        return true;
      }
    },
    isiconpoloniex(e){
      if(e.indexOf('Poloniex')>=0){
        return true;
      }
    },
    isiconhuobi(e){
      if(e.indexOf('Huobi')>=0){
        return true;
      }
    },
    isiconokcoin(e){
      if(e.indexOf('Okcoin')>=0){
        return true;
      }
    },
    isiconkraken(e){
      if(e.indexOf('Kraken')>=0){
        return true;
      }
    },
    isiconchinabit(e){
      if(e.indexOf('Chbtc')>=0){
        return true;
      }
    },
    isiconbitfinex(e){
      if(e.indexOf('Bitfinex')>=0){
        return true;
      }
    },
    isiconyunbi(e){
      if(e.indexOf('Yunbi')>=0){
        return true;
      }
    },
    getlastdata(){//获取个平台的最新价
      var _this=this;
      this.axios.post(api.getcoindata,{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        }
      })
      .then(function(response){
        if(response.status==200){
          var coinlastdata=response.data;
          //获取33平台的各币种的最新价
          _this.coinlastdata.btclastdata=parseFloat(response.data.BTCCNY['33.cn'].last).toFixed(2);
          _this.coinlastdata.ethlastdata=parseFloat(response.data.ETHCNY['33.cn'].last).toFixed(2); 
          _this.coinlastdata.etclastdata=parseFloat(response.data.ETCCNY['33.cn'].last).toFixed(2);
           _this.coinlastdata.sclastdata=parseFloat(response.data.SCCNY['33.cn'].last).toFixed(2);
          // _this.coinlastdata.btylastdata=parseFloat(response.data.BTYCNY['Bityuan'].last).toFixed(2);
          _this.btcdata=response.data.BTCCNY;
          _this.etcdata=response.data.ETCCNY;
          _this.ethdata=response.data.ETHCNY;
          _this.scdata=response.data.SCCNY;

        }
        else{
          console.log("Interface abnormal:接口异常");
          _this.coinlastdata.btclastdata='--';
          _this.coinlastdata.ethlastdata='--'; 
          _this.coinlastdata.etclastdata='--';
          _this.coinlastdata.sclastdata='--';
        }
      })
      .catch(function(error){
        console.log(error);
      })
    },
    getDataYear(format,timestamp){//时间转化
      var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
      var FORMAT = new Object();
      FORMAT = {
          'Y': "date.getFullYear()",
          'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
          'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
          'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
          'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
          's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
      }
      for (var i in FORMAT) {
          if (format.indexOf(i) != -1) {
              format = format.replace(i, eval(FORMAT[i]));
          }
      }
      return format;
    },
    getkdata(e){
      var _this=this;
      var minPrice = 0;
      var maxPrice = 0;
      this.axios.get(api.getCoinMarketDate,{
        params:{
          c: e,
          p: "M1",
          action: "init",
          count: 100,
          ind: "volumes",
          out: "json"
        }
      },{
          headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
         }
       })
      .then(function(data){
        if(data.status==200){
          //数据来源在data.data
          var data=data.data;
          for (let k in data.main.x) {
            var date=_this.getDataYear('M-D h:m:s',data.main.x[k]);
            _this.xdata[k] =date;
          }
          for (let y in data.main.y) {
            _this.chartdata[y] = new Array();
            _this.chartdata[y].push(_this.xdata[y]);
            _this.chartdata[y].push(data.main.y[y][1]);
            if (minPrice == 0 || minPrice > data.main.y[y][1]) {
              minPrice = data.main.y[y][1];
            }
            if (minPrice == 0 || maxPrice < data.main.y[y][1]) {
              maxPrice = data.main.y[y][1];
            }
          }
          _this.chart.setOption({
            xAxis: {
              data: _this.xdata
            },
            yAxis: {
              min:minPrice,
              max:maxPrice
            },
            series: [{
              // 根据名字对应到相应的系列
              name: '当前价',
              data: _this.chartdata
             }]
          })
        }
        
      })
      .catch(function(error){
        console.log(error);
      })
    },
    goTO(symbol){
      sessionStorage.setItem('symbol',symbol);
       this.$router.push({
            path: '/traditional'
          });
    }
  }
}
</script>
<style>
  .skdata{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    canvas{
      display: block!important;
    }
    /*.coinmarkt{
      width: 100%;
      height: 106px;
      li{
        float: left;
        width: 25%;
        height: 106px;
        border-bottom: 4px solid #f0f1f3;
        cursor: pointer;
        img{
          float: left;
          width: 58px;
          height: 58px;
          margin-top: 23px;
          margin-left: 60px;
          opacity: 0.7;
        }
        .newprice{
          float: left;
          margin-left: 30px;
          margin-top: 30px;
          p{
            text-align: left;
            font-size: 16px;
            font-weight: bold;
          }
          .name{
            color: #666;
          }
          .price{
            font-size: 18px;
            margin-top: 5px;
            color: #c81118;
          }
        }
      }
      .liactive{
        border-bottom: 4px solid #c81118;
        img{
          opacity: 1;
        }
      }
    }*/
    .coinListclass{
      width: 1200px;
      height: 108px;
      background-color:#f5f5f5;
      overflow: hidden;
      li{
        padding: 25px 0;
        float: left;
        cursor: pointer;
        width: 200px;
        height: 108px;
        text-align:center;
        vertical-align: middle;

        .title{
          height: 50px;
          border-right:1px solid #ccc; 
          font-size: 14px;
          color: #333;
          text-align: middle;
          
          /*font-weight: bolder;*/
          img{
            height: 25px;
            vertical-align: middle;
            margin-right: 15px;
          }
          .tip{
          /*  position: fixed;*/
            margin-top: -16px;
            margin-left: 5px;
            h:12px;
            w:22px;
          }
           p{
            padding-top: 13px;
            font-size: 18px;
            color: #999;
            /*font-weight: bolder;*/
          }
        }
        
      }
      
      .liactive{
        bg:#fff;
         border-top: 3px solid #ff0000;
         .title{

          border-right:0px solid #ccc; 
            height: 50px;
            font-size: 14px;
            color: #000;
            text-align: middle;
            
            font-weight: bolder;
            img{
              height: 25px;
              vertical-align: middle;
              margin-right: 15px;
            }
            .tip{
              /*  position: fixed;*/
                margin-top: -16px;
                margin-left: 5px;
                h:12px;
                w:22px;
              }
            p{
              padding-top: 13px;
              font-size: 18px;
              color: #ff0000;
              font-weight: bolder;
            }

          }
           
      }

    }
    #kdata{
      width: 100%;
      height: 300px;
    }
    .allmarket{
      margin-top: 50px;
      width: 100%;
      height: 100%;
      table{
        .trheader{
          background: #e6e6e6;
          th{
            font-size: 15px;
          }
        }
        tr{
          width: 1200px;
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #e6e6e6;
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          th,td{
            text-align: right;
            height: 35px;
            width: 150px;
            padding: 0 20px;
          }
          td{
            font-size: 12px;
          }
          .fristth{
            text-align: left;
            a{
              position: relative;
              left: 32px;
            }
            
            
          }
          .icon-33{
            background: url(../../assets/img/33ico.png) no-repeat 20px;
            background-size: 25px;
          }
          .icon-poloniex {
              background: url(../../assets/img/ico-poloniex.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-yunbi {
              background: url(../../assets/img/ico-yunbi.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-chinabit {
              background: url(../../assets/img/ico-chinabit.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-bitfinex {
              background: url(../../assets/img/ico-bitfinex.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-huobi {
              background: url(../../assets/img/ico-huobi.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-kraken {
              background: url(../../assets/img/ico-kraken.png) no-repeat 20px center;
              background-size: 25px;
          }
          .icon-okcoin{
              background: url(../../assets/img/ico-okcoin.png) no-repeat 20px center;
              background-size: 25px;
          }

        }
      }
    }
    .selectReason{
      width: 1200px;
      height: 580px;
      margin: 45px auto 0;
      p{
        font-size: 24px;
        color: #000;
        text-align: center;
      }
      .Reason{
        width: 1100px;
        margin: 50px auto 0;
        padding: 0 20px;
        li{
          width: 265px;
          height: 245px;
          padding: 0 42px;
          /*border:1px solid #ccc;*/
          text-align: center;
          float: left;
          h2{
            font-size: 18px;
            color: #588fbd;
            padding: 20px 0; 
          }
          p{
            font-size: 14px;
            color: #666;
            text-align: left;
          }
        }
      }
    }
    /*background: #000;*/
  }
</style>