<template>
  <div  class="sindex">
      <!-- 头部  修改-->
    <index-banner ></index-banner> <!-- 登录banner banner图片修改 -->
    <index-all></index-all><!--首页banner-->
    <!-- <index-quotation></index-quotation>
    <index-about></index-about>
    <index-official></index-official> -->
    <!-- <index-news></index-news> -->
    <!-- <index-advantage></index-advantage> -->
    <index-footer></index-footer>
    <fixed></fixed>
  </div>
</template>

<script>
import indexAll from '../views/newhome/all'
import indexBanner from '../views/newhome/banner.vue'
import indexFooter from '../components/hellofoot'
import indexOfficial from '../views/newhome/official'
import indexQuotation from '../views/newhome/quotation'
import fixed from '../components/fixedright.vue'
// import indexNews from '../views/newhome/news'
import indexAdvantage from '../views/newhome/advantage'
import indexAbout from '../views/newhome/about'
import Bus from '../assets/js/bus.js'
export default {
  data(){
    return{
      contectype:false,
    }
  },
  created(){
    // _hmt.push(['_trackPageview', this.$route]);
    Bus.$on('scrollappdownload',function(){//点击App下载跳转至app下载位置
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=1600;
    });
  },
  methods:{
   
  },
  // mounted(){
  //   this.$nextTick({
  //   })
  // },
  components: {
    indexBanner,
    indexFooter,
    indexOfficial,
    // indexNews,
    indexAdvantage,
    indexAbout,
    indexQuotation,
    fixed,
    indexAll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sindex{
  background-color: rgba(250, 250, 250, 1)!important;
  /*::-webkit-scrollbar{
    display:block !important;
  }*/
}
body{
   min-width: 1200px;
   overflow-x: auto !important;
}
</style>
