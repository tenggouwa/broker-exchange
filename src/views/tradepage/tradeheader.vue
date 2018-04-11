<template>
  <div class="tradeheader">
    <div class="logo">
      <router-link to="/index" class='btlogo'><i class="iconfont icon-zhaobi"></i></router-link>
      <!-- <a href="" class='btlogo' @click="gotohome"></a> -->
      <div class="tb-table" v-show="ishowtrade==true" >
        <table @mouseleave="hidetrade" @mouseover="showtrade">
          <thead>
            <tr>
              <th>交易市场</th>
              <th>最新价</th>
              <th>涨跌幅</th>
              <th>最低</th>
              <th>最高</th>
              <th>交易量</th>
            </tr>
          </thead>
          <tbody id="getsymbol" >
            <tr v-for="(item,index) in coinlastdata"   @click="getSymbol(index)" :class="{'clickactive':ind==index}">
            <td  class='currency-name'>{{index | formatCoin}}</td>
            <td  class='up-to-date'>{{item[0].last | formatData}}</td>
            <td class='highslows'  v-bind:class="{'ups-downs':(item[0].last!=null)&&(parseFloat(item[0].last)>parseFloat(item[0].open))}">{{item[0].range| formatrange}}</td>
            <td>{{item[0].low | formatData}}</td>
            <td>{{item[0].high | formatData}}</td>
            <td>{{item[0].vol | formatData}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ul class="neworice frist" @click="getSymbol('BTYUSDT')" @mouseover="ishowtrade=false" >
      <li  class='btcbox' id="btysymbol" >
        <a class="currency" :class="{active:currencySymbol=='BTYUSDT'}">BTY/USDT {{BtyusdtcurrencyLast}}</a>
      </li>
    </ul>

    <ul class="neworice" @click="getSymbol('BTCUSDT')" @mouseover="ishowtrade=false">
      <li class='btcbox' id="btcsymbol" >
        <a class="currency" :class="{active:currencySymbol=='BTCUSDT'}">BTC/USDT {{BtcusdtcurrencyLast}}</a>
      </li>
    </ul>
    <ul class="neworice" @click="getSymbol('BCCUSDT')" @mouseover="ishowtrade=false" v-if="smallscrell==false">
      <li class='btcbox' id="bccsymbol" >
        <a class="currency" :class="{active:currencySymbol=='BCCUSDT'}">BCC/USDT {{BccusdtcurrencyLast}}</a>
      </li>
    </ul>
    <ul class="neworice" >
      <li @mouseover="showtrade" class='btcbox'>
        <a class="active" >
            <p v-show="currency!='BTYUSDT' && currency!='BTCUSDT'&& currency!='BCCUSDT'" class='moercur'>{{currency|showchange}}{{currencyLast}}</p> 
            <p v-show="currency=='BTYUSDT' || currency=='BTCUSDT'|| currency=='BCCUSDT'" :class="{'liactiveee':isactiveae=='0'}">更多市场</p>
            <!-- <p v-if="currency!='BTYUSDT' && currency!='BTCUSDT'&& currency!='BCCUSDT'" class="happen">{{currencyLast}}</p> -->
        </a>
        <img src="../../assets/img/arrowhead.png" alt="" class="arrowhead" >
        <!-- <p class='arrowhead' v-show="huise"><img src="../../assets/img/hui.png" alt=""></p>  -->
      </li>
    </ul> 
    <div  class="period-indicator">
      <ul class="period" id="period">
      <li name="M1" class="period_content" @click="changePeriod('M1')" ><a href="#" v-bind:class="{ active: isperiodshow('M1') }" >M1</a></li>
      <li name="M5" class="period_content" @click="changePeriod('M5')"><a href="#" v-bind:class="{ active: isperiodshow('M5') }">M5</a></li>
      <li name="M15" class="period_content" @click="changePeriod('M15')"><a href="#" v-bind:class="{ active: isperiodshow('M15') }">M15</a></li>
      <li name="M30" class="period_content" @click="changePeriod('M30')"><a href="#" v-bind:class="{ active: isperiodshow('M30') }">M30</a></li>
      <li name="H1" class="period_content" @click="changePeriod('H1')"><a href="#" v-bind:class="{ active: isperiodshow('H1') }">H1</a></li>
      <li name="H2" class="period_content" @click="changePeriod('H2')"><a href="#" v-bind:class="{ active: isperiodshow('H2') }">H2</a></li>
      <li name="H4" class="period_content" @click="changePeriod('H4')"><a href="#" v-bind:class="{ active: isperiodshow('H4') }">H4</a></li>
      <li name="D1" class="period_content" @click="changePeriod('W1')"><a href="#" v-bind:class="{ active: isperiodshow('D1') }">D1</a></li>
      <li name="W1" class="period_content"><a href="#" v-bind:class="{ active: isperiodshow('W1') }">W1</a></li>
      <li name="MN1" class="period_content" @click="changePeriod('MN1')"><a href="#" v-bind:class="{ active: isperiodshow('MN1') }">MN1</a></li>
    </ul>
    <div class="indicator" id="Indicator_list">
      <label class="active">MA</label>
      <label>VOLUMES</label>
      <label>MACD</label>
      <label>BOLLING</label>
      <label>KDJ</label>
    </div>
    </div>
   
    <div class="freetimebox ">
      <ul>
        <li>时间：2017-7-31 11:20</li>
        <li>开：1422</li>
        <li>高：8545</li>
        <li>低：47444</li>
        <li>收：475</li>
        <li>涨幅：44%</li>
        <li>振幅：0.11%</li>
        <li>量：46665</li>
      </ul>
    </div>
    <!-- <div class="Contact">
      <div class="contactclass">
        <div class="phone-num" @mouseover="showerweima(1)" @mouseout="noneerweima()"><a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1"><i class="iconfont icon-QQ1-copy"></i></a></div>
        <div class="phone-num" @mouseover="showerweima(2)" @mouseout="noneerweima()"><a target="_blank"><i  class="iconfont icon-weixin-copy"></i></a></div>
        <div class="phone-num" @mouseover="showerweima(3)" @mouseout="noneerweima()"><a target="_blank"><i  class="iconfont icon-weixin-copy"></i></a></div>
        <div class="phone-num" @mouseover="showerweima(4)" @mouseout="noneerweima()"><span style="">APP</span></div>
      </div> -->
      <!-- 新增二维码 -->
      <!-- <a class="montan motanone" v-show="showT1" target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1">
        <img src="../../../static/img/qq.png" height="144" width="120" alt="">
      </a>
      <div class="montan motantwo" v-show="showT2">
        <img src="../../../static/img/weixin.png" height="144" width="120" alt="">
      </div>
      <div class="montan motanthree" v-show="showT3">
        <img src="../../../static/img/weixin1.png" height="144" width="120" alt="">
      </div>
      <div class="montan motanfour" v-show="showT4">
        <img src="../../assets/img/home/download.png" height="144" width="120" alt="">
      </div>
    </div> -->
    <div style="clear:both;"></div>
    <div class="fright">
      <ul class="islog" @mouseleave="hidelogo(2)">
        <li class="logins" v-if="islogin==false">
          <span @mouseover="showlogin">登录/注册</span>
          <tradelogin @tradeSuccess="loginSuccess" :showLogin="tradeComLogin" :shownum="1" :logins="1"></tradelogin>
        </li>
        <li class="logins" v-if="islogin==true" >
          <span @mouseover="showlogo(2)" class="user-num"><i class="iconfont icon-touxiang"></i>{{username}}</span>
          <div class="logincom islogo" v-show="shwomoney"  @mouseleave="hidelogo(2)">
            <p class='total-assets'>
                <span>总资产:</span>
                <span class='assets'>{{moneyinfo.valuation}}</span>
            </p>
            <div class="btn-box">
              <button class="rech" ><router-link to="/usercenter/fince">充币</router-link></button>
              <span id="exit" @click="goOut()">退出</span>
            </div>
            <table class="table">
              <thead>
                <tr class="coinmoney">
                  <th>币种</th>
                  <th class='at-right'>可用</th>
                  <th class='at-right'>冻结</th>
                </tr>
              </thead>
              <tbody>
                <tr class="coinmoney" v-for="(item,index) in moneyinfo" v-if="index != 'valuation'" :class="{'nocoinmoney':item!=null&&Number(item.active)==0&&Number(item.frozen)==0}">
                  <td>{{index}}</td>  <!--  |filterIndex -->
                  <td v-if="item!=null">{{item.active}}</td>
                  <td v-if="item!=null">{{item.frozen}}</td>
                </tr>
              <!--   <tr class="coinmoney" v-for="(item,index) in moneyinfo" v-if="index== 'valuation'">
                  总资产:{{moneyinfo.valuation}}
                </tr> -->
              </tbody>
            </table>
          </div>
        </li>
      </ul>
      <ul v-if="cutout==false" class='cutout islog'>
        <li v-show="reveall">
          <router-link to="/usercenter/fince">
            <span class="shift-in">我的资产</span>

          </router-link>
          <!-- <img src="../../assets/img/arrowhead.png" alt="" class="arrowhead" > -->
        </li>
         <li>
           <a  @click="gototrade"><span class="shift-in">传统交易</span></a> 
        </li>
         <li>
          <router-link to="/traditional">
            <span :class="{'liactive':change=='0'}" class="shift-in" style="display:block;height:40px;">专业交易</span>
          </router-link>
        </li>
        <li>
          <router-link to="/innovate">
            <span :class="{'liactive':change=='1'}"  class="shift-in"  style="display:block;height:40px;">闪电交易</span>
          </router-link>
        </li>
      </ul>
      <div v-show="unlash" class="unlash-more">
          <h3>{{selected}}</h3>
          <p class='arrowhead1'><img src="../../assets/img/arrowhead.png" alt=""></p> 
          <ul class="over-flow">
            <li v-show="reveall" @mouseover="hidelogo(2)">
              <router-link to="/usercenter/fince">
                <span>我的资产</span>
              </router-link>
            </li>
             <li>
               <a  @click="gototrade"><span>传统交易</span></a> 
            </li>
             <li>
              <router-link to="/traditional">
                <span  @click="tradingg">{{trading}}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/innovate">
                <span @click="flashtradingg">{{flashtrading}}</span>
              </router-link>
            </li>
          </ul>
      </div>
      <div style="float:left">
        <a  @click="harvest" class="harvest" v-if='harvesta==false||harvesta=="false"'><img src="../../assets/img/harvest.png" alt=""></a>
        <a  @click="leavea" class="harvest" v-if='harvesta==true||harvesta=="true"'><img src="../../assets/img/leave.png" alt=""></a> 
      </div>
    </div> 
  </div>
</template>
<script>
import { ajax,getcookie,setcookie,delatecookie,sublogion,goregister,formatcoinprice} from '../../assets/js/common'
import tradelogin from './tradelogin.vue'
import Bus from '../../assets/js/bus.js'
  export default{
    props:['moneyinfo','change','fullChange','listentochild','loginsuccess'],
    data(){
      return {
        showT1:false,
        showT2:false,
        showT3:false,
        showT4:false,
        imgisshow:[false,false,false,false],
        ishowtrade:false,
        islogin:false,//判断是否登录
        shwomoney:false,//登录下鼠标移入的控制
        tradeComLogin:false,
        isactive:1,
        isactiveae:0,
        smallscrell:false,
        isActivea:false,
        reveall:false,
        cutout:false,
        unlash:false,
        harvesta: false||sessionStorage.getItem('harvesta'),
        leave:false,
        isinvote:0,
        huise:false,
        orange:false,
        ind:'',
        username:'',
        selected:'更多',
        trading:'专业交易',
        flashtrading :'闪电交易',
        coinlastdata:[],
        lowpassword:{
        mobile:'',
        email:'',
        vparam:'',
        codetype:'',
        },
        viladtecode:'',
        respassword:'',
        respasswordagain:'',
        currencySymbol:sessionStorage.getItem('symbol'),
        currency:'BCCBTC',
        BTCcurrencyLast:'',
        // WTCcurrencyLast:'',
        ETHcurrencyLast:'',
        ETCcurrencyLast:'',
        SCcurrencyLast:'',
        BCCcurrencyLast:'',
        BtyusdtcurrencyLast:'',
        BtcusdtcurrencyLast:'',
        BccusdtcurrencyLast:'',
        // NYCCcurrencyLast:'',
        currencyLast:'',
        login:{
          redirect_uri:'https://licai.cn',
          ltype:'web',
          username:'',
          password:'',
        },
        regester:{
          username:'',
          password:'',
        },
        interTime:0,
      }
    },
    created(){
      if(this.harvesta==null){
        this.harvesta=false;
      }
    },

    filters:{
      formatCoin:function(dev){
        if(dev.indexOf('USDT')>0){
          return dev.substr(0,dev.length-4)+'/'+'USDT';
        }else{
          return dev.substr(0,dev.length-3)+'/'+'BTC';
        }
      },
      filterIndex(e){
        if(e == 'NYCC'){
          return 'YCC';
        }
        else if(e == 'YCC'){
          return 'DYCC';
        }
        else if(e == 'WTC'){
          return 'WDT';
        }
        else{
          return e;
        }
      },
      showchange(e){
        if(e == '更多市场'){
          return e;
        }else{
          if(e.indexOf('USDT')>0){
            return e.substr(0,e.length-4)+'/'+'USDT';
          }else{
            return e.substr(0,e.length-3)+'/'+'BTC';
          }
        }
      },
      formatData(e){
        if(e==undefined||e==null){
          return '';
        }else{
          return e;
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
      // getRise:function(e){
      //   let difference=(parseFloat(e.last))-parseFloat(e.open);
      //   let rose=(parseFloat(difference)/parseFloat(e.open))*100 ;
      //   let num=parseFloat(rose).toFixed(2);
      //   if(rose>0){
      //     return '+'+num
      //   }else{
      //     return num
      //   }
      // },
    },
    destroyed(){
      clearInterval(this.interTime);
    },
    mounted:function(){
      this.flashRoute();
      this.getcoindata();
      this.getmwh();
      // this.harvest();
      this.interTime=setInterval(()=>{
        this.getcoindata();
      },2000);
      if(getcookie('token')){
        this.islogin=true;
        this.username=getcookie('username');
        this.reveall=true;
      }
      var activecoin=sessionStorage.getItem('symbol');
      if(activecoin=='null'||activecoin==null){
        this.getSymbol('BCCBTC');
      }
      else{
        this.getSymbol(activecoin);
      }

      if(document.body.clientWidth<1366){
        this.smallscrell=true;
      }else{
        this.smallscrell=false;
      }
     
    },
    components:{
      tradelogin
    },
    watch:{
      '$route' (to, from){
        var path=to.path;
        switch(path){
          case '/traditional':
          this.isinvote=0;
          break;
          case '/innovate':
          this.isinvote=1;
          break;
        }
      },
      loginsuccess(){
        if(getcookie('token')){
          this.islogin=true;
          this.username=getcookie('username');
          this.reveall=true;
        }
      }
    },
    methods:{
      //点图标跳转至首页
      gotohome(){
        this.$router.push({
            path: 'index'
        });
      },
      // 二维码
      showerweima(e){
        if(e == 1){
          this.showT1=true;
        }else if(e == 2){
          this.showT2=true;
        }else if(e == 3){
          this.showT3=true;
        }
        else if(e==4){
          this.showT4=true;
        }
      },
      noneerweima(){
        this.showT1=false;
        this.showT2=false;
        this.showT3=false;
        this.showT4=false;
      },

      formatCoin:function(dev){
        if(dev.indexOf('USDT')>0){
          return dev.substr(0,dev.length-4)+'/'+'USDT';
        }else{
          return dev.substr(0,dev.length-3)+'/'+'BTC';
        }
        
      },
      loginSuccess(){
        if(getcookie('token')){
          this.islogin=true;
          this.username=getcookie('username');
          this.reveall=true;
        }
        this.$emit('headlogin');
      },
      showlogin(){
        this.tradeComLogin=!this.tradeComLogin;
      },
      changePeriod(period){
        $.cookie('symbol',sessionStorage.getItem('symbol'));
        $.cookie('period',period)
      },
      showimg(num){
        this.ishowtrade=false;
        this.$set(this.imgisshow,num,true)
      },
      hiddenimg(num){
        this.$set(this.imgisshow,num,false)
      },
      showtrade(){
        this.ishowtrade=true;
        let selectcoin=sessionStorage.symbol+'CNY';
        // if(selectcoin=="YCCCNY"){
        //   selectcoin="NYCCCNY"
        // }
        for(let index in this.coinlastdata){
          if(index==selectcoin){
            this.ind=index;
          }
        }
      },
      hidetrade(){
        this.ishowtrade=false;
      },
      showlogo(num){
        this.shwomoney=true;
        this.resgist=false;
      },
      hidelogo(num){
        this.shwomoney=false;
      },
      addclass(index){
        sessionStorage.setItem('change',index);
        this.$emit("change",sessionStorage.getItem('change'));
      },
      leavea(){
        this.harvesta=false;
        sessionStorage.setItem('harvesta',false);
        sessionStorage.setItem('fullChange','0');
        this.$emit("fullChange","0");//1代表全屏，0代表非全屏
        location.reload(true);
      },
      tradingg(e){
        var _this=this
        _this.selected=_this.trading
      },
      flashtradingg(e){
        var _this=this
        _this.selected=_this.flashtrading
      },
      harvest(){
       this.harvesta=true;
       sessionStorage.setItem('harvesta',true);
       sessionStorage.setItem('fullChange','1');
       this.$emit("fullChange","1");//1代表全屏，0代表非全屏
       location.reload(true);
      },
     getmwh(){
        var mwidth=document.body.clientWidth;
        if(mwidth<=1580){
          this.cutout=true;
          this.unlash=true;
        }else{
          this.cutout=false;
          this.unlash=false;
        }
      },
      flashRoute: function() {
        var path = this.$route.path;
        switch(path){
          case '/traditional':
          this.isinvote=0;
          break;
          case '/innovate':
          this.isinvote=1;
          break;
        }
      },
      gototrade:function(){
        let symbol=sessionStorage.getItem('symbol');
        let type='';
        if(symbol.indexOf('USDT')>0){
          type= symbol.substr(0,symbol.length-4).toLowerCase()+'USDTtrade'
        }else{
          type= symbol.substr(0,symbol.length-3).toLowerCase()+'trade';
        }
       // let type=symbol.toLowerCase()+'trade';
       this.$router.push({
            path: '/usercenter/'+type
        });
      },
      //获取最新数据
      getcoindata(e){
        var _this=this;
        this.axios.get(this.extendApi.getcoindata,{
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;'
          }
        })
        .then(function(response){
          if(response.status==200){
            _this.coinlastdata=response.data.data;

            for(let i in response.data.data){
              if(i=="BTYUSDT"){
                _this.BtyusdtcurrencyLast=response.data.data["BTYUSDT"][0].last;
              }
              if(i=="BTCUSDT"){
                 _this.BtcusdtcurrencyLast=response.data.data["BTCUSDT"][0].last;
              }
              if(i=="BCCUSDT"){
                _this.BccusdtcurrencyLast=response.data.data["BCCUSDT"][0].last;
              }
              if(e!=undefined||e!=null){
                _this.currencyLast=response.data.data[e][0].last;
              }
              
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
      getSymbol(e){
        this.ind=e;
        this.isActive=true;
        this.clickactive=true;
        if(this.smallscrell){
          if(e=='BTYUSDT' || e=='BTCUSDT'|| e=='BCCUSDT'){
            this.currency="更多市场";
            this.currencyLast="";
            this.isactiveae='0';
            this.getcoindata();
          }
          if(e!='BTYUSDT' && e!='BTCUSDT'&& e!='BCCUSDT'){
            this.currency=e;
            this.isactiveae='1';
            this.getcoindata(e);
          }
        }else{
          if(e=='BTYUSDT' || e=='BTCUSDT' || e=='BCCUSDT'){
            this.currency="更多市场";
            this.currencyLast="";
            this.isactiveae='0';
            this.getcoindata();
          }
          if(e!='BTYUSDT' && e!='BTCUSDT' && e!='BCCUSDT'){
            this.currency=e;
            this.isactiveae='1';
            this.getcoindata(e);
          }
        }
        this.currencySymbol=e;
        // this.currencyLast=this.formatCoin(e);
        sessionStorage.setItem('symbol',e);
        $.cookie('symbol',e);
        this.$emit('updatesymbol');
        Bus.$emit("changeSymbol");
       
      },
      goOut(){
        delatecookie();
        location.reload(true);
      },
      gologin(){
        sublogion(this);
      },
      goregist(){
        goregister(this);
      },
      isperiodshow(e){
        if(e==sessionStorage.getItem('period')){
          return true;
        }
        else{
          return false;
        }
      },
      dialogshow(){
        this.$alert('资询客服需要通过大型社交应用Slack，您需要使用邮箱注册Slack后才能获取帮助。','提示',{
          confirmButtonText:'前往注册',
          callback:  (action, instance) => {
            if(action=='confirm'){

             window.open('https://join.slack.com/t/fxeework/shared_invite/enQtMjUzMTUxMTg3NzEyLTAyMGM1YTU5NmEzYWRjNWE2ZjYxYzU4YjE3ZTcxZjRjMGM3YzE5ZWRkMjA1ZWVhYjA5MjYyZGY3ODVlZjg5NDk');
            }
            if(action=='cancel'){
              instance.confirmButtonLoading = false;
            }
          }
        });
      },
    },
  }
</script>
<style> 
@import '../../../static/jquery.mCustomScrollbar.css';
  .mCSB_container{
    margin-right:0 
  }
  .tradeheader{
    width:100%;
    height: 40px;
    background: #171717;
   
    position: relative;
    a{
      color: #fff;
    }
    .logo{
      float: left;
      line-height: 34px;
      margin-left: 13px;
      position: relative;
      a{
        display: block;
        width: 60px;
        height: 40px;
        i{
           width: 60px;
           height: 40px;
           line-height: 40px;
           vertical-align: middle;
          font-size:50px;
        }
        span{
          font-size: 15px;
          vertical-align: top;
          margin-top: -1px;
        }
      }
      a:hover{
        color: rgb(255, 102, 0);
      }
      .tb-table{
        position: absolute;
        width: 720px;
        font-size: 10px;
        top:40px;
        
        z-index: 100;
        background: #232325;
        left: 350px;
        tr td:first-child{
          cursor:pointer;
        };
        .clickactive{
          background: #323234;
        }
        th{
          font-size: 12px;
          width: 110px;
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          font-weight: bold;
          color: #666;
        }
        .currency-name{
          font-size: 14px;
          width: 120px;
          height: 30px;
          line-height: 35px;
          padding-left: 10px;
          color: #ccc;
        }
        td{
          font-size: 14px;
          width: 120px;
          height: 30px;
          line-height: 35px;
          padding-left: 10px;
          color: #999;
        }
        .highslows{
          color: #6cd84c;
        }
        .ups-downs{
          color: #ff3a3a;
        }
        tr:hover{
          background: #323234;
        }
      }
    }
    .frist{
      /*margin-left: 20px;*/
    }
    .neworice{
      float: left;
      height: 40px;
      line-height: 40px;
      min-width: 165px;
      max-width: 165px;
      text-align: center;

      li{

        float: left;
        a{
          color: #808080;
          padding-left: 10px;
          font-size: 12px;
          cursor: pointer;
          
        }
        .active{
          
          padding-left: 10px;
          font-size: 14px;
          p{
            float: left;
          }
          .happen{
            margin-left: 10px;
          }
        }
      }
      .btcbox{
        position: relative;
        text-align: center;
        cursor: pointer;
        a{
          font-size: 14px;
          color:#999999;
        }
        .active{
          display: block;
          width: 165px;
          height: 100%;
          padding-left: 0px;
          font-size: 14px;
          font-weight: bold;
         text-align: center;
        position: relative;
        }
        .moercur{
          position: absolute;
          width: 165px;
          /*left: -25px;*/
        }
        .happen{
          position: absolute;
          width: 165px;
          /*left: 10px;*/
          left: 20px
        }
        .active:hover{
          color:#ff6600;
          background: #232325;
         }
        .arrowhead{
          position: relative;
          top:1px;
          right:0;
          left: 70px;
        }
        .currency{
          display: block;
          min-width: 165px;
          max-width: 165px;
          height: 100%;
          font-size: 14px;
          font-weight:bold;
          color: #999;
          border-right: 1px solid #232325;
          padding:0;
        }
        .currency:hover{
          background: #171717;
          color: #ff6600;
          min-width: 165px;
          max-width: 165px;
        }
        .active{
          color: rgb(255, 102, 0);
          font-weight: bolder;
          background: #232325;
          .liactiveee{
            width: 150px;
            color: #999;
            position: absolute;
            left: 0px;
          }
        }
      }
    }
    .first{
      margin-left: 30px;
      border-left: 1px solid #232325;
    }
    .period-indicator{
      width:100%;
      /*height:50px;*/
      height:70px;
      background:rgb(10,10,10);
      position:absolute;
      top:40px;
      .period{
      width: 320px;
      margin-left:8px;
      height: 40px;
      cursor: pointer;
      line-height: 44px;
      text-align: center;
      position: absolute;
      z-index: 99;
      a{
        color: #999999;
      }
      .period_content{
        float: left;
        padding-left: 10px;
        font-size: 12px;
      }
      .active{
          font-weight:bold;
          cursor: pointer;
          font-size: 12px;
          color:#ff6600;
        }
    }
    .indicator{
      position: absolute;
      /*top: 40px;*/
      left: 315px;
      margin-left:15px;
      margin-right:20px;
      height: 40px;
      line-height: 44px;
      text-align: center;
      z-index: 99;
      label{
        float: left;
        padding-left: 10px;
        font-size: 12px;
        color: #808080;
        /*.active{
          padding-left: 6px;
          font-size: 12px;
          color:#ff6600;
        }*/
      }
      .active{
         color:#ff6600;
         font-weight:bold;
      }
     label:hover{
      color:#ff6600;
     }
    }
    }
    .period{
      width: 320px;
      margin-left:8px;
      height: 34px;
      cursor: pointer;
      line-height: 34px;
      text-align: center;
      position: absolute;
      /*background:#fff ;*/
      /*top: 40px;*/
      z-index: 99;
      a{
        color: #999999;
      }
      .period_content{
        float: left;
        padding-left: 10px;
        font-size: 12px;
      }
      .active{
          /*padding-left: 8px;*/
          
          cursor: pointer;
          font-size: 12px;
          color:#ff6600;
        }
    }
    .indicator{
      position: absolute;
      /*top: 40px;*/
      left: 315px;
      margin-left:15px;
      margin-right:20px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      z-index: 99;
      label{
        float: left;
        padding-left: 10px;
        font-size: 12px;
        color: #808080;
        /*.active{
          padding-left: 6px;
          font-size: 12px;
          color:#ff6600;
        }*/
      }
      .active{
         color:#ff6600;
      }
     label:hover{
      color:#ff6600;
     }
    }
    .freetimebox {
      display: none;
      position: absolute;
      top: 80px;
      z-index: 99;
      ul{
        li{
           color: #555;
           float: left;
           margin-left: 18px;
        }
      }
    }
    .Contact{
      float: left;
      .montan{
        position: fixed;
        z-index: 999;
        margin-left: -40px;
      }
      
      .motantwo{
        margin-left: 0px;
      }
      .motanthree{
        margin-left: 40px;
      }
      .motanfour{
        margin-left: 80px;
      }
      .contactclass{
        /*padding: 7px;*/
        .phone-num{
          font-size: 14px;
          height:40px;
          border-radius: 4px;
          line-height: 40px;
          padding: 5px;
          display: inline;
          cursor: pointer;
          span{
            color: #999;
            font-weight: bolder;
            display:inline-block; 
            height:40px;
            line-height:40px;
            text-align: center;
            vertical-align:middle;
          }

          a{
            display: inline-block;
            color: #999;
           
            height: 40px;
            line-height: 40px;
            text-align:center;
            i{
              display: inline-block;
              height: 40px;
              line-height: 40px;

              text-align:center;
              vertical-align: middle;
              margin: 0 4px;
            }
            span{
               font-weight: bolder;
               display: inline-block;
              height: 40px;
              line-height: 40px;

              text-align:center;
              vertical-align: middle;
              margin: 0 4px;
            }

          }
        }
        .phone-num:nth-child(1){
          /*margin-right: 20px;*/
        }
        .phone-num:hover{
          span,a{
            color: #ff6600;
          }
        }
      }
      
      
    }
    .fright{
      float: right;
      position: absolute;
      top:0px;
      right: 0px;
      color: rgba(225, 225, 225, 0.9);
      line-height: 34px;
      margin-right: -8px;
      ul{
        li{
          /*width: 100%;*/
          float: left;
          color: rgba(255, 255, 255, 0.6);
          height: 40px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
          /*padding-top:5px;*/
          /*margin-left: 40px;*/
          img{
            width: 20px;
            height: 20px;
            margin-top: 7px;
          }
          .showindex{
            z-index: 10;
            position: absolute;
            width: 96px;
            height: 120px;
            top:40px;
            margin-top: 0;
            left:-90px;
          }
          .groupimg{
            height: auto;
            overflow: hidden;
          }
          .showios{
            z-index: 10;
            position: absolute;
            width: 96px;
            height: 120px;
            top:40px;
            margin-top: 0;
            left:10px;
          }
          .qqinfo{
            z-index: 10;
            position: absolute;
            height: 20px;
            top:30px;
            left: -20px;
            margin: 0;
            color: rgba(255, 255, 255, 0.6)

          }
          .yxQQ{
            /*padding: 0 10px;*/
            width: 166px!important;
          }
          .33erweima{
            left: 0;
            top:34px;
          }
          .weixin{
            left: -40px;
          }
        }
        .tx-icon{
          margin-left: 20px;
         a{
          /*cursor: default;*/
            display: inline-block;
            width: 100%;
            height: 100%;
          p{
            width: 140px;
            height: 30px;
            font-size: 14px;
            color: #ccc;
            background: #232325;
            line-height: 30px;
            text-align: center;
            margin-top: 10px;
            margin-left: -30px;
          }
          .wximg{
             height:140px;
             margin-top: 0;
            }
         }
        }
      }
      
      .unlash-more{
        float: left;
        margin-right: 100px;
        cursor: pointer;
        line-height: 40px;
        font-size: 14px;
        position: relative;
        .arrowhead1{
          position: absolute;
          right: -30px;
          top: 0;
        }
        .over-flow{
          width: 100px;
          background: #232325;
          position: absolute;
          right: -40px;
          z-index: 2000;
          display: none;
          li{
            width: 100px;
            line-height: 40px;
            text-align: center;

          }
          li:hover{
            background: #29292b;
          }
        }

      }
       .unlash-more:hover .over-flow{
          display: block;
        }
      .unlash-more:hover{
         color:#ff6600;
      }
       div{
          position: relative;
          .harvest{
            position: absolute;
            right: 20px;
            top:7.5px;
          }
        }
        .cutout{

        margin-right: 40px;
        }
      .islog{
        float: left;
        /*overflow: hidden;*/
        li{
          float: left;
          /*margin-right: 40px;*/
          margin-right: 20px;
          cursor: pointer;
          span{
            line-height: 40px;
          }
          a{
            span{
               font-size: 14px;
            color: #999;
            line-height: 40px;
            }
           
          }
        }
        .liactive{
        color:#ff6600;
      }
        li:hover .shift-in{
          color: #ff6600;
        }
        .logins{
          position: relative;
          color:#ff6600;
          font-size: 14px;
          .logincom{
            position: absolute!important;
            z-index: 2000;
            left: -100px;
            background-color: #232325;
            color: #ff6600;
            text-align: center;
            padding: 0px 20px 20px 20px;
          }
          .user-num {
            color: #999;
            padding-left: 25px;
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 20px;
            i{
              margin-right: 5px;
            }
          }
          .islogo{
            color: #fff;
            min-width: 300px;
            z-index: 9999;
            .total-assets{
              text-align: left;
              height: 40px;
              color: #666;
              span{
                line-height: 40px;
              }
              .assets{
                font-size: 18px;
                color: #ccc;
              }
            }
            .btn-box{
              #exit {
                float: right;
                background-color: #808080;
                width: 80px;
                height: 30px;
                line-height: 30px;
                border-width: 0px;
                padding: 0px 6px;
                margin-top: 2px;
              }
            }
            .rech{
              float: left;
              width: 160px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background: #c81118;
              color: #fff;
              cursor: pointer;
              border:0;
            }
            .table{
              width: 100%;
              margin-left: -60px;
              margin: auto;
              height: auto;
              overflow: hidden;
            }
            .coinmoney{
              width: 260px!important;
              height: 30px;
              line-height: 30px;
         
              td{
                width: 40px!important;
                height: 30px;
                line-height: 30px;
                text-align: right;
                padding: 0 5px;
                font-size: 14px;
                color: #ccc;
              }
              td:nth-child(1){
                text-align: left;
                width: 40px!important;
              }
              th{
                width: 40px;
                height: 30px;
                line-height: 30px;
                text-align: left;
                padding: 0 5px;
                font-size: 12px;
                color: #666;
              }
              .at-right{
                text-align: right;
                width: 110px;
              }
            }
            .nocoinmoney{
              td{
                color: #666;
              }
            }
          }
        }
        .logins:hover .user-num{
            color: #ff6600;
            padding-left: 25px;
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 20px;
          }
      }
    }
    .icon-QQ1-copy,.icon-qunzuguanli,.icon-weixin-copy,.icon-qqqun{
      font-size: 20px;
    }
  }
</style>