<template>
  <div id="top-content">
  <index-Header @change="goout" :quite="islogoin"></index-Header>
    <div class="banner">
      <div class="wrap">
        <div class="main loginbox" v-show="islogoin==1">
          <p class="logotitle">
          <!-- <span class="logoname">33.CN</span> -->
          <span class="logoname">区块链交易所</span>
          <span class="relogo">
            <span class="loactive">登录 </span>
            <span class='register' @click="loginrester(3)"> | 注册</span>
          </span>
          </p>
          <div class="groupcom parentCls">
            <i class="icom user1"></i>
            <input class="inputElem usercom" type="text" placeholder="请输入邮箱或手机"  value="" id="loginusername" autocomplete="off" name="username" required="" />
          </div>
          <div class="groupcom">
             <i class="icom pwd1"></i>
            <input type="password" class="usercom" v-model="login.password" placeholder="请输入密码" @keyup.enter="gologin()">
          </div>
          <div class="lbottom">
            <!-- <div id="wechat"></div> -->
            <p class="zhuce" @click="loginrester(3)">免费注册</p>
            <div class="rightgroup">
              <!-- <p><input name="Fruit" type="checkbox" :checked="true" value="" /><span class="baocun">保存密码</span></p> -->
              <p class="forget"><span @click="loginrester(2)">忘记密码</span></p>
              <!-- <div class="loginbut" @click="sublogion()">登录</div> -->
            </div>
             <div class="loginbut" @click="gologin()" >登录</div>
          </div>
          <!-- <p class="openwx">打开微信扫一扫登录</p> -->
        </div>
        <div class="main fforget" v-show="islogoin==2">
          <p class="logotitle"><span class="logoname">身份验证</span></p>
          <div class="groupcom " >
            <input type="text" class="inputElem usercom userpwd" v-model="lowpassword.mobile" placeholder="请输入注册时账号" required="required">
            <div class="sendbutton" @click="getpasssword()">发送验证</div>
          </div>
          <!-- <div class="groupcom">
            <input type="text" class="usercom userpwd" v-model="viladtecode" placeholder="请输入验证码">
            <div class="sendbutton" @click="validateCode">GO</div>
          </div> -->
          <p class="gologin"><span style="cursor: pointer;" @click="loginrester(1)">登录</span></p>
        </div>
        <div class="main register" v-show="islogoin==5">
          <p class="logotitle"><span class="logoname">重置密码</span></p>
          <div class="groupcom">
            <input type="password" class="usercom" v-model="respassword" placeholder="请输入新密码">
          </div>
          <div class="groupcom">
            <input type="password" class="usercom" v-model="respasswordagain" placeholder="请再次输入新密码" @keyup.enter="goregisterpwd()">
          </div>
         <div class="submitRegister" @click="goregisterpwd()">提交密码</div>
        </div>
        <div class="main register" v-show="islogoin==3">
          <p class="logotitle"><span class="logoname">注册区块链交易所</span></p>
          <div class="groupcom parentCls">
            <i class="icom user1"></i>
            <input type="text" class="inputElem usercom " v-model="regester.username" placeholder="请输入手机号或邮箱">
          </div>
          <div class="groupcom">
            <i class="icom pwd1"></i>
            <input type="password" class="usercom" v-model="regester.password" placeholder="请输入密码" @keyup.enter="goregist()">
          </div>
          <p class="gologin"><span style="cursor: pointer;" @click="loginrester(1)">登录</span><span class="forgetmima" @click="loginrester(2)">忘记密码</span></p>
         <div class="submitRegister" @click="goregist()">注册</div>
        </div>
        <div class="main lsuccess" v-show="islogoin==4">
          <p class="logotitle"><span class="logoname">已登录区块链交易所</span></p>
          <p>您好,{{username}}</p>
         <div class="submitRegister" >
            <router-link to="/usercenter/btctrade">
              <span style="color:#fff;">返回交易中心</span>
            </router-link>
          </div>
         <div class="submitRegister" @click="goout()">退出</div>
        </div>
      </div>
    </div>
    <div class="notify">
     <div class='wrapetop'>
        <p><img src="../../assets/img/affiche.png" alt=""></p>
        <ul class='notice'>
           <li></li>
           <li style="cursor:pointer" @click="gotoNew(notice.id)">
              <a class='more'>【{{notice.message}}】</a>
              <p></p>
           </li>
           <li class='datatime'>{{notice.date}}</li>
        </ul>
        <router-link to='/help/notice'>更多</router-link><!-- <a href=""></a> -->
      </div>
      <div class="wrape">
        <div class="wrleft">
            <ul class='licai-call'>
              <li><img src="../../assets/img/afficheqq.png" alt=""></li>
              <li><a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank">营销QQ：4001566899</a></li>
              <li>官方QQ①群：345106800</li>
              <li>②群：545967811</li>
            </ul>
            <ul class='licai'>
              <li><img src="../../assets/img/licai-call.png" alt=""></li>
              <li>热线电话：400-1566-899</li>
            </ul>
            <!-- <ul class='licai'>
              <li><img src="../../assets/img/affiche@.png" alt=""></li>
              <li>邮箱：support@licai.cn</li>
            </ul> -->
            <ul class='licaiwx'>
              <li><img src="../../assets/img/affichewx.png" alt=""></li>
              <li class="pointer">微信咨询：yfx0323</li>
              <li class='wxcode'><img src="../../assets/img/wxcod-icon.jpg" alt=""></li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../config/api-config'
import indexHeader from '../../components/header.vue'
import { ajax,setcookie,getcookie,delatecookie,sublogion,goregister } from '../../assets/js/common'
export default {
  props:['userName',"quite"],
  data(){
    return{
      show:false,
      viladtecode:'',
      respassword:'',
      respasswordagain:'',
      islogoin:1,//判断用户是否登录 1表示登录界面 2表示忘记密码界面 3表示注册页面 4表示登录成功页面
      username:'',
      regester:{
        username:'',
        password:'',
      },
      mobileType:true,
      lowpassword:{
        mobile:'',
        email:'',
        vparam:'',
        codetype:'',
      },
      showul:false,
      login:{
        redirect_uri:'https://licai.cn',//修改
        ltype:'code',
        username:'',
        password:'',
      },
      notice:{
        message:'比特理财官网正式上线',
        date:'2017-07-05',
        id:'1'
      }
    }
  },
  created(){
    var _this = this;
    window.setTimeout(function(){
      _this.show = true;
    },500)
    if(getcookie('username')){
      _this.islogoin=4;
      _this.username=getcookie('username');
    }
    _this.getCMSMessage();
  },
  watch:{
    userName(value) {
      if(!getcookie('username')){
        this.islogoin=1;
      }
    }
  },
  mounted:function(){
    if(!getcookie('username')){
      this.islogoin=1;
    }
  },
  components: {
    indexHeader
  },
  methods:{
    gologin(){
      delatecookie();
      this.login.username=$('#loginusername').val();
      sublogion(this,'index');
    },
    getpasssword(){
      var _this=this;
      if(this.lowpassword.mobile==""){
        alert("请输入注册时账号");
        return;
      }
    },
    validateCode(){
      var _this=this;
      if(_this.mobileType==true){
        ajax(_this,_this.extendApi.checkedcode,{
          't':'sms',
          'rcheck':0,
          'code':_this.viladtecode,
          'codetype':'resetpwd',
          'mobile':_this.lowpassword.mobile,
          'country':'CN',
          'email':''
        },function(response){
          if(response.code==200){
            _this.islogoin=5;
          }
        })
      }
      else{
        ajax(_this,_this.extendApi.checkedcode,{
          't':'mail',
          'rcheck':0,
          'code':_this.viladtecode,
          'codetype':'resetpwd',
          'mobile':'',
          'email':_this.lowpassword.email,
          'country':'CN',
        },function(response){
          if(response.code==200){
            _this.islogoin=5;
          }
        })
      }
    },
    goregisterpwd(){
      var _this=this;
      var type="";
      if(_this.mobileType==true){
        type="mobile"
        _this.lowpassword.email="";
      }
      else{
        type="email";
        _this.lowpassword.mobile="";
      }
      if(this.respassword!=this.respasswordagain){
        _this.$notify({
          title: '提示',
          message: '修改失败，；两次密码输入不一致',
          type: 'error',
          duration:'1000',
        });
      }
      if(this.respassword==this.respasswordagain){
        ajax(this,this.extendApi.resgestpwd,{
          mode:type,
          mobile:_this.lowpassword.mobile,
          code:_this.viladtecode,
          email:_this.lowpassword.email,
          newPwd:_this.respassword,
          country:'CN'
        },function(response){
          if(response.code==200){
             _this.$notify({
              title: '成功',
              message: '重置密码成功',
              type: 'success',
              duration:'1000',
            });
            _this.islogoin=1;
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'error',
              duration:'1000',
            });
          }
        })
      }else{
         _this.$notify({
          title: '提示',
          message: '两次密码不一致',
          type: 'error',
          duration:'1000',
        });
      }  
    },
    goregist(){
      this.login.username=this.regester.username;
      goregister(this,'index');
    },
    goout(){//退出
      delatecookie();
      this.islogoin=1;
    },
    loginrester(num){//登录界面切换
      this.islogoin=num;
    },
    getCMSMessage(){//获取网站公告内容
      var _this=this;
       let data={
          cid:'1'
        };

      ajax(_this,api.getNewList+"/cid=1",'',function(response){
          if(response.errcode=='0'){
            _this.notice.message=response.rows[0].title;
            _this.notice.date=response.rows[0].published_time;
            _this.notice.id=response.rows[0].id;
          }
      },'GET')
    },
    gotoNew(id){
      let newdetail="/help/newDetaile?id="+id;
      this.$router.push({path:newdetail});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #top-content{
    w:100%;
    pos:relative;
    mw:1210px;
    .wrap{
      w:1200px;
      m:0px auto;
    }
    .wrapetop{
       w:1200px;
      height: 49px;
      margin: 0 auto;
      border-bottom: 1px solid #e6e6e6;
      p{
        margin-top: 12.5px;
        float: left;
      }
      ul{
        li{
          float: left;
          line-height: 50px;
          margin-left: 20px;
        }
      }
      a{
        float: right;
        line-height: 50px;
      }
      .more{
        display: block;
        line-height: 50px;
      }
      .more:hover{
        text-decoration:underline!important;
      }
    }
    .wrape{
      w:1200px;
      height: 50px;
      margin: 0 auto;
      position: relative;
      p{
        padding-top: 12.5px;
        float: left;
      }
      p{
        width: 100%;
        height: 1px;
        background: #000;
      }
      .wrleft{
        width: 1200px;
        margin-left: 0;
        float: left;
        ul{
          float: left;
          height: 50px;
          li{
            float: left;
            font-size: 14px;
            line-height: 50px;
            margin-left: 20px;
          }
          li:nth-child(1){
            padding-top: 10px;
            margin-left: 0;
          }
        }
        .licaiwx{
          margin-left: 20px;
          position: relative;
          .wxcode{
            position: absolute;
            top:-100px;
            left:40px;
            display: none;
          }
        }
        .licaiwx:hover .wxcode{
          display: block;
        }
      }
      .licai{
        margin-left: 20px;
      }
      /*.licai-call{
        margin-left: 20px;
      }*/
      .notice{
        height: 50px;
         li{
          margin-left: 20px;
          line-height:50px; 
          font-size: 12px;
          color:#333;
          float: left;
         }
        .datatime{
          line-height: 50px;
          margin-left: 15px;
        }
      }
      .readmore{
        position: absolute;
        top:0;
        bottom: 0;
        margin: auto;
        right: 0px;
        display: flex;
        aling-items:center;
        justify-content: space-between;
        .look{
          line-height: 50px;
          font-size: 12px;
          color:#808080;
          margin-right: 10px;
        }
        .moreicon{
          margin-top: 17px;
        }
        .look:hover{
          color: #e61f19;
        }
      }
    }
    .banner{
      w: 100%;
      h: 536px;
      bg: url(../../assets/img/indexbanner.jpg) center;
      .header{
        width: 100%;
        height: 60px;
        background: rgba(0,0,0,0.1);
        position: fixed;
        .cont{
          width: 1210px;
          height: 100%;
          margin:0 auto;
          display: flex;
          align-items: center;
          position: relative;
          p{
            font-size: 12px;
            color: #ffffff;
            margin-left: 15px;
          }
         .contbox{
          width: 545px;
          height: 60px;
          margin-left: 30px;
          position: absolute;
          right: 0px;
          .box{
            width: 100%;
            height:100%;
            display: flex;
            justify-content: space-between;
            align-items:center;
            li{
              width: 101px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              color: #fff;
            }
            li:hover{
              color:#e61f19;
            }
            .jiaoyi{
              position: relative;
              height:60px;
              .sanjiao{
                width: 0px;
                height: 0px;
                border-top: 13px solid transparent;
                border-right: 13px solid transparent;
                border-left: 13px solid transparent;
                border-bottom: 13px solid #fff;
                position: absolute;
                top:47px;
                left:20px;
                display: none;
              }
            }
            .jiaoyi:hover .xiala{
              display: block;
            }
            .jiaoyi:hover .sanjiao{
              display: block;
            }
          }
          .xiala{
            width: 150px;
            height: 240px;
            background: #fff;
            position: absolute;
            top:70px;
            right:-20px;
            display: none;
            .item{
              height: 40px;
              width: 150px;
              display: flex;
              align-items: center;
            }
            .btc{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao1-1.png) no-repeat center;
              background-size: cover;
            }
             .eth{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao2-2.png) no-repeat center;
              background-size: cover;
            }
             .stara{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao3-3.png) no-repeat center;
              background-size: cover;
            }
             .sc{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao4-4.png) no-repeat center;
              background-size: cover;
            }
             .zec{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao5-5.png) no-repeat center;
              background-size: cover;
            }
             .bts{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao6-6.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .btc{
               width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/inbtc.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .eth{
               width: 17px;
              height: 17px;

              background: url(../../assets/img/logo/dao2.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .stara{
               width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao3.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .sc{
               width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao4.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .zec{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao5.png) no-repeat center;
              background-size: cover;
            }
            .item:hover .bts{
              width: 17px;
              height: 17px;
              background: url(../../assets/img/logo/dao6.png) no-repeat center;
              background-size: cover;
            }
            .item:hover{
              background: #e5eded;
            }
            li p{
              color:#888;
              font-size: 12px;
              float: left;
            }
            li p:hover{
              color:#e61f19;
            }
          }
          .xiala:hover{
            display: block;
          }
        }
        .headerright{
          width: 145px;
          height: 25px;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items:center;
          li{
            width: 65px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0,0,0,0.1);
          }
        }
        }
      }
      .wrap{
        h:400px;
        /*padding-top: 100px;*/
        padding-top: 195px;
        .main{
          width: 280px;
          padding-bottom: 10px;
          background: rgba(0,0,0,0.4);
          z-index: 99;
          position: relative;
          height: auto;
          /*overflow: hidden;*/
          border-radius: 10px;
          float: right;
          padding: 16px 30px 20px;
          p{
            color: #fff;
          }
          .logotitle{
            color: #fff;
            height: 36px;
            line-height: 36px;
            margin-bottom: 10px;
            .logoname{
              text-align: left;
              font-size: 16px;
              margin-bottom: 17px;
            }
            .relogo{
              float: right;
            }
            .loactive{
              color:#c81118;
            }
            .register{
              display: inline-block;
              cursor: pointer;
            }
          }
          .groupcom{
            margin-top: 17px;
            height: 34px;
            .icom{
              display: inline-block;
              position: absolute;
              width: 40px;
              height: 34px;
              /*left: 30px;*/
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
            }
            .user1{
              background: url(../../assets/img/username.png) no-repeat center;
              background-color: rgba(255,255,255,0.3);
            }
            .usercom{
              background: rgba(255,255,255,0.3) no-repeat 24px center;
              padding-left: 55px;
              width: 220px;
              height: 34px;
              border-radius: 5px;
              border:0;
              color: #fff;
            }
            .logionname{
              background: rgba(255,255,255,0.3) no-repeat 24px center;
              padding-left: 55px;
              width: 220px;
              height: 34px;
              border-radius: 5px;
              border:0;
            }
            .pwd1{
              background: url(../../assets/img/pswdico.png) no-repeat center;
              background-color: rgba(255,255,255,0.3);
            }
            .userpwd{
              width: 138px;
              padding-left: 20px;
              float: left;
              border-radius: 5px 0 0 5px;
            }
            .sendbutton{
              width: 80px;
              cursor: pointer;
              background: #c81118;
              border-radius: 0 5px 5px 0;
              color: #fff;
              font-size: 14px;
              height: 34px;
              line-height: 34px;
              text-align: center;
              float: left;
              margin-left: 1px;
            }
            .emailbox{

            }
            .selectli{
              width: 220px;
              height: 34px;
              /*border-radius: 5px;*/
              border:0;
              color: #666;
              font-size: 14px;
              text-align: left;
              cursor: pointer;
              padding-left: 20px;
              line-height: 34px;
              background: #fff;
              position: relative;
              z-index: 20;
              opacity: 1;
            }
          }
          .gologin{
            color: #fff;
            margin-top: 10px;
            /*cursor: pointer;*/
            .forgetmima{
              float: right;
              cursor: pointer;
            }
          }
          .lbottom{
            margin-top: 17px;
            height: 90px;
            width: 100%;
            .zhuce{
              width: 60px;
              float: left;
              cursor: pointer;
            }
            #wechat{
              float: left;
              width: 90px;
              height: 90px;
              border:1px solid #ccc;
            }
            .rightgroup{
              margin-bottom: 20px;
              float: right;
              p{
                color: #fff;
                height: 18px;
                line-height: 18px;
                text-align: right;
              }
              .baocun{
                position: relative;
                top:-3px;
                padding-left: 5px;
              }
              .forget{
                cursor: pointer;
              }
            }
            .loginbut{
              clear: both;
              width: 116px;
              height: 34px;
              line-height: 34px;
              margin: 0px auto;
              font-size: 14px;
              color: #fff;
              border-radius: 5px;
              background: #c81118;
              text-align: center;
              cursor: pointer;
            }
          }
          .openwx{
            color: #fff;
            margin-top: 5px;
          }
          .submitRegister{
            margin-top: 20px;
            width: 100%;
            height: 34px;
            line-height: 34px;
            background: #c81118;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            text-align: center;
            a{
              width: 100%;
              display: inline-block;
            }
          }
        }
        .fforget{
          height: 200px;
        }
      }
    }
    .notify{
      w:100%;
      h:100px;
      .wrap{
        h:40px;
      }
    }
    .apply{
      bg:#e6e6e6;
      .wrap{
        d:flex;
      }
      .box{
        fx:1;
        h:280px;
        ta:center;
        &>p{
          fz: 16px;
          mt: 15px;
          c: #000000;
        }
        .innerbox{
          h:200px;
          w:200px;
          m:25px auto 0px;
          pos:relative;
          ofl: hidden;
          bdrs:9px;
          bg:#fff;
          P{
            mt:155px;
            c:#666;
          }
          .gradient{
            pos:absolute;
            t:0px;
            l:120px;
            z-index:3;
            w:80px;
            h:200px;
            transform:skewX(-25deg);
            bg: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.2) 50%, rgba(255,255,255,0) 100%);
          }
          &.wx{
            background: #ffffff url(../../assets/img/wechat.png) no-repeat center 40px;
          }
          &.gq{
            background: #ffffff url(../../assets/img/b1.png) no-repeat center 40px;
          }
          &.db{
            background: #ffffff url(../../assets/img/b2.png) no-repeat center 40px;
          }
          &.gyl{
            background: #ffffff url(../../assets/img/b3.png) no-repeat center 40px;
          }
          &.qb{
            background: #ffffff url(../../assets/img/b4.png) no-repeat center 40px;
          }
        }
      }
    }
    .joinus{
      border-bottom: 1px solid #ececec;
      ul{
        w:1200px;
        m:0px auto;
        li{
          h:40px;
          mt:10px;
          mb:8px;
          p: 0px 20px;
          img{
            vertical-align: top
          }
          &:first-child{
            ta: left;
            w: 25%;
            fl: left;
            pos: relative;
            lh: 38px;
            pl: 4%;
            span{
              fz: 18px;
              fw: bold;
              ff: 微软雅黑;
              c: black;
            }
            &>.textimg{
              fz: 24px;
              fw: bold;
              ff: 微软雅黑;
              c: red;
            }
          }
          &:not(:first-child){
            p:0px 5px;
            ta: center;
            w: 25%;
            fl: left;
            pos: relative;
            pt:5px;
            span{
              mt: 4px;
              lh:29px;
              pl: 10px;
              fz: 18px;
              fw: bold;
              ff: 微软雅黑;
            }
          }
          &:nth-child(2){
            span{
              c:rgb(60,176,52);
            };
          }
          &:nth-child(3){
            span{
              c:rgb(19,98,167);
            };
          }
          &:nth-child(4){
            span{
              c:rgb(96,163,217);
            };
          }
        }
      }
    }
  }

  .fade0-enter-active{
    transition: opacity 2.5s
  }
  .fade1-enter-active{
    transition: opacity 3s
  }
  .fade2-enter-active{
    transition: opacity 3.5s
  }
  .fade3-enter-active{
    transition: opacity 4s
  }
  .fade4-enter-active{
    transition: opacity 4.5s
  }
  .fade0-enter{
    opacity: 0
  }
  .fade1-enter{
    opacity: 0
  }
  .fade2-enter{
    opacity: 0
  }
  .fade3-enter{
    opacity: 0
  }
  .fade4-enter{
    opacity: 0
  }
</style>
