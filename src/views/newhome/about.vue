<template>
  <div class="about">
    <ul class="pointer">
      <li v-for="(item,index) in imglist" @click="goTradeLink(index)" class="coinlist">
        <svg v-if="index=='DCR'" class="icon" aria-hidden="true"  >
          <use  xlink:href="#icon-DCR3"></use>
        </svg>
        <i v-if="index!='DCR'" class="iconfont"  :class=" 'icon-'+index+'3'"></i>
        <p>{{index}}</p>
      </li>
      <li class="Xnicoin" style="padding-left:0px;">
        <img width="960px" src="static/img/home/about3.png" />
      </li>
    </ul>
  </div>
</template>

<script>
export default{
  data(){
    return{
      imglist:{
        USDT:{},
        BTC:{},
        BTY:{},
        // YCC:{},
        BCC:{},
        ETH:{},
        ETC:{},
        ZEC:{},
        LTC:{},
        BTS:{},
        SC:{},
        DCR:{},
      }
    }
  },
  methods:{
    goTradeLink(router){
      let routerlink='/help/coinIntroduce';
      this.$router.push({
        path:routerlink,
        query:{ciontype:router},
      });
    }
  },
}
</script>

<style scoped>
.about{
  margin:15px auto 0px;
  width: 1200px;
  height: 600px;
  /*margin-top: -90px;*/
  ul{
    width: inherit;
    height: 400px;
    background-color: #fff;
    li{
      width: 240px;
      height: 200px;
      float: left;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      padding-top: 40px;
      font-family: "Arial";
      /*font-weight: bold;*/
      font-size: 20px;
      background-color: #fff;
      opacity: 1;filter:alpha(opacity=100);
      text-align: center;
      transition: all 0.2s ease 0s;
      -moz-transition: all 0.2s ease 0s;
      -webkit-transition: all 0.2s ease 0s;
      -o-transition: all 0.2s ease 0s;
      img{
        margin-bottom: 10px;
      }
    }
    .coinlist:hover{
      -ms-transform:scale(1.18,1.18); /* IE 9 */
      -webkit-transform: scale(1.18,1.18); /* Safari */
      transform: scale(1.18,1.18); /* 标准语法 */
      &:nth-of-type(1){
        -moz-box-shadow: 0 0 30px #ff8f21; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #ff8f21;
        box-shadow: 0 0 30px #ff8f21;
      }
      &:nth-of-type(2){
        -moz-box-shadow: 0 0 30px #e6ac00; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #e6ac00;
        box-shadow: 0 0 30px #e6ac00;
      }
      &:nth-of-type(3){
        -moz-box-shadow: 0 0 30px #e14f55; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #e14f55;
        box-shadow: 0 0 30px #e14f55;
      }
      &:nth-of-type(4){
        -moz-box-shadow: 0 0 30px #09afd8; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #09afd8;
        box-shadow: 0 0 30px #09afd8;
      }
      &:nth-of-type(5){
        -moz-box-shadow: 0 0 30px #ec712e; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #ec712e;
        box-shadow: 0 0 30px #ec712e;
      }
      &:nth-of-type(6){
        -moz-box-shadow: 0 0 30px #3dabcb; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #3dabcb;
        box-shadow: 0 0 30px #3dabcb;
      }
      &:nth-of-type(7){
        -moz-box-shadow: 0 0 30px #47ad50; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #47ad50;
        box-shadow: 0 0 30px #47ad50;
      }
      &:nth-of-type(8){
        -moz-box-shadow: 0 0 30px #366bb2; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #366bb2;
        box-shadow: 0 0 30px #366bb2;
      }
      &:nth-of-type(9){
        -moz-box-shadow: 0 0 30px #6353b3; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #6353b3;
        box-shadow: 0 0 30px #6353b3;
      }
      &:nth-of-type(10){
        -moz-box-shadow: 0 0 30px #7fb131; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #7fb131;
        box-shadow: 0 0 30px #7fb131;
      }
      &:nth-of-type(11){
        -moz-box-shadow: 0 0 30px #0ea48a; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #0ea48a;
        box-shadow: 0 0 30px #0ea48a;
      }
      &:nth-of-type(12){
        -moz-box-shadow: 0 0 30px #1f579c; /* 老的 Firefox */
        -webkit-box-shadow: 0 0 30px #1f579c;
        box-shadow: 0 0 30px #1f579c;
      }
    }
  }
  .Xnicoin{
    width: 960px;
    padding-top: 0;
  }
  ul:nth-of-type(1){
    li:nth-of-type(1){
      color: #ff8f21;
    }
    li:nth-of-type(2){
      color: #e6ac00
      /*color: #ec712e;*/
    }
    li:nth-of-type(3){
      color: #e14f55;
      /*color: #3dabcb;*/
    }
    li:nth-of-type(4){
      color: #09afd8;
      /*color: #3dabcb;*/
    }
    li:nth-of-type(5){
      color: #ec712e;
      /*color: #47ad50;*/
    }
    li:nth-of-type(6){
      color: #3dabcb;
      /*color: #6353b3;*/
    }
    li:nth-of-type(7){
      color: #47ad50;
      /*color: #366bb2;*/
    }
    li:nth-of-type(8){
      /*float: right;*/
      color: #366bb2;
      /*color: #ff8f21;*/
    }
    li:nth-of-type(9){
      /*float: right;*/
      color: #6353b3;
    }
    li:nth-of-type(10){
      /*float: right;*/
      color: #7fb131;
    }
    li:nth-of-type(11){
      /*float: right;*/
      color: #0ea48a;
    }
    li:nth-of-type(12){
      float: right;
      color: #1f579c;
    }
    
  }
}
svg{
  width:60px;
  height: 60px;
  margin: 15px 0px;
  vertical-align:middle;
 /* margin-top: 5px;*/
}
.icon-BTC3,.icon-ETC3,.icon-ETH3,.icon-USDT3,.icon-ZEC3,.icon-LTC3,.icon-BCC3,.icon-BTY3,.icon-YCC3,.icon-BTS3,.icon-SC3,.icon-BTCS3{
   font-size: 60px;
}
</style>
