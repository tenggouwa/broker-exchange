   <template>
  <div class="footer">
    <div class="cont">
      <div class="footer_left">
        <div class="title">联系我们</div>
        <!-- <div>
          <img src="../../static/img/qqimg.png" alt=""  style="margin-right:20px;" />
          <img src="../../static/img/dianbaoimg.png" alt="" />
        </div> -->
        <!-- <h2>点击跳转</h2> -->
        <ul>
          <!-- <li><a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1"><img src="../../static/img/qqimg.png" alt=""  style="margin-right:20px;" /></a></li> -->
          <!-- <li><a target="_blank" href="https://t.me/bityuan" ><img src="../../static/img/dianbaoimg.png" alt="" style="margin-right:20px;"/></a></li> -->
           <li><a ><img src="../../static/img/weixin.png" height="144" width="120" alt="" /></a></li>
        </ul>
        <div class="boxerweima" v-show="showT1">
          <img src="../../static/img/qq.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT2">
          <img src="../../static/img/dianbao.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT3">
          <img src="../../static/img/weixin1.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT4">
          <img src="../../static/img/Twitter.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT5">
          <img src="../../static/img/weixin.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT6">
          <img src="../../static/img/Bitcointalk.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT7">
          <img src="../../static/img/appdownload.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT8">
          <img src="../../static/img/offline_wallet.png" height="144" width="120" alt="">
        </div>
        <div class="boxerweima" v-show="showT9">
          <img src="../../static/img/pwallet.png" height="144" width="120" alt="">
        </div>
        <div class="contantUs">
          <a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1">
            <div @mouseover="showerweima(1)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-QQ1-copy"></i>
              <span>QQ客服:4001566899</span>
            </div>
          </a>
          <div @mouseover="showerweima(5)" @mouseout="noneerweima()" class="hoverbox">
            <i class="iconfont icon-weixin-copy"></i>
            <span>微信客服:zhaobikefu</span>
          </div>
           <div @mouseover="showerweima(3)" @mouseout="noneerweima()" class="hoverbox">
            <i class="iconfont icon-weixin-copy"></i>
            <span>微信客服1:zhaobikefu</span>
          </div>
        </div>
        <div class="contantUs">
          <a class="sidemu-help" target="_blank" href="https://t.me/bityuan">
            <div @mouseover="showerweima(2)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-qunzuguanli"></i>
              <span>电报群</span>
            </div>
          </a>
          <a class="sidemu-help" target="_blank" href="https://twitter.com/Bityuanofficial">
            <div @mouseover="showerweima(4)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-twitter"></i>
              <span>Twitter</span>
            </div>
          </a>
          <a class="sidemu-help" target="_blank" href="https://bitcointalk.org/index.php?topic=2374563.msg24222743#msg24222743">
            <div @mouseover="showerweima(6)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-kefu1"></i>
              <span>Bitciontalk</span>
            </div>
          </a>
        </div>
        <div class="contantUs">
          <a class="sidemu-help" target="_blank" >
            <div @mouseover="showerweima(7)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-qunzuguanli"></i>
              <span>找币APP</span>
            </div>
          </a>
          <a class="sidemu-help" target="_blank">
            <div @mouseover="showerweima(8)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-twitter"></i>
              <span>离线钱包</span>
            </div>
          </a>
          <a class="sidemu-help" target="_blank">
            <div @mouseover="showerweima(9)" @mouseout="noneerweima()" class="hoverbox">
              <i class="iconfont icon-kefu1"></i>
              <span>P钱包</span>
            </div>
          </a>
        </div>
        <br>
        <!-- <ul>
          <li>客服QQ：<span class="special">4001566899</span></li>
          <li>官方QQ群1：<span>345106800</span></li>
          <li>官方QQ群2：<span>545967811</span></li>
        </ul> -->
          <p class="tips">温馨提示：数字资产是创新的投资产品，价格波动较大，具有较高的投资风险，请您投资前
         对数字资产充分认知，理性判断自己的投资能力，审慎做出投资决策。</p>
        <!-- <p class="tips">©2017 licai.cn All Rights.Powered by本链有限公司</p> -->
      </div>
      <div class="footer_right">
        <div class="title">意见反馈</div>
        <input type="text" placeholder="姓名"  v-model="feedlist.name"/>
        <br />
        <input type="text" placeholder="邮箱" v-model="feedlist.email"/>
        <br />
        <textarea placeholder="反馈" v-model="feedlist.message"/>
        <br />
        <input type="button" value="提交" @click="sumbitfeedback"/>
      </div>
    </div>
  </div>
</template>
<script>
import {getcookie} from '../assets/js/common'
export default{
  data(){
    return{
      showT1:false,
      showT2:false,
      showT3:false,
      showT4:false,
      showT5:false,
      showT6:false,
      showT7:false,
      showT8:false,
      showT9:false,
      feedlist:{
        mark:'d5ee52b1-7dcb-43b5-ae4b-cd4b889c5462',
        identification:'',
        name:'',
        email:'',
        mobile:'',
        title:'',
        message:'',
        upload_id:[],
      },
    }
  },
  methods:{
    sumbitfeedback(){
      let _this=this;
      _this.feedlist.identification=getcookie('id');
      _this.axios({
        method: "POST",
        url: _this.extendApi.createFeedback,
        data: _this.feedlist,
      }).then((response) => {
        if(response.status==201||response.status==200){
          _this.$notify({
            name: 'success',
            message: '反馈内容已提交，我们会尽快处理！',
            type: 'success',
            duration: '2000'
          });
          _this.feedlist.name='';
          _this.feedlist.email='';
          _this.feedlist.message='';
        }
      },(err)=>{
        //这里一定要用err.response调用！
        this.$notify({
          title: '提交失败',
          message: err.response.data[0].message,
          type: 'error',
          duration: '2000'
        });
      })
    },
    showerweima(e){
      if(e == 1){
        this.showT1=true;
      }else if(e == 2){
        this.showT2=true;
      }else if(e == 3){
        this.showT3=true;
      }else if(e == 4){
        this.showT4=true;
      }else if(e == 5){
        this.showT5=true;
      }else if(e == 6){
        this.showT6=true;
      }else if(e == 7){
        this.showT7=true;
      }else if(e == 8){
        this.showT8=true;
      }else if(e == 9){
        this.showT9=true;
      }
    },
    noneerweima(){
      this.showT1=false;
      this.showT2=false;
      this.showT3=false;
      this.showT4=false;
      this.showT5=false;
      this.showT6=false;
      this.showT7=false;
      this.showT8=false;
      this.showT9=false;
    },
    subtip(){
      this.$notify({
        title: '成功',
        message: "您的意见已提交",
        type: 'success',
        duration: '2000'
      });
    },
  }
}

</script>

<style scoped>
.footer{
  width: 100%;
  height: 300px;
  margin-top: 50px;
  text-align: left;
  background-color: #343434;
  color: #888;
  font-size: 14px;

  /*左右两栏内容的样式*/
  .cont{
    width: 1200px;
    height: 300px;
    margin: 0 auto;
    padding-top: 10px;
    /*左右两栏的标题样式一致*/
    .title{
      color: #fff;
      margin-bottom: 20px;
    }
    .boxerweima{
      float: right;
      /*margin-left: 520px;*/
      position: absolute;
      /*z-index: 999;*/
      border-radius: 4px;
      width: 120px;
      height: 144px;
      background: #fff;
    }
    /*左边一栏的样式*/
    .footer_left{
      float: left;
      width: 800px;
      h2{
        margin-bottom: 10px;
      }
      ul{
        float: left;
        /*width: 150px;*/
        color: #b0b0b0;
        li{
          /*height: 26px;*/
          /*border-radius: 4px;*/
          /*margin-bottom: 5px 0px;*/
          /*line-height: 26px;*/
          /*padding: 3.5px 12px;*/
          /*background-color: #414141;*/
          display: inline;
          /*a{
            display: inline-block;
            color: #b0b0b0;
            height: 26px;
            line-height: 26px;
           text-align:center;
             i,span{
              display: inline-block;
              height: 26px;
              line-height: 26px;
              text-align:center;
              vertical-align: middle;
              margin: 0 5px;
            }
          }*/
        }
        /*li:nth-child(2){
          line-height: 45px;
        }*/
      }
    
    /*  li>span{
        font-family: "Arial";
        font-weight: bold;
        font-size: 16px;
      }*/
      /*客服QQ与下面两行数字对齐*/
      li>.special{
        margin-left: 22px;
      }
      /*增大间距*/
      p.tips{
        padding-top:150px;
        /*margin-bottom: 36px;*/
      }


      /*新增*/
      .contantUs{
        float: left;
        margin-left: 10px;
        div{
          transition: all 0.3s ease 0s;
          -moz-transition: all 0.3s ease 0s;
          -webkit-transition: all 0.3s ease 0s;
          -o-transition: all 0.3s ease 0s;
          cursor: pointer;
          background:  rgba(65, 65, 65, 1);
          width: 180px;
          height: 34px;
          margin-bottom: 10px;
          line-height: 34px;
          color: #fff;
          padding-left: 5px;
          border-radius: 6px;

          span{
            font-size: 14px;
            color: #fff;
          }
          i{
            font-size: 18px;
            color: #fff;
            margin-right: 5px;
          }
        }
        .hoverbox:hover{
          background: #fff;
          i{
            color: #333;
          }
          span{
            color: #333;
          }
        }
      }
    }

    /*右边一栏的样式*/
    .footer_right{
      width: 300px;
      float: right;
      /*输入框样式*/
      input[type=text], textarea{
        width: 300px;
        height: 34px;
        margin-bottom: 10px;
        padding-left: 10px;
        border-radius: 6px;
        background-color: #414141;
        border: 0;
        color: #b0b0b0;
      }
      /*文本框外观美化*/
      textarea{
        height: 100px;
        resize: none;
        overflow:hidden;
        padding-top: 5px;
      }
      /*提交按钮样式*/
      input[type=button]{
        float: right;
        width: 100px;
        height: 30px;
        border: 2px solid #414141;
        border-radius: 6px;
        background-color: #343434;
        color: #666;
      }
      input[type=button]:hover{
        color: #fff;
        background-color: #888;
        border-color: #888;
      }
      input[type=button]:active{
        color: #a5a5a5;
        background-color: #666;
        border-color: #666;
      }
    }
  }
.icon-QQ1-copy,.icon-qunzuguanli{
  font-size: 16px;
}
::-webkit-input-placeholder { color:#888;font-size:14px; }
::-moz-placeholder { color:#888;font-size:14px; } /* firefox 19+ */
:-ms-input-placeholder { color:#888;font-size:14px; } /* ie */
input:-moz-placeholder { color:#888;font-size:14px; }
}
</style>
