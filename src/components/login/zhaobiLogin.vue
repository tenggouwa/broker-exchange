<template>
	<div class="zhaobi_login">
		<el-dialog
		  :visible.sync="dialogVisible"
		  width="350px"
		  :modal-append-to-body="false"
		  :modal="true"
		  :show-close="false"
		  @close="closeBox"
		  >
			<div class="semicircle"><i class="iconfont icon-zhaobi"></i></div>
			<!-- ————————————————登录注册页面———————————————————— -->
			<div class="login_content" v-if="main_type=='normal'">
				<!-- 头部 -->
				<div class="login_head">
					<span @click="selectPhoneLogin()" :class="{activeclass:loginType == 'phone'}">手机</span>
					<span @click="selectEmailLogin()" :class="{activeclass:loginType == 'email'}">邮箱</span>
					<div class="redline" ref="redLine"></div>
				</div>
				<!-- 输入部分 -->
				<div class="login_input" v-if="loginType == 'phone'" :class="{confirmColor:isPhoneInputFocused==true}">
					<el-select v-model="areaValue" placeholder="请选择" :class="{el_select_input:isPhoneInputFocused==true}">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				  <div class="fake_input" @click="obtainBlur()" v-if="areaValue=='86'">
				  	<span v-for="item in phoneNumber" :class="item.class">{{item.n}}</span>
				  	<input maxlength="11" v-model="telNumber" type="text" class="real_input" ref="real_input" @blur="judgeIsReg()" @keyup="checkInput()">
				  </div>
				  <div class="waiguo_input" v-if="areaValue!='86'">
				  	<input 
				  		v-model="telNumber2" 
				  		type="text" 
				  		@keyup="telNumber2=telNumber2.replace(/[^\d]/g,'')" 
				  		@click="isPhoneInputFocused = true"
				  		@blur="isPhoneInputFocused=false"
				  		>
				  </div>
				</div>
				<div class="login_input" v-if="loginType == 'email'" :class="{confirmColor:isPhoneInputFocused==true}" @click="obtainBlur()">
					<input 
						type="email" 
						class="email_input"
						v-model="emailNumber"
						@blur="judgeIsReg()"
						@click="isPhoneInputFocused = true"
						>
				</div>
				<!-- 验证码/密码部分 -->
				<div class="verify_box" v-if="confirm == true" :class="{code_content_bgcolor:isCodeInputFocused==true}">
					<div class="code_content" v-if="code_type!='password'" @click="obtainCodeBlur()">
						<span v-for="item in codeNumbers" :class="item.class" v-if="code_type==1||code_type==3">{{item.c}}</span>
						<span v-for="item in codeNumbers2" :class="item.class" v-if="code_type==4">{{item.c}}</span>
						<p v-if="code_type==2">请输入验证码</p>
						<input 
							maxlength="4" 
							v-model="codeNumber" 
							type="text" 
							class="real_code" 
							ref="real_code" 
							@keyup="codeNumber=codeNumber.replace(/[^\d]/g,'')"
							@focus="isCodeInputFocused=true"
							@blur="isCodeInputFocused=false">
					</div>
					<!-- 密码输入框 -->
					<div class="pw_input" v-if="code_type=='password'">
						<input
							type="password"
							autocomplete="off"
							ref="password_input"
							v-model="passwordValue"
							@focus="isCodeInputFocused=true"
							@blur="isCodeInputFocused=false">
					</div>
					<div class="code_button" v-if="code_type==1">
						<span>已发送{{codeSecond}}s</span>
					</div>
					<div class="ob_code" v-if="code_type==2||code_type==3" @click="obCodeAgain()">
						<span>获取验证码</span>
					</div>
				</div>
				<!-- 记住密码/忘记密码 -->
				<div class="forget_box" v-if="showFRPassword==true">
					 <el-checkbox class="rem_checkbox" v-model="isRemPassword">记住密码</el-checkbox>
					 <p class="forget_password" @click="wangjimima()">忘记密码</p>
				</div>
				<!-- 提示部分 -->
				<div class="tips">
					<p v-if="(code_type==2||voice_show==true)&&loginType=='phone'">收不到短信？试试<span @click="toVoiceVerfy()">语音验证</span></p>
					<p v-if="code_type==4"><span>请注意接听语音电话</span></p>
				</div>
				<!-- 确认部分 -->
				<div class="login_button">
					<span v-show="btn_type==1" @click="xiayibu()">下一步</span>
					<span v-show="btn_type==2" @click="registorloginBtn()">注册/登录</span>
					<span v-show="btn_type==3">确认</span>
				</div>
				<!-- 切换登录部分（已注册才有） -->
				<div class="login_tab">
					<p v-if="login_type=='code'" @click="toMimaLogin()">密码登录</p>
					<p v-if="login_type=='password'"  @click="toCodeLogin()">验证码登录</p>
				</div>
				<div class="no_password" v-if="showNoPassword==true">
					<p>您还没有设置登录密码，无法使用密码登录！</p>
					<p><span @click="setPassword()">设置登录密码&gt;</span></p>
				</div>
			</div>
			<!-- ————————————————设置密码页面———————————————————— -->
			<div class="login_content" v-if="main_type=='setting'">
				<!-- 头部 -->
				<div class="login_head">
					<p>设置密码</p>
					<div class="redline redline_set_password" ref="redLine"></div>
				</div>
				<div class="send_tip" id="send_tip_setting">
					<p v-if="loginType=='phone'" >验证码已发送至+{{areaValue}}{{telNumber}}</p>
					<p v-if="loginType=='email'" >验证码已发送至{{emailNumber}}</p>
				</div>
				<div class="verify_box" :class="{code_content_bgcolor:isCodeInputFocused==true}">
					<div class="code_content" @click="obtainCodeBlur()">
						<span v-for="item in codeNumbers" :class="item.class" v-if="code_type==1||code_type==3">{{item.c}}</span>
						<p v-if="code_type==2">请输入验证码</p>
						<input 
							maxlength="4" 
							v-model="codeNumber" 
							type="text" 
							class="real_code" 
							ref="real_code" 
							@keyup="codeNumber=codeNumber.replace(/[^\d]/g,'')"
							@focus="isCodeInputFocused=true"
							@blur="isCodeInputFocused=false">
					</div>
					<div class="code_button" v-if="code_type==1">
						<span>已发送{{codeSecond}}s</span>
					</div>
					<div class="ob_code" v-if="code_type==2||code_type==3" @click="obCodeAgain()">
						<span>获取验证码</span>
					</div>
				</div>
				<div class="new_password" :class="{new_password_bgcolor:isPasswordFocused==true}">
					<input
						type="text"
						placeholder="请设置新密码（6-16个字符）"
						v-model="passwordValue"
						@focus="isPasswordFocused=true"
						@blur="isPasswordFocused=false">
				</div>
				<div class="login_button">
					<span @click="settingPassword()">确认</span>
				</div>
			</div>
			<!-- ————————————————找回密码页面———————————————————— -->
			<div class="login_content" v-if="main_type=='getback'">
				<!-- 头部 -->
				<div class="login_head">
					<span @click="selectPhoneLogin()" :class="{activeclass:loginType == 'phone'}" style="margin-right: 50px">手机找回密码</span>
					<span @click="selectEmailLogin()" :class="{activeclass:loginType == 'email'}">邮箱找回密码</span>
					<div class="redline" ref="redLine"></div>
				</div>
				<!-- 输入部分 -->
				<div class="login_input" v-if="loginType == 'phone'" :class="{confirmColor:isPhoneInputFocused==true}">
					<el-select v-model="areaValue" placeholder="请选择" :class="{el_select_input:isPhoneInputFocused==true}">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value"
				      >
				    </el-option>
				  </el-select>
				  <div class="fake_input" @click="obtainBlur()" v-if="areaValue=='86'">
				  	<span v-for="item in phoneNumber" :class="item.class">{{item.n}}</span>
				  	<input maxlength="11" v-model="telNumber" type="text" class="real_input" ref="real_input" @blur="isPhoneInputFocused=false" @keyup="checkInput()">
				  </div>
				  <div class="waiguo_input" v-if="areaValue!='86'">
				  	<input
				  		v-model="telNumber2" 
				  		type="text" 
				  		@keyup="telNumber2=telNumber2.replace(/[^\d]/g,'')" 
				  		@click="isPhoneInputFocused = true"
				  		@blur="isPhoneInputFocused=false"
				  		>
				  </div>
				</div>
				<div class="login_input" v-if="loginType == 'email'" :class="{confirmColor:isPhoneInputFocused==true}">
					<input type="email" 
						class="email_input"
						v-model="emailNumber"
						@click="isPhoneInputFocused = true"
				  	@blur="isPhoneInputFocused=false">
				</div>
				<div class="verify_box" :class="{code_content_bgcolor:isCodeInputFocused==true}">
					<div class="code_content" @click="obtainCodeBlur()">
						<span v-for="item in codeNumbers" :class="item.class" v-if="code_type==1||code_type==3">{{item.c}}</span>
						<p v-if="code_type==2">请输入验证码</p>
						<input
							maxlength="4" 
							v-model="codeNumber" 
							type="text" 
							class="real_code" 
							ref="real_code" 
							@keyup="codeNumber=codeNumber.replace(/[^\d]/g,'')"
							@focus="isCodeInputFocused=true"
							@blur="isCodeInputFocused=false">
					</div>
					<div class="code_button" v-if="code_type==1">
						<span>已发送{{codeSecond}}s</span>
					</div>
					<div class="ob_code" v-if="code_type==2||code_type==3" @click="obGettingBackCode()">
						<span>获取验证码</span>
					</div>
				</div>
				<div class="new_password" :class="{new_password_bgcolor:isPasswordFocused==true}">
					<input
						type="text"
						placeholder="请设置新密码（6-16个字符）"
						v-model="passwordValue"
						@focus="isPasswordFocused=true"
						@blur="isPasswordFocused=false">
				</div>
				<div class="login_button">
					<span @click="gettingBackPassword()">确认</span>
				</div>
			</div>
		</el-dialog>
		<div class="tx_verify">
			<div id="TCaptcha" style="width:310px;height:40px;"></div>
		</div>
	</div>
</template>

<script>
import {ajax,setcookie} from '../../assets/js/common.js'
import bus from '../../assets/js/bus.js'

export default{
	data(){
		return{
			srcUrl:'',
			busId:'',
			dialogVisible: false,
			main_type:'normal',
      loginType:'phone',
      options:[
      	{
      		value:'86',
      		label:'+86'
      	},
      	{
      		value:'12',
      		label:'+12'
      	},
      ],
      areaValue:"86",
      telNumber:'',		//手机号输入框（真实的值）
      telNumber2:'',	//国外手机号
      emailNumber:'',	//邮箱帐号
      passwordValue:'',	//密码输入框的值
      isRegist:false,	//是否注册
      isSetPassword:false,	//是否设置密码
      showNoPassword:false,
      showFRPassword:false,
      phoneNumber:[
      	{n:'',class:'s1'},
      	{n:'',class:'s2'},
      	{n:'',class:'s3'},
      	{n:'',class:'s4'},
      	{n:'',class:'s5'},
      	{n:'',class:'s6'},
      	{n:'',class:'s7'},
      	{n:'',class:'s8'},
      	{n:'',class:'s9'},
      	{n:'',class:'s10'},
      	{n:'',class:'s11'},
      ],
      codeNumbers:[
      	{c:'',class:'c1'},
      	{c:'',class:'c2'},
      	{c:'',class:'c3'},
      	{c:'',class:'c4'}
      ],
      codeNumbers2:[
      	{c:'',class:'cc1'},
      	{c:'',class:'cc2'},
      	{c:'',class:'cc3'},
      	{c:'',class:'cc4'}
      ],
      codeNumber:'',	//验证码
      codeSecond: 60,
      timingKey:true,
      confirmColor:'#e8e8e8',
      confirm:false,	//用户输入完帐号后 控制验证码界面的显示
      code_type:1,
      btn_type:1,
      login_type:'',
      voice_show:false,
      isRemPassword:true,
      isPhoneInputFocused:false,
      isCodeInputFocused:false,
      isPasswordFocused:false,
      //接口
      paramIsRegist:{	//判断是否注册
      	mobile:'',
      	area:'',
      	type:'sms',
        email:'',
        broker_code:'9ba975d77dcb6ca6'
      },
      paramObtainCode:{	//发送短信验证码
      	platkey:'cga',
      	codetype:'quick',
      	area:'',
      	mobile: '',
      	param:'FzmRandom4',
      	ticket:'',
      	businessId:'',
      },
      paramSendEmailCode:{	//发送邮箱验证码
      	email:'',
      	codetype:'quick',
      	param:'FzmRandom4',
      	platkey:'cga',
      	ticket:'',
      	businessId:'',
      },
      paramSendVoice:{	//发送语音验证码
      	area:'',
      	mobile:'',
      	codetype:'quick',
      	platkey:'cga',
      	ticket:'',
      	businessId:'',
      },
      paramQuickRegist:{	//快速注册
      	type:'sms',
      	area:'',
      	mobile:'',
      	code:'',
      	email:'',
      	redirect_uri:'suibiantian',
        broker_code:'9ba975d77dcb6ca6'
      },
      paramQuickLogin:{	//快速登录
      	type:'sms',
      	area:'',
      	mobile:'',
      	code:'',
      	logintype:'code',
      	redirect_uri:'suibiantian',
      	email:'',
      	password:'',
        broker_code:'9ba975d77dcb6ca6'
      },
      paramSetPassword:{	//设置密码（未登录）
      	type:'sms',
      	area:'',
      	mobile:'',
      	email:'',
      	password:'',
        code:'',
        broker_code:'',
      },
      paramBackPassword:{	//找回密码
      	type:'sms',
      	area:'',
      	mobile:'',
      	email:'',
      	password:'',
      	code:'',
      },
		}
	},
	mounted(){
		if(this.dialogVisible == false){
			this.$store.commit('openDialog',false);
		}
		bus.$on('turnOut',(res)=>{
			if(res){
				this.isRegist = false;
				this.main_type = 'normal';
				this.loginType = 'phone';
				this.telNumber = '';
				this.emailNumber = '';
				this.passwordValue = '';
				this.isSetPassword = false;
				this.showFRPassword = false;
				this.showNoPassword = false;
				this.codeNumber = '';
				this.confirm = false;
				this.code_type = 1;
				this.btn_type = 1;
				this.login_type ='';
				this.voice_show = false;
			}
			console.log('isRegist: '+this.isRegist);
		});
	},
	watch:{
		"$store.state.dialogBox":function(){
      console.log(2222222)
			if(this.$store.state.dialogBox){
				this.dialogVisible = true;
				this.promise()
	      .then(()=>{
	      	this.obtainBlur();
	      })
			}else{
				this.dialogVisible = false;
			}
		},
		telNumber(){
			let arr = this.telNumber.split('');
			for(let i=arr.length;i<11;i++){
				this.phoneNumber[i].n='';
			}
    	//console.log(arr)
    	for(let i=0;i<arr.length;i++){
    		this.phoneNumber[i].n = arr[i];
    	}
		},
		codeNumber(){
			let arr = this.codeNumber.split('');
			for (let i = arr.length; i < 4; i++) {
				this.codeNumbers[i].c = '';
				this.codeNumbers2[i].c = '';
			}
			//console.log(arr)
			for (var i = 0; i < arr.length; i++) {
				this.codeNumbers[i].c = arr[i];
				this.codeNumbers2[i].c = arr[i];
			}
		},
	},
	methods:{
		//腾讯云验证
		creatScript(src){
			var oScript = document.createElement('script');
			oScript.src = src;

			document.getElementsByTagName('body')[0].appendChild(oScript);
			var oDiv = document.getElementById('TCaptcha');

			setTimeout(()=>{
				var capOption = {
					callback:this.cbfn,
					type:'popup',
					pos:'fixed',
				};
				capInit(oDiv,capOption);
			},1000)
		},
		cbfn(res){
			if(res.ret == 0){
				console.log('ticket: '+res.ticket,this.busId);
				if(this.loginType == "phone"&&this.code_type != 4){
					this.paramObtainCode.ticket = res.ticket;
					this.paramObtainCode.businessId = this.busId;
					this.obtainCodes();
				}else if(this.loginType == 'email'&&this.code_type != 4){
					this.paramSendEmailCode.ticket = res.ticket;
					this.paramSendEmailCode.businessId = this.busId;
					this.getEmailCode();
				}else if(this.code_type == 4){
					this.paramSendVoice.ticket = res.ticket;
					this.paramSendVoice.businessId = this.busId;
					this.getVoiceCode();
				}
				
				capDestroy();
			}else{
				capDestroy();
			}
		},
		//当用户输入手机号码后失去焦点时，判断是否已注册
		judgeIsReg(){
			this.isPhoneInputFocused=false;
			//console.log(this.loginType);
			//处理一下参数 邮箱or手机
			if(this.loginType == "phone"){
				this.paramIsRegist.type = 'sms';
				this.paramIsRegist.mobile = this.telNumber;
				this.paramIsRegist.area = this.areaValue;
				this.paramIsRegist.email = '';
			}else{
				this.paramIsRegist.type = 'email';
				this.paramIsRegist.email = this.emailNumber;
				this.paramIsRegist.mobile = '';
				this.paramIsRegist.area = '';
      }
			if(this.telNumber||this.emailNumber){
				ajax(this,this.extendApi.isRegisterApi,this.paramIsRegist,(res)=>{
					if(res.code==200&&res.data.uid!=0){
						this.isRegist = true;
					}else{
						this.isRegist =false;
					}
					if(res.data.ispwd=='0'){
						this.isSetPassword = false;
						this.isSetPasswordConst = false;
					}else if(res.data.ispwd=='1'){
						this.isSetPassword = true;
						this.isSetPasswordConst = true;
					}else{
						return
					}
				},"GET")
			}else{
				console.log("请完整输入您的帐号!");
			}
		},
		//下一步 按钮
		xiayibu(){
			let timer = setTimeout(()=>{
				if(this.isSetPassword){
					console.log("isSetPassword: "+this.isSetPassword)
					this.confirm = true;
					
	    		this.promise()
		      .then(()=>{
		      	this.code_type = 'password';
						this.login_type = "password";
						this.btn_type = 2;
		    		this.showFRPassword = true;
		      })
		      .then(()=>{
		      	this.$refs.password_input.focus();
		      })
				}else{
					if(this.loginType == "phone"){
            this.obtainCodes();
					}else{
						this.getEmailCode();
          }
				}
			},500);
    },
    //再次获取验证码
    obCodeAgain(){
    	if(this.timingKey){
    		if(this.loginType == "phone"){
    			this.paramObtainCode.codetype = 'quick';
					this.obtainCodes();
				}else{
					this.paramSendEmailCode.codetype = 'quick';
					this.getEmailCode();
				}
	    	this.code_type = 1;
	    	this.$refs.real_code.focus();
	    	this.obCode();
    	}
    },
    //获得短信验证码
		obtainCodes(){
			this.paramObtainCode.mobile = this.telNumber;
			this.paramObtainCode.area = this.areaValue;
			if(this.main_type!='getback'){
				this.paramObtainCode.codetype = 'quick';
				this.paramObtainCode.param = 'FzmRandom4';
			}
			//console.log(this.paramObtainCode)
			ajax(this,this.extendApi.getCodeNew,this.paramObtainCode,(res)=>{
				if(res.code==200){
					this.confirm = true;
    			this.btn_type = 2;
    			this.obCode();

    			this.promise()
		      .then(()=>{
		      	this.$refs.real_code.focus();
		      })
		      if(this.isRegist){
		    		this.login_type = 'code';
		    	}
		    	if(res.data.isShow == 1){
		    		this.busId = res.data.data.businessId;
		    		setTimeout(()=>{
		    			this.creatScript(res.data.data.jsUrl);
		    		},1000)
		    	}
				}
			},"POST")
		},
		//获得邮箱验证码
		getEmailCode(){
			this.paramSendEmailCode.email = this.emailNumber;
			if(this.main_type!='getback'){
				this.paramSendEmailCode.codetype = 'quick';
				this.paramSendEmailCode.param = 'FzmRandom4';
			}
			ajax(this,this.extendApi.getEmailCodeApi,this.paramSendEmailCode,(res)=>{
				if(res.code == 200){
					this.confirm = true;
					this.btn_type = 2;
					this.obCode();

					this.promise()
		      .then(()=>{
		      	this.$refs.real_code.focus();
		      })
		      if(this.isRegist){
		    		this.login_type = 'code';
		    	}
		    	if(res.data.isShow == 1){
		    		this.busId = res.data.data.businessId;
		    		setTimeout(()=>{
		    			this.creatScript(res.data.data.jsUrl);
		    		},1000)
		    	}
				};
			},"POST")
		},
		//点击 语音验证 按钮
    toVoiceVerfy(){
    	this.getVoiceCode();
    },
		//获取语音验证码
		getVoiceCode(){
			this.paramSendVoice.area = this.areaValue;
			this.paramSendVoice.mobile = this.telNumber;
			ajax(this,this.extendApi.getVoiceCodeApi,this.paramSendVoice,(res)=>{
				if(res.code == 200){
					this.code_type = 4;
					this.voice_show = false;

					if(res.data.isShow == 1){
		    		this.busId = res.data.data.businessId;
		    		setTimeout(()=>{
		    			this.creatScript(res.data.data.jsUrl);
		    		},1000)
		    	}
				}
			},"POST")
		},
		//登录/注册 按钮
		registorloginBtn(){
			this.registLogin();
		},
		//登录/注册ajax请求
		registLogin(){
			//首先判断是否设置过密码
			if(this.isSetPassword){
				this.paramQuickLogin.logintype = 'password';
			}else{
				this.paramQuickLogin.logintype = 'code';
			}
			//如果已注册，则去登录
			if(this.isRegist){
				//如果设置过密码，则取其值
				if(this.isSetPassword){
					this.paramQuickLogin.password = this.passwordValue;
				}else{
					this.paramQuickLogin.password = '';
				}
				let username = '';
				//处理一下参数 邮箱or手机
				if(this.loginType == "phone"){
					this.paramQuickLogin.type = 'sms';
					this.paramQuickLogin.mobile = this.telNumber;
					this.paramQuickLogin.area = this.areaValue;
					this.paramQuickLogin.code = this.codeNumber;
					this.paramQuickLogin.email = '';
          username = this.paramQuickLogin.mobile;
          setcookie('username', username);
				}else{
					this.paramQuickLogin.type = 'email';
					this.paramQuickLogin.mobile = '';
					this.paramQuickLogin.area = '';
					this.paramQuickLogin.code = this.codeNumber;
					this.paramQuickLogin.email = this.emailNumber;
          username = this.paramQuickLogin.email;
          setcookie('username', username);
				}
				ajax(this,this.extendApi.quickLoginApi,this.paramQuickLogin,(res)=>{
					if(res.code == 200){
             setcookie('token', res.data.access_token);
						sessionStorage.setItem("access_token",res.data.access_token)
						sessionStorage.setItem("refresh_token",res.data.refresh_token)
						this.$notify({
		          title: '登录成功',
		          message: res.message,
		          type: 'success',
		          duration:2000,
		        });
		        this.dialogVisible = false;
		        bus.$emit('isLogined',true,username);
					}else{
						this.$notify({
		          title: '登录失败',
		          message: res.message,
		          type: 'error',
		          duration:2000,
		        });
					}
				},"POST")
			}else{	//如果未注册，则去注册
				//处理一下参数 邮箱or手机
				if(this.loginType == "phone"){
					this.paramQuickRegist.code = this.codeNumber;
					this.paramQuickRegist.mobile = this.telNumber;
					this.paramQuickRegist.area = this.areaValue;
					this.paramQuickRegist.email = '';
					this.paramQuickRegist.type = 'sms';
				}else{
					this.paramQuickRegist.code = this.codeNumber;
					this.paramQuickRegist.mobile = '';
					this.paramQuickRegist.area = '';
					this.paramQuickRegist.email = this.emailNumber;
					this.paramQuickRegist.type = 'email';
				}
				ajax(this,this.extendApi.quickRegister,this.paramQuickRegist,(res)=>{
					if(res.code == 200){
						this.$notify({
		          title: '注册成功',
		          message: res.message,
		          type: 'success',
		          duration:2000,
		        });
		        this.isRegist = true;
		        if(this.loginType == "phone"){
		        	this.gogoLogin(this.paramQuickRegist.area,this.paramQuickRegist.mobile,this.paramQuickRegist.code,this.paramQuickRegist.type,'','code');
		        }else{
		        	this.gogoLogin('',this.paramQuickRegist.email,this.paramQuickRegist.code,this.paramQuickRegist.type,'','code');
		        }
					}else{
						this.$notify({
		          title: '注册失败',
		          message: res.message,
		          type: 'error',
		          duration:2000,
		        });
					}
				},"POST")
			}
		},
		//设置登录密码 按钮
		setPassword(){
			this.main_type = "setting";
    	this.code_type = 1;
    	this.$refs.redLine.style.transform = "translateX(0)";
    	this.obCode();
    },
		//设置密码
		settingPassword(){
			if(this.loginType == "phone"){
				this.paramSetPassword.type = 'sms';
				this.paramSetPassword.area = this.areaValue;
				this.paramSetPassword.mobile = this.telNumber;
				this.paramSetPassword.password = this.passwordValue;
				this.paramSetPassword.code = this.codeNumber;
        this.paramSetPassword.email = '';
        this.paramSetPassword.broker_code = '9ba975d77dcb6ca6';
			}else{
				this.paramSetPassword.type = 'email';
				this.paramSetPassword.area = '';
				this.paramSetPassword.mobile = '';
				this.paramSetPassword.password = this.passwordValue;
				this.paramSetPassword.code = this.codeNumber;
        this.paramSetPassword.email = this.emailNumber;
        this.paramSetPassword.broker_code = '9ba975d77dcb6ca6';
			}
			ajax(this,this.extendApi.setPasswordForNotLogin,this.paramSetPassword,(res)=>{
				if(res.code == 200){
					this.dialogVisible = false;
					this.$notify({
		        title: '设置密码成功',
		        message: res.message,
		        type: 'success',
		        duration:2000,
		      });
		      if(this.loginType == "phone"){
	        	this.gogoLogin(this.paramSetPassword.area,this.paramSetPassword.mobile,'',this.paramSetPassword.type,this.paramSetPassword.password,'password');
	        }else if(this.loginType == "email"){
	        	this.gogoLogin('',this.paramSetPassword.email,'',this.paramSetPassword.type,this.paramSetPassword.password,'password');
	        }
				}else{
					this.$notify({
	          title: '设置密码失败',
	          message: res.message,
	          type: 'error',
	          duration:2000,
	        });
				}
			},"POST")
		},
		//跳到忘记密码 按钮
		wangjimima(){
    	this.main_type = "getback";
    	this.code_type = 2;
    },
    //找回密码发送验证码
    obGettingBackCode(){
			if(this.timingKey){
    		if(this.loginType == "phone"){
    			this.paramObtainCode.codetype = 'reset_password';
    			this.paramObtainCode.param = 'FzmDateTime|FzmRandom4';
					this.obtainCodes();
				}else{
					this.paramSendEmailCode.codetype = 'reset_password';
					this.paramSendEmailCode.param = 'FzmDateTime|FzmRandom4';
					this.getEmailCode();
				}
	    	this.code_type = 1;
	    	this.$refs.real_code.focus();
	    	this.obCode();
    	}
    },
    //找回密码 最终确认按钮
    gettingBackPassword(){
    	if(this.loginType == "phone"){
				this.paramBackPassword.type = 'sms';
				this.paramBackPassword.area = this.areaValue;
				this.paramBackPassword.mobile = this.telNumber;
				this.paramBackPassword.password = this.passwordValue;
				this.paramBackPassword.code = this.codeNumber;
				this.paramBackPassword.email = '';
			}else{
				this.paramBackPassword.type = 'email';
				this.paramBackPassword.area = '';
				this.paramBackPassword.mobile = '';
				this.paramBackPassword.password = this.passwordValue;
				this.paramBackPassword.code = this.codeNumber;
				this.paramBackPassword.email = this.emailNumber;
			}
    	ajax(this,this.extendApi.zhaohuiPasswordApi,this.paramBackPassword,(res)=>{
    		if(res.code == 200){
    			this.$notify({
		        title: '找回密码成功',
		        message: res.message,
		        type: 'success',
		        duration:2000,
		      });
		      if(this.loginType == "phone"){
	        	this.gogoLogin(this.paramBackPassword.area,this.paramBackPassword.mobile,'',this.paramBackPassword.type,this.paramBackPassword.password,'password');
	        }else if(this.loginType == "email"){
	        	this.gogoLogin('',this.paramBackPassword.email,'',this.paramBackPassword.type,this.paramBackPassword.password,'password');
	        }
    		}else{
    			this.$notify({
	          title: '找回密码失败',
	          message: res.message,
	          type: 'error',
	          duration:2000,
	        });
    		}
    	},"POST")
    },
    //直接登录
		gogoLogin(area,accounts,code,type,password,logintype){
			console.log('执行直接登录');
			let param = {};
			if(type == "sms"){
				param.type = 'sms';
				param.mobile = accounts;
			}else{
				param.type = 'email';
				param.email = accounts;
			}
			let username = accounts;
			param.area = area;
			param.code = code;
			param.password = password;
			param.redirect_uri = 'suibiantian';
      param.logintype = logintype;
      param.broker_code = '9ba975d77dcb6ca6'
			
			ajax(this,this.extendApi.quickLoginApi,param,(res)=>{
				if(res.code == 200){
					sessionStorage.setItem("access_token",res.data.access_token)
					sessionStorage.setItem("refresh_token",res.data.refresh_token)
					this.$notify({
	          title: '登录成功',
	          message: res.message,
	          type: 'success',
	          duration:2000,
	        });
	        this.dialogVisible = false;
	        bus.$emit('isLogined',true,username);
				}else{
					this.$notify({
	          title: '登录失败',
	          message: res.message,
	          type: 'error',
	          duration:2000,
	        });
				}
			},"POST")
		},
		/*——————————————————————————————————————————————————*/
		//获得验证码的倒计时
    obCode(){
    	if(this.timingKey){
    		this.timingKey = false;
	    	let timer = setInterval(()=>{
	    		this.codeSecond--;
	    		if(this.codeSecond<=0){
	    			clearInterval(timer);
	    			this.codeSecond = 60;
	    			this.timingKey = true;
	    			if(this.code_type!=="password"){
	    				this.code_type = 2;
	    				if(this.loginType == 'phone'){
	    					this.voice_show = true;
	    				}else{
		    				this.voice_show = false;
		    			}
	    			}
	    		}
	    	},1000)
    	}
    },
		handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    promise(){
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve()
				},1000/16)
			})
		},
    closeBox(){
    	this.$store.commit('openDialog',false);
    },
    //选择手机登录
    selectPhoneLogin(){
    	this.loginType = "phone";
    	this.$refs.redLine.style.transform = "translateX(0)";
    },
    //选择邮箱登录
    selectEmailLogin(){
    	this.loginType = "email";
    	this.$refs.redLine.style.transform = "translateX(160px)";
    },
    checkInput(){
    	this.telNumber = this.telNumber.replace(/[^\d]/g,'');
    },
    obtainBlur(){		//用户点击帐号栏——>>获得帐号栏的焦点
    	if(this.loginType=="phone"){
    		this.$refs.real_input.focus();
    	}
    	this.isPhoneInputFocused = true;
    },
    obtainCodeBlur(){		//用户点击验证码栏——>>获得验证码栏的焦点
    	if(this.code_type==1||this.code_type==2||this.code_type==3||this.code_type==4){
    		this.$refs.real_code.focus();
    	}
    	if(this.timingKey&&this.code_type!=4){
    		this.code_type = 3;
    	}
    },
    toMimaLogin(){	//切换——>密码登录
    	if(this.isSetPassword==false&&this.isSetPasswordConst==false){
    		this.showNoPassword = true;
    	}else{
    		this.code_type = "password";
    		this.login_type = "password";
    		this.showFRPassword = true;
    		this.isSetPassword = true;	//这影响到切换验证码登录还是密码登录的type传参
    	}
    	this.promise()
	      .then(()=>{
	      	this.$refs.password_input.focus();
	      })
    },
    toCodeLogin(){		//切换——>验证码登录
    	//判断是否正在计时，来切换到验证码登录不同的状态页面
    	if(this.timingKey){
    		this.code_type = 2;
    	}else{
    		this.code_type = 1;
    	}
    	this.promise()
	      .then(()=>{
	      	this.$refs.real_code.focus();
	      })
    	this.login_type = "code";
    	this.isSetPassword = false;	//这影响到切换验证码登录还是密码登录的type传参
    	this.showFRPassword = false;
    },
	}
}
</script>

<style>
.zhaobi_login{
  text-align: center;
	.el-dialog{
		min-height: 260px;
		position: relative;
    width: 350px;
    .el-dialog__header{
      padding-top: 0;
    }
		.semicircle{
			width: 140px;
			height: 140px;
			border-radius: 50%;
			background-color: #fff;
			position: absolute;
			z-index: 0;
			top:-60px;
			left: 105px;
			>i{
				font-size: 77px;
		    color: #ce181d !important;
		    position: relative;
	    	top: 0px;
			}
		}
		/*i{
			font-size: 77px;
	    color: #ce181d !important;
	    position: absolute;
	    top: -15px;
	    left: 139px;
		}*/
		.login_content{
			width: 290px;
			margin: 0 auto;
			.login_head{
				margin-top: 30px;
				position: relative;
				>span{
					display: inline-block;
					font-size: 18px;
					color: #808080;
					font-weight: bold;
					cursor: pointer;
				}
				>span:nth-of-type(1){
					margin-right: 120px;
				}
				.activeclass{
					color: #ce181d;
				}
				.redline{
					width: 30px;
					height: 4px;
					background-color: #ce181d;
					border-radius: 2px;
					position: absolute;
					top: 29px;
					left: 50px;
					transition: all 0.3s;
				}
				>p{
					text-align: center;
					font-size: 18px; 
					color: #ce181d;
					font-weight: bold;
				}
				.redline_set_password{
					left: 129px;
				}
			}
			.login_input{
				width: 100%;
				height: 34px;
				box-shadow: none;
				border-radius: 4px;
				margin-top: 30px;
				background-color: #e8e8e8;
				.fake_input{
					position: relative;
					padding-left: 50px;
					width: 100%;
					height: 32px;
					margin: 2px 0;
					span{
						display: inline-block;
						width: 10px;
						height: 22px;
						border-bottom: 1px solid rgba(128,128,128,0.5);
						position: absolute;
						bottom: 4px;
						font-size: 16px;
						font-weight: bold;
						color: #333;
					}
					span.s1{
						left: 60px;
					}
					span.s2{
						left: 78px;
					}
					span.s3{
						left: 96px;
					}
					span.s4{
						left: 126px;
					}
					span.s5{
						left: 144px;
					}
					span.s6{
						left: 162px;
					}
					span.s7{
						left: 180px;
					}
					span.s8{
						left: 210px;
					}
					span.s9{
						left: 228px;
					}
					span.s10{
						left: 246px;
					}
					span.s11{
						left: 264px;
					}
					.real_input{
						/*border: none;*/
						position: absolute;
						left: -10000px;
						width: 200px;
				    height: 18px;
				    margin: 7px 0 7px 24px;
				    caret-color:red;
					}
				}
				.waiguo_input{
					width: 340px;
					height: 34px;
					input{ 
						width: 200px;
						height: 20px;
						margin: 7px 0;
						caret-color:red;
						color: #333;
						font-size: 16px;
						text-align: center;
						float: left;
						border: none;
						background-color: #e8e8e8;
					}
				}
				.email_input{
					width: 200px;
					margin: 5px 0;
					text-align: center;
					caret-color:red;
					border: none;
					color: #333;
					font-size: 16px;
					background-color: #e8e8e8;
				}
			}
			.confirmColor{
				background-color: #fff !important;
				box-shadow: 0px 0px 9px 0px rgba(206, 24, 29, 0.35);
				.email_input,.waiguo_input>input{
					background-color: #fff !important;
				}
			}
			.verify_box{
				width: 100%;
				height: 34px;
				box-shadow: none;
				border-radius: 4px;
				margin-top: 20px;
				position: relative;
				background-color: #e8e8e8;
				.code_content{
					width: 200px;
					height: 34px;
					float: left;
					>span{
						width: 30px;
						height: 24px;
						border-bottom: 1px solid rgba(128,128,128,0.5);
						position: absolute;
						display: inline-block;
						top: 5px;
						font-size: 16px;
						color: #333;
						font-weight: bold;
					}
					span.c1{
						left: 25px;
					}
					span.c2{
						left: 65px;
					}
					span.c3{
						left: 105px;
					}
					span.c4{
						left: 145px;
					}
					span.cc1{
						left: 70px;
					}
					span.cc2{
						left: 110px;
					}
					span.cc3{
						left: 150px;
					}
					span.cc4{
						left: 190px;
					}
					p{
						line-height: 34px;
						color: #888;
					}
					.mleft20{
						padding-left: 20px;
					}
				}
				.real_code{
					position: absolute;
					left: -10000px;
				}
				.code_button{
					width: 90px;
					height: 34px;
					float: left;
					line-height: 34px;
					background-color: #fff;
					border: 1px solid #e8e8e8;
					cursor: pointer;
					user-select: none;
				}
				.ob_code{
					width: 90px;
					height: 34px;
					background-color: #fff;
					border-radius: 0px 4px 4px 0px;
					border: solid 1px #e8e8e8;
					float: left;
					line-height: 34px;
					color: #ce181d;
					font-size: 14px;
					cursor: pointer;
					user-select: none;
				}
				.pw_input{
					position: relative;
					input{
						width: 200px;
				    margin: 5px 0;
				    text-align: center;
				    caret-color: red;
				    border: none;
				    color: #333;
				    font-size: 16px;
				    position: absolute;
				    left: 45px;
				    background-color: #e8e8e8;
					}
					input:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px #e8e8e8 inset;
					}
				}
			}
			.code_content_bgcolor{
				background-color: #fff;
				box-shadow: 0px 0px 9px 0px rgba(206, 24, 29, 0.35);
				.code_content{
					background-color: #fff;
				}
				.pw_input{
					background-color: #fff;
					box-shadow: 0px 0px 9px 0px rgba(206, 24, 29, 0.35);
					input{
						background-color: #fff;
					}
					input:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px #fff inset;
					}
				}
				.code_button{
					border: none;
				}
			}
			.forget_box{
				margin: 20px 0;
				.rem_checkbox{
					float: left;
				}
				.forget_password{
					float: right;
					color: #ce181d;
					cursor: pointer;
				}
				&:after{
					content: '';
					visibility: hidden;
					display: block;
					clear: both;
				}
			}
			.tips{
				margin-top: 24px;
				margin-bottom: -10px;
				span{
					color: #ce181d;
					cursor: pointer;
				}
			}
			.login_button{
				width: 100%;
				height: 34px;
				background-color: #ce181d;
				border-radius: 4px;
				margin-top: 30px;
				cursor:pointer;
				span{
					display: inline-block;
					width: 100%;
					height: 100%;
					font-size: 14px;
					font-weight: bold;
					line-height: 34px;
					color: #ffffff;
				}
			}
			.login_tab{
				margin-top: 30px;
				/*padding-bottom: 30px;*/
				p{
					color: #ce181d;
					cursor: pointer;
				}
			}
			.no_password{
				height: 75px;
				background-color: #fff;
				border-radius: 0px 0px 6px 6px;
				border-top: 1px solid rgba(128,128,128,0.5);
				padding-top: 28px;
				p{
					color: #333;
					span{
						color: #ce181d;
						cursor: pointer;
					}
				}
			}
			/*.设置密码.*/
			.send_tip{
				margin-top: 38px;
				p{
					font-size: 16px;
					line-height: 24px;
					color: #333;
				}
			}
			#send_tip_setting{
				background-color: #fff !important;
			}
			.new_password{
				width: 100%;
				height: 34px;
				background-color: #e8e8e8;
				border-radius: 4px;
				margin-top: 20px;
				input{
					width: 200px;
			    margin: 6px 0;
			    text-align: center;
			    caret-color: red;
			    border: none;
			    color: #333;
			    font-size: 14px;
			    background-color: #e8e8e8;
				}
			}
			.new_password_bgcolor{
				background-color: #fff;
				box-shadow: 0px 0px 9px 0px rgba(206, 24, 29, 0.35);
				input{
					background-color: #fff;
				}
			}
		}
	}
	.tx_verify{
		/* position: fixed; */
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		/*background-color: rgba(0,0,0,0.5);*/
		#TCaptcha{

		}
	}
}
</style>

<style>
.zhaobi_login{
	.el-dialog{
		border-radius: 10px;
		.el-dialog__body{
			padding: 0 0 30px 0;
		}
		.el-tabs__nav{
			float: none;
		}
		.el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2){
			margin-right: 100px;
		}
		.el-tabs__active-bar{
			left: 72px;
		}
		.el-tabs__nav-wrap::after{
			width: 0 !important;
		}
		.el-select{
			width: 50px;
			margin: 2px 0;
			float: left;
			z-index: 9;
			.el-input{
				.el-input__inner{
					padding-right: 0 !important;
					color: #333;
					font-size: 16px;
					padding: 0px 5px;
					background-color: #e8e8e8;
					height: 30px;
					border: none;
				}
				.el-input__suffix{
					right: -5px;
					top: 1px;
					i{
						color: #333;
					}
				}
			}
		}
		.el_select_input{
			.el-input__inner{
				background-color: #fff !important;
			}
		}
		.rem_checkbox{
			.el-checkbox__inner{
				border-radius: 50%;
				border: 1px solid #ce181d;
			}
			.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		    background-color: #ce181d;
		    border-color: #ce181d;
			}
			.el-checkbox__inner:hover{
				border-color: #ce181d;
			}
			.el-checkbox__input.is-checked+.el-checkbox__label {
				color: #ce181d;
			}
		}
	}
}
</style>