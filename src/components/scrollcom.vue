<template>
  <div class="proess" @click="iscanchange()">
    <div class="range" :class="bgclass" id="sellSlider"><!-- 买单滑动杆 -->

      <span class="sellPercent colormoney" v-if="showcionType=='WTC'">剩余{{nextnum}} WDT</span>
      <span class="sellPercent colormoney" v-if="showcionType=='NYCC'">剩余{{nextnum}} YCC</span>
      <span class="sellPercent colormoney" v-if="showcionType!='NYCC' && showcionType!='WTC'">剩余{{nextnum}} {{showcionType}}</span>
      <el-slider v-model="proessNumber" :step="1" @change="scroll"></el-slider>
      <div class="comcrice onec stop" @click="changeproess(0)" :class="{'criceactive':proessNumber>0}"></div>
      <div class="comcrice twoc stop" @click="changeproess(25)" :class="{'criceactive':proessNumber>25 || proessNumber==25}"></div>
      <div class="comcrice threec stop" @click="changeproess(50)" :class="{'criceactive':proessNumber>50 || proessNumber==50}"></div>
      <div class="comcrice fourc stop" @click="changeproess(75)" :class="{'criceactive':proessNumber>75 || proessNumber==75}"></div>
      <div class="comcrice fivec stop" @click="changeproess(100)" :style="[{'left':lastleng+'px'}]" :class="{'criceactive':proessNumber>100 || proessNumber==100}"></div>
    </div>
    <div class="row-control fn-clear numtop">
      <span v-show="showcoin=='BTC'" id="bty-cost"><i class="iconfont icon-BTC3"></i>{{coastnum}} {{showcoin}} ≈ <span v-show="bgclass=='range_buy'">¥{{rmbbuymoney}} </span><span v-show="bgclass=='range_sell'">¥{{rmbsellmoney}} </span></span>
      <span v-show="showcoin!='BTC'" id="bty-cost"><i class="iconfont icon-USDT3"></i>{{coastnum}} {{showcoin}} ≈ <span v-show="bgclass=='range_buy'">¥{{rmbbuymoney}} </span><span v-show="bgclass=='range_sell'">¥{{rmbsellmoney}} </span></span>
      <span id="bty-remain" style="float:right;">{{proessNumber}}%</span>
    </div>
  </div>
</template>
<script>
  import {ajax, getusdtrate} from '../assets/js/common'
  export default{
    //proessnum滑动条滑动的长度，coastnum消耗的数量，nextnum剩余的数量,showcionType显示的币种类型,bgclass用于控制滚动条的背景色
    props:['proessnum','coastnum','nextnum','showcionType','proessbg','bgclass','lastleng','showcoin','newprice'],
    data(){
      return{
        proessNumber:0,
        usemon:0,
        rmbbuymoney:0,
        rmbsellmoney:0,
      }
    },
    filters:{
      formatCoin:function(dev){
        if(dev.indexOf('USDT')>0){
          return dev.substr(0,dev.length-4);
        }else{
          return dev.substr(0,dev.length-3);
        }
        
      },
    },
    watch:{
      // coastnum:function(val){

      //   this.usemon=parseFloat(val).tofixed(2);
      // },
      proessnum:function(val){
        if(isNaN(val)){
          this.proessNumber=0;
        }else{
          this.proessNumber=val;
        }
      },
    },
    mounted(){
      let _this=this;
      this.proessNumber=this.proessnum; 
      this.getrmbmoney();

    },
    
    methods:{
      //获取rmb价格
      getrmbmoney(){
        let _this=this;
        ajax(this,this.extendApi.getUsdtrate,'',(res)=>{
          if(res.code == 200){
            if(_this.showcoin=="BTC"){
              _this.rmbbuymoney=parseFloat(Number(res.data.usdbuy)*Number(this.coastnum)*Number(this.newprice)).toFixed(2);
              _this.rmbsellmoney=parseFloat(Number(res.data.usdsell)*Number(this.coastnum)*Number(this.newprice)).toFixed(2);
            }else{
              _this.rmbbuymoney=parseFloat(Number(res.data.usdbuy)*Number(this.coastnum)).toFixed(2);
              _this.rmbsellmoney=parseFloat(Number(res.data.usdsell)*Number(this.coastnum)).toFixed(2);
            } 
          }
        },'GET')
      },
      iscanchange(){
        this.$emit('proessClick');
      },
      scroll(){
        this.$emit('change',this.proessNumber);
         this.getrmbmoney();
      },
      changeproess(val){
        this.proessNumber=val;
        this.getrmbmoney();
      },
      clickscroll(val){
        this.getrmbmoney();
      },
    },
  }
</script>
<style scoped>
  .sellPercent{
    display: inline-block;
    width: 100%;
    text-align: right;
  }
  .icon-BTC3,.icon-USDT3{
    font-size: 12px;
  }
</style>