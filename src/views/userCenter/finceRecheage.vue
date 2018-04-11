<template>
  <div class="finceRechage">
    <el-dialog title="人民币RMB充值" v-model="mrechange[0]" size="tiny">
      <div class="content">
        <ul style="margin:0 auto; width:200px;">
          <li @click="yhkModel">
            <img v-bind:src="yhkimg" alt="">
          </li>
        </ul>
        <!-- <ul>
          <li  @click="zfbModel">
            <img v-bind:src="zfbimg" alt="" >
          </li>
          <li @click="yhkModel">
            <img v-bind:src="yhkimg" alt="">
          </li>
          <li @click="wxbModel">
            <img v-bind:src="wximg" alt="" >
          </li>
        </ul> -->
        <!--支付宝窗口-->
        <div v-show="zfbshow">
          <p><span class="pleft1">充值金额:</span><span class="pright">XXXX.<b class="biaoji">{{lasttwo}}</b>元</span><span class="fbule">汇款时请务必包含小数位.<b class="xts">{{lasttwo}}</b></span></p>
          <p><span class="pleft1">账户名:</span><span class="pright">卢月玲</span></p>
          <p><span class="pleft1">支付宝账号:</span><span class="pright">97665978@qq.com</span></p>
          <div class="scanBox">
            <h2>扫描二维码向我付钱</h2>
            <img src="../../assets/img/zfbaccount.png" />
          </div>
          <p>1、本通道仅支持支付宝转账支付宝。</p>
          <p>2、转账金额请务必添加小数点后校验数字.ab，如2000.<b class="tip">ab</b>(ab一般为本UID绑定的手机号后2位)</p>
          <p>3、转账时，请务必备注<b class="tip">姓名</b>(与UID姓名一致),确保能及时入账。</p>
          <p>4、转账后5分钟未到帐，或者未按要求转账，请联系  微信:yfx0323  <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank"> 营销QQ：400-1566-899</a></p>
        </div>
        <!--银行卡窗口-->
        <div v-show="yhkshow">
          <p><span class="pleft1">充值方式:</span><span class="pright">银行转账</span></p>
          <p><span class="pleft1">充值金额:</span><span class="pright">XXXX.<b class="biaoji">{{lasttwo}}</b>元</span><span class="fbule">汇款时请务必包含小数位.<b class="xts">{{lasttwo}}</b></span></p>
          <p><span class="pleft1">收款银行:</span><span class="pright">建设银行</span></p>
          <p><span class="pleft1">银行账号:</span><span class="pright">3305 0161 6727 0000 0515
</span></p>
          <p><span class="pleft1">账户姓名:</span><span class="pright">杭州本链科技有限公司</span></p>
          <p><span class="pleft1">开户支行:</span><span class="pright">建行高新支行</span></p>
          <p>1、银行充值到建行，建议用招行、建行等手机APP或网银，汇款人：<b class="tip">{{rechangeName}}</b>。</p>
          <p>2、收款户名：杭州本链科技有限公司 收款账号：3305 0161 6727 0000 0515
 收款银行：中国建设银行 建行高新支行 转账金额：2000.ab （ab为本人手机号后2位）。</p>
          <p>3、汇款后10秒后未到帐，请联系 微信:yfx0323  <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank"> 营销QQ：400-1566-899</a></p>
        </div>
        
        <!--微信窗口-->
        <div v-show="wxshow">
          <p><span class="pleft1">充值方式:</span><span class="pright">微信支付/微信转账</span></p>
          <p><span class="pleft1">微信账号:</span><span class="pright">97665978 </span><b class="tip">卢月玲</b></p>
          <div class="scanBox">
            <h2>无需加好友，扫描二维码向我付钱</h2>
            <img src="../../assets/img/zhifuwechat.jpg" />
          </div>
          <p>1、扫描微信支付码充值，或加微信好友97665978，留言中填写账号uid,或手机号。</p>
          <p>2、转账给微信账号：97665978，汇款金额：****.<b class="tip">ab</b>,用户手机号未两位ab为小数点后金额,如:(手机号：137051688ab).</p>
          <p>3、完成转账之后，请联系客服 微信:yfx0323  <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank"> 营销QQ：400-1566-899</a></p>
          <p>4、请尽量在工作日充值。</p>
        </div>
      </div>
    </el-dialog>
    <!--未实名的-->
    <el-dialog title="人民币RMB充值" v-model="mrechange[1]" size="tiny">
      <div class="content contestes">
        <ul style="margin:0 auto; width:200px;">
          <li @click="yhkModel">
            <img v-bind:src="yhkimg" alt="">
          </li>
        </ul>
       <!--  <ul>
          <li @click="zfbNModel">
            <img v-bind:src="zfbimg" alt="" >
          </li>
          <li @click="yhkNModel">
            <img v-bind:src="yhkimg" alt="">
          </li>
          <li @click="wxNModel">
            <img v-bind:src="wximg" alt="">
          </li>
        </ul> -->
        <div v-show="zfbNshow">
          <p class="tytishi">请先补充以下信息，并根据提示打款，即可自动入账</p>
          <el-form :label-position="labelPosition" label-width="95px" :model="formLabelAlign">
            <el-form-item label="充值方式:">
              <p class="yhzz">支付宝</p>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" v-if="ishavenomobile">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码:" v-if="ishavenomobile">
              <el-input class="YZM" v-model="formLabelAlign.code"></el-input>
              <div class="getYZM" @click="getsendcode()">获取验证码</div>
            </el-form-item>
          </el-form>
          <div class="tijiao" @click="supplementInfo()">提交</div>
        </div>
        <div v-show="yhkNshow">
          <p class="tytishi">请先补充以下信息，并根据提示打款，即可自动入账</p>
          <el-form :label-position="labelPosition" label-width="95px" :model="formLabelAlign">
            <el-form-item label="充值方式:">
              <p class="yhzz">银行转账</p>
            </el-form-item>
            <el-form-item label="姓名:" v-if="ishavenoname">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" v-if="ishavenomobile">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码:" v-if="ishavenomobile">
              <el-input class="YZM" v-model="formLabelAlign.code"></el-input>
              <div class="getYZM" @click="getsendcode()">获取验证码</div>
            </el-form-item>
          </el-form>
          <div class="tijiao" @click="supplementInfo()">提交</div>
        </div>
        <!--微信窗口-->
        <div v-show="wxNshow">
          <p><span class="pleft1">充值方式:</span><span class="pright">微信支付/微信转账</span></p>
          <p><span class="pleft1">微信账号:</span><span class="pright">97665978 </span><b class="tip">卢月玲</b></p>
          <div class="scanBox">
            <h2>无需加好友，扫描二维码向我付钱</h2>
            <img src="../../assets/img/zhifuwechat.jpg" />
          </div>
          <p>1、扫描微信支付码充值，或加微信好友97665978，留言中填写账号uid,或手机号。</p>
          <p>2、转账给微信账号：97665978，汇款金额：****.<b class="tip">ab</b>,用户手机号未两位ab为小数点后金额,如:(手机号：137051688ab).</p>
          <p>3、完成转账之后，请联系客服 微信:yfx0323  <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank"> 营销QQ：400-1566-899</a></p>
          <p>4、请尽量在工作日充值。</p>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="clickcoin" v-model="mrechange[2]" size="tiny">
      
      <div class='coinbts'>
        <div class="qcode">
           
        </div>
        <div class='btsright'>
          <p>请将需要存入的{{cointype}}发送到此地址：</p>
          <p style="margin-top:10px" v-if="cointype=='BTS'">BTS地址：</p>
          <textarea disabled class="ssinput" v-if="cointype!='BTS'" v-model="mycoinadress" style='max-height:150px;width:319px;margin-top:10px;resize: none;'></textarea> 
          <textarea disabled class="ssinput" v-if="cointype=='BTS'" v-model="mycoinadress" style='max-height:150px;width:319px;margin-top:10px;resize: none;'></textarea> 
        </div>
        <div v-if="cointype=='BTS'" class='btsright btsmemeo'style="margin-top:10px">
          <p >MEMO：</p>
          <textarea disabled class="ssinput" v-model="memo" style='max-height:150px;width:319px;margin-top:10px;resize: none;'></textarea> 
          <p style="color: red">请务必填写memo，否则你的BTS无法到账。</p>
        </div>
        <div class="btnbox">
          <div class="btsbutton" v-clipboard="mycoinadress" v-clipboard:success="handleSuccess">复制存币地址</div>
          <div class="memobutton" v-if="cointype=='BTS'" v-clipboard="memo" v-clipboard:success="handleSuccess">复制MEMO</div>
        </div>
        <div class="botbox" style="float:left;margin-top:25px">
          <p>{{cointype}}充值需要1个确认，实际到账时间取决于区块链确认速度。</p>
          <!-- <p>在线支持：微信:yfx0323  <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank"> 营销QQ：400-1566-899</a></p> -->
        </div>
      </div>
    </el-dialog> 
  </div>
</template>
<script>
  import { ajax,getcookie,sendyzm,getuserinfo } from '../../assets/js/common'
  require('../../../static/jquery.qrcode.min.js') 
  // import VueQArt from 'vue-qart'
  export default{
    props:['mrechange','mycoinadress','clickcoin','cointype','memo'],
    data(){
      return{
        // dialog:true,
        rechangeName:'*名字',
        labelPosition: 'right',//右对齐
        ishavenoname:true,
        ishavenomobile:true,
        // mycoinadress:'',
        lasttwo:'00',//后两位数据
        formLabelAlign: {//补充信息参数
          name: '',
          mobile: '',
          code: ''
        },
        zfbshow:false,
        yhkshow:true,
        wxshow:false,
        zfbNshow:false,
        yhkNshow:true,
        wxNshow:false,
        zfbimg:require('../../assets/img/zfb-1.jpg'),
        yhkimg:require('../../assets/img/yhk.jpg'),
        wximg:require('../../assets/img/wx-1.jpg'),
      }
    },
    updated:function(){
      if(this.mrechange[0]){
          this.getpayInBank(); 
        }
        if(this.mrechange[2]){
          this.qrcode();
        }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.qrcode();
  
        if(getcookie('lockname')){
          this.ishavenoname=false;
        }else{
          this.ishavenoname=true;
        }
        if(getcookie('mobilestate')==1){
          this.ishavenomobile=false;
        }else{
          this.ishavenomobile=true;
        }
      });
    },
    methods:{
      //获取验证码
      getsendcode(){
        if(getcookie('mobilestate')==1){
          this.formLabelAlign.mobile=getcookie('phone');
        }
        var codetype='binding';
        var lastmobile=this.formLabelAlign.mobile.substr(this.formLabelAlign.mobile.length-4);
        var vparam=getcookie('id')+'|'+lastmobile+'|xjxrandom';
        sendyzm(this,codetype,vparam,this.formLabelAlign.mobile);
      },
      handleSuccess(){
        this.$notify({
          title: '提示',
          message: '复制成功',
          type: 'success',
          duration:'2000'
        });
      },
      //补充信息
      supplementInfo(){
        var _this=this;
        ajax(this,this.extendApi.SupplyPayInfo,this.formLabelAlign,function(response){
          if(response.code==200){
            _this.$notify({
              title: '提示',
              message: '信息补充成功',
              type: 'success',
              duration:'2000'
            });
            getuserinfo(_this);
            _this.$set(_this.mrechange,0,true);
            _this.$set(_this.mrechange,1,false);
            _this.getpayInBank();
          }else{
            _this.$notify({
              title: '提示',
              message: response.error,
              type: 'error',
              duration:'2000'
            });
          }
        })
      },
      //获取bank信息
      getpayInBank(){
        var _this=this;
        ajax(this,this.extendApi.InBank,'',function(response){
          if(response.code==200){
            _this.lasttwo=response.data.last;
            _this.rechangeName=response.data.name;
          }else{
            _this.$notify({
              title: '提示',
              message: response.error,
              type: 'error',
              duration:'2000'
            });
          }
        },'GET')
      },
      //获取币的地址
      // getcoinadress(){
      //   var t=sessionStorage.getItem('adresscoin');
      //   var _this=this;
      //   var lowcase=t.toLowerCase();
      //   ajax(this,this.extendApi.CoinAddress,{'t':t},function(response){
      //     if(response.code==200){
      //       _this.mycoinadress=response.data[lowcase+'_addr'];
      //     }
      //   },'GET');
      // }
      zfbModel(){
        this.yhkshow=false;
        this.wxshow=false;
        this.zfbshow=true;
        this.zfbimg=require('../../assets/img/zfb.jpg');
        this.yhkimg=require('../../assets/img/yhk-1.jpg');
        this.wximg=require('../../assets/img/wx-1.jpg');

      },
      yhkModel(){
        this.zfbshow=false;
        this.wxshow=false;
        this.yhkshow=true; 
        this.zfbimg=require('../../assets/img/zfb-1.jpg');
        this.yhkimg=require('../../assets/img/yhk.jpg');
        this.wximg=require('../../assets/img/wx-1.jpg');
      },
      wxbModel(){
        this.zfbshow=false;
        this.yhkshow=false; 
        this.wxshow=true;
        this.zfbimg=require('../../assets/img/zfb-1.jpg');
        this.yhkimg=require('../../assets/img/yhk-1.jpg');
        this.wximg=require('../../assets/img/wx.jpg');
      },
      zfbNModel(){
        this.wxNshow=false;
        this.yhkNshow=false;
        this.zfbNshow=true;
        this.zfbimg=require('../../assets/img/zfb.jpg');
        this.yhkimg=require('../../assets/img/yhk-1.jpg');
        this.wximg=require('../../assets/img/wx-1.jpg');
      },
      yhkNModel(){
        this.zfbNshow=false;
        this.wxNshow=false;
        this.yhkNshow=true; 
        this.zfbimg=require('../../assets/img/zfb-1.jpg');
        this.yhkimg=require('../../assets/img/yhk.jpg');
        this.wximg=require('../../assets/img/wx-1.jpg');
      },
      wxNModel(){
        this.zfbNshow=false;
        this.yhkNshow=false; 
        this.wxNshow=true;
        this.zfbimg=require('../../assets/img/zfb-1.jpg');
        this.yhkimg=require('../../assets/img/yhk-1.jpg');
        this.wximg=require('../../assets/img/wx.jpg');
      },
      qrcode() {
        var _this=this;
        $(".qcode").html('');
        
        $(".qcode").qrcode({
          render:'canvas',
          text: _this.mycoinadress,
          width:200,
          height:200
        });
        // $(".qcode2").html('');
        // $(".qcode2").qrcode({
        //   render:'canvas',
        //   text: _this.mycoinadress,
        //   width:200,
        //   height:200
        // }); 
        // 
        $(".qcode2").html('');
      },
       qrcodes() {
        var _this=this;
        // $(".qcode").html('');
        
        // $(".qcode").qrcode({
        //   render:'canvas',
        //   text: _this.mycoinadress,
        //   width:200,
        //   height:200
        // });
        $(".qcode2").html('');
        $(".qcode2").qrcode({
          render:'canvas',
          text: _this.mycoinadress,
          width:200,
          height:200
        }); 
      }
    }
  }
</script>
<style>
  .finceRechage{
    .el-dialog__header{
      height: 85px;
      margin: 0;
      padding: 0;
      text-align: center;
      line-height: 85px;
      /*font-size: 24px;*/
    }
    .el-dialog__title{
      height: 85px;
      line-height: 85px;
      font-size: 24px;
    }
    .el-dialog__headerbtn{
      margin-right: 26px;
      line-height: 80px;
    }
    .el-dialog--tiny{
      width: 600px;
    }
    .el-dialog__body{
      background: #f3f3f3;
    }
    .content{
      width: 440px;
      height: 615px;;
      margin: 0 auto;
      ul{
        height: 55px;
        margin-left: -45px;
        width: 530px;
        margin-top:20px;
        margin-bottom: 20px;
        /*margin: 20px 10px 40px 10px;*/
        li{
          margin-left: 15px;
          height: 55px;
          width: 156px;
          float: left;
          list-style: none;
          text-align: center;
          /*background: #000;*/
        }
      }
      /*.active{
        border:1px solid #c81118;
      }*/
      p{
        color: #000;
        .tip{
          c:red;
        }
        span{
          display: inline-block;
          margin-bottom: 25px;
          .xts{
            font-size: 14px;
            color: #c81118;
          }
        }
        .fbule{
          color: #59ace2;
          margin-left: 10px;
        }
        .pleft1{
          width: 155px;
          font-size: 12px;
        }
        .pright{
          font-size: 14px;
          font-weight: bold;
          b{
            font-size: 18px;
            color: #c81118;
          }
        }
      }
      .scanBox{
        bgc:#fff;
        w:100%;
        h:200px;
        mb:10px;
        h2{
          ta:center;
          lh:50px;
        }
        img{
          w:120px;
          h:120px;
          pos:absolute;
          l:50%;
          ml:-60px;
        }
      }
      .tytishi{
        text-align: center;
      }
    }
    .contestes{
      /*background: #f9f9f9;*/
      /*height: 460px;*/
      .tytishi{
        color: #666;
        margin-bottom: 30px;
      }
      .el-form-item__label{
        padding-right: 20px;
      }
      .yhzz{
        width: 100%;
        text-align: center;
      }
      .tijiao{
        width: 120px;
        height: 30px;
        line-height: 30px;
        background: #c81118;
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin: 10px auto;
        cursor: pointer;
      }
      .YZM{
        width: 230px;
        float: left;
      }
      .getYZM{
        float: right;
        width: 100px;
        text-align: center;
        border: 1px solid #ccc;
        color: #1486cd;
      }
    }
    .coinbts{
      height: 310px;
      width: 440px;
      margin: 0 auto;
       .qcode{
          width: 100px;
          height: 100px;
          margin-top: 20px;
          float: left;
        }
        .qcode2{
          width: 100px;
          height: 100px;
          margin-top: 20px;
          float: left;
        }
      .btsright{
        float: left;
        margin-left: 10px;
        margin-top: 20px;
      }
      .btsmemeo{
        margin-left: 110px;
      }
      .btnbox{
        width: 310px;
        height: 28px;
        /*background: #ccc;*/
        margin-left: 110px;
        margin-top: 10px;
        float:left;
        div{
        width: 150px;
        height: 25px;
        background: #c81118;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        }
      }
       .btsbutton{
       float: left;
      }
      .memobutton{
        float: right;
      }
    }
    .coincontent{
      height: 250px;
      width: 440px;
      margin: 0 auto;
      .coinadress{
        width: 100%;
        height: 100px;
        margin: 30px 0;
        word-wrap: break-word;
        .qcode{
          width: 100px;
          height: 100px;
          float: left;
        }
        .myadress{
          float: left;
          margin-left: 10px;
          width: 320px;
          .ssinput{
            width: 100%;
            margin-top:15px; 
            height: 42px;
            line-height: 20px;
            background: #e6e6e6;
            border:0;
            font-size: 10px;
            word-wrap: break-word;
            padding-left:5px; 
          }
          /*.awsing{
            color: red!important;
          }*/
        }
      }
      .sbutton{
        width: 230px;
        height: 28px;
        background: #c81118;
        border-radius: 4px;
        margin-left: 72px;
        color: #fff;
        text-align: center;
        line-height: 28px;
        margin-bottom: 20px;
        cursor: pointer;
      }
      /*background: #000;*/
    }
    canvas{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
</style>