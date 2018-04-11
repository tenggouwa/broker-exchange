<template>
  <div id="fixedwrap" >
    <div class="onlinefw" :class="{'canshowes':scanview}" @click="toggleshow"><br/>在<br/>线<br/>客<br/>服</div>
    <div class="fixed" :class="{'canshow':scanview}">
      <ul class='mike'>
        <li><a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1"><img src="../../static/img/qq.png" alt=""></a></li>
      </ul>
      <ul class='mike'>
        <li><a><img src="../../static/img/weixin.png" height="144" width="120" alt=""></a></li>
      </ul>
      <ul class='mike'>
        <li><a target="_blank"><img src="../../static/img/weixin1.png" alt=""></a></li>
      </ul>
      <ul class='mike'>
        <li><a target="_blank"><img src="../../static/img/pwallet.png" alt=""></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isnone:1,
      fixhtype:'',
      wxShow:false,
      scanview:false,
    }
  },
  methods:{
     close(){
      this.isnone=0;
     },
     toggleshow(){
      this.scanview=!this.scanview;
     },
  }
}
</script>
<style scoped>
  #fixedwrap{
    margin: 0 auto;
    width: 1000px;
    position: relative;
  }
  .onlinefw{
    width: 24px;
    height: 120px;
    position: fixed;
    top:59%;
    margin-top: -95px;
    background: #c81118;
    right: 140px;
    color: #fff;
    font-size: 14px;
    padding: auto;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    cursor: pointer;
    display: table-cell;
    line-height: 20px;
    vertical-align:middle;
    text-align: center;
    z-index: 400;
  }
  .fixed{
    position: fixed;
    right: 0px;
    top:200px;
    z-index: 400;
    width: 140px;
    height: auto;
    border-radius: 5px;
    background: rgba(206, 24, 29, 1);
    .close{
      position: absolute;
      right: -7px;
      top:-7px;
    }
    ul{
      float: left;
      li{
        float: left;
      }
    }
    ul:nth-child(1){
      li:nth-child(1){
         margin: 10px 10px 0px;
      }
    }
    ul:nth-child(2),ul:nth-child(3){
      li:nth-child(1){
         margin: 5px 10px 0px;
      }
    }
    ul:nth-child(4){
      li:nth-child(1){
         margin: 5px 10px 5px;
      }
    }
    .mike{
      img{
        max-width:120px; 
         _width:expression_r(this.width<120px?"auto":"120px"); 
      }
    }
   .indexphone{
    width: 125px;
    height: 66px;
    border-bottom: 1px solid #e6e6e6;
    li:nth-child(2){
      margin-left:10px;
      line-height: 20px;
    }
    li:nth-child(3){
      width: 125px;
      height: 40px;
      background-size: cover;
      font-size: 13px;
      color: #333;
      text-align: left;
      line-height: 25px;
      margin:11px 3px;
      a{
        font-size: 13px;
        color: #fff;
      }
      span{
        float: left;
        font-size: 12px;
      }
    }
    .qqgroup{
       line-height: 20px!important;
    }
    li:nth-child(1){
      margin-left: 2px;
    }
    .fixedcode{
      position: absolute;
      left: 20px;
    }
   }
   .wx{
    border-bottom: none;
    .weixinhover{
      cursor: pointer;
    }
    li{
      line-height: 14px;
    }
   }
  }
  .canshow{
    right: -140px;
    
  } 
  .canshowes{
    right: 0;
  }
</style>

