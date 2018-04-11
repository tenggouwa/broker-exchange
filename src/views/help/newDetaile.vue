<template>
  <div class="notice-box">
    <h2>详情</h2>
    <div class="notice-content">
      <p>{{noticeList.title}}</p>
      <div class="boxin detail" v-html="noticeList.content"></div>
      <p class="time">{{noticeList.published_time}}</p>
    </div>
  </div>
</template>
<script >
import api from '../../config/api-config'
import {ajax} from '../../assets/js/common'
  export default {
    data(){
      return{
      noticeList:{
        title:'',
        content:'',
        published_time:''
      }
      }
    },
    mounted:function(){

       this.getdetaile();
    },
    methods:{
      getdetaile(){
        let _this=this;
        var id=document.URL.split('?id=')[1];
        if(id!=null){
          this.newId=id;
        }
        else{
          this.newId="";
        }
        let param={
          id:this.newId
        }
        ajax(this,this.extendApi.getNewDetail,param,(response)=>{
          if(response.code==200){
            _this.noticeList.title=response.data.title;
            _this.noticeList.content=response.data.content;
            _this.noticeList.published_time=response.data.published_time;
          }
          else{
            console.log(response.message)
          }
        },'GET')
      },
    }
  }
</script>
<style type="text/css">
  .notice-box {
    background-color: #fff;
    min-height: 500px;
    margin: 0 auto;
    width: 887px;
    h2{
      height: 60px;
      /*padding-left: 38px;*/
      line-height: 60px;
      font-size: 18px;
      color: #000;

      border-bottom:1px solid  #e6e6e6;
    }
    .notice-content{
      margin-top: 30px;
      p{
         text-align: center;
         font-size: 18px;
         c:#000;
         /*font-weight: bolder;*/
      }
      .boxin{
        margin-top: 30px;
        p{
          font-size: 14px;
          color: #000;
          lh:1.68;
          text-align: left!important;
        }
      }
      .time{
        float: right;
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>