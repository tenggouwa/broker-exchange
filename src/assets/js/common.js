var checkBroeser=function(){
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
      return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
     return "Firefox";
  } //判断是否Firefox浏览器
  if(userAgent.indexOf("Chrome") > -1&&userAgent.indexOf("Edge") >-1&&userAgent.indexOf("Safari") >-1){
    return "IE";
  }
  if (userAgent.indexOf("Chrome") > -1){
     return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
  } //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1&& !isOpera) {
      return "IE";
   }; //判断是否IE浏览器
}

   
var setcookie = function(name, value) { //设置cookie的值
  name = "block_fxees" + name;
  $.cookie(name, value);
  if (localStorage) {
    localStorage.setItem(name, value);
  }
}
var getcookie = function(name) { //获取cookie的值
  name = "block_fxees" + name;
  if ($.cookie(name)) {
    return $.cookie(name);
  } else if (localStorage) {
    return localStorage.getItem(name);
  } else {
    return null;
  }
}
var delatecookie = function() { //清空cookie
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
  localStorage.clear();
}
//组件时间格式转换
var temptime = function(temptime) {
  // temptime=temptime*1000;
    var gettype = Object.prototype.toString;
    if (temptime != '' && (gettype.call(temptime) == '[object Date]')) {
      temptime = temptime.getFullYear() + '-' + Appendzero(temptime.getMonth() + 1) + '-' + Appendzero(temptime.getDate());
    }
    return temptime;
}
//月份日期补零
var Appendzero = function(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}
//判断手机
var checkMobile=function(s){
  var regu = /^[1][0-9][0-9]{9}$/; 
  var re = new RegExp(regu); 
  if (re.test(s)) { 
  return true; 
  } else { 
  return false; 
  } 
}
//判断邮箱
var checkEmail=function(email,that){
  //判断邮箱格式是否正确 
  if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) { 
    alert("邮箱格式错误!"); 
    that.focus(); //让邮箱文本框获得焦点 
    return false; 
  } 
  return true; 
}
//获取手机验证码
var getMobileCode=function(that,success){
}
//获取行情数据
var getticketcom = function(that, params, callback) {
  that.axios({
    method: 'get',
    url: that.extendApi.getBtcMarketData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
    params: params,
  }).then((response) => {
    var reponse = response.data;
    callback(reponse);
  }).catch(function(response) {
  })
}
var getticket = function(_this, cointype, tradepage) {
  // cointype = cointype + 'BTC';
  _this.ticket.symbol = cointype;
  getticketcom(_this, _this.ticket, function(reponse) {
    if (reponse.code == 200 && _this.symbol == reponse.data.symbol) {
      _this.tradeloading = false;
      _this.newtrade = reponse.data.trade;
      if (reponse.data.trade.length > 0) {
        _this.newprice = reponse.data.trade[0].price;
        _this.newtradenum = reponse.data.trade[0].am;
        _this.isbuy = reponse.data.trade[0].type;
        setcookie('newprice',cointype+":"+ _this.newprice);
        document.title = getcookie("newprice");
      } else {
        _this.newprice = 0;
        _this.newtradenum = 0;
        setcookie('newprice',cointype+":0.00");
        document.title = getcookie("newprice");
      }
      if (tradepage == 'fasttrade') {
        reponse.data.marketdata.sell = reponse.data.marketdata.sell.reverse();
      }
      if (reponse.data.marketdata.buy.length > 0) {
        _this.mountedBuyone = reponse.data.marketdata.buy[0].price;
      } else {
        _this.mountedBuyone = 0.00;
      }
      if (reponse.data.marketdata.sell.length > 0) {
        if (tradepage == 'fasttrade') {
          _this.mountedSellone = reponse.data.marketdata.sell[reponse.data.marketdata.sell.length - 1].price;
        } else {
          _this.mountedSellone = reponse.data.marketdata.sell[0].price;
        }

      } else {
        _this.mountedSellone = 0.00;
      }
      _this.sellticket = reponse.data.marketdata.sell;

      _this.buyticket = reponse.data.marketdata.buy;
      for (let i = 0; i < _this.sellticket.length; i++) {
        _this.sellticket[i].sellwtd = '';
        _this.sellticket[i].buywtd = '';
        var lprice = 0;

        //根据后台给的小数点位数来控制比较好
        lprice =parseFloat(_this.sellticket[i].price).toFixed(formatcoinpriceHQ(sessionStorage.symbol))
        if (_this.amstat[lprice]) {
          if (_this.amstat[lprice].buy != null) {
            _this.sellticket[i].buywtd = _this.amstat[lprice]['buy'];
          } else {
            _this.sellticket[i].sellwtd = _this.amstat[lprice]['sell'];
          }
        }
      }
      for (let i = 0; i < _this.buyticket.length; i++) {
        _this.buyticket[i].buywtd = '';
        var lprice = 0;
        lprice =parseFloat(_this.buyticket[i].price).toFixed(formatcoinpriceHQ(sessionStorage.symbol))
        if (_this.amstat[lprice]) {
          if (_this.amstat[lprice].buy != null) {
            _this.buyticket[i].buywtd = _this.amstat[lprice]['buy'];
          } else {
            _this.buyticket[i].sellwtd = _this.amstat[lprice]['sell'];
          }
        }
      }
    } else {
      console.log(response.message);
    }
  }, 'GET')
}
//获取手续费
var gettxfees=function(_self){
  ajax(_self, _self.extendApi.txfees, '', function(response) {
    if(response.code==200){
      _self.txfeesList=response.data;
      for(let i in _self.txfeesList){
        if(i==_self.symbol){
          _self.rate=_self.txfeesList[i]//获取手续费
        }
      }
    }else{
      console.log(response.message);
    }
  },'GET')
}
//撤单
var cannel = function(_this, id) {
  _this.cancelparm.orderid = id;
  // _this.cancelparm.currency = sessionStorage.getItem('symbol');
  ajax(_this, _this.extendApi.Cancel, _this.cancelparm, function(response) {
    if (response.code == 200) {
      setTimeout(function() {
        _this.gethistorylist();
        getusermoney(_this);
      }, 1000)
      _this.$notify({
        title: '成功',
        message: '撤单成功',
        type: 'success',
        duration: '1000',
      });
    } else {
      _this.$notify({
        title: '失败',
        message: '撤单失败',
        type: 'error',
        duration: '1000',
      });
    }
  })
}
//获取国籍列表
var getCountryList=function(_this,success){
  let param={
    type:'code'
  }
  ajax(_this,_this.extendApi.getCountry,param,(response)=>{
    if(response.code == 200){
      success(response.data)
    }
    else{
      console.log(response.message);
      //异常处理
    }
  })
} 
//获取银行列表
var getbanklist = function(_this) {
    // var _this=this;
    ajax(_this, _this.extendApi.bankList, '', function(response) {
      var data = response.data;
      for (var i in data) {
        _this.banklist.push({
          'value': i,
          'label': data[i]
        });
      }
    })
}
//获取省份列表
var getprovice = function(_this) {
    // var _this=this;
    ajax(_this, _this.extendApi.provinceList, '', function(response) {
      var data = response.data;
      for (var i in data) {
        _this.provice.push({
          'value': i,
          'label': data[i]
        });
      }
    })
}
//获取验证码
var sendyzm = function(_this, codetype, vparam, mobile) {
    var postdata = {
      'mobile': mobile,
      'codetype': codetype,
      'vparam': vparam
    }
    ajax(_this, _this.extendApi.sendSms, postdata, function(response) {
      if (response.code == 200) {
        _this.$notify({
          title: '提示',
          message: '短信发送成功，请注意查收',
          type: 'success'
        });
        if (codetype == 'realinfo') {
          _this.scode = setInterval(function() {
            lasscode(_this, 0);
          }, 1000);
        } else if (codetype == 'bindcoinaddress') {
          _this.scode = setInterval(function() {
            lasscode(_this, 2);
          }, 1000);
        } else if (codetype == 'bindbankcard') {
          _this.scode = setInterval(function() {
            lasscode(_this, 3);
          }, 1000);
        } else if (codetype == 'setpayword') {
          _this.scode = setInterval(function() {
            lasscode(_this, 4);
          }, 1000);
        } else if (codetype == 'coinout_btc') {
          _this.scode = setInterval(function() {
            lasscode(_this, 6);
          }, 1000);
        } else if (codetype == 'cashout') {
          _this.scode = setInterval(function() {
            lasscode(_this, 7);
          }, 1000);
        }
      } else {
        _this.$notify({
          title: '提示',
          message: response.message,
          type: 'error'
        });
      }
    })
}
/*jquery ajax请求数据*/
var jqueryAjax = function(that, url, params, success, method) {
    var token = getcookie('token');
    var openId = sessionStorage.getItem('openId');
    var Authorization = 'Bearer ' + token;
    if (method == 'GET') {
      $.ajax({
        type: 'get',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: url,
        dataType: 'json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", Authorization)
        },
        success: function(response) {
          success(response);
        },
        error: function(response) {
          console.log(response);
        }
      })
    } else {
      $.ajax({
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: url,
        data: params,
        dataType: 'json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", Authorization)
        },
        success: function(response) {
          success(response);
        },
        error: function(response) {
          console.log(response);
        }
      })
    }
}
/* ajax请求 */
var ajax = function(that, url, params, success, method) {
  var token = getcookie('token');
  var openId = sessionStorage.getItem('openId');
  if (method == 'GET') {
    that.axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
      params: params,
      // timeout:5000,
    }).then((response) => {
      success(response.data);
    }).catch(function(response) {
      console.log(response);
    })
  } else {
    params = that.querystring.stringify(params);
    that.axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded;',
      },
      data: params,
    }).then((response) => {
      success(response.data);
    }).catch(function(response) {
      console.log('error');
    })
  }
}
//语音验证码发送
var sendVoicecode=function(_self,param,success){
  ajax(_self,_self.extendApi.sendvoice,param,(response)=>{
    if(response.code == 200){
      success(response.data);
      _self.$notify({
        title: '成功',
        message: '语音验证码已发送，请查收',
        type: 'success',
        duration:'1000',
      });
    }else{
      _self.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
    }
  })
}
//手机验证码获取  _self是this,param是参数，success是回调
var getPhoneValidate=function(_self,param,success){
  ajax(_self,_self.extendApi.getCodeNew,param,(response)=>{
    if(response.code == 200){
      success(response.data);
      _self.$notify({
        title: '成功',
        message: '验证码发送成功',
        type: 'success',
        duration:'1000',
      });
      if(response.data.isShow == 1){
        // that.alertStatus = true;
        sessionStorage.setItem('alertStatus','true')
        sessionStorage.setItem('dataSrc',response.data.data.jsUrl)
        sessionStorage.setItem('businessId',response.data.data.businessId)
      }
      // return;
    }else{
      _self.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
       // return;
    }
  });
}
//邮箱验证码获取  _self是this,param是参数，success是回调
var getEmailValidate=function(_self,param,success){
  ajax(_self,_self.extendApi.getEmailCodeApi,param,(response)=>{
    if(response.code == 200){
      success(response.data);
      _self.$notify({
        title: '成功',
        message: '验证码已发送至邮箱',
        type: 'success',
        duration:'1000',
      });
      if(response.data.isShow == 1){
        sessionStorage.setItem('alertStatus','true')
        sessionStorage.setItem('dataSrc',response.data.data.jsUrl)
        sessionStorage.setItem('businessId',response.data.data.businessId)
      }
      // return;
    }else{
      _self.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
       // return;
    }
  });
}

//获取用户认证状态
var getStates=async function(_self,success){
  await ajax(_self,_self.extendApi.getstates,'',(response)=>{
    if(response.code == 200){
      success(response.data);
      return;
    }else{
      console.log(response.message);
       return;
    }
  });
}
//图片上传  ---上传认证证件
var uploadImg=function(_self,param,success){
  _self.axios({
    method: "POST",
    url: _self.extendApi.uploadUrl,
    headers: {
      'FZM-Ca-AppKey': 'zhaobi',
    },
    data: param,
    async: false, 
    cache: false, 
    contentType: false, 
    processData: false, 
  }).then((response) => {
    success(response.data);
  }).catch(function(response) {
    if(response.data.code==413){
      _self.$notify({
        title: '提示',
        message: "图片太大，请重新选择",
        type: 'warning',
        duration: '2000'
      });
    }
    console.log('error');
  })
}
//获取证件类型
var getCardtypes=function(_self,success){
  ajax(_self, _self.extendApi.cardtypes, '', function(response) {
    if(response.code==200){//获取成功操作
      success(response.data);
    }else{
       _self.$notify({
        title: '提示',
        message: response.message,
        type: 'warning',
        duration: '2000'
      });
    }
  },'GET')
}
//获取人脸提币的数量
var getfaceamount=function(_self,param,success){
  ajax(_self, _self.extendApi.getfaceamount,param, function(response) {
    if(response.code==200){
       success(response.data);
    }else{
      console.log(response.message)
    }
  },'GET')
}
/* 时间戳转换函数 */
var getDataYear = function(format, timestamp) {
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
}
//获取用户信息
var getuserinfo = function(_this, type) {
  ajax(_this, _this.extendApi.getUserInfo, '', function(response) {
    if (response.code == 200) {
      var data = response.data;
      savecookie(data);
      if (type == 'all') {
        _this.userinfo = data.base;
        _this.userauthinfo.email = data.base.email;
      }
      _this.Loading = false;
    } else if (response.code == -2) {
      delatecookie();
    }
  }, 'GET')
}
var lasscode1 = function(_this,Num){
  // var _this=this;
  clearInterval(_this.scode);
  var codenum = 60;
  _this.isenabled=true;
  _this.scode = setInterval(()=>{
    codenum= codenum-1;
    _this.codenum = codenum+'秒后重试'
    if(codenum == 0){
      if(Num>=1){
        _this.notfirstget=true;
      }
      _this.isenabled=false;
       _this.isclick=false;
      // this.regester.gid = '';
      _this.codenum = '获取验证码';
      clearInterval(_this.scode);
      // this.regester.code = '';
    }
  },1000)
}
//获取验证码倒计时
var lasscode = function(_this, setnum) {
    // var _this=this;
    _this.codenum = _this.codenum - 1;
   _this.isenabled=true;
    var lnext = _this.codenum + '秒后重试'
    _this.$set(_this.getcode, setnum, lnext);
    if (_this.codenum == 0) {
      _this.isenabled=false;
      _this.codenum = 60;
      _this.isclick=false;
      clearInterval(_this.scode);
      _this.$set(_this.getcode, setnum, '获取验证码');
    }
}
//获取资金数据
var getusermoney = function(_this) {
  // var _this=this;
  ajax(_this, _this.extendApi.getMoneyInfo, '', function(reponse) {
    if (reponse.code == 200) {
      var data = reponse.data;
      for (let index in _this.moneyinfo) {
        _this.moneyinfo[index] = data.list[index];
      }
      _this.moneyinfo.valuation = data.valuation;
     
       let symbol = sessionStorage.getItem('symbol');
      if(symbol.indexOf('USDT')>0){
        symbol= symbol.substr(0,symbol.length-4);
         _this.myAssets.availablemoney = data.list.USDT.active;
           _this.myAssets.frozenmoney = data.list.USDT.frozen;
        // _this.myAssets.exchangeavailablecoin = data.list.USDT.active;
         // _this.myAssets.exchangefrozencoin = data.list.USDT.frozen;
      }else{
        symbol= symbol.substr(0,symbol.length-3);
         _this.myAssets.availablemoney = data.list.BTC.active;
        // _this.myAssets.exchangeavailablecoin = data.list.BTC.active;
        _this.myAssets.frozenmoney = data.list.BTC.frozen;
         // _this.myAssets.exchangefrozencoin = data.list.BTC.frozen;
      }
       _this.myAssets.exchangeavailablecoin = data.list[symbol].active;
      if (_this.buyprice > 0) {
        _this.MaxBuyNum = parseFloat(_this.myAssets.availablemoney / _this.buyprice ).toFixed(nitFince(symbol));
      }
      if (_this.buynumm == 0) {
        _this.nextMoney = _this.myAssets.availablemoney;
      }
      _this.myAssets.exchangefrozencoin = data.list[symbol].frozen;
     
      _this.myAssets.availablecoin = data.list[symbol].active;
      if (_this.sellScroll == 0) {
        _this.nextcoin = _this.myAssets.availablecoin
      }
      _this.myAssets.frozencoin = data.list[symbol].frozen;
    }

    if (reponse.code == -2) {
      delatecookie();
    }
  }, 'GET');
}
var savecookie = function(data) {
  setcookie('username', data.base.username);
  setcookie('adddate', data.base.adddate);
  setcookie('addtime', data.base.addtime);
  setcookie('email', data.base.email);
  setcookie('group', data.base.group);
  setcookie('regip', data.base.regip);
}
var sublogion = function(_this, pageindex) { //登录
  ajax(_this, _this.extendApi.getToken, _this.login, function(res) {
    if (res.code == 200) {
      var data = res.data;
      
      setcookie('token', data.access_token);
      setcookie('refreshtoken', data.refresh_token);
      if(data.group=="unauthorized"){//强制认证
         _this.dialogVisible =true;
         return ;
      }
      var tokenexpressTime = parseInt(data.expires_in);
      var logintime = parseInt(new Date().getTime() / 1000);
      var deadtime = logintime + tokenexpressTime;
      setcookie('deadtime', deadtime);
      setcookie('id', data.userid);

      ajax(_this, _this.extendApi.getUserInfo, '', function(data) {
        savecookie(data.data);
        _this.username = data.data.base.username;
        if (pageindex == 'index') {
          _this.$router.push({
            path: '/usercenter/btyUSDTtrade'
          });
        } else {
          _this.$emit('tradeSuccess');
        }
      })
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning',
        duration: '2000'
      });
    }
  }, 'POST')
}
var goregister = function(_this, pageindex) { //注册接口
  // var _this=this;
  ajax(_this, _this.extendApi.userReg, _this.regester, function(res) {
    if (res.code == 200) {
      _this.$notify({
        title: '提示',
        message: '注册成功',
        type: 'success'
      });
      _this.login.email = _this.regester.email;
      _this.login.password = _this.regester.password;
      sublogion(_this, pageindex);
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  })
}
var getCointoCoin=function(_self){//货币对
  if(_self.indexOf('USDT')>0){
    return _self.substr(0,_self.length-4)+'/'+'USDT';
  }else{
    return _self.substr(0,_self.length-3)+'/'+'BTC';
  }
}
//价格框输入保留位数
var formatcoinPrice = function(type, price) {
    price = price.toString();
    // return (price.match(/\d+(\.\d{0,4})?/) || [''])[0];
    if(type=="BCCBTC"||type=="BTYUSDT"||type=="YCCUSDT"||type=="BTSUSDT"){
      return (price.match(/\d+(\.\d{0,4})?/) || [''])[0];
    }
    if(type=="ETCBTC"||type=="LTCBTC"||type=="SCUSDT"){
      return (price.match(/\d+(\.\d{0,6})?/) || [''])[0];
    }
    if(type=="ETHBTC"||type=="ZECBTC"){
      return (price.match(/\d+(\.\d{0,5})?/) || [''])[0];
    }
    if (type == "BTCUSDT" || type == "BCCUSDT" || type == "ETHUSDT" || type == "ETCUSDT"  || type == "ZECUSDT"|| type == "LTCUSDT"|| type == "BTCSUSDT"|| type == "DCRUSDT") {
      return (price.match(/\d+(\.\d{0,2})?/) || [''])[0];
    }
}
//格式化价格框保留位数
var formatcoinpriceHQ = function(type) {
    let coinlist = {
      "BCCBTC": '4',
      "ETHBTC": '5',
      "ETCBTC": '6',
      "ZECBTC": '5',
      "LTCBTC": '6',
      "BCCUSDT": '2',
      "BTCUSDT": '2',
      "ETHUSDT": '2',
      "ETCUSDT": '2',
      "ZECUSDT": '2',
      "LTCUSDT": '2',
      "BTYUSDT": '4',
      "YCCUSDT": '4',
      'SCUSDT':'6',
      'BTSUSDT':'4',
      'BTCSUSDT':'2',
      'DCRUSDT':'2',
    }
    if (coinlist[type] == undefined) {
      console.log("缺少币种配对配置");
      return false;
    } else {
      return coinlist[type];
    }
}
//格式化数量框
var formatcoinNum = function(type) {
  let coinlist = {
    "BCCBTC": '4',
    "ETHBTC": '3',
    "ETCBTC": '2',
    "ZECBTC": '3',
    "LTCBTC": '2',
    "BCCUSDT": '4',
    "BTCUSDT": '4',
    "ETHUSDT": '3',
    "ETCUSDT": '2',
    "ZECUSDT": '3',
    "LTCUSDT": '2',
    "BTYUSDT": '1',
    "YCCUSDT": '0',
    'SCUSDT':'0',
    'BTSUSDT':'2',
    'BTCSUSDT':'2',
    'DCRUSDT':'2',
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
}
var numjs = function(type) {
  let coinlist = {
    "BCCBTC": 100000,
    "ETHBTC": 100000,
    "ETCBTC": 100000,
    "ZECBTC": 100000,
    "LTCBTC": 100000,
    "BCCUSDT": 100000,
    "BTCUSDT": 10000000,
    "BTYUSDT": 100000,
    "ETHUSDT": 100000,
    "ETCUSDT": 100000,
    "ZECUSDT": 100000,
    "LTCUSDT": 100000,
    "YCCUSDT": 100000,
    'BTSUSDT':10,
    'BTCSUSDT':100000,
    'SCUSDT':0,
    "DCRUSDT": 100000,
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
}
//格式化价格框保留位数
var formatcoinprice = function(type) {
    let coinlist = {
      "BCCBTC": '4',
      "ETHBTC": '4',
      "ETCBTC": '4',
      "ZECBTC": '4',
      "LTCBTC": '4',
      "BCCUSDT": '4',
      "BTCUSDT": '4',
      "BTYUSDT": '4',
      "ETHUSDT": '4',
      "ETCUSDT": '4',
      "ZECUSDT": '4',
      "LTCUSDT": '4',
      "YCCUSDT": '4',
      'SCUSDT':'4',
      'BTSUSDT':'4',
      'BTCSUSDT':'4',
      'DCRUSDT':'4',
    }
    if (coinlist[type] == undefined) {
      console.log("缺少币种配对配置");
      return false;
    } else {
      return coinlist[type];
    }
}
//累加价格
var addformatcoinprice = function(type) {
    let coinlist = {
      "BCCBTC":'0.0001',
      "ETHBTC":'0.0001',
      "ETCBTC":'0.0001',
      "ZECBTC":'0.0001',
      "LTCBTC":'0.0001',
      "BCCUSDT":'0.0001',
      "BTCUSDT":'0.0001',
      "BTYUSDT":'0.0001',
      "ETHUSDT":'0.0001',
      "ETCUSDT":'0.0001',
      "ZECUSDT":'0.0001',
      "LTCUSDT":'0.0001',
      "YCCUSDT":'0.0001',
      'SCUSDT':'1',
      'BTSUSDT':'0.01',
      'BTCSUSDT':'0.000001',
      'DCRUSDT':'0.01',
    }
    if (coinlist[type] == undefined) {
      console.log("缺少币种配对配置");
      return false;
    } else {
      return coinlist[type];
    }
}
//累加数量
var addtradeNum = function(type) {
  let coinlist = {
     "BCCBTC": '0.001',
    "ETHBTC": '0.001',
    "ETCBTC": '0.001',
    "ZECBTC": '0.001',
    "LTCBTC": '0.001',
    "BCCUSDT": '0.0001',
    "BTCUSDT": '0.0001',
    "BTYUSDT": '0.1',
    "ETHUSDT": '0.01',
    "ETCUSDT": '0.01',
    "ZECUSDT": '0.001',
    "LTCUSDT": '0.001',
    "YCCUSDT":'1',
    'SCUSDT':'1',
    'BTSUSDT':'1',
    'BTCSUSDT':'0.01',
    'DCRUSDT':'0.01',
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
}

var initCoinNum = function(type) {
  let coinlist = {
    "BCCBTC": '0.001',
    "ETHBTC": '0.001',
    "ETCBTC": '0.01',
    "ZECBTC": '0.001',
    "LTCBTC": '0.01',
    "BCCUSDT": '0.0001',
    "BTCUSDT": '0.0001',
    "BTYUSDT": '100',
    "YCCUSDT": '100',
    "ETHUSDT": '0.01',
    "ETCUSDT": '0.01',
    "ZECUSDT": '0.001',
    "LTCUSDT": '0.001',
    'SCUSDT':'100',
    'BTSUSDT':'100',
    'BTCSUSDT':'0.01',
    'DCRUSDT':'0.01',
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
}
var initcoinnum=function(type){
  let newtype='';
  if(type.indexOf('USDT')>0){
    newtype=type.substr(0,type.length-4);
  }else{
    newtype= type.substr(0,type.length-3);
  }
  let coinlist = {
    "USDT": '0.01',
    "BTC": '0.0001',
    "BCC": '0.0001',
    "ETH": '0.001',
    "ETC": '0.01',
    "ZEC": '0.001',
    "LTC": '0.01',
    "BTY": '0.1',
    "YCC": '1',
    'SC':'10',
    'BTS':'1',
    'BTCS':'0.01',
    'DCR':'0.01',
  }
  if (coinlist[newtype] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[newtype];
  }
}
//资产小数位数
var nitFince=function(type){
  let coinlist = {
    "USDT": 6,
    "BTC": 8,
    "BCC": 6,
    "ETH": 6,
    "ETC": 6,
    "ZEC": 6,
    "LTC": 6,
    'SC':0,
    'BTS':2,
    'BTCS':6,
    "BTY": 6,
    "YCC": 6,
    'DCR':6,
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
}
//最小交易量
var getmincoinNum = function(type, num) {
  // alert(type)
  num = num.toString();
  
  if(type=="ETHBTC"||type=="ZECBTC"||type=="ETHUSDT"||type=="ZECUSDT"){
    return (num.match(/\d+(\.\d{0,3})?/) || [''])[0];
  }
  if(type=="BCCBTC"||type=="BCCUSDT"||type=="BTCUSDT"){
    return (num.match(/\d+(\.\d{0,4})?/) || [''])[0];
  }
  if(type=="ETCBTC"||type=="LTCBTC"||type=="ETCUSDT"||type=="BTCSUSDT"||type=="BTSUSDT"||type=="LTCUSDT"||type=="DCRUSDT"){
    return (num.match(/\d+(\.\d{0,2})?/) || [''])[0];
  }
  if(type=="BTYUSDT"){
    return (num.match(/\d+(\.\d{0,1})?/) || [''])[0];
  }
  if(type=="YCCUSDT"||type=="SCUSDT"){//整数
    return  (num.match(/\d+(\.\d{0,0})?/) || [''])[0];
  }
}
var initINput = function(type) {
  if(type=="BCCBTC"||type=="ETHBTC"||type=="ZECBTC"||type=="ZECUSDT"||type=="LTCUSDT"){
    return 0.001;
  }
  if(type=="BCCUSDT"||type=="BTCUSDT"){
    return 0.0001;
  }
  if(type=="ETHUSDT"||type=="ETCUSDT"||type=="ETCBTC"||type=="LTCBTC"||type=="BTCSUSDT"||type=="DCRUSDT"){
    return 0.01;
  }
  if(type=="BTYUSDT"||type=="YCCUSDT"||type=="SCUSDT"||type=="BTSUSDT"){
    return 100;
  }
}


export {
  getDataYear,
  ajax,
  setcookie,
  getcookie,
  delatecookie,
  getticketcom,
  temptime,
  getticket,
  getbanklist,
  getprovice,
  sendyzm,
  getuserinfo,
  lasscode,
  cannel,
  getusermoney,
  sublogion,
  goregister,
  formatcoinPrice,
  formatcoinNum,
  getmincoinNum,
  initCoinNum,
  formatcoinprice,
  formatcoinpriceHQ,
  addformatcoinprice,
  initINput,
  jqueryAjax,
  // getminPriceNUm,
  addtradeNum,
  // getfxee,
  icopricenum,
  numjs,
  getMobileCode,
  getCountryList,
  getPhoneValidate,
  getEmailValidate,
  getStates,
  uploadImg,
  getCardtypes,
  getfaceamount,
  gettxfees,
  getCointoCoin,
  lasscode1,
  nitFince,
  initcoinnum,
  checkBroeser,
  sendVoicecode,
}