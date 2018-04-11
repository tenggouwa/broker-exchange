<template>
  <div class="skdata"> 
  <div style="width:100%;height:20px;background:#e4ebee" class='tiao'></div>
  <div class="box">
    <ul class="coinListclass">
      <li :class="{liactive:liactive=='BTCCNY'}"  @mouseover="hovecoin('btc')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/btc.png" alt="">比特币BTC 
        </div> 
      </li>
      <li :class="{liactive:liactive=='ETHCNY'}" @mouseover="hovecoin('eth')">
        <div class="title" align="center" >
          <img src="../../assets/img/newicon/eth.png" alt=""> 以太坊ETH
        </div>
      </li>
      <li :class="{liactive:liactive=='ETCCNY'}" @mouseover="hovecoin('etc')">
        <div class="title" align="center" >
          <img src="../../assets/img/newicon/etc.png" alt=""> 以太坊经典ETC
        </div>
      </li>
      <li :class="{liactive:liactive=='SCCNY'}" @mouseover="hovecoin('sc')">
        <div class="title" align="center" > 
          <img src="../../assets/img/newicon/sc.png" alt="">云储币SC
          <!-- <img src="../../assets/img/newicon/new.png" class="tip" > -->
        </div>
      </li>
      <li :class="{liactive:liactive=='ZECCNY'}" @mouseover="hovecoin('zec')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/zec.png" alt="">零币ZEC
          <!-- <img src="../../assets/img/newicon/new.png" class="tip" > -->
        </div> 
      </li>
      <li :class="{liactive:liactive=='BTSCNY'}" @mouseover="hovecoin('bts')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/bts.png" alt=""> 比特股BTS
          <!-- <img src="../../assets/img/newicon/new.png" class="tip"> -->
        </div> 
      </li>
      <li :class="{liactive:liactive=='LTCCNY'}" @mouseover="hovecoin('ltc')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/indexltc.png" alt="">莱特币LTC
          <!-- <img src="../../assets/img/newicon/new.png" class="tip"> -->
        </div> 
      </li>
      <li :class="{liactive:liactive=='BCCCNY'}" @mouseover="hovecoin('bcc')">
        <div class="title" align="center">
          <img src="../../assets/img/newicon/bcc.png" alt="">比特现金BCC
          <!-- <img src="../../assets/img/newicon/new.png" class="tip"> -->
        </div> 
      </li>
    </ul>
    <div class='marketbox'>
      <ul class='business'>
        <li>最新成交价：</li>
        <li class='two jia'>{{coinlastdata.last}}</li>
      </ul>
       <ul class='business'>
        <li>涨跌幅：</li>
        <li class='two fu' v-bind:class="{highslows:isActive}">{{coinlastdata | getRise }}%</li>
      </ul>
       <ul class='business'>
        <li>24小时最高价：</li>
        <li class='two'>{{coinlastdata.high}}</li>
      </ul>
       <ul class='business'>
        <li>24小时最低价：</li>
        <li class='two'>{{coinlastdata.low}}</li>
      </ul>
       <ul class='business'>
        <li>成交量：</li>
        <li class='two'>{{coinlastdata.vol}}</li>
      </ul>
    </div>
    <div id="kdata" class="echarts">
    </div>
    <p class="awaing">
      数字资产的价格波动较大，可能会有较高的投资风险，请投资者充分认识投资风险，谨慎投资。
    </p>
    <div class="allmarket">
      <div class='label'>
        <ul class='market'>
          <li class='marketicon'><img src="../../assets/img/hangqing.png" alt=""></li>
          <li class='price'>币价行情</li>
        </ul>
        <ul class='classify'>
          <li :class="{liactive:quoteType=='BTCCNY'}" @click="getETHdata('BTCCNY')" style="cursor:pointer">BTC</li>
          <li :class="{liactive:quoteType=='ETHCNY'}" @click="getETHdata('ETHCNY')" style="cursor:pointer">ETH</li>
          <li :class="{liactive:quoteType=='ETCCNY'}" @click="getETHdata('ETCCNY')" style="cursor:pointer">ETC</li>
          <li :class="{liactive:quoteType=='SCCNY'}"  @click="getETHdata('SCCNY')" style="cursor:pointer">SC</li>
          <li :class="{liactive:quoteType=='ZECCNY'}" @click="getETHdata('ZECCNY')" style="cursor:pointer">ZEC</li>
          <li :class="{liactive:quoteType=='BTSCNY'}" @click="getETHdata('BTSCNY')" style="cursor:pointer">BTS</li>
          <li :class="{liactive:quoteType=='LTCCNY'}" @click="getETHdata('LTCCNY')" style="cursor:pointer">LTC</li>
          <li :class="{liactive:quoteType=='BCCCNY'}" @click="getETHdata('BCCCNY')" style="cursor:pointer">BCC</li>
          <!-- <li :class="{liactive:quoteType=='NYCCCNY'}" @click="getETHdata('NYCCCNY')" style="cursor:pointer">YCC</li>
          <li :class="{liactive:quoteType=='WTCCNY'}" @click="getETHdata('WTCCNY')" style="cursor:pointer">WDT</li> -->
        </ul>
      </div>
      <table>
        <thead>
          <tr class="trheader">
            <th class="fristth ">交易市场</th>
            <!-- <th>涨幅%</th> -->
            <th>最新成交价￥</th>
            <th>买价￥</th>
            <th>卖价￥</th>
            <th>成交量</th>
            <th>24H最高价￥</th>
            <th>24H最低价￥</th>
            <!-- <th>涨跌</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in quotateDate">
            <td class="fristth" v-bind:class="{'icon-33':isicon33(index),'icon-poloniex':isiconpoloniex(index),'icon-huobi':isiconhuobi(index),'icon-okcoin':isiconokcoin(index),'icon-yunbi':isiconyunbi(index),'icon-chinabit':isiconchinabit(index),'icon-kraken':isiconkraken(index),'ico-bitfinex':isiconbitfinex(index)}" >
               <a  @click="goTO(quoteType)">{{index | iconname}}</a>
            </td>
            <!-- <td>{{item | getRise}}</td> -->
            <td>{{item.last}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.sell}}</td>
            <td>{{item.vol}}</td>
            <td>{{item.high}}</td>
            <td>{{item.low}}</td>
            <!-- <td>{{item | getFall}}</td> -->
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div style="width:100%;height:20px"></div>
    <div class="selectReason">
      <div class="select">
        <div class="selectbox">
          <div class='selecttop'></div>
          <ul class='selectbt'>
            <li class="andimg">
              <img src="../../assets/img/app/andimg.png">
            </li>
            <li class="iosimg">
              <img src="../../assets/img/app/iosimg.png">
            </li>
            <!-- <li class="and">
              <p><img src="../../assets/img/zj.png" alt=""></p>
              <p><a href="http://d.licai.cn/app/block-wallet-release.apk">安卓下载</a></p>
            </li>
            <li class='ios'>
              <p><img src="../../assets/img/pg.png" alt=""></p>
              <p><a href="https://m.licai.cn">苹果下载</a></p>
            </li>
            <li>
              <img src="../../assets/img/licaier.jpg">
            </li> -->
          </ul>
        </div>  
       <div class='selectright'>
          <img src="../../assets/img/phon.png" alt="">
       </div>
      </div>
    </div>
    <div style="width:100%;height:20px;background:#e4ebee"></div>
  </div>
</template>
<script>
import api from '../../config/api-config'
import {jqueryAjax} from '../../assets/js/common'
import ECharts from "echarts"
export default{
  data(){
    return{
      liactive:'BTCCNY',
      luntime:0,
      coinlastdata:{
      },
      quoteType:'BTCCNY',
      quotateDate:{},
      xdata:[],
      chartdata:[],
      chart:null,
      cointype:'btc',
      isActive:false,
    }
  },
  mounted:function(){
    var _this=this;
     this.getlastdata();
     this.getETHdata('BTCCNY')
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
                  color: 'rgb(83, 153, 225)'
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
    },
    getRise:function(e){
      let difference=(parseFloat(e.last))-parseFloat(e.open);
      let rose=(parseFloat(difference)/parseFloat(e.open))*100 ;
      // return parseFloat(rose).toFixed(2);
      let num=parseFloat(rose).toFixed(2);
      return num
    },
    getFall:function(e){
      let difference=parseFloat(e.open)-(parseFloat(e.last));
      return parseFloat(difference).toFixed(2);
    }
  },
  methods:{
    getETHdata(type){
      var _this=this;
      _this.quoteType=type;
      this.axios.post(api.getcoindata,{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        }
      })
      .then(function(response){
        if(response.status==200){
          let coinlastdata=response.data;
          let data=coinlastdata[type];
          _this.quotateDate=data;
        }
        else{
          console.log("Interface abnormal:接口异常");
        }
      })
      .catch(function(error){
        console.log(error);
      })
    },
    hovecoin(cointype){
      this.liactive=cointype.toUpperCase()+'CNY';
      this.cointype=cointype;
      this.getlastdata()
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

      this.axios.get(api.getcoindata,{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        }
      })
      .then(function(response){
        if(response.status==200){
          let coinlastdata=response.data;
          let data=coinlastdata[_this.liactive];
          _this.coinlastdata=data['33.cn'];
          let difference=(parseFloat(_this.coinlastdata.last))-parseFloat(_this.coinlastdata.open);
          if(difference<0){
            _this.isActive=false;
          } 
          else{
            _this.isActive=true;
          }
        }
        else{
          console.log("Interface abnormal:接口异常");
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
   
    background: #fff;
    .box{
      width: 1200px;
      height: 100%;
      margin:0 auto;
    }
    canvas{
      display: block!important;
    }
    .coinListclass{
      width: 1200px;
      height: 60px;
      border-bottom: 2px solid #e6e6e6;
      li{
        float: left;
        cursor: pointer;
        width: 150px;
        text-align:center;
        vertical-align: middle;
        line-height: 60px;
        .title{
          height: 50px;
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
           /*float: right;*/
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
         border-bottom: 2px solid red;
         height: 60px;
         .title{
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
    .tiao{
      margin-top: 10px;
    }
    .marketbox{
      width: 100%;
      height: 90px;
      ul{
        float: left;
        li{
           float: left;
          line-height: 90px;
          font-size: 12px;
        }
        .two{
          width: 135px;
          margin-left: 25px;
          font-size: 24px;
          font-family: DIN
        }
        .jia{
          color:#ff0000;
        }
        .fu{
          color:green;
        }
        .highslows{
          color:red;
        }
      }
    }
    #kdata{
      width: 100%;
      height: 300px;
    }
    .awaing{
      width: 100%;
      height: 36px;
      line-height: 36px;
      background: #fcf9e5;
      border: 1px solid #faebcc;
      color: #ff6600;
      margin-top: 17px;
      text-align: center;
      font-size: 14px;
    }
    .allmarket{
      /*margin-top: 70px;*/
      margin-top: 17px;
      width: 100%;
      height: 100%;
      .label{
        width: 100%;
        height: 52px;
        background: #f4f9fa;
        position: relative;
         .market{
          float: left;
        
          height: 100%;
          li{
            float: left;
            margin-left: 25px;
          }
          .marketicon{
            margin-top: 16px;
          }
          .price{
            line-height: 52px;
            font-size: 14px;
            color: #333;
            font-weight:bold;
          }
         }
         .classify{
          position: absolute;
          top: 13.5px;
          left: 150px;
          li{
            float: left;
            width: 50px;
            height: 25px;
            line-height: 25px;
            margin-left: 10px;
            text-align: center;
            font-size: 14px;
            color: #333;
          }
          .liactive{
            border:1px solid #1686cc;
            color:red;
           }
            li:hover{
            color:red;
          }
         }
      }
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
            width: 180px;
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
      width: 100%;
      height: 264px;
      margin-top: 20px;
      margin: 0 auto;
      background: url(../../assets/img/app.jpg)no-repeat center;
      
      .select{
        width: 685px;
        height: 100%;
        margin:0 auto;
        position: relative;
        .selectbox{
         position: absolute;
         top:40px;
      }
        .selecttop{
          width: 250px;
          height: 67px;
          background: url(../../assets/img/selecttop.png)no-repeat;
        }
        .selectbt{
          margin-top: 20px;
          width: 250px;
          height: 80px;
          clear: both;
          position: relative;
          .andimg{
            float: left;
          }
          .iosimg{
            float: right;
          }
          /*.and{
            width: 128px;
            height: 34px;
            background: red;
            background: #e61f19;
            p{
              float: left;
              
              font-size: 12px;
              a{
                color: #fff;
              }
            }
            P:nth-child(2){
              line-height: 34px;
              margin-left: 10px;
            }
             p:nth-child(1){
              margin-left: 28px;
              margin-top: 8.5px;
            }
          }
          .and:hover{
            background: #ff0000;
          }
          .ios{
            margin-top: 12px;
             width: 128px;
             height: 34px;
             background: rgba(255,255,255,0.1);
            p{
              float: left;
              
              font-size: 12px;
              a{
                color: #fff;
              }
            }
            P:nth-child(2){
              line-height: 34px;
              margin-left: 10px;
            }
            p:nth-child(1){
              margin-left: 28px;
              margin-top: 8.5px;
            }
          }
          
          li:nth-child(3){
            position:absolute;
            right: 0;
            top:0;
          }*/
        }
        .selectright{
          position: absolute;
          bottom:0;
          right:0;
        }
      }
    }
    /*background: #000;*/
    tr:hover{
      background: #f4f9fa;
    }
  }
</style>