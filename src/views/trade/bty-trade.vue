<template>
  <div class="bty-trade"  >
    <div class="bcontent" >
      <div class="wrapper">
        <div class="wrapper-right"    element-loading-text="数据加载中">
          <div class="w-box m-l" >
            <div>
              <div class="content" >
                <p>
                <span class="spanl" @click="sellAllNum"><label class="typesymbol">可用({{symbol|filIndex}}) :</label><b class="availabel">{{myAssets.availablecoin}}</b></span>
                </p>
                <p>
                  <span class="spanl"><label class="typesymbol">冻结({{symbol|filIndex}}) :</label><b>{{myAssets.frozencoin}}</b>  </span>
                </p>
                <div class="row-control">
                  <!-- <input id="sellPrice" class="validate-float-2" type="text" data-label="价格" data-validate="required" v-model="sellprice" @keyup="inputTradePrice('sell')" @blur="inputsellnum()"> -->
                  <input id="sellPrice" class="validate-float-2" type="text" data-label="价格" data-validate="required" v-model="sellprice" @keyup="inputTradePrice('sell')">
                </div>
                <div class="row-control">
                  <input class="validate-float-2 sellcolor" type="text" @keyup="inputTradeNum(sellnum,'SELL')" v-model="sellnum" @blur="inputsellnum()">
                  <p>（交易量）</p>
                </div>
                <scrollCom :proessnum="sellScroll" :newprice="btcnewprice" bgclass="range_sell" showcoin="BTC" :showcionType="getsymbol(symbol)" :coastnum="sellmoney" :nextnum="nextcoin" @proessClick="canChange('SELL')" @change="sellscroll"></scrollCom>
                <div class="row-control fn-clear">
                  <input id="sellbutton" class="btn" type="button" v-model="sellbutton" @click="tradeC('SELL',sellprice,sellnum)">
                </div>
              </div>
              <ul id="navlist">
                <li class="list1"></li>
                <li class="list2"><a style="padding-top: 22px;padding-bottom: 22px;">区块链交易所</a></li>
                <li class="list1"></li>
              </ul>
              <div class="content">
                <p>
                  <span class="spanl" @click="buyAllNum">可用(BTC) :<b class="availabel">{{myAssets.availablemoney}}</b></span>
                </p>
                <p class="djies">
                  <span class="spanl">冻结(BTC) :<b>{{myAssets.frozenmoney}}</b>  </span>
                </p>
                <div class="row-control">
                  <!-- <input id="sellPrice" class="validate-float-2 buycolor" type="text" data-label="价格" data-validate="required" value="" v-model="buyprice" @keyup="inputTradePrice('BUY')" @blur="inputbuynum()"> -->
                  <input id="sellPrice" class="validate-float-2 buycolor" type="text" data-label="价格" data-validate="required" value="" v-model="buyprice" @keyup="inputTradePrice('BUY')">
                </div>
                <div class="row-control">
                  <input class="validate-float-2 buycolor" type="text" data-label="价格" data-validate="required" v-model="buynum" @keyup="inputTradeNum(buynum,'BUY')" @blur="inputbuynum()">
                  <!-- <p></p> -->
                  <p>（交易量）</p>
                </div>
                <scrollCom :proessnum="buynumm" :newprice="btcnewprice" bgclass="range_buy"  showcoin="BTC" showcionType="BTC" :coastnum="buymoney" :nextnum="nextMoney" @proessClick="canChange('BUY')" @change="buyScroll"></scrollCom>
                <div class="row-control fn-clear">
                  <input id="buybutton" class="btn" type="button" value="" v-model="buybutton" @click="tradeC('BUY',buyprice,buynum)">
                </div>
                <div></div>
              </div>
            </div>
            <div class="shade" v-if="islogin==false" >
              请先<span @click="gotoindex">登录</span>或<span @click="gotoregist">注册</span>
            </div>
          </div>
          
          <div class="w-box m-l" v-loading="loading">
            <table class="market trhead">
              <tr class="trhead">
                <th class="lone">类型</th>
                <th>价格</th>
                <th class="last">数量</th>
              </tr>
              <tr v-for="(item, index) in sellticket">
                <td class="one">卖({{ -(index-sellticket.length) }})</td>
                <td class="tradeprice" @click="sletprice('buy',index)">{{ item.price}}</td>    <!-- | priceFormat -->
                <td class="last" @click="mairuNum(index)">{{ item.am }}</td>   <!-- |formatNum -->
              </tr>
            </table>
            <table class="market">
              <tr>
                <th class="lone">最新价</th>
                <th class="clolor" :class="{'secolor':newtradetype==1}">{{newprice}}</th>   <!--  |priceFormat -->
                <th class="last clolor" :class="{'secolor':newtradetype==1}">{{newtradenum}}</th>    <!-- |formatNum
              </tr> -->
              <tr v-for="(item, index) in buyticket">
                <td class="cone">买({{index+1}})</td>
                <td class="tradeprice" @click="sletprice('sell',index)">{{ item.price}}</td>    <!-- |priceFormat -->
                <td class="last" @click="maichuNum(index)">{{ item.am |formatNum}}</td>
              </tr>
            </table>
          </div>
          <div class="w-box m-r">
            <table class="market newhistory trhead">
              <tr>
                <th class="lone">时间</th>
                <th>价格</th>
                <th class="last">数量</th>
              </tr>
              <tr v-for="item in newtrade">
                <td class="lone clolor" :class="{'secolor':item.type==1}">{{item.time}}</td>
                <td class="clolor" :class="{'secolor':item.type==1}">{{item.price }}</td>   <!-- |priceFormat -->
                <td class="last1 clolor" :class="{'secolor':item.type==1}">{{item.am }}</td>   <!-- |formatNum -->
              </tr>
            </table>
          </div>
          <div class="tradelist">
            <tradeCommon :statee="state" @reFlashMoney="reFlashMoney" :updateurl="changeurl" :updatesymbol="symbolname"></tradeCommon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tradeCommon from './trade-common.vue'
import scrollCom from '../../components/scrollcom.vue'
import { ajax,getticketcom,getcookie,setcookie,delatecookie,gettxfees,formatcoinPrice,formatcoinNum,getmincoinNum,formatcoinprice,initINput,numjs,nitFince,initcoinnum} from '../../assets/js/common'
import {sellscrolles,buyscrolles,buycTradeCom,sellTradeCom,priceComDown,priceComUp,inputTradeNumCom} from '../../assets/js/proesscom'
import Bus from '../../assets/js/bus.js'
export default {
  props:['symbolname','changeurl'],
  data() {
      return {
        changebuyprice:true,
        changesellprice:true,
        buyscrollchange:true,
        sellscrollchange:true,//卖出滚动条改变
        rate:0,//手续费比例
        state:0,
        isclickMax:false,//是否买最大数量
        MaxBuyNum:0,//最大可买量
        sellnum:0,//输入框的数据
        buynum:0,//输入框的数据
        sellScroll: 0,//显示百分号前面的数字
        buynumm: 0,//显示百分号前面的数字
        coastcoin:0,//使用的币
        sellmoney:0,
        nextcoin:0,//剩余的币
        buymoney:0,//花费的钱
        nextMoney:0,//剩余的钱
        symbol:sessionStorage.getItem('symbol'),
        ticket:{
          num:'8',
          symbol:'bcc',
        },
        getTickTime:0,
        sellbutton:'卖出 '+sessionStorage.getItem('symbol'),
        buybutton:'买入 '+sessionStorage.getItem('symbol'),
        newtrade:[],//最新交易数据
        sellticket:[],//卖出行情
        buyticket:[],//买入行情
        newprice:0,//最新成交价格
        btcnewprice:0,//btc最新成交价格
        newtradenum:0,//最新成交量
        newtradetype:0,
        buyprice:0,//买一价
        sellprice:0,//卖一价
        mountedBuyone:0,
        mountedSellone:0,
        myAssets:{
          availablecoin:0.00,
          frozencoin:0.00,
          availablemoney:0.00,
          frozenmoney:0.00,
        },
        tradeparam:{//交易参数
          ty:'BUY',
          price:0,
          amount:0,
          currency:'BCC',
          currency2:'BTC',
        },
        loading:true,
        txfeesList:[],
        islogin:false,
      }
    },
  components:{
    tradeCommon,
    scrollCom,
  },
  filters:{
    //格式化数量小数点位数
    formatNum(e){
      if(e==''||e==undefined){
        return '';
      }
      if(Number(formatcoinNum(sessionStorage.getItem('symbol')))==0){
        return parseInt(e);
      }
      else{
        return  parseFloat(e).toFixed(formatcoinNum(sessionStorage.getItem('symbol')))
      }
    },
    filIndex(e){
     
      if(e==null||e==undefined){
        return ''
      }
      return e.substr(0,e.length-3);
    },  
    formatPrice(e){
      if(formatcoinpriceHQ(sessionStorage.getItem('symbol'))==0){
        return parseInt(e);
      }
      else{
        return  parseFloat(e).toFixed(formatcoinpriceHQ(sessionStorage.getItem('symbol')))
      }
    },
    priceFormat:function(dev){//控制行情价格位数
       if(formatcoinprice(sessionStorage.getItem('symbol'))==0){
         return parseInt(dev);
       }
       else{
        return parseFloat(dev).toFixed(formatcoinprice(sessionStorage.getItem('symbol')));
       }
    }
  },
  watch: {
   changeurl(){
      document.documentElement.scrollTop=window.pageYOffse=document.body.scrollTop=0;
      clearInterval(this.getTickTime);
      this.symbol=this.symbolname;
      this.loading=true;
      this.sellticket=[];//卖出行情
      this.buyticket=[];//买入行情
      this.newtrade=[];
      this.isclickMax=false;
      this.changebuyprice=true;
      this.changesellprice=true;
      if(getcookie('token')){
        this.getusermoney();
      }
      this.commomstart();
      // this.checkIsmove();
      this.getticket(this.symbol);
      this.getTickTime=setInterval(()=>{
        this.getticket(this.symbol);
        // if(getcookie('token')){
        //   this.getusermoney();
        // }
      }, 3000);
   },
    mountedSellone:function(val){
      if(this.changesellprice){
        this.sellprice=val;
      }
    },
    mountedBuyone:function(val){
      if(this.changebuyprice){
        this.buyprice=val;
      }
    },
  },
  created(){
    if(!getcookie('token')){
      //
      this.islogin=false;
    }else{
      this.islogin=true;
      this.getbtcnewprice();
      
    }

  },
  mounted:function(){
    // this.checkIsmove();
    let _this=this;
    Bus.$on('reFlashusermoney',function(){//点击App下载跳转至app下载位置
      _this.getusermoney();
    });
   
    this.flashRoute();
    // getusdtrate();
    gettxfees(this);
    for(let i in this.txfeesList){
      if(i==this.symbol){
        this.rate=this.txfeesList[i]//获取手续费
      }
    }
    this.sellticket=[];//卖出行情
    this.buyticket=[];//买入行情
    this.newtrade=[];
    this.commomstart();
    this.getTickTime=setInterval(()=>{
      this.getticket(this.symbol);
    }, 3000);
  },
  destroyed:function(){
    clearInterval(this.getTickTime);
  },
  methods:{
    gotoindex(){
      setcookie('loginorregist','login');
      Bus.$emit("loginBoxtrigger",'login');
      this.$router.push({
        path: '/index'
      });
      
    },
    gotoregist(){
      setcookie('loginorregist','regist');
      Bus.$emit("loginBoxtrigger",'regist');
      this.$router.push({
        path: '/index'
      });
    },
    getsymbol(e){
      if(e==null||e==undefined){
        return 'BCC';
      }
       return e.substr(0,e.length-3);
    },
    //计算可买的最大值
    changMaxNum(){
      if(this.buyprice>0){
      // if(this.buyprice>0 && this.rate>0){
        // this.MaxBuyNum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
        this.MaxBuyNum=parseInt(this.myAssets.availablemoney/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
        if(this.isclickMax){
          this.buynumm=100;
          this.buynum=this.MaxBuyNum;
        }
      }
    },
    //卖出所有 点击“可用”：将数量填写到卖出数量框中；,然后滚动条相应的变化
    sellAllNum(){
      this.sellnum=this.myAssets.availablecoin;
      this.sellScroll=100;
    },
    //买入所有
    buyAllNum(){
      this.buynum=this.MaxBuyNum;
      this.buynumm=100;
      this.isclickMax=true;
    },
    commomstart(){
      if(this.symbol=='NYCC'){
        this.sellbutton='卖出 YCC';
        this.buybutton='买入 YCC';
      }else if(this.symbol=='WTC'){
        this.sellbutton='卖出 WDT';
        this.buybutton='买入 WDT';
      }else{
         this.sellbutton='卖出 '+this.getsymbol(this.symbol);
        this.buybutton='买入 '+this.getsymbol(this.symbol);
      }
      this.getticket(this.symbol);
      this.sellScroll=0;
      this.buynumm=0;
      this.sellnum=initcoinnum(this.symbol);
      this.buynum=initcoinnum(this.symbol)
      this.state= this.state==0?1:0;
      // getfxee(this)
    },
    canChange(type){
      if(type=='BUY'){
        this.buyscrollchange=true;
      }else{
        this.sellscrollchange=true;
      }
    },
    inputBuyPrice(){
      this.buyprice=formatcoinPrice(this.symbol,this.buyprice);
      if(this.buyprice){
        buycTradeCom(this);
      }
    },
    inputSellPrice(){
      this.sellprice=formatcoinPrice(this.symbol,this.sellprice);
      if(this.sellprice){
        sellTradeCom(this);
      }
    },
    //交易价格输入框事件
    inputTradePrice(type){
      if(type=='BUY'){
        this.changebuyprice=false;
        this.buyprice=formatcoinPrice(this.symbol,this.buyprice);//价格小数位数不能超过价格小数位数
        //买入价格变化滚动条变化 滚动条左下方(buymoney): 价格( buyprice )*数量(buynum)*1.001    滚动条右下方百分比(buynumm) :价格( buyprice )*数量(buynum)*1.001/可用(myAssets.availablecoin)币种 右上方(nextMoney): 可用-左下方
        if(Number(this.buyprice)>0&&Number(this.buynum)>0){
          this.buymoney=parseFloat(Number(this.buyprice)*Number(this.buynum)*1.001).toFixed(8);
          let process=parseFloat(Number(this.buyprice)*Number(this.buynum)*1.001/Number(this.myAssets.availablecoin)*100).toFixed(2);
          this.buynumm=Number(process);
          if(Number(this.myAssets.availablecoin)-Number(this.buymoney)>=0){
            this.nextMoney=Number(this.myAssets.availablecoin)-Number(this.buymoney);
          }
          else{
            this.nextMoney=0;
          }
        }
      }else{//卖出价格框只能进行输入操作，没有其他关联操作
        this.changesellprice=false;
        this.sellprice=formatcoinPrice(this.symbol,this.sellprice);//价格小数位数不能超过价格小数位数
        //价格不影响滚动条
        // if(this.sellprice){
        //   sellTradeCom(this);
        // } 
      }
    },
    
    inputTradeNum(num,type){
      if(type=="BUY"){
        this.isclickMax=false
      }
      inputTradeNumCom(num,type,this,'BTC');
    },
    //获取btc最新价
    getbtcnewprice(){
      let _this=this;
      let param={
        num:'8',
        symbol:'BTCUSDT'
      }
      getticketcom(_this,param,function(reponse){
        if(reponse.code==200){
          if( reponse.data.symbol=='BTCUSDT'){
            if(_this.newtrade.length!=0){
              _this.btcnewprice=reponse.data.trade[0].price;
            }else{
              _this.btcnewprice=0.00;
            }
          }
        }else{
          console.log(response.error)
        }
      });
    },
    //获取行情信息
    getticket(cointype){
      var _this=this;
      this.ticket.symbol=cointype;
      getticketcom(_this,_this.ticket,function(reponse){
        if(reponse.code==200){
          if(_this.symbol == reponse.data.symbol){
            _this.loading=false;
            _this.newtrade=reponse.data.trade;
            if(_this.newtrade.length!=0){
              _this.newprice=reponse.data.trade[0].price;
              setcookie('newprice',_this.symbol+":"+_this.newprice);
              document.title = getcookie("newprice");
              _this.newtradenum=reponse.data.trade[0].am;
              _this.newtradetype=reponse.data.trade[0].type;
            }else{
              _this.newprice=0.00;
              _this.newtradenum=0.001;
              setcookie('newprice',_this.symbol+":0.00");
              document.title = getcookie("newprice");
            }
            if(reponse.data.marketdata.sell.length!=0){
              _this.mountedBuyone=reponse.data.marketdata.sell[0].price;
            }else{
              _this.mountedBuyone=0.00;
            }
            if(reponse.data.marketdata.buy.length!=0){
              _this.mountedSellone=reponse.data.marketdata.buy[0].price;
            }else{
              _this.mountedSellone=0.00;
            }
            reponse.data.marketdata.sell=reponse.data.marketdata.sell.reverse();
            _this.sellticket=reponse.data.marketdata.sell;
            
            _this.buyticket=reponse.data.marketdata.buy;
          }
        }else{
          console.log(response.error)
        }
      });
    },
    mairuNum(numIndex){
      this.buyscrollchange=false;
      this.buynum=0;
      for(let i=numIndex;i<this.sellticket.length;i++){
        this.buynum+=Number(this.sellticket[i]['am']);
      }
      if(Number(formatcoinNum(this.symbol))==0){
        this.buynum =parseInt(this.buynum) 
      }else{
         this.buynum = this.buynum.toFixed(formatcoinNum(this.symbol));//买入交易量框数量
      }
     
      // this.buynum=formatNumPrice(this.symbol,this.buynum);
      this.buyprice=this.sellticket[numIndex].price;
      //价格小数位数不能超过价格小数位数
      //买入价格变化滚动条变化 滚动条左下方(buymoney): 价格( buyprice )*数量(buynum)*1.001    滚动条右下方百分比(buynumm) :价格( buyprice )*数量(buynum)*1.001/可用(myAssets.availablecoin)币种 右上方(nextMoney): 可用-左下方
      let buymoneyes=parseFloat(this.buyprice*this.buynum*1.001).toFixed(8);//BTC 8位
      if(buymoneyes-this.myAssets.availablemoney>=0){
        buymoneyes=this.myAssets.availablemoney;
      }
      if(this.myAssets.availablemoney==0){
        buymoneyes=0;
        this.buynum=0;
      }else{
        this.buymoney=buymoneyes;//滚动条左下角使用量
        this.buynumm=Number(parseFloat(buymoneyes/this.myAssets.availablemoney*100).toFixed(2));//滚动条右上角百分比
        this.nextMoney=this.myAssets.availablemoney-this.buymoney;
        this.buynum=this.buymoney/this.buyprice;
        if(Number(formatcoinNum(this.symbol))==0){
          this.buynum=parseInt(this.buynum);//卖出交易量框数量
        }else{
         this.buynum=this.buynum.toFixed(formatcoinNum(this.symbol));//卖出交易量框数量 
        }
        // this.buynum=this.buynum.toFixed(formatcoinNum(this.symbol));
      }
    },
    //卖出
    maichuNum(numIndex){
      this.sellscrollchange=false;
      this.sellnum=0;
      for(let i=0;i<=numIndex;i++){
        this.sellnum+=Number(this.buyticket[i]['am']);
      }
      // this.sellnum=formatNumPrice(this.symbol,this.sellnum);
      if(Number(formatcoinNum(this.symbol))==0){
        this.sellnum=parseInt(this.sellnum);//卖出交易量框数量
      }else{
       this.sellnum=parseFloat(this.sellnum).toFixed(formatcoinNum(this.symbol));//卖出交易量框数量 
      }
      this.sellprice=this.buyticket[numIndex]['price'];
      if(this.sellnum-this.myAssets.availablecoin>=0){
        this.sellnum=this.myAssets.availablecoin;
      }
      if(this.myAssets.availablecoin==0){
        this.sellnum=0;
      }else{
        // this.sellScroll=Number(parseFloat((this.sellnum/this.myAssets.availablecoin)*100).toFixed(2));
        this.nextcoin=parseFloat(this.myAssets.availablecoin-this.sellnum).toFixed(nitFince(this.getsymbol(this.symbol)));//滚动条右上方：剩余的币
        this.coastcoin=parseFloat(this.sellprice*this.sellnum).toFixed(8);//BTC
      }
      this.sellmoney=parseFloat(this.sellprice*this.sellnum*0.999).toFixed(8);//滚动条左下角 sellmoney：数量(sellnum)*价格(sellprice)*0.999
      this.sellScroll=Number(parseFloat(this.sellmoney/this.myAssets.availablecoin*100).toFixed(2));
      if(Number(formatcoinNum(this.symbol))==0){
        this.sellnum=parseInt(this.sellnum);//卖出交易量框数量
      }else{
       this.sellnum=parseFloat(this.sellnum).toFixed(formatcoinNum(this.symbol));//卖出交易量框数量 
      }

    },
    sletprice(tradetype,index){//价格框
      if(tradetype=='buy'){
        this.buyprice=this.sellticket[index]['price'];
        this.sellprice=this.sellticket[index]['price'];
      }else{
        this.buyprice=this.buyticket[index]['price'];
        this.sellprice=this.buyticket[index]['price'];
      }

      this.sellmoney=parseFloat(this.sellprice*this.sellnum*0.999).toFixed(8);
      this.changMaxNum();
    },
    flashRoute: function() {
      var path = this.$route.path;
      this.getusermoney();
      this.commomstart();
      switch(path){
        case '/usercenter/ethtrade':
        break;
        case '/usercenter/etctrade':
        break;
        case '/usercenter/zectrade':
        break;
        case '/usercenter/bcctrade':
        break;
        case '/usercenter/ltctrade':
        break;
      }
    },
    //获取用户资金
    getusermoney(){
      var _this=this;
      ajax(this,this.extendApi.getMoneyInfo,'',function(reponse){
        if(reponse.code==200){
          var data=reponse.data;
          var symbol=sessionStorage.getItem('symbol');
          if(symbol.indexOf('USDT')>0){
            symbol= symbol.substr(0,symbol.length-4);
          }else{
            symbol= symbol.substr(0,symbol.length-3);
          }
          _this.myAssets.availablemoney=data.list['BTC'].active;
          // if(_this.buyprice>0 && _this.rate>0){
          //   _this.MaxBuyNum=parseFloat(_this.myAssets.availablemoney/(1+_this.rate)/_this.buyprice).toFixed(formatcoinNum(_this.symbol));
          // }
          if(_this.buyprice>0 ){
            _this.MaxBuyNum=parseFloat(_this.myAssets.availablemoney/_this.buyprice).toFixed(formatcoinNum(_this.symbol));
          }
          if(_this.buynumm==0){
            _this.nextMoney=data.list.BTC.active;
          }

          _this.myAssets.frozenmoney=data.list.BTC.frozen;
          _this.myAssets.availablecoin=data.list[symbol].active;
          if(_this.sellScroll==0){
            _this.nextcoin=data.list[symbol].active;
          }
          _this.myAssets.frozencoin=data.list[symbol].frozen;
        }
        if(reponse.code==-2){//token过期清cookie
          delatecookie();
        }
      });
    },
    //卖币输入卖币数量
    inputsellnum(){
      this.sellscrollchange=true;
    },

    //买币输入买币数量
    inputbuynum(){
      this.buyscrollchange=true;
    },

    buyScroll(val){
      buyscrolles(val,this,'BTC');
    },
    sellscroll(val){
      sellscrolles(val,this,'BTC');
    },
    //交易函数
    tradeC(tradetype,price){
      var _this=this;
      var url=this.extendApi.place;
      this.tradeparam.ty=tradetype;
      this.tradeparam.price=price;
      this.tradeparam.currency=sessionStorage.getItem('symbol').substr(0,sessionStorage.getItem('symbol').length-3);
      //加上价格振幅10%的提示
      if(tradetype=='SELL' && parseFloat(this.newprice)*0.8>=parseFloat(price) && parseFloat(this.newprice)>0){
      //卖出价低于当前价格的10%给出提示
        _this.$notify({
          title: '提示',
          message: '卖出价不能低于当前价格的20%',
          type: 'warning'
        })
        return;
      }
      if(tradetype=='SELL' && parseFloat(price)>=parseFloat(this.newprice)*1.5 && parseFloat(this.newprice)>0){
        _this.$notify({
          title: '提示',
          message: '卖出价不能超出当前价格50%',
          type: 'warning'
        })
        return;
      }
      if(tradetype=='BUY' && parseFloat(price)<parseFloat(this.newprice)*0.5 && parseFloat(this.newprice)>0){
        _this.$notify({
          title: '提示',
          message: '买入价不能低于当前价格的50%',
          type: 'warning'
        })
        return;
      }
      if(tradetype=='BUY' && parseFloat(price)>=parseFloat(this.newprice)*1.2 && parseFloat(this.newprice)>0){
        //买入价高出当前价格的10%给出提示
        _this.$notify({
          title: '提示',
          message: '买入价不能超出当前价格20%',
          type: 'warning'
        })
        return;
      }
      if(tradetype=='SELL'){
        _this.tradeparam.amount=_this.sellnum;
        if(Number(_this.sellnum)-Number(_this.myAssets.availablecoin)>0){
          _this.$notify({
            title: '提示',
            message: '可用币不足',
            type: 'error'
          })
        }else{
          _this.tradecom(url);
        }
      }else{
        _this.tradeparam.amount=_this.buynum;
        _this.tradecom(url);
      }
    },
    tradecom(url){
      var _this=this;
      ajax(_this,url,_this.tradeparam,function(response){
        if(response.code == 200){
          if(_this.tradeparam.ty=='BUY'){
            _this.buynum=initINput(_this.symbol)
            _this.buymoney=0;
            _this.buynumm=0;
            // （活动金额 - （活动金额 * 手续费比例）) / 价格 
            // 获取手续费
            let txfee=0;
            for(let i in _this.txfeesList){
              if(i==_this.symbol){
                 txfee=_this.txfeesList[i]//获取手续费
              }
            }
            _this.nextMoney=(Number(_this.myAssets.availablemoney)-0.000001)/((1+Number(txfee))*_this.tradeparam.price)
            // _this.nextMoney=(_this.myAssets.availablemoney-(_this.myAssets.availablemoney*txfee))/_this.tradeparam.price;//买入情况下剩余的钱
          }else{
            _this.sellScroll=0;
            _this.sellnum=initINput(_this.symbol);
            _this.coastcoin=0;
            _this.nextcoin=_this.myAssets.availablecoin;
          }
          _this.getusermoney();
          _this.state= _this.state == 0?1:0;
          _this.$notify({
            title: '成功',
            message: '委托成功',
            type: 'success'
          })
        }else{
          _this.$notify({
            title: '提示',
            message: response.message,
            type: 'error'
          })
        }
      });
    },
    //撤单成功更改资金
    reFlashMoney:function(){
      this.getusermoney();
    }
  },
}
</script>
<style>
  .el-slider__button-wrapper{
    z-index:2!important;
  }
  .bty-trade{
    .el-pagination{
      text-align: center;
    }

    .bcontent{
      .wrapper{
        .wrapper-right{
          width: 974px;
          height: 100%;
          float: right;
          margin-bottom: 40px;
          .validate-float-2{
            font-size: 16px;
            font-weight: bold;
          }
          .w-box{
            width: 320px;
            float: left;
            height: 568px;
            background: #fff;
            margin-bottom: 7px;
            overflow: hidden;
            .shade{
              display: inline-block;
              width: 100%;
              height: 100%;
              line-height: 568px;
              background:rgba(255,255,255,0.9);
              position: relative;
              z-index: 9;
              top:-545px;
              text-align: center;
              vertical-align: middle;
              color: #333;
              font-size: 20px;
              span{
                color: #ce181d;
                padding: 0 10px;
                cursor: pointer;
              }
            }
            #navlist{
              width: 270px;
              height: 28px;
              margin: 8px auto 0 auto;
              display: flex;
              padding: 0;
              color: #666;
              padding-bottom: 13px;
              list-style-type: none;
              border-bottom: none !important;
              margin-bottom: 14px !important;
              li{
                float: left !important;
                height: 30px;
                border: 0px solid #6c6;
                width: 100% !important;
                line-height: 1 !important;
                font-size: 12px !important;
                margin-right: 0 !important;
                margin-left: 0 !important;
              }
              .list1 {
                border-bottom: 1px solid #e6e6e6;
                width: 100% !important;
                margin-bottom: -13px !important;
                margin-right: 0 !important;
                margin-left: 0 !important;
                /* margin: 0 0 -15px 0 !important; */
              }
              a{
                display: block;
                color: #666;
                text-decoration: none;
                padding: 6px 5px;
                width: 100%;
                text-align: center;
              }
            }
            .content{
              width: 260px;
              height: 233px;
              margin: 20px auto 0;
              p{
                height: 25px;
                /*line-height: 25px;*/
                margin-top: 11px;
                font-size: 13px;
                color: #000;
                span{
                  display: inline-block;
                  float: left;
                  b{
                    font-size: 14px;
                    color: #666;
                    padding-left: 5px;
                  }
                }
                .typesymbol{
                  display: inline-block;
                  width: 70px;
                }
                .availabel{
                  cursor: pointer;
                  color: #00aaee;
                }
                .spanr{
                  float: right;
                  padding-right: 8px;
                  font-size: 14px;
                  font-weight: 700;
                  color: #e64544;
                }
                .getcolor{
                  color: #24a948;
                }
              }
              .canuse{
                margin-top: 0;
                height: 20px;
                line-height: 20px;
                padding-left: 75px;
                color: #00aaee;
              }
              .djies{
                margin-top: 0;
              }
              .proess{
                width: 260px;
                height: 55px;
                margin-top: 5px;
                .sellPercent{
                  color: #000000;
                  /*margin-left: 10px;*/
                  float: right;
                  position: absolute;
                }
                .range_sell{
                  position: relative;
                  .el-slider__bar{
                    background-color:#24a948; 
                  }
                  .criceactive{
                    background: #24a948;
                  }
                }
                .range_buy{
                  position: relative;
                  .el-slider__bar{
                    background-color:#c81118; 
                  }
                  .criceactive{
                    background: #c81118;
                  }
                }
                .row-control{
                  position: relative;
                  clear: both;
                }
                .numtop{
                  margin-top:0px!important;
                }
                .el-slider__runway{
                  margin:22px 0 7px;
                }
                .el-slider__button{
                  background: #fff;
                  border:1px solid #e4e8f1;
                }
                .el-slider__stop{
                  width: 8px;
                  height: 8px;
                  top:-2px;
                }
                .comcrice{
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #e4e8f1;
                    position: absolute;
                  }
                  .onec{
                    top:19px;
                    left: -5px;
                  }
                  .twoc{
                    top:19px;
                    left: 60px;
                  }
                  .threec{
                    top:19px;
                    left: 125px;
                  }
                  .fourc{
                    top:19px;
                    left: 190px;
                  }
                  .fivec{
                    top:19px;
                    left: 250px;
                  }
                i{
                  font-size: 13px;
                  color: #000000;
                  float: left;
                  font-style: normal;
                }
                /*background: #000;*/
              }
              .row-control{
                margin-top: 11px;
                position: relative;
                input,input:focus{
                  border-radius: 5px;
                  height: 30px;
                  width: 260px;
                  text-align: right;
                  padding-right: 10px;
                  border: 1px solid #cccccc;
                }
                .btn,.btn:focus{
                  border-radius: 5px;
                  cursor: pointer;
                  text-align: center;
                  color: #ffffff;
                  height: 30px;
                  width: 260px;
                  font-size: 12px;
                  float: right;
                  border: 0;
                  /*margin-top: 35px;*/
                }
                #sellbutton {
                  background: #24a948 url(../../assets/img/sellbtn.png) no-repeat 75px 50%;
              }
              #buybutton {
                  background: #e64544 url(../../assets/img/buybtn.png) no-repeat 75px 50%;
              }
                #sellPrice {
                  color: #24a948;
                  font-size: 18px;
                  font-weight: bold;
              }
              .buycolor{
                color: #c81118!important;
              }
              .sellcolor{
                color: #24a948;
              }
              p{
                color: #666;
                position: absolute;
                top: -6px;
                left: 10px;
              }
            }
          }
          .market{
            border-spacing: 0;
            width: 270px;
            height: auto;
            overflow: hidden;
            margin: 0 auto;
            tr{
              padding: 0;
              margin:0;
              th,td{
                padding: 0;
                margin:0;
                width: 90px;
                text-align: center;
              }
              th{
                height: 28px;
                color: #666;
                font-size: 14px;
                font-weight: 500!important;
              }
              td{
                color: #000;
                height: 32px;
                font-size: 13px;
              }
              .lone{
                text-align: left;
              }
              .one{
                text-align: left;
                color: #009933;
              }
              .cone{
                text-align: left;
                color: #c81118;
              }
              .last{
                text-align: right;
                cursor: pointer;
              }
              .last1{
                text-align: right;
                /*cursor: pointer;*/
              }
              .tradeprice{
                cursor: pointer;
              }
              .clolor{
                color: #c81118;
              }
              .secolor{
                color: #009933;
              }
            }
          }
          .trhead{
              margin-top: 5px!important;
            }
          .newhistory{
            tr{
              td{
                height: 24px;
              }
            }
          }
        }
        .m-l{
          margin-right: 7px;
        }
        .tradelist{
          clear: both;
          background: #fff;
        }
        }
      }
    }
  }
  .el-loading-mask {
    background-color: rgba(255,255,255,.7);
  }
/*  .el-message-box__close {
    display: none;
  }*/
  .el-loading-spinner .el-loading-text{
    color: #c81118;
  }
</style>