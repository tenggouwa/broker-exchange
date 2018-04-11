<template>
  <div class="notice-box">
    <div>
      <h2>平台公告</h2>
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
        noticeList:'',
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
        let _this=this;
        this.axios.get(this.extendApi.getNewList,{
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;'
          },
          params: '',
        })
        .then(function(response){
          if(response.status==200){
            if(response.data.data.count>=1){
              _this.noticeList=response.data.data.rows;
            }
          }
        })
        .catch(function(error){
          console.log(error);
        })
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