<template>
 <div class="my-account">
    <ul class="rechange">
      <li class="pleft">我的账户</li>
      <li class="pright"></li>
    </ul>
    <div class="myas" v-loading="Loading" >
      <div class="firstinfo">
        <div class="personimg">
          <img src="../../assets/img/face.png" alt="" style="margin-left:12px;" />
        </div>
        <div class="personinfo">
          <ul>
            <li class="firstli">
              欢迎您,{{userinfo.username}}
            </li>
            <li class="twoli">
              <ul class="center">
                <li>资料完善度：{{authnum}}/3</li>
                <!-- <li class="bg"></li> -->
                <li class="backclass">
                  <el-progress :percentage=" parseInt(authnum*100/3)"></el-progress>
                </li>
                <li class="lastli">
                  <div class="isrenz">
                    <img v-if="isauthstate==0" src="../../assets/img/identity.png" alt="">
                    <img v-if="isauthstate==1" src="../../assets/img/identity-finish.png" alt="">
                    <img v-if="ismobilestate==0" src="../../assets/img/phoneico.png" alt="">
                    <img v-if="ismobilestate==1" src="../../assets/img/phoneico-finish.png" alt="">
                    <img v-if="isemailstate==0" src="../../assets/img/mailico.png" alt="">
                    <img v-if="isemailstate==1" src="../../assets/img/mailico-finish.png" alt="">
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="infoimport">
        <table>
          <tbody>
            <tr>
              <td class="td1">UID</td>
              <td class="td2">{{userinfo.id}}</td>
              <td class="td1">昵称</td>
              <td class="td4">
                <span>{{userinfo.username}}</span>
              </td>
            </tr>
            <tr>
              <td class="td1">电子邮箱</td>
              <td class="td2">{{userinfo.email}}</td>
              <td class="td1">注册时间</td>
              <td class="td4">{{userinfo.adddate}}</td>
            </tr>
            <tr>
              <td class="td1">手机号码</td>
              <td class="td2">{{phone}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tabcontent">
        <ul class="tabs">
          <li :class="{liactive:(istabs==1 || istabs==2 || istabs==5 || istabs==12 || istabs==13 || istabs==14 || istabs==15|| istabs==17|| istabs==16)}" @click="showtabs(2)">
            <img class="mima" src="../../assets/img/domestic-checking.png" alt="">
            <p>实名认证</p>
          </li>
          <li :class="{liactive:(istabs==3 || istabs==6 || istabs==8 || istabs==10)}" @click="showtabs(3)">
            <img class="payment" src="../../assets/img/phone-checking.png" alt="">
            <p>手机验证</p>
          </li>
          <li :class="{liactive:istabs==4 || istabs==7 || istabs==9}" @click="showtabs(4)">
            <img class="google" src="../../assets/img/mailbox-checking.png" alt="">
            <p>邮箱验证</p>
          </li>
          <li :class="{liactive:istabs==99}" @click="showtabs(99)">
            <img class="google" src="../../assets/img/yinhang-checkbox.png" alt="">
            <p>银行卡</p>
          </li>
          <li class="last"></li>
        </ul>
        <div class="tabsinfo" v-loading="loading"  element-loading-text="正在处理中">
          <div v-if="istabs===99" class="yhtab">
            <div class="yhtabone">
              <span>姓名</span>
              <input type="text" v-model="adadbankparam.name" :disabled="ishavelockname" />
            </div>
            <div class="yhtabtwo">
              <span>银行名称</span>
              <el-select v-model="bankHa"  placeholder="请选择银行" class="normalin margtop yhtabtwos">
                <el-option
                  v-for="item in bankListHa"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="yhtabthree">
              <span>银行账号</span>
              <input type="text" v-model="adadbankparam.bankcard" />
              <span>默认</span>
              <el-checkbox v-model="checked"></el-checkbox><br />
            </div>
            <div class="yhtabfour">
              <span>所属地区</span>
              <el-select v-model="bankprovince"  placeholder="请选择省份" class="normalin margtop yhtabsele1"  @change="getprovince">
                <el-option
                  v-for="item in provincename"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="bankcity"  placeholder="请选择城市" class="normalin margtop yhtabsele2" @change="getcity">
                <el-option
                  v-for="item in cityname"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="yhtabfive">
              <span class="spOne">手机号码</span>
              <input type="text" v-model="getbankmobile.mobile" :disabled="ishavemobile" />
            </div>
            <div class="yhtabsix">
              <span>验证手机</span>
              <input type="text" v-model="adadbankparam.code" />
              <button :disabled="isenabled" @click="getbanksms">{{codenum}}</button>
              <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
            </div>
            <div class="yhtabseven">
              <button @click="addAnewbank">新建银行提款账户</button>
            </div>
            <div class="yhtabeight">
              <table>
                <tr class="tr1">
                  <td class="td1">银行名称</td>
                  <td class="td2">银行账号</td>
                  <td>操作</td>
                  <td>默认</td>
                </tr>
                <tr v-for="item in bankgetList">
                  <td class="td1">{{item.bankname}}</td>
                  <td class="td2">{{item.bankcard}}</td>
                  <td class="td3"><span @click="deletebank(item.id)">删除</span></td>
                  <td>
                    <el-checkbox class="checkboo" v-model="item.isdefault" @change="getchecked(item.id)"></el-checkbox><br/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!--国内国际选择-->
          <div class="updatePW" v-if="istabs===1">
            <ul class="renzhen">
              <!-- <li class="china" @click="showtabs(2)">
                <img src="../../assets/img/box-left.png" alt="">
                <p>中国大陆</p>
                <p>P.R.C</p>
              </li> -->
              <li class="international" @click="showtabs(15)"> <!--   @click="showtabs(13)" -->
                <img src="../../assets/img/box-right.png" alt="" >
                <p>非中国大陆</p>
                <p>non P.R.C</p>
              </li>
            </ul>
          </div>
          <!--国内个人-->
          <div class="updatePW"  v-if="istabs===2">
            <div class="form">
              <el-form ref="form" :model="auth" label-width="125px">
                <el-form ref></el-form>
                <el-row :gutter="20" style="margin-bottom:22px;">
                  <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="header"
                      :file-list="fileList"
                      :before-upload="beforeAvatarUpload"
                      :on-success="handleAvatarSuccess"
                      :on-change="handleChange"
                      :on-preview="handlePreview"
                      :auto-upload="false">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div class="el-upload__tip" slot="tip">请提交证件正面照片</div>
                    </el-upload>
                  </el-col>
                  <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="header"
                      :file-list="fileList"
                      :before-upload="beforeAvatarUpload"
                      :on-change="handleChange2"
                      :on-preview="handlePreview"
                      :auto-upload="false">
                      <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div class="el-upload__tip" slot="tip">请提交手持证件正面照片</div>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-form-item label="姓名">
                  <el-input v-model="identityparam.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                  <el-input v-model="identityparam.cardid"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword uppassword" value="提交验证" @click="goauth()">
            <input type="button" class="editpassword uppassword2" @click="showtabs(1)" value="返回上级">
          </div>
          <!--手机验证(未验证状态)-->
          <div class="updatePW" v-if="istabs===3">
            <div class="form">
              <el-form ref="form" :model="form" label-width="125px">
              <el-form-item label="所在地">
                  <el-select v-model="mobileauth.area" placeholder="中国">
                    <el-option
                      v-for="item in options"
                      :label="item.ch_name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="mobileauth.mobile" :disabled="ishavemobile"></el-input>
                </el-form-item>
                <el-form-item label="手机验证码">
                  <el-input class="yzma" v-model="mobileauth.code" placeholder="请输入验证码"></el-input>
                  <el-button :disabled="isenabled" @click="sendphone()">{{codenum}}</el-button>
                  <p v-show="notfirstget" class="tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword uppassword" value="提交" @click="gophone()">
            <p class="tishi">温馨提示：我们将严格对用户的所有资料进行保密。</p>
          </div>
          <!--邮箱验证(未验证状态)-->
          <div class="updatePW" v-if="istabs===4">
            <div class="form">
              <el-form ref="form" :model="form" label-width="125px">
                <el-form-item label="电子邮箱">
                  <el-input v-model="emailauth.email" :disabled="ishaveemail"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input class="yzma" v-model="emailauth.code" placeholder="请输入验证码"></el-input>
                  <el-button @click="goemailcode()" :disabled="isenabled">{{codenum}}</el-button>
                  <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword uppassword" @click="goemailauth()" value="提交">
            <p class="tishi">温馨提示：我们将严格对用户的所有资料进行保密。</p>
          </div>
          <!--已实名状态-->
          <div class="updatePW" v-if="istabs===5">
            <p class="title"><span>实名已验证</span><span class="el-icon-check"></span></p>
            <p class="info"><span>您的真实姓名是:</span><span class="redn"> {{userauthinfo.name}}</span></p>
            <p class="info">
              <span>您的证件号码是:</span><span class="redn">{{userauthinfo.personid}}</span>
              <span class="updaten" v-if="isAuthFull" @click="supplyAuthInfo()">补充认证信息</span>
            </p>
          </div>
          <!--手机已验证状态-->
          <div class="updatePW" v-if="istabs===6">
            <p class="title"><span>手机已验证</span><span class="el-icon-check"></span></p>
            <p class="info"><span>您的手机号码是:</span><span class="redn"> {{userauthinfo.hmobile}}</span></p>
          </div>
          <!--邮箱已验证状态-->
          <div class="updatePW" v-if="istabs===7">
            <p class="title"><span>邮箱已验证</span><span class="el-icon-check"></span></p>
            <p class="info"><span>您的邮箱是:</span><span class="redn"> {{userauthinfo.email}}</span></p>
          </div>
          <!--修改邮箱窗口-->
          <div class="updatePW" v-if="istabs===11">
            <div class="form">
              <el-form ref="form" :model="form" label-width="125px">
                <el-form-item label="新邮箱">
                  <el-input v-model="updateemail.newEmail"></el-input>
                </el-form-item>
                <el-form-item label="邮箱验证码">
                  <el-input class="yzma" v-model="updateemail.newCode" placeholder="请输入验证码"></el-input>
                  <el-button @click="goemailcode('edited')" :disabled="isenabled">{{getcode[6]}}</el-button>
                  <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword uppassword" @click="updateemmail()" value="提交">
            <input type="button" class="editpassword uppassword2" value="返回" @click="showtabs(4)">
          </div>
          <!--国内用户（个人用户选项)-->
          <div class="updatePW" v-if="istabs===12">
            <ul class="renzhen">
              <li class="china" @click="showtabs(2)">
                <img src="../../assets/img/box-left.png" alt="" />
                <p>个人用户</p>
                <p>personal</p>
              </li>
            </ul>
          </div>
          <!--国外个人选择框-->
          <div class="updatePW" v-if="istabs===13">
            <ul class="renzhen">
              <li class="international" @click="showtabs(15)">
                <img src="../../assets/img/box-right.png" alt="">
                <p>国外个人用户</p>
                <p>Individual users</p>
              </li>
            </ul>
          </div>
          <!--企业实名认证-->
          <div class="updatePW" v-if="istabs===17">
            <p class="title"><span>实名已验证</span><span class="el-icon-check"></span></p>
            <p class="info"><span>您的企业名称是:</span><span class="redn"> {{bussiessauthinfo.enterprise_name}}</span></p>
            <p class="info">
              <span>您的企业编号是:</span><span class="redn">{{bussiessauthinfo.enterprise_id}}</span>
            </p>
          </div>
          <!--国外实名认证框-->
          <div class="updatePW" v-if="istabs===15">
            <div class="form">
              <el-form ref="form" :model="auth2" label-width="125px">
                <el-row :gutter="20" style="margin-bottom:22px;">
                  <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="header"
                      :file-list="fileList"
                      :before-upload="beforeAvatarUpload"
                      :on-success="handleAvatarSuccess"
                      :on-change="handleChange3"
                      :on-preview="handlePreview"
                      :auto-upload="false">
                      <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div class="el-upload__tip" slot="tip">请提交证件正面照片</div>
                    </el-upload>
                  </el-col>
                  <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :headers="header"
                      :file-list="fileList"
                      :before-upload="beforeAvatarUpload"
                      :on-success="handleAvatarSuccess"
                      :on-change="handleChange4"
                      :on-preview="handlePreview"
                      :auto-upload="false">
                      <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div class="el-upload__tip" slot="tip">请提交手持证件正面照片</div>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-form-item label="国籍">
                  <el-select v-model="identityparam.country" placeholder="请选择">
                    <el-option  v-for="item in options" v-if="item.sname!='CN'" :label="item.ch_name" :value="item.ch_name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="identityparam.name" ></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="identityparam.cardtype" placeholder="请选择">
                    <el-option v-for="item in cardtypeslist" :label="item.name" :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input v-model="identityparam.cardid"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword uppassword" value="提交验证" @click="goauth()">
            <input type="button" class="editpassword uppassword2" @click="showtabs(1)" value="返回上级">
          </div>
        </div>
      </div>
    </div>
    <!-- 验证码 -->
    <div class="msgBox" v-if="fuckfuck">
      <div id="TCaptcha"style="width:300px;height:40px;"></div>
    </div>
 </div>
</template>
<script>
import { ajax,setcookie,getcookie,delatecookie,getbanklist,getprovice,getuserinfo,lasscode,getCountryList,getPhoneValidate,getEmailValidate,getStates,temptime,uploadImg,getCardtypes,lasscode1,sendVoicecode} from '../../assets/js/common'
  export default{
    data(){
      return{
        disa:false,
        checked:false,
        updateQQ:false,
        Loading:false,
        updateusername:false,
        ishavemobile:false,
        ishaveemail:false,
        userinfo:{
          username:'',
          uid:'',
          email:'',
          mobile:'',
          regtime:'',
          phone:'',
          myqq:'',
          tjqq:'',
          level:'',
        },
        phone:getcookie('phone')||'',
        userauthinfo:{
          hmobile:'',
          name:'',
          personid:'',
          email:'',
        },
        bussiessauthinfo:{
          enterprise_name:getcookie('enterprise_name'),
          enterprise_id:getcookie('enterprise_id'),
        },
        authnum:0,
        getcode:['获取验证码','获取验证码','获取验证码','获取验证码','获取验证码','获取验证码','获取验证码'],
        codenum:'获取验证码',
        scode:0,
        //身份验证提交的信息:国内个人
        auth:{
          id_no:'',
          id_name:'',
          mobile:'',
          country:'',
          bankcard:'',
          bid:'',
          pid:'',
          cid:'',
          code:'',
        },
        //身份验证提交的信息:国内企业
        corp:{
          id_no:'',//经办人身份证号码
          id_name:'',//经办人身份证姓名
          mobile:'',//经办人手机号码
          bankcard:'',//企业开户银行卡号
          bid:'',//企业开户银行名称
          pid:'',//开户银行所属省份
          cid:'',//开户银行所属城市
          code:'',//经办人手机号码验证码
          inc_no:'',//企业统一社会信用代码
          inc_name:'',   //企业名称 
        },
        //身份验证提交的信息:国外个人
        auth2:{
          id_no:'',
          id_name:'',
        },
        //身份验证提交的信息:国外企业
        corp2:{
          id_no:'',
          id_name:'',
          bid:'',
          phone:'',
          address:'',
        },
        //实名认证发送短信
        realinfo: {
          vparam: '', //uid|xjxrandom
          codetype: '',
          mobile:'', 
        },
        //手机认证
        binding: {
          param: 'FzmRandom', // uid|手机尾号后4位|xjxrandom
          codetype: 'validate',
          platkey:'cga',
          mobile:'',
          area:'',
          extend_param:'',
          ticket:'',
          businessId:'',
        },
        //验证邮箱
        emailbinding: {
          vparam: '', // eamil|xjxrandom
          codetype: 'binding',
          email:'',
        },
        mobileauth:{
          code:'',
          mobile:'',
          area:'86',
          gid:''
        },
        emailauth:{
          code:'',
          email:'',
          gid:''
        },
        //修改手机获取验证码
        editmobile:{
          codetype:'editmobile',
          vparam:'',
          mobile:'',
          country:'CN',
        },
        //验证码预验证
        smscheckcode:{
          t:'sms',
          codetype:'',
          country:'CN',
          rcheck:'0',
          code:'',
          mobile:'',
          email:'',
        },
        //修改手机参数
        editparpam:{
          newMobile:'',
          newCountry:'CN',
          newCode:'',
          code:'',
        },
        //修改邮箱获取验证码
        editemail:{
          codetype:'editemail',
          email:'',
          vparam:'',
        },
        //修改邮箱
        updateemail:{
          code:'',
          newEmail:'',
          newCode:'',
        },
        iscanclick:false,
        isenabled:false,
        isAuthFull:false,//判断老用户是否实名认证银行卡
        isauthstate:0,//判断是否实名认证
        isemailstate:'',//判断是否邮箱认证
        ismobilestate:'',//判断是否手机认证
        isEnterpriseIdentity:'',//判断国内企业是否认证
        form:{
          name:'',
        },
        banklist:[],//银行列表
        provice:[],//省份列表
        city:[],//城市列表

        options:[],
        value:'',
        istabs:7,
        isAuth:false,
        isabled:'false',
        imageUrl:'',
        imageUrl2:'',
        imageUrl3:'',
        imageUrl4:'',
        uploadUrl:this.extendApi.uploadUrl,//上传图片地址
        fileList: [],
        OCRparam:{
          mid:''
        },
        identityparam:{
          country:'',//国籍 编码格式传输 比如 中国 为 CN
          cardtype:'',//证件类型 具体类型参数类型接口 数字形式传输
          cardid:'',//证件号码
          name:'',//姓名
          mid:'',//正面照片mid
          matchmid:''//手持照片mid
        },
        cardtypeslist:[],
        isenabled:false,
        coinInfo:'',
        bankHa:'',
        bankprovince:'', 
        bankcity:'',
        bankListHa:[],
        provincename:[], 
        cityname:[],
        city:{
          pid:'',
        },
        cityone:{
          pid:'',
        },
        //短信发送
        getbankmobile:{
          codetype:'add_bankcard',
          area:86,
          mobile:'',
          param:'FzmDateTime|FzmRandom',
          platkey:'cga',
          ticket:'',
          businessId:'',

        },
        //新增银行参数
        adadbankparam:{
          op:'',
          type:'sms',
          pid:'',
          cid:'',
          bank:'',
          bankcard:'',
          name:'',
          code:'',
          area:86,
          mobile:'',
          isdefaultT:'',
          bid:'',
        },
        bankgetList:[],
        deletebanknam:{
          op:'del',
          bid:'',
        },
        checkbankname:{
          op:'up',
          bid:'',
        },
        loading: false,
        notfirstget:false,
        isenabled:false,
        clickNum:0,
        voiceparam:{
          area:'',
          mobile:'',
          codetype:'',
        },
        alertStatus:'',
        dataSrc:'',
        businessId:'',
        ticketNum:'',
        fuckfuck:false,
        ishavelockname:true,
      }
    },
    computed:{
      header(){
        return{
          'FZM-Ca-AppKey':'zhaobi'
        }
      }
    },
    created: function(){
      getuserinfo(this,'all');
      //认证状态-----获取判断
      if(getcookie('phone')!=null){
        this.phone=getcookie('phone');
      }
      // alert(this.$route.query.index=='phone')
      if(this.$route.query.index=='phone'){
        //跳转至收件验证
        this.istabs=3;
        return;
      }
      if(this.$route.query.index=='email'){
        //跳转至邮箱验证
        this.istabs=4;
        return;
      }
      if(this.$route.query.index=='identify'){
        //跳转至实名认证
        this.istabs=2;
        return ;
      }
      this.getStatus();
    },
    mounted:function(){
      this.$nextTick(()=>{
        document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
        this.getCountry();
        this.getcardtypes();
        this.showtabs(2)
      });
    },
    methods:{
      //添加script标签
      addscript(){
        let dom = document.createElement('script');
        console.log(this.dataSrc)
        dom.src = this.dataSrc;
        document.getElementsByTagName('body')[0].appendChild(dom);
        this.fuckfuck = true;
        setTimeout(()=>{
          let capOption={callback :this.cbfn,
            callback:this.cbfn,
            type:'popup',
            pos:'fixed'};
          capInit(document.getElementById("TCaptcha"), capOption);
        },2000)
      },
      //成功回调
      cbfn(retJson){
        if(retJson.ret==0){
          // 用户验证成功,需要校验签名
          this.$notify({
            title: '成功',
            message: '验证通过',
            type: 'success',
            duration:'2000'
          })
          this.ticketNum = retJson.ticket;
          this.fuckfuck = false;
          
          sessionStorage.setItem('alertStatus','')
          sessionStorage.setItem('dataSrc','')
          sessionStorage.setItem('businessId','')
          // 销毁上一个验证
          capDestroy();
          this.sendphone();
        }else{       
          //用户关闭验证码页面，没有验证
          capDestroy();
          this.fuckfuck = false;
          sessionStorage.setItem('alertStatus','')
          sessionStorage.setItem('dataSrc','')
          sessionStorage.setItem('businessId','')

        }
      },
      //增加语音验证码
      getVoicecode(){
        this.isenabled=false;
        clearInterval(this.scode);
        this.codenum = '获取验证码';
        sendVoicecode(this,this.voiceparam,(response)=>{
          lasscode1(this,this.clickNum);
        })
      },
      //操作默认
      getchecked(e){
        this.checkbankname.bid = e;
          ajax(this,this.extendApi.addbanknew,this.checkbankname,(ram)=>{
            if(ram.code == 200){
            this.$notify({
              title: '成功',
              message: "操作成功",
              type: 'success',
              duration:'2000',
            });
            this.getbannkHsai();
          }else{
            this.$notify({
              title: '提示',
              message: ram.message,
              type: 'warning',
              duration:'2000',
            });
          }
          },'POST')
      },
      getStatMo(){
        ajax(this,this.extendApi.getstates,'',(res)=>{
          if(res.code == 200){
            this.getbankmobile.mobile=res.data.states.mobile.data.show;
            if(res.data.states.base.lockname==''||res.data.states.base.lockname==null){
              this.ishavelockname=false;
            }else{
              this.adadbankparam.name=res.data.states.base.lockname;
              this.ishavelockname=true;
            }
            
            if(res.data.states.mobile.statu == 1){
              this.disa = true;
            }
          }else{

          }
        },'GET');
      },
      //获取银行卡相关
      getbankabout(){
        this.adadbankparam.name ="";
        this.bankHa="";
        this.adadbankparam.bankcard='';
        this.bankprovince="";
        this.bankcity="";
        this.getbankmobile.mobile="";
        this.adadbankparam.code="";
        this.getbannkHsai();
        this.getStatMo();
        //银行列表
        ajax(this,this.extendApi.bankListname,'',(res)=>{
          if(res.code == 200){
            this.bankListHa = res.data;
          }else{

          }
        },'GET')
        //获取省份
        ajax(this,this.extendApi.getcityId,'',(ere)=>{
          if(ere.code == 200){
            this.provincename = ere.data;
          }else{

          }
        },'GET')
      },
      //获取可用银行列表
      getbannkHsai(){
        ajax(this,this.extendApi.getbankList,'',(param)=>{
          if(param.code == 200){
            this.bankgetList = param.data.list;
          }
        },'GET')
      },
      //删除可用银行
      deletebank(e){
        this.deletebanknam.bid = e;
        ajax(this,this.extendApi.addbanknew,this.deletebanknam,(par)=>{
          if(par.code == 200){
            this.$notify({
              title: '成功',
              message: "删除成功",
              type: 'success',
              duration:'2000',
            });
            this.getbannkHsai();
          }else{
            this.$notify({
              title: '提示',
              message: par.message,
              type: 'warning',
              duration:'2000',
            });
          }
        },'POST')
      },
      //获取城市
      getprovince(e){
        this.city.pid = e;
        ajax(this,this.extendApi.getcityId,this.city,(res)=>{
          if(res.code == 200){
             this.cityname = res.data;
          }else{
           
          }
        },'GET')
      },
      getcity(f){
        this.cityone.pid = f;
      },
      //验证手机发送验证码
      getbanksms(){
        let _this=this;
        _this.clickNum++;
        if(this.getbankmobile.mobile!=''){
          this.voiceparam.area=this.getbankmobile.area;
          this.voiceparam.mobile=this.getbankmobile.mobile;
          this.voiceparam.codetype=this.getbankmobile.codetype;
          if(sessionStorage.getItem('alertStatus') == ''){
            this.getbankmobile.businessId = this.businessId;
            this.getbankmobile.ticket = this.ticketNum;
          }
          ajax(this,this.extendApi.getCodeNew,this.getbankmobile,(res)=>{
            _this.isenabled=true;
            _this.scode=setInterval(function(){
              lasscode1(_this,_this.clickNum);
            }, 1000);
            if(res.code == 200){
              this.$notify({
                title: '成功',
                message: "短信发送成功，请注意查收",
                type: 'success',
                duration:'2000',
              });
              if(res.data.isShow == 1){
                // that.alertStatus = true;
                sessionStorage.setItem('alertStatus','true')
                sessionStorage.setItem('dataSrc',res.data.data.jsUrl)
                sessionStorage.setItem('businessId',res.data.data.businessId)
              }
            }else{
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'warning',
                duration:'2000',
              });
            }
          },'POST')
          this.ticketNum = '';
          if(sessionStorage.getItem('alertStatus') == 'true'){
            this.alertStatus = true;
            this.dataSrc = sessionStorage.getItem('dataSrc');
            this.businessId = sessionStorage.getItem('businessId');
            this.addscript();
          }
        }else{
          this.$notify({
            title: '提示',
            message: '请填写手机号码',
            type: 'warning',
            duration:'2000',
          });
        }
        
      },
      //新增银行
      addAnewbank(){
        this.adadbankparam.op = 'add';
        this.adadbankparam.pid = this.city.pid;
        this.adadbankparam.cid = this.cityone.pid;
        this.adadbankparam.bank = this.bankHa;
        this.adadbankparam.mobile = this.getbankmobile.mobile;
        ajax(this,this.extendApi.addbanknew,this.adadbankparam,(res)=>{
          if(res.code == 200){
            if(this.checked == true){
              this.isdefaultT = res.data.bid;
              this.adadbankparam.op = 'up';
              this.adadbankparam.bid = this.isdefault;
              ajax(this,this.extendApi.addbanknew,this.adadbankparam,(par)=>{
                if(par.code == 200){
                  this.$notify({
                    title: '成功',
                    message: "该银行卡已设为默认",
                    type: 'success',
                    duration:'2000',
                  });
                }else{

                }
              },'POST')
            }else{

            }
            this.getbankabout();
            this.$notify({
              title: '成功',
              message: "新增银行卡成功",
              type: 'success',
              duration:'2000',
            });
            // this.dialogtibiThree = false;
          }else{
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'warning',
              duration:'2000',
            });
          }
        },'POST')
      },
      //获取用户认证状态
      async  getStatus(){
        let _this=this;
        _this.authnum=0;
        if(!getcookie('token')){
          this.istabs=2;
          return;
        }
        await getStates(_this,function(res){
          if(res.states.mobile.data.show!=''||res.states.mobile.data.show!=null){
            _this.ishavemobile=true;
            _this.mobileauth.mobile=res.states.mobile.data.show;

          }
          if(res.states.mobile.data.show==''||res.states.mobile.data.show==null){
            _this.ishavemobile=false;
            _this.mobileauth.mobile='';
          }
          if(res.states.email.data.show!=''||res.states.email.data.show!=null){
            _this.ishaveemail=true;
            _this.emailauth.email=res.states.email.data.show;

          }
          if(res.states.email.data.show==''||res.states.email.data.show==null){
            _this.ishaveemail=false;
            _this.emailauth.email=res.states.email.data.show;
          }
          if(res.states.email.statu=='1'){//邮箱已验证
             _this.isemailstate=1
              _this.userauthinfo.email=res.states.email.data.email;
              _this.userinfo.email=res.states.email.data.email;
              _this.authnum++;
          }
          if(res.states.email.statu=='0'){//邮箱未验证
             _this.isemailstate=0
          }
          if(res.states.mobile.statu=='1'){//手机已验证
            _this.ismobilestate=1;
            setcookie('phone',res.states.mobile.data.mobile);
            _this.phone=res.states.mobile.data.mobile;
            _this.userauthinfo.hmobile=res.states.mobile.data.mobile;
            _this.authnum++;
          }
          if(res.states.mobile.statu=='0'){//手机未验证
              _this.ismobilestate=0;
          }
          if(res.states.identity.statu=='1'){//实名已验证
            _this.istabs=5;
            _this.isauthstate=1;
            _this.userauthinfo.name=res.states.identity.data.name;//姓名
            _this.userauthinfo.personid=res.states.identity.data.cardid;//证件ID
            _this.authnum++;
          }
          if(res.states.identity.statu=='0'){//实名未验证
            _this.isauthstate=0;
            _this.istabs=2;
          }
        })
      },
      //获取所在地
      getCountry(){
        let _this=this;
        getCountryList(this,function(res){
           _this.options=res;
        }) 
      },
      //获取证件类型
      getcardtypes(){
        let _this=this;
        getCardtypes(this,function(res){
          _this.cardtypeslist=res;
        }) 
      },
      //企业认证
      goEnterpriseIdentity(){
        var _this=this;
        ajax(_this,_this.extendApi.EnterpriseIdentity,_this.corp,function(response){
          if(response.code==200){
            setcookie('businessstate',1);
            _this.isEnterpriseIdentity=1;
            _this.istabs=17;
            getuserinfo(_this,'all');
            _this.$notify({
              title: '提示',
              message: '实名认证成功',
              type: 'success'
            });
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      //切换验证信息的tabs页
      showtabs(tabsnum){
        this.isenabled=false;
        clearInterval(this.scode);
        this.codenum = '获取验证码';
        if(tabsnum==1){
           //清楚数据
          this.identityparam.name='';
          this.identityparam.cardtype='';
          this.identityparam.cardid='';
          this.identityparam.country='';
          if(this.isauthstate==1){
            //实名认证
            this.istabs=5;
            return;
          }else{
            this.istabs=tabsnum;
          }
        }else if(tabsnum==2){//个人用户实名未认证
          //个人用户筛选
          //第一步图片上传token获取
          this.getUploadToken();
          this.istabs=tabsnum;

        }
        else if(tabsnum==3){//手机验证状态
          if(this.ismobilestate==1){
            this.istabs=6;
          }else{
            this.istabs=tabsnum;
          }
        }else if(tabsnum==4){
          if(this.isemailstate==1){
            this.istabs=7;
          }else{
            this.istabs=tabsnum;
          }
        }else if(tabsnum==14){//国内企业用户
          // this.$notify({
          //   title: '提示',
          //   message: '暂未开放，请耐心等待',
          //   type: 'error'
          // });
          if(this.isEnterpriseIdentity==1){//企业认证状态
            this.istabs=17;
          }else{
            this.istabs=tabsnum;
          }
        }else if(tabsnum==99){
          this.istabs=99;
          this.getbankabout();
        }else{
          this.istabs=tabsnum;
        }
      },
      //获取验证码
      authsendsms(mobile){
        var _this=this;
        this.realinfo.vparam=getcookie('id')+'|xjxrandom';
        this.realinfo.mobile=mobile;
        this.realinfo.codetype='realinfo';
        ajax(_this,_this.extendApi.sendSms,_this.realinfo,function(response){
          if(response.code==200){
              // _this.iscanclick=true;
              _this.$notify({
                title: '提示',
                message: '短信发送成功',
                type: 'success'
              });
            _this.scode=setInterval(function(){
              lasscode(_this,0)
            }, 1000);
          }else{
             _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      //获取城市列表
      getcitylist(_this,pid){
        var _this=this;
        ajax(_this,_this.extendApi.cityList,{'pid':pid},function(response){
          var data=response.data;
          _this.city=[];
          _this.auth.cid='';
          for (var i in data) {
            _this.city.push({'value':i,'label':data[i]});
          }
        },'GET')
      },
      //获取验证码
      authsendsms(mobile){
        var _this=this;
        this.realinfo.vparam=getcookie('id')+'|xjxrandom';
        this.realinfo.mobile=mobile;
        this.realinfo.codetype='realinfo';
        ajax(_this,_this.extendApi.sendSms,_this.realinfo,function(response){
          if(response.code==200){
              // _this.iscanclick=true;
              _this.$notify({
                title: '提示',
                message: '短信发送成功',
                type: 'success'
              });
            _this.scode=setInterval(function(){
              lasscode(_this,0)
            }, 1000);
          }else{
             _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      //手机验证获取验证码
      sendphone(isupdate){
        var _this=this;
        _this.clickNum++;
        _this.binding.area=_this.mobileauth.area;
        _this.binding.mobile=_this.mobileauth.mobile;
        if(sessionStorage.getItem('alertStatus') == ''){
          this.binding.businessId = this.businessId;
          this.binding.ticket = this.ticketNum;
        }
        this.voiceparam.area=this.mobileauth.area;
        this.voiceparam.mobile=this.mobileauth.mobile;
        this.voiceparam.codetype=this.binding.codetype;
        getPhoneValidate(_this,_this.binding,function(res){
          _this.isenabled=true;
          _this.mobileauth.gid=res.gid;
          _this.scode=setInterval(function(){
            lasscode1(_this,_this.clickNum);
          }, 1000);
        });
        this.ticketNum = '';
        if(sessionStorage.getItem('alertStatus') == 'true'){
          this.alertStatus = true;
          this.dataSrc = sessionStorage.getItem('dataSrc');
          this.businessId = sessionStorage.getItem('businessId');
          this.addscript();
        }
       
      },
      //手机验证
      gophone(){
        var _this=this;
        _this.loading=true;
        ajax(_this,_this.extendApi.autoMobile,_this.mobileauth,function(response){
          _this.loading=false;
          if(response.code==200){
            _this.getStatus();
             _this.phone=_this.mobileauth.mobile;
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      //实名认证
      goauth(){
        var _this=this;
         _this.loading=true;
        ajax(_this,_this.extendApi.identitySubmit,_this.identityparam,function(response){
          _this.loading=false;
          if(response.code==200){
            _this.getStatus();
            _this.$notify({
              title: '提示',
              message: '实名认证成功',
              type: 'success'
            });
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      //获取邮箱验证码
      goemailcode(isupdate){
        var _this=this;
        
        let param={
          email:_this.emailauth.email,
          codetype:'validate',
          param:'FzmDateTime|FzmRandom',
          extend_param:'',
          platkey:'cga',
        }
        if(sessionStorage.getItem('alertStatus') == ''){
          param.businessId = this.businessId;
          param.ticke = this.ticketNum;
        }
        getEmailValidate(_this,param,function(res){
          _this.isenabled=true;
          _this.emailauth.gid=res.gid;
          _this.scode=setInterval(function(){
            lasscode1(_this)
          }, 1000);
        });
        this.ticketNum = '';
        if(sessionStorage.getItem('alertStatus') == 'true'){
          this.alertStatus = true;
          this.dataSrc = sessionStorage.getItem('dataSrc');
          this.businessId = sessionStorage.getItem('businessId');
          this.addscript();
        }
      },
      //提交邮箱验证
      goemailauth(){
        var _this=this;
        _this.loading=true;
        ajax(_this,_this.extendApi.autoEmail,_this.emailauth,function(response){
          _this.loading=false;
          if(response.code==200){
            _this.getStatus();
              _this.$notify({
                title: '提示',
                message: '邮箱认证成功',
                type: 'success'
              });
                _this.istabs=7;
          }else{
             _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        });
      },
      //修改手机认证
      getsmscode(){
        this.editmobile.vparam=getcookie('id')+'|xjxtime|xjxrandom';
        this.editmobile.mobile=getcookie('phone');
        var _this=this;
        ajax(_this,_this.extendApi.sendSms,_this.editmobile,function(response){
          if(response.code==200){
            _this.isenabled=true;
            _this.$notify({
              title: '提示',
              message: '短信发送成功',
              type: 'success'
            });
            _this.scode=setInterval(function(){
              lasscode(_this,3)
            }, 1000);
          }else{
             _this.$notify({
              title: '提示',
              message: '短信发送失败',
              type: 'warning'
            });
          }
        })
      },
      //验证码预验证
      editcodenext(codetype){
        var _this=this;
        if(codetype=='mobile'){
          this.smscheckcode.mobile=getcookie('phone');
          this.smscheckcode.t='sms';
          this.smscheckcode.codetype='editmobile';
        }else{
          this.smscheckcode.email=getcookie('email');
          this.smscheckcode.t='mail';
          this.smscheckcode.codetype='editemail';
        }
        ajax(_this,_this.extendApi.checkedcode,_this.smscheckcode,function(response){
          if(response.code==200){
            if(codetype=='mobile'){
              _this.istabs=10;
            }else{
              _this.istabs=11;
            }
          }else{
             _this.$notify({
              title: '提示',
              message: '验证码错误',
              type: 'warning'
            });
          }
        })
      },
      //修改手机
      updatemobile(){
        var _this=this;
        this.editparpam.code=this.smscheckcode.code;
        ajax(_this,_this.extendApi.editmobile,_this.editparpam,function(response){
          if(response.code==200){
            setcookie('mobilestate',1);
            _this.userauthinfo.hmobile=_this.editparpam.newMobile.replace(_this.editparpam.newMobile.substr(3,4),'****');
            setcookie('hmobile',_this.editparpam.newMobile);
            setcookie('phone',_this.editparpam.newMobile);
            _this.istabs=6;
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      editEmailcode(){
        var _this=this;
        this.editemail.vparam=getcookie('id')+'|'+getcookie('email')+'|xjxtime|xjxrandom';
        this.editemail.email=getcookie('email');
        ajax(_this,_this.extendApi.sendEmail,_this.editemail,function(response){
           if(response.code==200){
              _this.isenabled=true;
              _this.$notify({
                title: '提示',
                message: '邮件发送成功',
                type: 'success'
              });
              _this.scode=setInterval(function(){
                lasscode(_this,4)
              }, 1000);
          }else{
             _this.$notify({
              title: '提示',
              message: '邮件发送失败',
              type: 'warning'
            });
          }
        });
      },
      updateemmail(){
        var _this=this;
        this.updateemail.code=this.smscheckcode.code;
        ajax(_this,_this.extendApi.editemail,_this.updateemail,function(response){
          if(response.code==200){
             _this.$notify({
                title: '提示',
                message: '邮件修改成功',
                type: 'success'
              });
            setcookie('email',_this.updateemail.newEmail);
            _this.userauthinfo.email=_this.updateemail.newEmail;
            _this.istabs=7;
          }else{
            _this.showtabs(9);
            _this.smscheckcode.code='';
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'warning'
            });
          }
        });
      },
      supplyAuthInfo(){
        this.istabs=2;
        if(getcookie('lockname')!=undefined||getcookie('lockname')!=null){
          this.auth.id_name=getcookie('lockname');
          // this.isabled=true;
        }
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size/ 1024 / 1024 < 0.586;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 600KB!');
          return false;
        }
        return  isLt2M;
      },
      handlePreview(file){
        this.fileList.myfile=file;
        this.submitUpload();
       
      },
      handleChange(file, fileList) {
        if(this.beforeAvatarUpload(file)==false){
          return false;
        }
        let param = new FormData();
        param.append('token',sessionStorage.getItem('uploadToken'));
        param.append('idtype','1');
        param.append('extend_param',this.userinfo.id+'|身份证');
        param.append('myfile',file.raw);
        this.submitUpload(param,file,1);
      },
      handleChange2(file, fileList) {
        if(this.beforeAvatarUpload(file)==false){
          return false;
        }
        let param = new FormData();
        param.append('token',sessionStorage.getItem('uploadToken'));
        param.append('idtype','1');
        param.append('extend_param',this.userinfo.id+'|身份证');
        param.append('myfile',file.raw);
        this.submitUpload(param,file,2)
      },
       handleChange3(file, fileList) {
        if(this.beforeAvatarUpload(file)==false){
          return false;
        }
        let param = new FormData();
        param.append('token',sessionStorage.getItem('uploadToken'));
        param.append('idtype','1');
        param.append('extend_param',this.userinfo.id+'|身份证');
        param.append('myfile',file.raw);
        this.submitUpload(param,file,3)
      },
      handleChange4(file, fileList) {
        if(this.beforeAvatarUpload(file)==false){
          return false;
        }
        let param = new FormData();
        param.append('token',sessionStorage.getItem('uploadToken'));
        param.append('idtype','1');
        param.append('extend_param',this.userinfo.id+'|身份证');
        param.append('myfile',file.raw);
        this.submitUpload(param,file,4)
      },
      submitUpload(param,file,flag){
        let timestamp=new Date().getTime();
        let _this=this;
        if(timestamp< sessionStorage.getItem('uploaddeadline')*1000){
          uploadImg(this,param,function(res){
            if(res.code==200){
                _this.OCRparam=res.data.mid;
                // console.log(flag)
              switch(flag){
                case 1:
                   _this.imageUrl = res.data.thumbImage;
                   //身份证id
                   _this.identityparam.mid=res.data.mid;
                    _this.identityparam.cardtype='1';
                    _this.identityparam.country='CN';
                   //校验身份信息 
                   _this.checkOCR(_this,res.data.mid);
                  break;
                case 2:
                   _this.imageUrl2 = res.data.thumbImage;
                   //手持照片mid
                   _this.identityparam.matchmid=res.data.mid;
                  break;
                case 3:
                   _this.imageUrl3 = res.data.thumbImage;
                    //身份证i
                   _this.identityparam.mid=res.data.mid;
                   //校验身份信息
                  _this.checkOCR(_this,res.data.mid);
                  break;
                case 4:
                   _this.imageUrl4 = res.data.thumbImage;
                    //手持照片mid
                   _this.identityparam.matchmid=res.data.mid;
                  break;
                default:
                  break;
              }

            }else{
              _this.$notify({
                title: '提示',
                message: res.message,
                type: 'warning',
                duration: '2000'
              });
              flag=false;
            }
          })
        }else{
        }
      },
      handleprogress(event, file, fileList){
      },
      handleAvatarSuccess(res, file){
        //上传成功操作
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      getUploadToken(){
        let param={
          provider:'service'//支持 aliyun qiniu service值----目前只是用service
        };
        let _this=this;
        ajax(_this,_this.extendApi.UploadToken,param,function(response){
          if(response.code==200){//获取成功
            sessionStorage.setItem('uploadToken',response.data.token);
            _this.fileList.token=response.data.token;
            _this.fileList.extend_param=_this.userinfo.id+'|身份证';
            _this.fileList.idtype='1';
            sessionStorage.setItem('uploaddeadline',response.data.deadline);//转换时间戳存取
          }
        })
      },
      checkOCR(_self,mid){
        let _this=_self;
        let param={
          mid:mid
        };
        ajax(_self, _self.extendApi.certificationOCR,param, function(res) {
          if(res.code==200){
            //获取用户姓名、身份证号
            _this.auth.id_name=res.data.name;
            _this.auth.id_no=res.data.cardid;
            _this.identityparam.cardid=res.data.cardid;
            _this.identityparam.name=res.data.name;

          }else{

          }
        },'POST');
      }
    },
  }
</script>
<style>
.myas{
  width: 835px;
  height: 100%;
  margin: 0 auto;
}
.my-account{
  font-size: 14px;
  width: 835px;
  height: 100%;
  margin: 0 auto;
  .nickname{
    width: 400px;
  }
  .updatenickname{
    clear: both;
    width: 100px;
    margin-left: 230px;
    background-color: #c81118;
    border:0px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
  .el-input__inner:focus{
    border:1px solid #bfcbd9;
  }
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
    line-height: 85px!important;
  }
  .el-dialog--tiny{
    width: 600px;
  }
  .el-dialog__body{
    background: #f3f3f3;
  }
  .el-button{
    color: #bfcbd9;
    border:1px solid #bfcbd9;
  }
  .el-button:hover{
    color: #1f2d3d;
    border:1px solid #1f2d3d;
  }
  .firstinfo{
    width: 100%;
    height: 130px;
    .personimg{
      float: left;
      width: 89px;
      height: 89px;
      margin:38px 0 12px;
    }
    .personinfo{
      float: right;
      width: 696px;
      height: 60px;
      margin:38px 0 12px;
      /*border-bottom: 1px solid #ccc;*/
      ul{
        li{
          width: 100%;
          float: left;
          height: 30px;
          font-size: 14px;
          .isrenz{
            margin-left: 40px;
            img{
              margin: 0px 20px 0 0;
              width: 29px;
              height: 29px;
            }

          }
        }
        .firstli{
          /*width: 300px;*/
          /*width: 220px;*/
          /*line-height: 130px;*/
          overflow: hidden;
          /*text-align: center;*/
        }
        .twoli{
           /*width: 110px;*/
           /*margin-left: 20px;*/
          position: relative;
          ul{
            width: 100%;
            li:nth-child(1){
              width: 120px;
              float: left;
            }
            
          }
        }
        .center{
          width: 100%;
          height: 30px;
          position: absolute;
          line-height: 30px;
         vertical-align: middle;
          /*top:50%;*/
          /*margin-top: -25px;*/
          li{
            width:33.33%;
            float: left;
          }
          .bg{
            height: 11px;
            /*width: 100%;*/
            background: #ccc;
            margin-top: 15px;
          }
          .backclass{
            /*height: 30px;
            line-height: 30px;
            vertical-align: middle;*/
            .el-progress{
              height: 30px;
              line-height: 30px;
              vertical-align: middle;
              .el-progress-bar__inner{
                    background-color:#c81118;
              }
            }
            #acbg{
              height: 6px;
              line-height: 30px;
              vertical-align: middle;
              /*width: 22%;*/
              background: #c81118;
              margin-top:12px;
              border-radius: 6px;
            }
          }
          
        }
      }
    }
  }
  .infoimport{
    width: 100%;
    margin: 18px 0 0 12px;
    tr{
      width: 100%;
      height:40px;
      line-height: 40px;
      text-align: left;
      .td1{
        width: 80px;
        color: #808080;
      }
      .td2{
        width: 300px;
      }
      .td3{
        width: 108px;
      }
      .td4{
        width: 302px;
        overflow: hidden;
      }
      .updaten{
        color: #fff;
        background: #c81118;
        border-radius: 3px;
        padding: 0 4px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .tabcontent{
    width: 100%;
    height: 100%;
    margin-top: 26px;
    .tabs{
      width: 100%;
      height: 102px;
      li{
        cursor: pointer;
        width: 108px;
        border-bottom: 2px solid #ccc;
        height: 102px;
        float: left;
        position: relative;
        img{
          position: absolute;
          left: 50%;
          top:50%;
        }
        .mima{
          width: 39px;
          height: 45px;
          margin-top: -32px;
          margin-left: -20px;
        }
        .payment{
          width: 22px;
          height: 43px;
          margin-top: -31px;
          margin-left: -11px;
        }
        .google{
          width: 45px;
          height: 34px;
          margin-top: -27px;
          margin-left: -22px;
        }
        p{
          font-size: 14px;
          color: #000;
          text-align: center;
          margin-top: 72px;
        }
      }
      .liactive{
        border-bottom: 2px solid #c81118;
      }
      .last{
        width: 403px;
      }
    }
    .tabsinfo{
      width: 100%;
      height: 100%;
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
      border-bottom:1px solid #ccc;
      .yhtab{
        padding:45px 80px;
        .yhtabone{
          /*margin-top: 20px;*/
          input{
            padding-left: 10px;
            margin-left: 65px;
            width: 358px;
            height: 35px;
            border: 1px solid #bfcbd9;
            border-radius: 3px;
          }
        }
        .yhtabtwo{
          margin-top: 20px;
          .yhtabtwos{
            margin-left: 38px;
            width: 358px;
            height: 35px;
          }
        }
        .yhtabthree{
          margin-top: 20px;
          input{
            padding-left: 10px;
            margin-left: 38px;
            width: 290px;
            height: 35px;
            border:1px solid #bfcbd9;
            border-radius: 3px;
          }
          .el-checkbox__original{
            left: 0;
          }
        }
        .yhtabfour{
          margin-top: 20px;
          .yhtabsele1{
            width: 175px;
            margin-left: 38px;
          }
          .yhtabsele2{
            width: 180px;
          }
        }
        .yhtabfive{
          margin-top: 20px;
          /*.spOne{
            float: left;
            margin-top: 30px;
          }
          .spTwo{
            margin-left: 42px;
            margin-top: 20px;
            display: inline-block;
            width: 358px;
            height:35px;
            border:1px solid #bfcbd9;
            border-radius: 3px;
          }*/
          input{
            padding-left: 10px;
            margin-left: 38px;
            width: 358px;
            height: 35px;
            border: 1px solid #bfcbd9;
            border-radius: 3px;
          }
        }
        .yhtabsix{
          input{
            padding-left: 10px;
            margin-left: 38px;
            margin-top: 20px;
            width: 240px;
            height: 35px;
            border:1px solid #bfcbd9;
            border-radius: 3px;
          }
          button{
            margin-left:5px;
            width: 108px;
            height: 35px;
            border:1px solid #bfcbd9;
            border-radius: 3px;
            background: #f7f7f7;
            font-size: 14px;
            color: #1486cd;
            cursor: pointer;
          }
        }
        .chTcoantain-tip{
          margin-left: 100px;
          text-align: left;
          color: #333;
          span{
            color: #c81118;
            cursor: pointer;
          }
        }
        .yhtabseven{
          button{
            width: 185px;
            height:35px;
            margin-top: 30px;
            margin-left: 170px;
            background: #c81118;
            font-size: 14px;
            color: #fff;
            border: none;
            border-radius: 3px;
          }
        }
        .yhtabeight{
          margin-top: 30px;
          table{
            width: 100%;
            .tr1{
              background: #e6e6e6;
            }
            tr{
              border-bottom: 1px solid #efefef;
              line-height: 36px;
              text-align: center;
              .td1{
                width: 130px;
              }
              .td2{
                width: 360px;
              }
              .td3{
                cursor: pointer;
              }
            }
          }
        }
      }
      .updatePW{
        width: 100%;
        height: 100%;
        margin-bottom: 40px;
        .renzhen{
          width: 100%;
          height: 323px;
          li{
            width: 190px;
            height: 190px;
            margin: 55px 0 0 320px;
            float: left;
            border: 1px solid #ccc;
            img{
              margin: 20px 50px 30px 50px;
            }
            p{
              width: 100%;
              line-height: 21px;
              text-align: center;
            }
          }
          .china,.international{
            cursor: pointer;
          }
          .china:hover,.international:hover{
            border: 1px solid #c81118;

          }
        }
        p{
          text-align: center;
          /*padding-top:30px;*/
          .redn{
            font-size: 16px;
            color: #c81118;
            font-weight: bold;
          }
        }
        .title{
          padding-top: 75px;
          font-size: 18px;
          color: #c81118;
        }
        .info{
          padding-top: 30px;
          /*width: 265px;*/
          margin-left: 285px;
          text-align: left;
        }
        .tishi{
          margin-top: 30px;
          font-size: 12px;
          /*padding-left: 279px;*/
        }
        .updaten {
            color: #fff;
            background: #c81118;
            border-radius: 3px;
            padding: 0 4px;
            cursor: pointer;
            margin-left: 10px;
        }
        .avatar-uploader{
          
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #20a0ff;
        }
        .avatar-uploader-icon {
          border: 1px dashed #d9d9d9;
          font-size: 28px;
          color: #8c939d;
          width:200px;
          height: 125px;
          line-height: 125px;
          text-align: center;
        }
        .el-upload__tip{
          text-align: center;
        }
        .avatar {
          width: 200px;
          height: 125px;
          display: block;
        }
        .tip{
          text-align: left;
          color: #333;
          span{
            color: #c81118;
            cursor: pointer;
          }
        }
      }
      .editpassword{
        /*padding: 0 10px;*/
        margin-left: 279px;
        margin-top: 28px;
        background: #c81118;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        height: 30px;
        width: 180px;
        border: 0;
      }
      .uppassword{
        width: 70px;
      }
      .upphone{
        width: 70px;
        margin-left: 383px;
      }
      .uppassword2{
        width: 70px;
        margin-left: 15px;
      }
      .form{
        width: 420px;
        margin-left: 80px;
        padding-top: 65px;
        .yzma{
          width: 120px;
        }
        .city{
          width: 132px;
        }
        .el-form-item__label{
          text-align: left;
          color:#000;
        }
      }
    }
  }
  .msgBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.2);
    z-index: 100;
    text-align: center;
    #TCaptcha{
      /* z-index: 1000000; */
      position: absolute;
      left: 50%;
      margin : -20px 0 0 -150px;
      top: 50%;
    }
    
  }
}
</style>
