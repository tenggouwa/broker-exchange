/*
 * 端口域名配置
 * @type Object
 */
var apiUrl = {
    basehostUrl: 'https://dev407.33.cn',
    // basehostUrl: 'https://zb2api.licai.cn',//基础api地址
    // basehostUrl: 'https://api.zbapi.lical.cn',
    // zcbityuanUrl: 'http://dev407.33.cn',
    // basehostUrl: '/api',
    // zcbityuanUrl: 'https://zc.33.cn',
    chartUrl: 'https://kdata.zhaobi.com:4062/',//这是k线服务器接口
    // etcUrl: "https://kdata.zhaobi.com:4062/",
    feedUrl:'https://feedback.licai.cn',//反馈服务器地址
}
// var etcUrl = "https://tick.bityuan.com:5062/kdata?datafile=db";
// var etcUrl = "https://kdata.zhaobi.com:4062/kdata?datafile=db";
var deadtime = "";
export default {
  getbaseUrl:apiUrl.basehostUrl,
  // getcoindata:apiUrl.basehostUrl+'/xpi/EthernetData?type=new',//获取33交易所币种最新价
  getH24Kdata:"http://115.29.207.108:6062/"+'h24data',//获取24小时k线数据
  getcoindata:apiUrl.basehostUrl+'/api/data/Ticker',//获取33交易所币种最新价
  getCoinMarketDate:apiUrl.chartUrl+"kdata?datafile=db",//获取k线数据
  // getBtcMarketData:apiUrl.basehostUrl+"/tickdata/market.php",//获取btc行情
  getBtcMarketData:apiUrl.basehostUrl+"/api/data/market",//获取行情
  // getMoneyInfo:apiUrl.basehostUrl + '/api2/account/Asset',//获取资产信息
  getMoneyInfo:apiUrl.basehostUrl + '/api/Account/Asset',//获取资产信息
  // getToken: apiUrl.basehostUrl + "/api2/user/login", //通过username和password获取Token
  getToken: apiUrl.basehostUrl + "/api/member/login", //通过username和password获取Token
  // getUserInfo: apiUrl.basehostUrl + "/api2/user/info?type=all", //获取用户信息
  getUserInfo: apiUrl.basehostUrl + "/api/member/info",//获取用户信息
  // userReg: apiUrl.basehostUrl + "/api2/user/reg", //注册账户
  userReg: apiUrl.basehostUrl + "/api/member/reg", //注册账户
  loginout: apiUrl.basehostUrl + '/api/member/loginout',//账户退出

  bankList: apiUrl.basehostUrl + '/api2/data/bank', //获取银行列表
  provinceList: apiUrl.basehostUrl + '/api2/data/province', //获取省份列表
  sendSms: apiUrl.basehostUrl + '/api2/sms/send', //发送短信通知
  cityList: apiUrl.basehostUrl + '/api2/data/city', //获取城市列表

  Certification: apiUrl.basehostUrl + '/api2/Certification/Identity', //提交认证信息
  checkvMobile: apiUrl.basehostUrl + '/api2/Certification/Mobile',//手机验证
  sendEmail: apiUrl.basehostUrl + '/api/send/mail', //发送邮件通知
  checkvEmail: apiUrl.basehostUrl + '/api2/Certification/email',//邮箱验证
  setTradePwd: apiUrl.basehostUrl + '/api2/account/setpayword',//设置交易密码
  editTpwd: apiUrl.basehostUrl + "/api2/account/editpayword", //修改交易密码
  updatePass: apiUrl.basehostUrl + "/api/user/updatepass", //修改密码
  // editpassword:apiUrl.basehostUrl+'/api2/user/editpassword',//修改登录密码
  editpassword:apiUrl.basehostUrl+'/api/member/editpassword',//修改登录密码
  WithdrawSend:apiUrl.basehostUrl+'/api2/sms/WithdrawSend',//确认邮件发送
  resetmail:apiUrl.basehostUrl+'/api/send/resetmail',//找回密码发邮箱
  resetpassword:apiUrl.basehostUrl+'/api/member/resetpassword',//找回密码

  // loginHistory: apiUrl.basehostUrl + '/api2/user/loginhistory', //获取登录历史
  loginHistory: apiUrl.basehostUrl + '/api/account/loginrecord', //获取登录历史
  // hisorder: apiUrl.basehostUrl + "/api2/trade/order",//交易历史
  hisorder: apiUrl.basehostUrl + "/api/trade/OrderList",//交易历史
  // Cancel: apiUrl.basehostUrl+'/api2/trade/Cancel',//撤单接口
  Cancel: apiUrl.basehostUrl+'/api/trade/cancel',//撤单接口
  // place: apiUrl.basehostUrl+'/api2/trade/place',//交易接口
  place: apiUrl.basehostUrl+'/api/trade/place',//交易接口
  fundlist:apiUrl.basehostUrl+'/api2/pay/fundlist',//获取资金历史记录
  // coinlist:apiUrl.basehostUrl+'/api2/pay/coinlist',//获取虚拟币的操作记录
  coinlist:apiUrl.basehostUrl+'/api/Pay/CoinRecord',//获取虚拟币的操作记录
  getbankClist:apiUrl.basehostUrl +'/api2/account/BankcardList',//获取银行卡列表
  opBankC:apiUrl.basehostUrl +'/api2/account/OperateBankcard',//操作银行卡
  bindbankcard: apiUrl.basehostUrl + '/api2/account/AddBankcard', //添加银行卡
  
  // withdrawAddressList: apiUrl.basehostUrl + '/api2/account/AddressList', //获取提币地址列表
  withdrawAddressList: apiUrl.basehostUrl + '/api/account/addresslist', //获取提币地址列表
  addWithdrawAddress: apiUrl.basehostUrl + '/api2/account/AddAddress', //添加提币地址

  FundWithdraw:apiUrl.basehostUrl +'/api2/pay/IsFundWithdraw',//提款引导
  withdraw: apiUrl.basehostUrl + '/api2/pay/Withdraw', //提款
  CoinWithdraw:apiUrl.basehostUrl +'/api2/pay/iscoinwithdraw',//提币引导
  WithdrawCoin:apiUrl.basehostUrl +'/api/pay/Withdrawcoin',//提币
  SupplyPayInfo:apiUrl.basehostUrl +'/api2/account/SupplyPayInfo',//信息补全
  InBank:apiUrl.basehostUrl+'/api2/pay/InBank',//获取手机后两位
  CoinAddress:apiUrl.basehostUrl+'/api/account/myaddress',//获取提币地址
  checkedcode:apiUrl.basehostUrl+'/api/sms/Validate',//验证码预验证
  editmobile:apiUrl.basehostUrl+'/api2/certification/editmobile',//修改手机
  editemail:apiUrl.basehostUrl+'/api2/certification/editemail ',
  editinfo:apiUrl.basehostUrl+'/api2/user/editinfo',//修改用户信息
  resgestpwd:apiUrl.basehostUrl+'/api2/user/resetpassword',//重置密码
  ooperateAddress:apiUrl.basehostUrl+'/api/account/ManageAddress',//操作地址
  //是否资产转移
  isMove:apiUrl.basehostUrl+'/api2/Account/IsMove',//是否资产转移
  MoveMoney:apiUrl.basehostUrl+'/api2/Account/move',//转移资产
  // getfee:apiUrl.basehostUrl+'/api2/data/fxee',//矿工费获取
  getfee:apiUrl.basehostUrl+'/api/data/fees',//矿工费获取
  getNewList:apiUrl.basehostUrl+'/api/data/noticelist',//获取文章列表
  getNewDetail:apiUrl.basehostUrl+'/api/data/noticedetail',//获取文章详情
  createFeedback:apiUrl.feedUrl+'/feedbacks',//创建反馈,/
  getUserDetail:apiUrl.basehostUrl+'/api2/poundage/UserDetail',//用户手续费信息
  Settle:apiUrl.basehostUrl+'/api2/poundage/Settle',//用户手续费结算

  txfees:apiUrl.basehostUrl+'/api/data/txfees',//手续费比例----交易手续费（买入时使用）
  icoplace:apiUrl.basehostUrl+'/api2/ico/place',//ico交易
  icostatistic:apiUrl.basehostUrl+'/api2/ico/statistic',//ico详情
  isicouser:apiUrl.basehostUrl+'/api2/ico/isicouser',//ico用户
  Calculate:apiUrl.basehostUrl+'/api2/ico/Calculate',//ico币数转换
  icoInvest:apiUrl.basehostUrl+'/api2/ico/Invest',//ico投资接口
  icoinvestlist:apiUrl.basehostUrl+'/api2/ico/investlist',//ico列表
  EnterpriseIdentity:apiUrl.basehostUrl+'/api2/Certification/EnterpriseIdentity',//企业认证
  Reback:apiUrl.basehostUrl+'/api2/ico/Reback',//ico撤销
  getCountry:apiUrl.basehostUrl+'/api/data/country',//国家信息(区号或者国名)
  getmobilecode:apiUrl.basehostUrl+'/api/send/sms',//手机验证
  resetFind:apiUrl.basehostUrl+'/api/send/reset',//密码找回（邮件短信）发送
  autoMobile:apiUrl.basehostUrl+'/api/certification/mobile',//账户认证--手机验证
  autoEmail:apiUrl.basehostUrl+'/api/certification/email',//账户认证----邮箱验证
  getstates:apiUrl.basehostUrl+'/api/certification/states',//获取认证接口
  UploadToken:apiUrl.basehostUrl+'/api/certification/UploadToken',//图片上传token获取
  uploadUrl:'https://oss.33.cn/upload/certificate',//上传认证证件
  feedbackUrl:'https://feedback.licai.cn/uploads',//问题反馈上传地址
  certificationOCR:apiUrl.basehostUrl+'/api/Certification/Ocr',//ORC接口
  identitySubmit:apiUrl.basehostUrl+'/api/certification/identity',//实名认证提交接口
  cardtypes:apiUrl.basehostUrl+'/api/data/cardtypes',//证件类型
  getfaceamount:apiUrl.basehostUrl+'/api/data/faceamount',//获取人脸额度
  attestation:apiUrl.basehostUrl+'/api/Certification/Attestation',//老用户未手机或者邮箱验证的强制认证
  getrecharge:apiUrl.basehostUrl+'/api/account/getrechargeidentify',//获取充值点数
  getUsdtrate:apiUrl.basehostUrl+'/api/data/rate',//外汇报价
  getbankList:apiUrl.basehostUrl+'/api/account/BankCardList',//获得可用银行列表
  bankListname:apiUrl.basehostUrl+'/api/data/banks',//所有银行列表
  addbanknew:apiUrl.basehostUrl+'/api/account/managebank',//新增银行
  getcityId:apiUrl.basehostUrl+'/api/data/city',//获取省市信息
  authoperation:apiUrl.basehostUrl+'/api/pay/authoperation',//认证控制
  getregcode:apiUrl.basehostUrl+"/api/member/invitecode",//用户注册关联码获取
  sendvoice:apiUrl.basehostUrl+"/api/send/voice",//用户注册关联码获取
  getbannerlist: apiUrl.basehostUrl+'/api/data/banner',//获取banner图
  getcompanybank:apiUrl.basehostUrl+'/api/account/companybank',//获取入账银行
  getcompanybankNew:apiUrl.basehostUrl+'/api/broker/companybank',//获取入账银行


  /*———————————————————————登录注册👇（新）————————————————————————————*/
  isRegisterApi:apiUrl.basehostUrl + '/api/member/isreg', //判断是否已注册

  getCodeNew:apiUrl.basehostUrl + '/api/send/newsms',  //获取短信验证码（新）

  getEmailCodeApi:apiUrl.basehostUrl + '/api/send/newmail', //获取邮箱验证码

  getVoiceCodeApi:apiUrl.basehostUrl + '/api/send/newvoice',  //获取语音验证码

  quickRegister:apiUrl.basehostUrl + '/api/member/brokerquickreg', //快速注册

  quickLoginApi:apiUrl.basehostUrl + '/api/member/brokerquicklogin',  //快速登录

  setPasswordForNotLogin:apiUrl.basehostUrl + '/api/member/brokersetpassword',  //第一次设置密码（未登录）

  zhaohuiPasswordApi:apiUrl.basehostUrl + '/api/member/newresetpassword', //找回密码

  getBackSendCodeApi:apiUrl.basehostUrl + '/api/send/newreset', // 密码找回（邮件短信）发送
}