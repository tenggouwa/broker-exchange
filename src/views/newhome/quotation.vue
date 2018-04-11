<template>
  <div class="skdata">
    <ul class="notice" @click="gotonew(cmsdata.id)">
      <li>
        <i class="iconfont icon-gonggao"></i>
        <span class="gonggaoTitle">{{cmsdata.title}}</span>
        <span>{{cmsdata.date}}</span>
      </li>
      <li class="notice_right" @click="gotonew(cmsdata.id)">
        了解更多 >
      </li>
    </ul>
    <ul class="skdatatab" v-model="activeCOIN">
      <li @click="handleClick('USDT')" :class="{active:activeCOIN=='USDT'}">USDT行情</li>
      <li @click="handleClick('BTC')" :class="{active:activeCOIN=='BTC'}">BTC行情</li>
    </ul>
    <div class="coinListclass" id="demo" style="overflow:hidden;z-index:29"> 
      <div class="indemo" style="width:500%">
        <ul id="demo1" style="float:left" class="coinListclass">
          <li  v-for="(item,index) in allcoinsdata"  v-if="item!=false" :class="{liactive:liactive==item.symbol}" @mouseout="scrollcoin" @mouseover="hovecoin(item.symbol)" @click="gotrade(item.symbol)" :style="'width:' + liwith+'px'">
            <div class="title" align="center" >
              <svg v-if="liactive != index&&item.symbol =='DCRUSDT'" class="icon" aria-hidden="true"  >
                <use  xlink:href="#icon-DCR3"></use>
              </svg>
              <i v-if="liactive != index&&item.symbol !='DCRUSDT'" class="iconfont"  :class=" 'icon-'+getsymbol(item.symbol)+'3'"></i>
              <i v-if="liactive == index" class="iconfont"  :class="'icon-'+getsymbol(item.symbol)+'3'" ></i> 
              <!-- <i v-if="item.symbol==undefined" class="iconfont icon-BTY2"></i> -->
              <p class="coinTypes">{{item.symbol|cointobig(activeCOIN)}}</p>
              <p class="newPrice redcolor" :class="{'greencolor':item.last-item.open<0}">
                <span>{{item.last}}</span>
                <i class="upandloess iconfont icon-u-arrow3-right" :class="{'icon-u-arrow3-loss':item.range!=null&&item.range.indexOf('-')>=0}"></i>
              </p>
              <p class="lastrmbclass" >¥{{item.lastrmb}}</p>
              <p class="risk redcolor" v-if="Number(item.last)>=Number(item.open)">{{item.range |formatrange}}</p>
              <p class="risk greencolor" v-if="Number(item.last)<Number(item.open)">{{item.range |formatrange}}</p>
            </div>
            <div id="triangle-down" v-if="liactive == item.symbol" :style="'left:' + lileft+'px'"></div>
          </li>
        </ul>
        <ul id="demo2" style="float:left" class="coinListclass">
          <li  v-for="(item,index) in allcoinsdata" v-if="item!=false" :class="{liactive:liactive==item.symbol}" @mouseout="scrollcoin" @mouseover="hovecoin(item.symbol)" @click="gotrade(item.symbol)" :style="'width:' + liwith+'px'">
            <div class="title" align="center" >
              <svg v-if="liactive != index&&item.symbol =='DCRUSDT'" class="icon" aria-hidden="true"  >
                <use  xlink:href="#icon-DCR3"></use>
              </svg>
              <i v-if="liactive != index&&item.symbol !='DCRUSDT'" class="iconfont"  :class=" 'icon-'+getsymbol(item.symbol)+'3'"></i>
              <i v-if="liactive == index" class="iconfont"  :class="'icon-'+getsymbol(item.symbol)+'3'" ></i> 
              <p class="coinTypes">{{item.symbol|cointobig(activeCOIN)}}</p>
              <p class="newPrice redcolor" :class="{'greencolor':item.last-item.open<0}">
                <span>{{item.last}}</span>
                <i class="upandloess iconfont icon-u-arrow3-right" :class="{'icon-u-arrow3-loss':item.range!=null&&item.range.indexOf('-')>=0}"></i>
              </p>
              <p class="lastrmbclass" >¥{{item.lastrmb}}</p>
              <p class="risk redcolor" v-if="Number(item.last)>=Number(item.open)">{{item.range |formatrange}}</p>
              <p class="risk greencolor" v-if="Number(item.last)<Number(item.open)">{{item.range |formatrange}}</p>
            </div>
            <div id="triangle-down" v-if="liactive == item.symbol" :style="'left:' + lileft+'px'"></div>
          </li>
        </ul>
      </div>
    </div> 
    <ul class="coinQuotation">
      <li class="firstli">
        <p class="pone">{{indexcoindata.symbol}}</p>
        <p class="ptwo redcolor" :class="{'greencolor':indexcoindata.last-indexcoindata.open<0}">{{indexcoindata.last}}<i class="upandloess iconfont icon-u-arrow3-right" :class="{'icon-u-arrow3-loss':indexcoindata.range!=null&&indexcoindata.range.indexOf('-')>=0}"></i></p>
      </li>
      <li class="pone">
        <p class="pone">最高价</p>
        <p class="ptwo">{{indexcoindata.high}}</p>
      </li>
      <li>
        <p class="pone">最低价</p>
        <p class="ptwo">{{indexcoindata.low}}</p>
      </li>
      <li>
        <p class="pone">涨跌幅</p>
        <p class="ptwo redcolor" :class="{'greencolor':indexcoindata.range!=null&&indexcoindata.range.indexOf('-')>=0}">{{indexcoindata.range  |formatrange}}</p>
      </li>
      <li>
        <p class="pone">成交量</p>
        <p class="ptwo">{{indexcoindata.vol}}</p>
      </li>
      <li class="lastli"><span>24h</span></li>
    </ul>
    <div id="kdata" class="echarts">
    </div>
  </div>
</template>
<script>
import api from '../../config/api-config'
import ECharts from "echarts"
export default{
  data(){
    return{
      liactive:'BCCUSDT',
      liwith:240,
      luntime:0,
      MyMar:0,
      coinlastdata:{
        btclastdata:'',
        ethlastdata:'',
        etclastdata:'',
        sclastdata:''
      },
      indexcoindata:
      {
        last:'',
        range:'',
        open:'',
        high:'',
        low:'',
        vol:'',
      },
      cmsdata:{
        title:'',
        date:'',
        id:'',
      },
      allcoinsdata:[],
      lileft:0,
      coindata:{},
      btcdata:{},
      etcdata:{},
      scdata:{},
      ethdata:{},
      xdata:[],
      chartdata:[],
      chart:null,
      cointype:'bcc',
      activeCOIN:'USDT'
    }
  },
  mounted:function(){
    this.MyMar=setInterval(()=>{
        setTimeout(()=>{
          this.Marquee();
        },50)
      },20);
    var _this=this;
    this.getCMS();
     // this.getlastdata();
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
            interval:0,
            lineStyle:{
              color:'rgba(206, 24, 29, 0.1)',
              width:1,
            },
          },
          axisLabel: {
            textStyle: {
              color: '#f27f82',
            },
          },                     
          data : []// X轴的定义  
      },
      yAxis: {
        type:'value',
        axisLine:{
          lineStyle:{
            color:'rgba(206, 24, 29, 0.1)',
            width:1,
          },
        },
        axisLabel: {
          textStyle: {
            color: '#f27f82',
          },
        },
        splitLine:{
          lineStyle:{
            type:'dotted',
            color:'#eddfdf',
          }
        },   
      },
      series: [{
        name: '',
        type: 'line',
        smooth:true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgba(206, 24, 29, 0.1)',
            lineStyle:{
              color:'#ce181d',
            }
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
    _this.getkdata(_this.liactive);
    _this.getcoindata();
    _this.luntime=setInterval(function () {
      _this.getcoindata();
      _this.getkdata(_this.cointype);
    }, 5000)
  },
  destroyed:function(){
    clearInterval(this.luntime);
    clearInterval(this.MyMar);
  },
  filters:{
    iconname: function (str) {
      if(str=="33.cn"){
        str="Licai.cn"
      }
      return str
    },
    cointobig(symbol,activecoin){
      let Coin='';
      if(activecoin=='BTC'){
      Coin=symbol.substr(0,symbol.length-3);
      }else{
        Coin=symbol.substr(0,symbol.length-4);
      }
      switch(Coin){
        case 'BTC':
          return '比特币';
          break;
        case 'BTY':
          return '比特元';
          break;
        case 'BCC':
          return '比特现金';
          break;
        case 'ETH':
          return '以太坊';
          break;
        case 'ETC':
          return '以太坊经典';
          break;
        case 'ZEC':
          return '零币';
          break;
        case 'LTC':
          return '莱特币';
          break;
        case 'BTS':
          return '比特股';
          break;
        case 'SC':
          return '云储币';
          break;
        case 'DCR':
          return '德信币';
          break;
      }
    },
    formatrange(range){
      if(range==null||range==undefined){
        return '--';
      }
      if(range.indexOf('-')>=0){
        return  range;
      }else{
        return "+"+range;
      }
    }
  },
  methods:{
    //无缝滚动
    Marquee(){ 
      if(document.getElementById("demo")==null){
        return;
      }
      var tab=document.getElementById("demo"); 
      var tab1=document.getElementById("demo1"); 
      var tab2=document.getElementById("demo2"); 
      if(tab2.offsetWidth-tab.scrollLeft<=0) {
        tab.scrollLeft-=tab1.offsetWidth; 
      }else{
        tab.scrollLeft++; 
      } 
    },
    //公告列表获取
    getCMS(){
      let _this=this;
      this.axios.get(this.extendApi.getNewList,{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        },
        params: '',
      })
      .then(function(response){
        if(response.data.code==200){
          if(response.data.data.count>=1){
             _this.cmsdata.title=response.data.data.rows[0].title;
             _this.cmsdata.date=response.data.data.rows[0].published_time;
             _this.cmsdata.id=response.data.data.rows[0].id;
          }
        }
      })
      .catch(function(error){
        console.log(error);
      })
    },                 
    //跳转至平台公告
    gotonew(id){
      if(id==''){
        this.$notify({
          title: '提示',
          message: '暂无公告',
          type: 'warning',
          duration: '1000',
        });
        return;
      }
      let newpath='/help/newDetaile?id='+id;
      this.$router.push({
        path:newpath
      })
    },
    getzhangfu(e){
      if(e!=null){
        if(e.indexOf('-')>0){
          return true;
        }else{
          return false
        }
      }else{
        return true;
      }

    },
    getsymbol(symbol){
      if(symbol==undefined){
        return ;
      }
      if(this.activeCOIN=='BTC'){
        return symbol.substr(0,symbol.length-3);
      }else{
       return symbol.substr(0,symbol.length-4);
      }
    },
    //
   handleClick(activeCOIN) {
      this.getcoindata();
      this.activeCOIN=activeCOIN;
      if(this.activeCOIN=="USDT"){
        this.liactive="BTY"+this.activeCOIN;
      }else{
        this.liactive="BCC"+this.activeCOIN;
      }
      

    },
    //鼠标移出
    scrollcoin(){
      this.MyMar=setInterval(()=>{
        setTimeout(()=>{
          this.Marquee();
        },50)
      },20);
    },
    //鼠标移入调用
    hovecoin(cointype){
      clearInterval(this.MyMar);
      if(cointype==undefined){
        return;
      }
      this.liactive = cointype;
      this.cointype = cointype;
      this.getkdata(cointype);
      for(let i=0;i<this.allcoinsdata.length;i++){
        if(this.allcoinsdata[i].symbol==cointype){
          this.indexcoindata = this.allcoinsdata[i];
        }
      }
    },
    //跳转至公告页
    // gonotice(){
    //   this.$router.push({
    //     path:'/help/notice',
    //   });
    // },
    //跳转至交易页
    gotrade(cointype){
      let coinlink='';
      if(this.activeCOIN=='USDT'){
        coinlink = this.getsymbol(cointype).toLowerCase()+this.activeCOIN;
      }else{
        coinlink = this.getsymbol(cointype).toLowerCase();
      }
      
      let golick = '/usercenter/'+coinlink+'trade';
      this.$router.push({
        path:golick,
      });
    },

    //获取最新数据
    getcoindata(){
      var _this=this;
      let param={
        sort:'cname'
      }
      this.axios.get(this.extendApi.getcoindata,{
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;'
        },
        params: param,
      })
      .then(function(response){
        if(response.status==200){
          let coinlist=response.data.data[_this.activeCOIN];//获取各种币种的行情

          _this.allcoinsdata=coinlist;
          if(_this.allcoinsdata==null){
             _this.indexcoindata =[];
            return 
          }
          _this.liwith=1200/_this.allcoinsdata.length;//动态 设置li的宽度
          _this.lileft=70;
          for(let i=0;i<_this.allcoinsdata.length;i++){
            if(_this.allcoinsdata[i].symbol==_this.liactive){
              _this.indexcoindata = _this.allcoinsdata[i];
            }
          }
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
      var maxcoin = e;
      var _this=this;
      var minPrice = 0;
      var maxPrice = 0;
      this.axios.get(api.getCoinMarketDate,{
        params:{
          c: maxcoin,
          p: "H1",
          action: "init",
          count: '24',
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
<style scoped>
#demo1{
  overflow: hidden;
}

/*.el-tabs__header{
  margin: 0;
}
.el-tabs__item{
   width: 600px;
  height: 40px;
  text-align: center;
   background-color: #e0e0e0;
  color: #808080;
  font-size: 18px;
  
  font-weight: bolder;
}
.el-tabs__item:hover{
  color: #ce181d;
}
.el-tabs__item.is-active{
  font-size: 18px;
  background-color: #fff;
  color: #ce181d;

}
.el-tabs__active-bar{
  display: none;
}*/
  .skdata{
    width: 1200px;
    height: 100%;
    top:-140px;
    margin: 0 auto;
    position: relative;
    .skdatatab{
      width: 1200px;
      height: 40px;
      li{
        width: 600px;
        float: left;
        height: 40px;
        line-height: 40px;
        text-align: center;
         background-color: #e0e0e0;
        color: #808080;
        font-size: 18px;
      }
      .active{
         font-size: 18px;
        background-color: #fff;
        color: #ce181d;
      }
    }
    /*top:-80px;*/
    canvas{
      display: block!important;
    }
    .notice{
      clear: both;
      height: auto;
      overflow: hidden;
      cursor: pointer;
      background: rgba(0,0,0,0.3);
      li{
        float: left;
        height: 40px;
        line-height: 40px;
        
        font-size: 14px;
        color: #888;
      }
      li:nth-child(1){
        width: 1000px;
      }
      li:nth-child(2){
        width: 200px;
      }
      .notice_right{
        text-align: right;
        padding-right: 16px;
        color: #888;
      }
      .icon-gonggao{
        font-size: 24px;
        padding-left: 30px;
        color: #fff;
      }
      .gonggaoTitle{
        padding-left: 14px;
        color: #fff;
      }
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
    .boxHidden{
      overflow: hidden;
      width: 1200px;
      height: 150px;
      
    }
    .coinListclass{
      position: relative;
      min-width: 1200px;
      float: left;
      left: 0;
      height: 160px;
      overflow: hidden;
      li{
        background-color:#fff;
        position: relative;
        /*padding: 25px 0;*/
        float: left;
        cursor: pointer;
        min-width: 170px;
        height: 150px;
        text-align:center;
        vertical-align: middle;
        #triangle-down {
          position: absolute;
          top: 150px;
          /*left:110px;*/
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid rgb(206, 24, 29);
        }
        .title{
          font-size: 14px;
          color: #333;
          text-align: middle;
          overflow: hidden;
          height: auto;
          padding-top: 3px;
          .iconcom{
            color: rgba(206, 24, 29, 1);
          }
          svg{
            margin-top: 6px;
            width: 34px;
            height: 34px;
            vertical-align: 0.5em;
          } 
          .iconnotcoin{
            color: #fff;
          }
          p{
            color: #999;
          }
          .coinTypes{
            height: 18px;
            font-size: 12px;
            line-height: 18px;
            color: #444444;
            margin-top: -6px;
            font-weight: bolder;
          }
          .newPrice{
            font-size: 24px;
            margin-top: 2px;
             font-weight: 600;
          }
          .lastrmbclass{
             margin-top:-8px;
             font-size: 12px;
             color: #333;
          }
          .risk{
            font-size: 14px;
            padding-top: 0;
            margin-top: 4px;
             font-weight: 600;
          }
          .redcolor{
            color: #ce181d;
            .upandloess{
              font-size: 12px;
            }
          }
          .greencolor{
            color: #3a7a27;
            .upandloess{
              font-size: 12px;
            }
          }
        }
      }
      .liactive{
        bg:rgba(206, 24, 29, 1);
        .title{
          border-right:0px solid #ccc; 
          font-size: 14px;
          color: #000;
          text-align: middle;
          padding-top: 3px;
          /*font-weight: bolder;*/
          overflow: hidden;
          height: auto;
          p{
            color: #fff;
            /*font-weight: bolder;*/
          }

         /* .coinTypes{
            height:18px;
            font-size: 14px;
            line-height: 18px;
             margin-top: -6px;
          }*/
          /*.newPrice{
            font-size: 24px;
          }*/
          /*.risk{
            padding-top:0;
            font-size: 14px;
          }*/
        }
       
        .icon-BTC3,.icon-ETC3,.icon-ETH3,.icon-ZEC3,.icon-LTC3,.icon-BCC3,.icon-BTY3,.icon-SC3,.icon-BTS3,.icon-BTCS3{
           font-size: 34px !important;
           color: #fff;
        }
      }
    }
    .coinQuotation{
      height: 100px;
      width: 100%;
      margin-left: 35px;
       li:last-child{
        width:40px;
       }
      li:not(last-child){
        padding-top: 22px;
        float: left;
        width: 187.5px;
        .pone{
          color: #888;
          font-size: 14px;
        }
        .ptwo{
          font-size: 22px;
          color: #444;
        };
        .redcolor{
          color: #ce181d;
          font-weight: bolder;
        }
        .greencolor{
          color: #3a7a27;
           font-weight: bolder;
        }
      }
      .firstli{
       
        .pone{
          color: #333;
          font-weight: bolder;
        }
      }
      .lastli{
        text-align: right;
        span{
          display: inline-block;
          height: 23px;
          width: 40px;
          font-size: 18px;
          background: rgb(206,24,29);
          color: #fff;
          text-align: center;
          line-height: 23px;
          margin-top: 15px;
        }
      }
    }
    #kdata{
      width: 100%;
      height: 300px;
      top:-50px;
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
.icon-BTC3,.icon-ETC3,.icon-ETH3,.icon-ZEC3,.icon-LTC3,.icon-BCC3,.icon-BTY3,.icon-SC3,.icon-BTS3,.icon-BTCS3{
   font-size: 34px !important;
   /*color: #ce181d;*/
}
.icon-BTC3{
  color: #e6ac00;
}
.icon-ETC3{
 color: #47ad50;
}
.icon-ETH3{
  color: #3dabcb;
}
.icon-ZEC3{
  color: #366bb2;
}
.icon-ETH3{
  color: #3dabcb;
}
.icon-LTC3{
  color: #6353b3;
}
.icon-BCC3{
  color: #ec712e;
}
.icon-BTY3{
  color: #e14f55;
}
.icon-SC3{
  color: #0ea48a;
}
.icon-BTS3{
  color: #7fb131;
}
.icon-BTCS3{
  color: #13a94f;
}
</style>