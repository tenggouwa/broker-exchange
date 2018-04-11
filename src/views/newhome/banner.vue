<template>
  <div id="top-content">
    <index-Header @change="goout" :quite="islogoin"></index-Header>
    <!-- <el-carousel class="bannerscroll" style="height:600px;">
      <el-carousel-item v-for="(item,index) in bannerlist" :key="index" trigger="click">
        <a :href="item.url" target="_blank"  style="position:absolute;width:1920px;height:618px;left:50%;margin-left:-960px;"><img :src="item.images"> </a> -->
      <!--   <img :src="item.images"> -->
      <!-- </el-carousel-item>
    </el-carousel> -->
    <div class="bannerscroll">
      <div class="ban-ban">
        <img class="ban-erweima" src="../../assets/img/index1/weixin.png" alt="">
      </div>
      <!-- <div class="bannertit">
        <h2>区块链数字资产交易平台</h2>
        <p>安全 <span>&bull;</span> 公正 <span>&bull;</span> 高效 <span>&bull;</span> 不可篡改 </p>
        <div class="phone"><i class="iconfont icon-phone"></i>热线电话：8615956230329</div>
        <div class="erweima">
          <div>
            <img src="../../assets/img/head_180.jpg"/>
          </div>
          <p>微信：fx66kefu</p>
        </div> -->
        <!-- <div class="erweima">
          <img src="../../assets/img/head_180.jpg"/>
          <p>微信：fx66kefu</p>
        </div> -->
        
      <!-- </div> -->
    </div>

    <!-- <div class="banner">
      <div class="wrap">
        <div class="main loginbox" v-show="islogoin==1">
          <div class="groupcom">
            <button class="btn" :class="{'btnphone':isphoneselect==true}" @click="selectmode('phone')"><i class="btnIcon phoneselect" ></i>手机登录</button>
            <button class="btn" :class="{'btnemail':isemailselect==true}"  @click="selectmode('email')"><i class="btnIcon emailselect" ></i>邮箱登录</button>
          </div>
          <div class="groupcom " v-show="isphoneselect==true" >
            <el-select placeholder="国籍" class="icom selecticom" v-model="login.area">
              <el-option  v-for="item in countryList" 
               :label="item.ch_name" :value="item.code"></el-option>
            </el-select>
            <input class="usercom" type="text" placeholder="请输入手机" v-model="login.mobile" value=""  autocomplete="off" name="username" required="" />
          </div>
          <div class="groupcom parentCls" v-show="isemailselect==true" >
            <i class="icom emailIcon"></i>
            <input class="inputElem usercom" type="email" placeholder="请输入邮箱"  value="" id="loginusername" autocomplete="off"  name="username" required="" />
          </div>
          <div class="groupcom">
             <i class="icom pwd1"></i>
            <input type="password" class="usercom" v-model="login.password" placeholder="请输入密码" @keyup.enter="gologin()">
          </div>
          <div class="lbottom">
            <p class="zhuce" @click="loginrester(3)">免费注册</p>
            <div class="rightgroup">
              <p class="forget"><span @click="loginrester(2)">忘记密码</span></p>
            </div>
             <div class="loginbut" @click="gologin()" >登录</div>
          </div>
        </div>
        <div class="main fforget" v-show="islogoin==2">
          <div class="groupcom">
            <button class="btn" :class="{'btnphone':isphoneselect==true}" @click="selectmode('phone')"><i class="btnIcon phoneselect" ></i>手机找回</button>
            <button class="btn" :class="{'btnemail':isemailselect==true}"  @click="selectmode('email')"><i class="btnIcon emailselect" ></i>邮箱找回</button>
          </div>
          <div class="groupcom" v-show="isphoneselect==true" >
            <el-select placeholder="国籍" class="icom selecticom" v-model="login.area">
              <el-option  v-for="item in countryList" 
               :label="item.ch_name" :value="item.code"></el-option>
            </el-select>
            <input class="usercom" type="text" placeholder="请输入手机" v-model="lowpassword.mobile"  value=""  autocomplete="off" name="username" required="" />
          </div>
          <div class="groupcom"  v-show="isphoneselect==true">
            <input class="usercom codeinput" v-model="regestpasword.resettoken" placeholder="请输入验证码">
            <el-button class="codeButton" @click="getpasssword()" :disabled="isenabled">{{coinInfo}}</el-button>
          </div>
          <div class="grouptip" v-show="notfirstget">
            <p>收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
          </div>
          <div class="groupcom" v-show="isphoneselect==true" >
            <input type="password" class="usercom loginbut" v-model="regestpasword.password" placeholder="请输入新密码"/>
          </div>
          <div class="groupcom" v-show="isphoneselect==true" >
            <input type="password" class="usercom loginbut" v-model="regestpasword.password2" placeholder="请再次输入新密码"/>
          </div>
          <div class="groupcom parentCls" v-show="isemailselect==true" >
            <i class="icom emailIcon"></i>
            <input class="inputElem usercom" type="email" placeholder="请输入邮箱" id="resetEmail"  v-model="lowpassword.email" required="" />
          </div>
          <div class="lbottom" v-show="isemailselect==true">
            <div class="loginbut" @click="getpasssword()" >下一步</div>
              <p class="gologin"><span style="cursor: pointer;" @click="loginrester(1)">返回</span></p>
          </div>
          <div class="lbottom" v-show="isphoneselect==true">
            <div class="loginbut" @click="resetpassword()">修改密码</div>
              <p class="gologin"><span style="cursor: pointer;" @click="loginrester(1)">返回</span></p>
          </div>
        </div>
        <div class="main register" v-show="islogoin==3">
          <div class="groupcom">
            <button class="btn" :class="{'btnphone':isphoneselect==true}" @click="selectmode('phone')"><i class="btnIcon phoneselect" ></i>手机注册</button>
            <button class="btn" :class="{'btnemail':isemailselect==true}"  @click="selectmode('email')"><i class="btnIcon emailselect" ></i>邮箱注册</button>
          </div>
          <div class="groupcom" v-show="isphoneselect==true">
            <el-select class="icom user1" v-model="login.area">
              <el-option  v-for="item in countryList" 
               :label="item.ch_name" :value="item.code"></el-option>
            </el-select>
            <input type="text" class="usercom " id="regesterPhone" value="" v-model="regester.mobile"  placeholder="请输入有效手机">
          </div>
          <div class="groupcom parentCls" v-show="isemailselect==true" >
            <i class="icom emailIcon"></i>
            <input class="inputElem usercom" type="email" placeholder="请输入邮箱"  value=""  autocomplete="off" id="regesterEmail" required="" />
          </div>
          <div class="groupcom">
             <i class="icom pwd1"></i>
            <input type="password" class="usercom" v-model="regester.password" placeholder="请输入密码">
          </div>
          <div class="groupcom">
            <input class="usercom codeinput" v-model="regester.code" placeholder="请输入验证码">
            <el-button class="codeButton" @click="getcode(regester,regester.area,regester.mobile,'3')" :disabled="isenabled">{{coinInfo}}</el-button>
          </div>
          <div class="grouptip" v-show="notfirstget">
            <p>收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
          </div>
          <div class="groupcom" v-show="false">
            <input class="usercom codeinput" v-model="regester.gid" placeholder="请输入验证码">
          </div>
          <div class="groupcom">
            <input type="text" class="usercom" v-model="regester.invite_code" placeholder="请输入邀请码">
          </div>
         <div class="submitRegister" @click="goregist()">注册</div>
          <p class="gologin"><span style="cursor: pointer;" @click="loginrester(1)">返回</span></p>
        </div>
        <div class="main lsuccess" v-show="islogoin==4">
          <p class="logotitle"><span class="logoname">已登录区块链交易所</span></p>
          <p>您好,{{username}}</p>
         <div class="submitRegister" >
            <router-link to="/usercenter/bcctrade">
                <span style="color:#fff;">返回交易中心</span>
            </router-link>
          </div>
         <div class="submitRegister" @click="goout()">退出</div>
        </div>
        <div class="boxbox boxone" v-show="showT1">
          <img src="../../../static/img/qq.png" height="144" width="120" alt="">
        </div>
        <div class="boxbox boxtwo"  v-show="showT2">  
          <img src="../../../static/img/weixin.png" height="144" width="120" alt="">
          <img src="../../../static/img/weixin1.png" height="144" width="120" alt="">
        </div>
        <div class="boxbox boxthree" v-show="showT3">
          <img src="../../../static/img/weixin1.png" height="144" width="120" alt="">
        </div>
      </div>
    </div>
     -->
     <!-- 绑定验证 -->
    <!-- <div v-show="dialogVisible"> -->
      <!-- <div class="fade"></div>
      <div class="bingBox">
        <h3 class="title">
            绑定验证
        </h3>
        <el-button-group>
          <el-button  class="btngroup" :class="{'btnphoneselect':isphoneselect==true}" @click="selectmode('phone')">手机</el-button>
          <el-button  class="btngroup" :class="{'btnemailselect':isemailselect==true}"  @click="selectmode('email')">邮箱</el-button>
        </el-button-group>
        <div class="groupcom " v-show="isphoneselect==true" >
          <el-select class="icom user1" v-model="attestationparsm.area">
            <el-option  v-for="item in countryList" 
               :label="item.ch_name" :value="item.code"></el-option>
          </el-select>
          <input class="usercom" type="texr" placeholder="请输入手机"  value=""  autocomplete="off" name="username" required="" v-model="attestationparsm.mobile" />
        </div>
        <div class="groupcom parentCls" v-show="isemailselect==true" style="z-index:2000" >
          <i class="icom emailIcon"></i>
          <input class="inputElem usercom" type="email" placeholder="请输入邮箱"  value=""  autocomplete="off" id="bindEmail" required="" />
        </div>
        <div class="groupcom " v-show="isphoneselect==true" >
          <input class="usercom codeinput" v-model="attestationparsm.code" placeholder="请输入验证码">
          <el-button class="codeButton" @click="getcode(attestationparsm,attestationparsm.area,attestationparsm.mobile,'3')" :disabled="isenabled">{{coinInfo}}</el-button>
        </div>
        <div class="groupcom " v-show="isemailselect==true" >
          <input class="usercom codeinput" v-model="attestationparsm.code" placeholder="请输入验证码">
          <el-button class="codeButton" @click="getcode(attestationparsm,'','','4')" :disabled="isenabled">{{coinInfo}}</el-button>
        </div>
        <div class="grouptip" v-show="notfirstget">
          <p>收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
        </div>
        <div class="submitRegister" @click="submitBind">确认绑定</div>
        <div class="checkUID" @click="checkuid">切换账号 ></div>
      </div>
    </div> -->
    
  </div>
</template>

<script>
import api from '../../config/api-config'
import indexHeader from '../../components/newheader.vue'
import { ajax,setcookie,getcookie,delatecookie,sublogion,goregister,getCountryList,getEmailValidate,getPhoneValidate,sendVoicecode} from '../../assets/js/common'
import Bus from '../../assets/js/bus.js'
export default {
  props:['userName',"quite"],
  data(){
    return{
      bannerlist:[],
      showT1:false,
      showT2:false,
      showT3:false,
      show:false,
      viladtecode:'',
      coinInfo:'获取验证码',
      scode:0,
      respassword:'',
      respasswordagain:'',
      islogoin:1,//判断用户是否登录 1表示登录界面 2表示忘记密码界面 3表示注册页面 4表示登录成功页面 5表示手机邮箱登录
      username:'',
      isphoneselect:true,
      isemailselect:false,
      resetBtnText:'下一步',
      countryList:[],
      isenabled:false,
      regester:{
        email:'',
        password:'',
        code:'',
        type:'sms',
        area:'86',
        mobile:'',
        invite_code:'',
      },
      mobileType:true,
      lowpassword:{
        email:'',
        os:'web',
        type:'sms',
        area:'86',
        mobile:''
      },
      showul:false,
      phoneShow:false,
      login:{
        email:'',
        password:'',
        redirect_uri:'https://zhaobi.cn',//修改
        os:'web',
        type:'sms',
        area:'86',
        mobile:'',
      },
      regestpasword:{
        password2:'',
        resettoken:'',
        password:'',
        os:'web',
        type:'sms'
      },
      notice:{
        message:'比特理财官网正式上线',
        date:'2017-07-05',
        id:'1'
      },
      dialogVisible:false,
      attestationparsm:{
        t:'sms',
        code:'',
        gid:'',
        email:'',
        area:'',
        mobile:''
      },
      voiceparam:{
        area:'',
        mobile:'',
        codetype:'',
      },
      notfirstget:false,
      clickNum:0,

    }
  },
  created(){
    var _this = this;
    window.setTimeout(function(){
      _this.show = true;
    },500)
    if(getcookie('username')){
      _this.islogoin=5;
      _this.username=getcookie('username');
    }
    Bus.$on('loginBoxtrigger',function(e){//点击App下载跳转至app下载位置
      if(e=="login"){
        _this.islogoin=1;
      }
      if(e=="regist"){
        _this.islogoin=3;
      }
    });
    if(window.location.href.indexOf('?code')>=0){
      //邀请码链接进来
       _this.islogoin=3;
       _this.regester.invite_code=window.location.href.split('code=')[1];
     
       setcookie('invite_code',window.location.href.split('code=')[1]);//保存邀请码
       setcookie("invitelink",window.location.href);
    }else{
      _this.regester.invite_code='';
      // delatecookie();

    }
    // _this.getCMSMessage();
  },
  watch:{
    userName(value) {
      if(!getcookie('username')){
        this.islogoin=1;
      }
    }
  },
  mounted:function(){
    this.getbannerlist();
    if(!getcookie('username')){
       if(getcookie('loginorregist')=='login'){
          this.islogoin=1;
       }
       if(getcookie('loginorregist')=='regist'){
          this.islogoin=3;
       }
      
      this.getCountry();
    }
  },
  components: {
    indexHeader
  },
  methods:{
    //获取轮播banner列表
    getbannerlist(){
      let param={
        type:'pc'
      }
      ajax(this,this.extendApi.getbannerlist,param,(response)=>{
        if(response.data.length>0){
           this.bannerlist= response.data;
        }
        else{
          console.log("cannot get banner");
        }

      },'GET')
    },
    //增加语音验证码
    getVoicecode(){
      sendVoicecode(this,this.voiceparam,(response)=>{
        this.lasscode(this.clickNum);
      })
    },
    //新增
    showerweima(e){
      if(e == 1){
        this.showT1=true;
      }else if(e == 2){
        this.showT2=true;
      }else if(e == 3){
        this.showT3=true;
      }
      
    },
    noneerweima(){
      this.showT1=false;
      this.showT2=false;
      this.showT3=false;
    },
    //获取国家信息(区号或者国名)
    getCountry(){
      let _this=this;
      getCountryList(this,function(res){
        _this.countryList=res;
      }) 
    },
    //选择模式
    selectmode(e){
      //将验证码位置重置
      this.isenabled=false;

      clearInterval(this.scode);
      this.coinInfo = '获取验证码';
      if(e=='phone'){
        if(this.clickNum>=1){
          this.notfirstget=true;
        }else{
          this.notfirstget=false;
        }
        this.isphoneselect=true;
        this.isemailselect=false;
        this.getCountry();
      }else{
         this.notfirstget=false;
        this.isphoneselect=false;
        this.isemailselect=true;
      }
    },
    gologin(){
      if(this.isphoneselect==true){
        //手机登录
        this.login.email="";
        this.login.type="sms";
      }else{//邮箱登录
         this.login.mobile="";
          this.login.area="";
          this.login.type="email";
          this.login.email=$('#loginusername').val();
      }
      delatecookie();
      
      sublogion(this,'index');
    },
    //获取验证码
    getcode(_self,area,e,num){
      
      //判断获取手机验证码还是邮箱验证码
      let _this=this;
      if(this.isphoneselect==true){
        //语音验证码参数
        this.voiceparam.area=area;
        this.voiceparam.mobile=e;
        //获取手机验证码
        if(!e){
          this.$notify({
            title: '失败',
            message: '请输入手机号',
            type: 'error',
            duration:'1000',
          });
          return;
        }
        if(num=='3'){//注册
          var paramArray={
            area:area,
            mobile:e,
            codetype:'validate',
            param:'FzmRandom',
            extend_param:''
          }
          this.voiceparam.codetype='validate';

        }
        if(num=='2'){//忘记密码
          var paramArray={
            area:area,
            mobile:e,
            codetype:'reset_password',
            param:'FzmDateTime|FzmRandom',
            extend_param:''
          }
          this.voiceparam.codetype='reset_password'
        }
        this.clickNum++;
        getPhoneValidate(_this,paramArray,function(res){

           _self.gid = res.gid;
           _this.lasscode(_this.clickNum);
        })
      }else{
        if(num=='4'){//强制绑定  2为注册
          if(!$('#bindEmail').val()){
            this.$notify({
              title: '失败',
              message: '请输入邮箱',
              type: 'error',
              duration:'1000',
            });
            return;
          }
          var param = {
            email:$('#bindEmail').val(),
            codetype:'validate',
            param:'FzmDateTime|FzmRandom',
            extend_param:''
          }
        }else{
          //获取邮箱验证码
          if(!$('#regesterEmail').val()){
            this.$notify({
              title: '失败',
              message: '请输入邮箱',
              type: 'error',
              duration:'1000',
            });
            return;
          }
          var param = {
            email:$('#regesterEmail').val(),
            codetype:'validate',
            param:'FzmDateTime|FzmRandom',
            extend_param:''
          }
        }
        this.clickNum=0;
        getEmailValidate(_this,param,function(res){
          _self.gid = res.guide;
          _this.lasscode(_this.clickNum);
        })
        
      }
    },
    lasscode(Num){
      var _this=this;
      _this.isenabled=true;
      clearInterval(this.scode);
      var codenum = 60;
      this.scode = setInterval(()=>{
        codenum= codenum-1;
        this.coinInfo = codenum+'秒后重试'
        if(codenum == 0){
          if(Num>=1){
            _this.notfirstget=true;
          }
          _this.isenabled=false;
          clearInterval(_this.scode);
          this.coinInfo = '获取验证码';
        }
      },1000)
    },
    getpasssword(){
      var _this=this;
      if(_this.isphoneselect==true){
        //手机找回
        if(_this.lowpassword.mobile==""){
          _this.$notify({
            title: '提示',
            message: '请选择国家',
            type: 'error',
            duration:'1000',
          });
          return;
        }
        if(_this.lowpassword.mobile==""){
          _this.$notify({
            title: '提示',
            message: '请输入手机',
            type: 'error',
            duration:'1000',
          });
          return;
        }
        _this.lowpassword.type="sms";
        _this.lowpassword.email="";
        _this.voiceparam.mobile=_this.lowpassword.mobile;
        _this.voiceparam.area=_this.lowpassword.area;
         _this.voiceparam.codetype="reset_password";
         _this.clickNum++;

      }else{
        if($("#resetEmail").val()==""){
          _this.$notify({
            title: '提示',
            message: '请输入手机或邮箱',
            type: 'error',
            duration:'1000',
          });
         return;
        }else{
          _this.lowpassword.type="email";
          _this.lowpassword.mobile="";
          _this.lowpassword.area="";
          _this.lowpassword.email=$("#resetEmail").val();
           _this.clickNum=0;
        }
      }
      ajax(this,this.extendApi.resetFind,this.lowpassword,(response)=>{
        if(response.code == 200){
          _this.lasscode(_this.clickNum)
          if(_this.isphoneselect==true){
            _this.$notify({
              title: '成功',
              message: '短信已发送成功',
              type: 'success',
              duration:'3000',
            });

          }else{
            _this.$notify({
              title: '成功',
              message: '邮件发送成功,请点击邮箱确认链接修改密码',
              type: 'success',
              duration:'3000',
            });
          }
        }else{
          _this.$notify({
            title: '成功',
            message: response.message,
            type: 'error',
            duration:'1000',
          });
        }
      });
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
    //修改密码
    goregisterpwd(){
      var _this=this;
      var type="";
      if(this.isphoneselect==true){
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
    goregist(){//注册
      if(this.isphoneselect==true){
        //手机注册
        this.regester.email="";
        this.regester.type="sms";
         this.login.type=this.regester.type;
        this.login.mobile= this.regester.mobile;
        this.login.area=this.regester.area;
      }
      else{
        //邮箱注册
        this.regester.type="email";
        this.regester.area="";
        this.regester.mobile="";
        this.regester.email = $('#regesterEmail').val();
        this.login.email = this.regester.email;
         this.login.type=this.regester.type;
      }
      goregister(this,'index');//在common.js公共方法处
    },
    goout(){//退出
      delatecookie();
      this.islogoin=1;
      this.getCountry();
      this.$emit("loginout");
    },
    loginrester(num){//登录界面切换
      this.islogoin=num;
    },
    getCMSMessage(){//获取网站公告内容
      var _this=this;
      let data={
        cid:'1'
      };
      ajax(_this,api.getNewList,'',function(response){
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
    },
    resetpassword(){
      let that=this;
      if(this.regestpasword.password && this.regestpasword.password2){
        ajax(this,this.extendApi.resetpassword,this.regestpasword,(response)=>{
          if(response.code == 200){
              this.$notify({
                title: '提示',
                message: '重置密码成功',
                type: 'success',
                duration:'2000'
              });
              delatecookie();
              this.islogoin=1;
          }else{
            this.$notify({
              title: '提示',
              message: response.message,
              type: 'error',
              duration:'2000'
            });
            
            //修改成功退回登录框

              // this.$emit("change");
          }
        });
      }else{
        this.$notify({
          title: '提示',
          message: '请输入密码',
          type: 'error',
          duration:'2000'
        });

      }
    },
    submitBind(){
      let _this=this;
      this.login.gid=this.attestationparsm.gid;
      if(this.isphoneselect==true){
        //手机登录
        this.attestationparsm.email="";
        this.attestationparsm.t="sms";
        this.login.email="";
        this.login.type="sms";
        this.login.mobile=this.attestationparsm.mobile;
      }else{//邮箱登录
         this.attestationparsm.mobile="";
          this.attestationparsm.area="";
          this.attestationparsm.t="email";
          this.attestationparsm.email=$('#bindEmail').val();
          this.login.mobile="";
          this.login.area="";
          this.login.type="email";
          this.login.email=$('#bindEmail').val();

      }
      ajax(this,this.extendApi.attestation,this.attestationparsm,(response)=>{
        if(response.code == 200){
            _this.$notify({
              title: '绑定成功',
              message: '再次登录请使用新的手机或者邮箱！',
              type: 'success',
              duration:'2000'
            });
            // _this.islogoin=1;
            _this.dialogVisible=!_this.dialogVisible;
            sublogion(this,'index');//登录
        }else{
          _this.$notify({
            title: '提示',
            message: response.message,
            type: 'error',
            duration:'2000'
          });
        }
      });
    },
    checkuid(){
      this.islogoin=1;
      this.dialogVisible=!this.dialogVisible;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-select .el-input__inner{
  padding-right: 0px;
}
.el-input__icon{
  width: 20px;
}
.el-input{
  font-size: 12px;
}
.bannerscroll{
  background:url("../../assets/img/index1/banner.png") no-repeat center center;
  background-size: auto 100%;
  .ban-ban{
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-top: 390px;

  }
  /* .bannertit{
    overflow: hidden;
    width: 1200px;
    margin:0 auto;
    text-align: left;
    padding-top: 60px;
    color: #fff;
    h2{
      color: #0acdfe;
      font-size: 50px;
      margin-top: 60px;
    } 
    p{
      font-size: 24px;
      margin-top: 20px;
      span{
        font-size: 20px;
        color: #88afd5;
      }
    }
    .erweima{
      margin-right: 45px;
      padding :42px 0 25px 0; 
      float: left;
      div{
        padding: 3px;
        background: rgba(0, 0, 0, 0.2);
        border-radius:10px;
        img{
          width: 130px;
          height: 130px;
          background: #ccc;
          border-radius: 10px;
          margin: 3px 3px 0 3px;
        }
      }
      p{
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
      }
    }
    .phone{
      margin-top: 20px;
      width: 240px;
      height: 40px;
      background: rgba(0,0,0,0.12);
      border-radius: 6px;
      clear: both;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      i{
        margin-right: 10px;
      }
    }
  } */
}
.bannerscroll{
  height: 600px;
  position: absolute;
  top:0px;
  width: 100%;
}
#top-content{
  w:100%;
  pos:relative;
  min-width: 1210px;
  height: 600px;
  /*bg: url(../../assets/img/index/banner2.png) center ;*/
 
  /*background-size: 100% 100%; */
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
    h: 600px;
    position: absolute;
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
      padding-top: 140px;
      .main{
        width: 282px;
        padding-bottom: 10px;
        background:#fff;
        z-index: 99;
        position: relative;
        height: auto;
        /*overflow: hidden;*/
        border-radius: 10px;
        float: right;
        padding: 5px 26px 20px;
        border:1px solid #f0f0f0;
        p{
          color: #000;
        }
        .logotitle{
          color: #000;
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
          .selecticom{
            padding: 1px;
          }
          .el-input__inner {
           border: 0px solid #ccc;
            height: 32px;
            line-height: 32px;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
           }
          .btn{
              width: 110px;
              height: 30px;
              border-radius:2px;
              border:1px solid #ccc;
              background: #fff;
              line-height: 30px;
              text-align: center;
              color: #000;
              font-size: 12px;
              .btnIcon{
                display: inline-block;
                line-height: 30px;
                vertical-align: -2px;
              }
             
              .phoneselect{
                background: url(../../assets/img/login/phone.png) no-repeat center;
                height: 15px;
                width: 20px;
              }
              .emailselect{
                background: url(../../assets/img/login/emailselect.png) no-repeat center;
                height: 15px;
                width: 30px;
              }
          }
          .btnphone{
            border:1px solid #ff6600;
          }
          .btnemail{
            border:1px solid #2595ff;
          }
          .icom{
            display: inline-block;
            position: absolute;
            width: 60px;
            height: 34px;
            padding: 1px;
            /*left: 30px;*/
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
          }
          .user1{
            /*background: url(../../assets/img/username.png) no-repeat center;*/
            background-color: #e6e6e6;
          }
          .emailIcon{
            background: url(../../assets/img/login/eamil.png) no-repeat center;
            background-color: #e6e6e6;
          }
          .usercom{
            /*background: #fff;*/
            padding-left: 66px;
            width: 230px;
            height: 35px;
            border-radius: 2px;
            border:1px solid #ccc !important;
            border:0;
            color: #000;
          }
          .codeinput{
            background: rgba(255,255,255,0.3) no-repeat 24px center;
            padding-left: 10px;
            width: 130px;
            height: 34px;
            float: left;
          }
          .codeButton{
            float: right;
            border: 0;
            height: 34px;
            width: 85px;
            border-radius: 2px;
            cursor: pointer;
            background: #fff;
            border:1px solid #ccc;
            color: #000;
            font-size: 12px;
          }
          .codeButton.is-disabled, .codeButton.is-disabled:focus, .codeButton.is-disabled:hover {
              color: #bfcbd9;
              cursor: not-allowed;
              background-image: none;
              background-color: #eef1f6;
              border-color: #d1dbe5;
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
            background: url(../../assets/img/login/passord.png) no-repeat center;
            background-color: #e6e6e6;
          }
          .userpwd{
            width: 138px;
            padding-left: 20px;
            float: left;
            border-radius: 2px 0 0 2px;
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
        .grouptip{
          height: 20px;
          margin-bottom: -17px;
          p{
            color: #333;
            span{
              color: #c81118;
              cursor: pointer;
            }
          }
          
        }
        .gologin{
          color: #b3b3b3;
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
            color: #b3b3b3;
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
              color: #b3b3b3;
            }
          }
          .loginbut{
            clear: both;
            width: 230px;
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
    }
  }
  .boxbox{
      margin-top: 80px;
      width: 120px;
      height: 146px;
      background: #fff;
  }
  .boxone{
    margin-left: 50px;
  }
  .boxtwo{
    width: 248px;
    margin-left: 160px;
  }
  .boxthree{
    margin-left: 350px;
  }
  .qrcodeClass{
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height:26px;
    margin-top: -40px;
    img{
      display: inline-block;
      margin-right: 20px;
    }
    .phone-num{
      height:26px;
      border-radius: 4px;
      padding: 0px 12px;
      background-color: #ce181d;
      display: inline;
      float: left;
      a{
        display: inline-block;
        color: #ffffff;
        height: 26px;
        line-height: 26px;
        text-align:center;
        vertical-align: middle;
        i{
          display: inline-block;
          height: 26px;
         line-height: 26px;
           margin: -3px 5px 0;
           vertical-align: middle;
        }
      }
    }
    .phone-number{
      line-height: 26px;
      .icon-weixin-copy{
        color: rgba(16, 172, 16, 1);
        font-size: 16px;
        margin-right: 5px;
        margin-left: 15px;
        cursor: pointer;
      }
      .icon-qqqun{
        color: rgba(0, 170, 238, 1);
        font-size: 16px;
        margin-right: 5px;
        margin-left: 15px;
        cursor: pointer;
      }
      span{
        font-size: 14px;
        color: #fff;
        cursor: pointer;
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
}
.fade{
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
.bingBox{
  width:300px;
  padding-bottom: 10px;
  padding: 5px 20px 20px;
  height: auto;
  z-index: 99;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -150px;
  z-index: 999;
  border-radius: 6px;     
  h3{
    margin: 23px auto;
    text-align: center;
    font-size: 16px;
    color: #333;
    line-height: 19px;
    height: 16px;
  }
  .el-button-group{
    .el-button{
      width: 130px;
      height: 34px;
      background: #fff;
      color: #ce181d;
      border: solid 1px #ce181d;
     
    }
    .btnphoneselect,.btnemailselect{
      background-color: #ce181d;
      border: solid 1px #ce181d;
      color: #fff;
    }
  }
  .groupcom{
    margin-top: 17px;
    height: 34px;
    display: block;
    .el-input__inner{
      height: 34px;
    }
    .icom{
      display: inline-block;
      position: absolute;
      width: 60px;
      height: 34px;
      /*left: 30px;*/
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      border:0px;
      box-shadow: none;
      .el-input__inner{
        height: 34px;
      }
    }
    .usercom{
      /*background: #fff;*/
      padding-left: 66px;
      width: 260px;
      height: 34px;
      border-radius: 2px;
      border:1px solid #ccc !important;
      border:0;
      color: #b3b3b3;
    }
    .codeinput{
      background: rgba(255,255,255,0.3) no-repeat 24px center;
      padding-left: 10px;
      width: 160px;
      height: 34px;
      float: left;
    }
    .codeButton{
      float: right;
      border: 0;
      height: 34px;
      width: 90px;
      border-radius: 5px;
      cursor: pointer;
      background: #fff;
      border:1px solid #ccc;
      color: #000;
      font-size: 12px;
    }
  }
  .grouptip{
    height: 20px;
    margin-bottom: -17px;
    p{
      color: #333;
      span{
        color: #c81118;
        cursor: pointer;
      }
    }
    
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
  .checkUID{
    margin-top: 20px;
    width: 100%;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    text-align: center;
    color:#079fdd;
    font-size: 14px;          
  }
}

</style>
