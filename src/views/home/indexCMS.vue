<template>
  <div class="CMSlink">
    <div class="cmsbanner"></div>
    <div class="cmscontent">
      <div class="contentleft">
        <div class="title">
          <h2>网站公告</h2>
          <a class="more" href="https://news.33.cn/messages/list">更多 >></a>
        </div>
        <!-- <ul class="cmstitle">
          <li v-for="(item,index) in CMSMessage" @click="doThis(item.tid)" >
            <span>{{item.post_modified}}</span><span class="link">{{item.post_title}}</span>
          </li>
        </ul> -->
      </div>
     <!--  <div class="contentright">
        <div class="title">
          <h2>热点新闻</h2>
          <a class="more" href="https://news.33.cn/hotnews/list">更多 >></a>
        </div>
        <ul class="cmstitle">
          <li v-for="(item,index) in CMSHotnews" @click="doThis(item.tid)">
            <span>{{item.post_modified}}</span><span class="link">{{item.post_title}}</span>
          </li>
          <li>
            <span>01-19</span><span class="link">海航海平线-33复杂美区块链票据平台上线</span>
          </li>
          <li>
            <span>01-19</span><span class="link">海航海平线-33复杂美区块链票据平台上线</span>
          </li>
          <li>
            <span>01-19</span><span class="link">海航海平线-33复杂美区块链票据平台上线</span>
          </li>
          <li>
            <span>01-19</span><span class="link">海航海平线-33复杂美区块链票据平台上线</span>
          </li>
          <li>
            <span>01-19</span><span class="link">海航海平线-33复杂美区块链票据平台上线</span>
          </li>
        </ul>
      </div>
      <div class="Partner">
        <div class="title">
          <h2>合作伙伴</h2>
        </div>
        <ul>
          <li>
            <a>巴比特</a>
          </li>
          <li>
            <a>比特之家</a>
          </li>
          <li>
            <a>sososbtc</a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import api from '../../config/api-config'
import {getDataYear} from '../../assets/js/common'
  export default{
    data(){
      return{
        CMSMessage:{}

      }
    },
    mounted:function(){
      this.getCMSMessage();
     
    },
    methods:{
      getCMSMessage(){//获取网站公告内容
        var _this=this;
        this.axios.get(api.getCmsMessage,{
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;'
          }
        })
        .then(function(response){
          if(response.status==200){
            _this.CMSMessage=response.data.posts;
          }

        })
        .catch(function(error){
          console.log(error);
        })
      },
      doThis(e){//跳转链接
        var url="https://news.33.cn/details/"+e;
        window.open(url);

      },
    }
  }
</script>
<style>
  .CMSlink{
    .notify{
      w:100%;
      h:40px;
      .wrap{
        h:40px;
      }
    }
    .cmsbanner{
      width: 100%;
      height: 167px;
      background: url(../../assets/img/gg.png) no-repeat center;
    }
    .cmscontent{
      width: 1200px;
      height: 355px;
      margin:35px auto 0;
      .contentleft{
        width: 550px;
        height: 265px;
        float: left;
      }
      .contentright{
        width: 550px;
        height: 265px;
        float: right;
      }
      .title{
        border-bottom: 1px solid #e6e6e6;
        height: 34px;
        h2{
          font-size: 22px;
          color: #c81118;
          float: left;
        }
        .more{
          display: inline-block;
          float: right;
          margin:14px 20px 0 0;
        }
      }
      .cmstitle{
        width: 100%;
        height: auto;
        margin-top: 20px;
        li{
          line-height: 30px;
          height: 30px;
          font-size: 14px;
          overflow: hidden;
          color: #666;
          span{
            display: inline-block;
            overflow: hidden;
          }
          .link{
            margin-left: 10px;
            width: 475px;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 30px;
            line-height: 30px;
            position: relative;
            /*top:10px;*/
          }
        }
      }
      .Partner{
        clear: both;
        width: 100%;
        height: 40px;
        ul{
          margin-top: 20px;
          li{
            float: left;
            margin: 0 20px;
            font-size: 14px;
           a{
            color: #666;
           }
          }
        }
        /*background: #000;*/
      }
    }
  }
</style>