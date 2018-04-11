<template>
 <div class="news">
   <div class="news_left">
     <div class="title">
       <p>最新动态</p>
       <p>NEWS</p>
     </div>
   </div>
   <div class="news_right">
     <ul>
       <li>23</li>
       <li>
         <div class="date">
           <div>2017-06-23</div>
           <div class="pointer">查看详情</div>
           <div></div>
         </div>
         <div class="cont">不以应用为目的的区块链技术都是耍流氓</div>
       </li>
     </ul>
     <ul>
       <li>15</li>
       <li>
         <div class="date">
           <div>2017-06-15</div>
           <div class="pointer">查看详情</div>
           <div></div>
         </div>
         <div class="cont">不以应用为目的的区块链技术都是耍流氓</div>
       </li>
     </ul>
     <ul>
       <li>06</li>
       <li>
         <div class="date">
           <div>2017-06-06</div>
           <div class="pointer">查看详情</div>
           <div></div>
         </div>
         <div class="cont">不以应用为目的的区块链技术都是耍流氓</div>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
</script>

<style scoped>
.news{
  width: 1200px;
  height: 320px;
  margin: 70px auto 0;
  padding-top: 20px;
  .news_left{
    float: left;
    width: 500px;
    height: 300px;
    background-color: #444;
    .title{
      float: right;
      margin-top: -20px;
      width: 160px;
      height: 120px;
      background-color: #ce181d;
      opacity: 0.7;
      color: #fff;
      font-size: 24px;
      padding-top: 30px;
      padding-right: 30px;
      text-align: right;
    }
  }
  .news_right{
    float: left;
    width: 700px;
    height: 300px;
    ul{
      width: 700px;
      height: 100px;
      text-align: left;
      padding-left: 54px;
      background-color: #eaeaea;
      li:nth-of-type(1){
        width: 130px;
        height: 100px;
        line-height: 100px;
        float: left;
        font-family: "Arial";
        font-size: 70px;
        color: #555;
      }
      li:nth-of-type(2){
        float: left;
        width: 516px;
        height: 100px;
        padding-top: 20px;
        color: #444;
        .date{
          width: 516px;
          height: 16px;
          line-height: 16px;
          div:nth-of-type(1){
            float: left;
            width: 414px;
            font-family: "Arial";
            font-size: 16px;
          }
          div:nth-of-type(2){
            float: left;
            width: 64px;
            height: 16px;
            font-size: 14px;
            color: #888;
          }
          div:nth-of-type(3){
            margin-left: 10px;
            margin-top: 4px;
            float: left;
            width: 8px;
            height: 8px;
            border: 4px solid transparent;
            border-left: 4px solid #888;
          }
        }
        .cont{
          margin-top: 20px;
          font-size: 16px;
        }
      }
    }
    ul:nth-of-type(2){
      background-color: #fff;
    }
    ul:hover{
      background-color: #ce181d;
      li{
        color: #fff;
        .date{
          div:nth-of-type(2){
            color: #fff;
          }
          div:nth-of-type(3){
            border-left-color: #fff;
          }
        }
      }
    }
  }
}

</style>
