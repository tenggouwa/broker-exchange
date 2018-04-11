<template>
  <div class="shareclass">
    <div class="shareclass_qcode">
    </div>
    <div class="shareclass_right">
      <div class="right_top">
        <p>{{shareamount}}</p>
        <p>您已邀请人数</p>
      </div>
      <div class="right_bottom">
        <p>邀请码&nbsp; &nbsp;<span>{{invite_code}}</span></p>
        <p>邀请链接<span>{{invitelink}}</span> <a class="copyclass" v-clipboard:copy="invitelink" v-clipboard:success="handleSuccess"><span>复制链接</span></a></p>
      </div>
    </div>
  </div>
</template>
<script>
  import { ajax,getcookie } from '../../assets/js/common'
  require('../../../static/jquery.qrcode.min.js') 
  export default{
    data(){
      return{
        shareamount:0,
        invite_code:'',
        invitelink:'',
        minviteUrl:'',
        
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
        let _this=this;
        ajax(this,this.extendApi.getregcode,'',(res)=>{
          _this.invite_code=res.data.code;
          _this.invitelink=res.data.inviteUrl;
          _this.minviteUrl=res.data.minviteUrl;
          _this.shareamount=res.data.inviteNum;
          _this.qrcode();
        },'GET')
       
      });
    },
    methods:{
      qrcode() {
        var _this=this;
        $(".shareclass_qcode").html('');
        $(".shareclass_qcode").qrcode({
          render:'canvas',
          text: _this.minviteUrl,
          width:160,
          height:160
        });
      },
      handleSuccess(){
        this.$notify({
          title: '提示',
          message: '复制成功',
          type: 'success',
          duration:'2000'
        });
      },
    }
  }
</script>
<style scoped>
  .shareclass{
    width: 900px;
    height: 100%;
    margin: 70px auto;
    .shareclass_qcode{
      float: left;
      width: 160px;
      height: 160px;
      margin-left: 40px;
      margin-right: 20px;
      /*background: red;*/
      canvas{
        width: 160px;
        height: 160px;
        display: block;
      }
    }
    .shareclass_right{
      position: relative;
      height: 200px;

      .right_top{
        height: 50%;
        /*padding-top: 20px;*/
        p:nth-child(1){
          color: #ce181d;
          font-size: 40px;
        }
        p:nth-child(2){
          color:#808080;

        }

      }
      .right_bottom{
        height: 50%;
        bottom: 0px;
        /*padding-top:10px;*/
        p{
          color: #808080;
          font-size: 14px;
         
          span{
            padding-left: 20px;
            font-size: 16px;
          } 
        }
        p:nth-child(1){
          padding-bottom: 10px;
          span:nth-child(1){
              color: #333;
          }
        }
        p:nth-child(2){
           padding-bottom:0px;
          margin-bottom: 0px;
          color: #333;
          height: 30px;
          span:nth-child(2){
              color: #333;
          }
          a{
           /* height:30px !important; 
            line-height: 30px;*/
            font-weight: 16px;
            cursor: pointer;
            span{
             /* height:30px !important; 
              line-height: 30px;*/
              width:60px;
              color:#ce181d !important;
              font-size: 16px;
              font-weight: 600;
              vertical-align: middle;
            }
          }
          /*.copyclass{
            color:#ce181d !important;
            height:30px !important; 
            width:60px;
            font-size: 12px;
          }*/
        }
      }
    }
  }
</style>