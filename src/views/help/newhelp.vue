<template>
  <div class="notice-box">
    <div>
      <h2>新手帮助</h2>
      <ul >
        <li  v-for="item in noticeList" @click="gotoDetail(item.id)">
          <p >
            <span class="title" >{{item.title}}</span>
            <span class="time" >{{item.published_time}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="pagetotal"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size">
    </el-pagination>
  </div>
  </div>
  
</template>
<script >
import api from '../../config/api-config'
import {ajax} from '../../assets/js/common'
  export default {
    data(){
      return{
        pagetotal:0,
        page:1,
        size:10,
        nextpage:1,
        noticeList:[],
        pagetotal:1,
      }
    },
    mounted:function(){
       this.getNoticeList();
    },
    methods:{
      handleCurrentChange(val) {
        document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
        this.getNoticeList(val);
        this.nextpage=val;
      },
      //公告列表获取
      getNoticeList(){
        let param={
          type:'help'
        }
        ajax(this,this.extendApi.getNewList,param,(response)=>{
          if(response.code==200){
            this.noticeList=response.data.rows;
          }
          else{
            console.log(response.message)
          }
        },'GET')
      },
      gotoDetail(id){
        let newpath='/help/newDetaile?id='+id;
        this.$router.push({
          path:newpath
        })
      }
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
    ul{
      width: 100%;
      clear: both;
      li{
        width:100%;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        border-bottom:1px dashed #e6e6e6;
        .title{
          float:left;
          color: #333;
        }
        .time{
          float:right;
          color: #999;
        }
      }
      li:hover{
        background-color: #f7f7f7;
      }
    }
  }
  .pagination{
    float: right;
    margin-top: 30px;
    text-align: right;
    padding-right: 38px;
    ul{
      li{
        height: 28px;
        line-height: 28px;
      }
    }
  }
</style>


<!-- <template>
  <div class="notice-box">
    <h2>新手帮助</h2>
    <div class="notice-content" v-for="item in noticeList" @click="gotohelpInfo(item.id)">
      <p>{{item.title}}</p>
      <div class="boxin detail" v-html="item.abstract"></div>
      <p class="time">{{item.published_time}}</p>
    </div>
  </div>
</template>
<script >
import api from '../../config/api-config'
import {ajax} from '../../assets/js/common'
  export default {
    data(){
      return{
      noticeList:[]
      }
    },
    mounted:function(){
       this.getnewhelpInfo();
    },
    methods:{
      getnewhelpInfo(){
        let param={
          type:'help'
        }
        ajax(this,this.extendApi.getNewList,param,(response)=>{
          console.log(response)
          if(response.code==200){
            this.noticeList=response.data.rows;
            // _this.noticeList.title=response.data.title;
            // _this.noticeList.content=response.data.content;
            // _this.noticeList.published_time=response.data.published_time;
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
</style> -->