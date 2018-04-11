<template>
  <div class="safeSet">
     <ul class="rechange">
        <li class="pleft">安全中心</li>
        <li class="pright"></li>
      </ul>
      <div class="tabcontent">
        <ul class="tabs">
          <li :class="{liactive:istabs==1}">
            <img class="mima" src="../../assets/img/password.png" alt="">
            <p>登录密码修改</p>
          </li>
          <!-- <li :class="{liactive:(istabs==2 || istabs==5 || istabs==6 || istabs==7)}" @click="showtabs(2)">
            <img class="payment" src="../../assets/img/payment.png" alt="">
            <p>支付密码</p>
          </li> -->
          <li>
            <!-- <img class="google" src="../../assets/img/google.png" alt="">
            <p>谷歌验证</p> -->
          </li>
          <li class="last"></li>
        </ul>
        <div class="tabsinfo">
          <div class="updatePW" v-if="istabs==1">
            <div class="form"> 
              <el-form ref="form" :model="uptradepwd" label-width="125px">
                <el-form-item label="原密码">
                  <el-input v-model="uptradepwd.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input v-model="uptradepwd.newpassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码">
                  <el-input v-model="uptradepwd.password2" type="password"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <input type="button" class="editpassword" value="提交验证" @click='updatepwd()'>
            <p>密码请不要太简单，建议为字母、数字和符号的组合。</p>
          </div>
        </div>
      </div>
      <div class="loginhistory">
        <ul class="rechange">
          <li class="pleft">登录历史</li>
          <li class="pright"></li>
        </ul>
        <div class="hisinfo">
          <p v-if="showadress==1">您上次登录系统时间为：{{onehlist.date}}   登录IP ：{{onehlist.ip}}  {{onehlist.address}}<span class="el-icon-close" @click="loginadress()"></span></p>
          <table class="hislist">
            <thead>
              <tr class="fist">
                <th>登录IP</th>
                <th>登录时间</th>
                <th>登录地点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in loginhlist">
                <td>{{item.ip}}</td>
                <td>{{item.date}}</td>
                <td>{{item.ipwhere}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <el-dialog title="提示" v-model="dialogpaypwdVisible">
        <div class="dcontent">
          <p>您的账户未进行手机认证，请先进行手机认证</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogpaypwdVisible = false">取 消</el-button>
          <el-button type="primary" @click="gomobilestate()">确 定</el-button>
        </div>
      </el-dialog> -->
  </div>
</template>
<script>
import { ajax,setcookie,getcookie,delatecookie,lasscode } from '../../assets/js/common'
  export default{
    data(){
      return{
        
        codenum:60,
        getcode:['获取验证码','获取验证码'],
        loginhlist:[],//历史登录
        onehlist:{
          ip:'',
          date:'',
          address:'',
        },
        uptradepwd:{
          password:'',
          newpassword:'',
          password2:'',
        },
        istabs:1,
        showadress:1,
        // dialogpaypwdVisible: false,
        input: '',
      }
    },
    mounted:function(){
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
      this.gethistorylist();
      // var tradepwdstate=getcookie('tradepwdstate');
      // if(tradepwdstate==1){
      //   this.istabs=5;
      // }
    },
    methods:{
      // gomobilestate(){
      //  this.dialogpaypwdVisible=false;
      //  this.$router.push({
      //       path: '/usercenter/myaccount'
      //   });
      // },
      //上次登录的地址显示
      loginadress(){
        this.showadress=0;
      },
      //设置交易密码获取手机验证码
      // getphonecode(pwdtype){
      //   var param='';
      //   var _this=this;
      //   if(pwdtype=='editpwd'){
      //     this.editpayword.vparam=getcookie('id')+'|xjxrandom';
      //     this.editpayword.mobile=getcookie('phone');
      //     param=this.editpayword;
      //   }else{
      //     this.setpayword.vparam=getcookie('id')+'|xjxrandom';
      //     this.setpayword.mobile=getcookie('phone');
      //     param=this.setpayword;
      //   }
      //   ajax(_this,_this.extendApi.sendSms,param,function(response){
      //     if(response.code==200){
      //       _this.phoneclick=true;
      //       _this.$notify({
      //         title: '提示',
      //         message: '短信发送成功',
      //         type: 'success'
      //       });
      //       if(pwdtype=='editpwd'){
      //         _this.scode=setInterval(function(){
      //           lasscode(_this,1)
      //         }, 1000);
      //       }else{
      //         _this.scode=setInterval(function(){
      //           lasscode(_this,0)
      //         }, 1000);
      //       }
      //     }else{
      //        _this.$notify({
      //         title: '提示',
      //         message: '短信发送失败',
      //         type: 'warning'
      //       });
      //     }
      //   })
      // },
      //修改交易密码
      editpaypwd(){
        var _this=this;

      },
      // //设置交易密码
      // settradepwd(){
      //   var _this=this;
      //   this.settradepass.mobile=getcookie('phone');
      //   if(this.settradepass.onepayword!=this.settradepass.payword){
      //     _this.$notify({
      //       title: '提示',
      //       message: '两次密码不一致，请重新输入',
      //       type: 'warning'
      //     });
      //   }else{
      //     ajax(_this,_this.extendApi.setTradePwd,_this.settradepass,function(response){
      //       if(response.code==200){
      //         _this.istabs=5;
      //         setcookie('tradepwdstate',1);
      //         _this.$notify({
      //           title: '提示',
      //           message: '支付密码设置成功',
      //           type: 'success'
      //         });
      //       }else{
      //          _this.$notify({
      //           title: '提示',
      //           message: '支付密码设置失败',
      //           type: 'warning'
      //         });
      //       }
      //     });
      //   }
      // },
     // //修改交易密码
     //  updateTpwd(mode){
     //    this.editTpwd.mode=mode;
     //    var _this=this;
     //    if(_this.editTpwd.onenewPayword!=_this.editTpwd.newPayword){
     //      _this.$notify({
     //        title: '提示',
     //        message: '两次密码不一致，请重新输入',
     //        type: 'warning'
     //      });
     //    }else{
     //      ajax(this,this.extendApi.editTpwd,this.editTpwd,function(response){
     //        if(response.code==200){
     //          _this.istabs=5;
     //          setcookie('tradepwdstate',1);
     //          _this.$notify({
     //            title: '提示',
     //            message: '修改支付密码成功',
     //            type: 'success'
     //          });
     //        }else{
     //           _this.$notify({
     //            title: '提示',
     //            message: '修改支付密码失败',
     //            type: 'warning'
     //          });
     //        }
     //      });
     //    }
     //  },

      //修改登录密码
      updatepwd(){
        var _this=this;
        if(this.uptradepwd.newpassword!=this.uptradepwd.password2){
          _this.$notify({
            title: '提示',
            message: '两次新密码不一致，请重新输入',
            type: 'warning'
          });
        }else{
          ajax(this,this.extendApi.editpassword,this.uptradepwd,function(response){
            if(response.code==200){
              _this.$notify({
                title: '成功',
                message: '密码修改成功,请重新登录',
                type: 'success'
              });
              setTimeout(function(){
                delatecookie();
                  _this.$router.push({
                    path: '/index'
                });
              }, 2000);
            }
            else{
              _this.$notify({
                title: '提示',
                message: response.message,
                type: 'error'
              });
            }
          });
        }
      },
      //获取历史登录列表
      gethistorylist(){
        var _this=this;
         ajax(_this,_this.extendApi.loginHistory,'',function(response){
          if(response.code==200){
              _this.loginhlist=response.data.list;
              _this.onehlist.ip=response.data.list[0].ip;
              _this.onehlist.date=response.data.list[0].date;
              _this.onehlist.address=response.data.list[0].odata;
          }else{
             _this.$notify({
              title: '提示',
              message: response.message,
              type: 'error'
            });
          }
        },'GET')
      },
    }
  }
</script>
<style> 
    .safeSet{
      width: 835px;
      height: 100%;
      margin: 0 auto;
      .el-dialog--small{
        width: 360px;
        border-radius: 6px;
        overflow: hidden;
      }
      .el-dialog__header{
        background: #f3f3f3;
        padding-bottom: 10px;
      }
      .el-dialog__title {
        line-height: 1;
        font-size: 14px;
        font-weight: 500;
        color: #666;
      }
      .el-button--primary {
        color: #fff;
        background-color: #c81118;
        border-color: #c81118;
      }
      .el-button--default:hover{
        color: #666;
        border-color: #aaa;
      }
      .dcontent{
        /*height: 100px;*/
        padding: 10px 10px;
        p{
          font-size: 14px;
          color: #666;
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
              width: 41px;
              height: 45px;
              margin-top: -32px;
              margin-left: -20px;
            }
            .payment{
              width: 36px;
              height: 45px;
              margin-top: -32px;
              margin-left: -18px;
            }
            .google{
              width: 45px;
              height: 45px;
              margin-top: -32px;
              margin-left: -22px;
            }
            p{
              font-size: 14px;
              color: #000;
              text-align: center;
              margin-top: 70px;
            }
          }
          .liactive{
            border-bottom: 2px solid #c81118;
          }
          .last{
            width: 619px;
          }
        }
        .tabsinfo{
          width: 100%;
          height: 100%;
          border-left:1px solid #ccc;
          border-right:1px solid #ccc;
          border-bottom:1px solid #ccc;
          .updatePW{
            width: 100%;
            height: 100%;
            margin-bottom: 40px;
            p{
              margin-top: 30px;
              font-size: 12px;
              padding-left: 279px;
            }
            .uptradepW{
              width: 488px;
              height: 243px;
              margin: 0 auto 38px;
              padding-top: 78px;
              /*background: #000;*/
              ul{
                width: 100%;
                height: 100%;
                li{
                  float: left;
                  margin-left: 100px;
                  width: 95px;
                  height: 153px;
                  p{
                    width: 100%;
                    text-align: center;
                    padding-left: 0;
                    margin-top: 20px;
                    margin-bottom: 30px;
                  }
                  img{
                    width: 52px;
                    height: 52px;
                    margin-left: 21px;
                  }
                  .el-button--primary{
                    background: #c81118;
                    border: 0;
                    margin-left: 18px;
                  }
                  .el-button{
                    padding: 8px 15px;
                  }
                  .el-switch{
                    margin-left: 18px;
                  }
                }
                .firstli{
                  margin-left: 0;
                }
              }
            }
          }
          .el-dialog--small{
            width: 360px;
            border-radius: 5px;
            height: 200px;
            overflow: hidden;
          }
          .el-dialog__title{
            color: #666;
            font-weight: 500;
            font-size: 14px;
          }
          .el-dialog__footer{
            text-align: center;
          }
          .el-button--primary{
            background: #c81118;
            border-color: #c81118;
          }
          .el-dialog__header{
            padding: 15px 20px 15px;
            background: #eee;
          }
          .inputtra{
            width: 170px;
            margin-left: 75px;
          }
          .inputtra:focus{
            border-color: #ccc;
          }
        }
        .form{
          width: 395px;
          margin-left: 80px;
          padding-top: 65px;
          .yzma{
            width: 163px;
          }
          .el-form-item__label{
            text-align: left;
            color:#000;
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
        .uppassword2{
          width: 70px;
          margin-left: 15px;
        }
        .googlepass{
          width: 100%;
          height: 100%;
          margin-top: 35px;
          border:0;
          a{
            color: blue;
          }
          .step{
            margin-top: 35px;
          }
          .step1{
            p{
              line-height: 30px;
              span{
                display: inline-block;
              }
              .sp1{
                width: 200px;
                text-align: left;
              }
              .sp3{
                width: 400px;
              }
            }
            .bg{
              background: rgb(235,235,235);
            }
          }
          .step2{
            font-size: 14px;
          }
          h3{
            font-size: 24px;
            color: #000;
          }
        }
      }
      .loginhistory{
        width: 100%;
        height: 100%;
        .hisinfo{
          width: 100%;
          height: 100%;
          p{
            margin-top:27px;
            width: 100%;
            height: 44px;
            background: #fbefef;
            color: #666;
            font-size: 14px;
            line-height: 44px;
            text-align: center;
            position: relative;
            .el-icon-close{
              position: absolute;
              top:15px;
              right: 15px;
            }
          }
          .hislist{
            margin-top: 15px;
            width: 100%;
            border-spacing: 0;
            font-size: 13px;
            .fist{
              background: rgb(235,235,235);
            }
            tr:nth-child(2n){
              background: rgb(235,235,235);
            };
            th,td{
              padding: 0px;
              font-weight: 500;
              height: 30px;
              text-align: center;
            }
          }
        }
      }
    }
</style>