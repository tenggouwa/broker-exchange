<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  /*height: 100%;*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgba(240, 240, 240, 1);
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
html{
  font:12px/1.5 Microsoft YaHei,tahoma,arial,\5b8b\4f53;
  color: #666;
  height: 100%;
}
body{
  height: 100%;
  margin: 0;
  /*scroll:none;*/
  
}
a{
  text-decoration: none;
}
ul{
  margin: 0;
  border: 0;
  padding: 0;
}
li{
  list-style: none;
}
.el-loading-spinner{
  .path{
    stroke:#c81118!important;
  }
}
.rechange{
  height: 50px;
  li{
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #000;
  }
  .pleft{
    width: 96px;
    border-bottom: 3px solid #c81118;
  }
  .pright{
    width:739px;
    border-bottom: 3px solid #ccc; 
  }
}

scrollbar-arrow-color: rgba(15,15,15,15); 
scrollbar-face-color: rgba(15,15,15,15); 
scrollbar-3dlight-color: rgba(15,15,15,15); 
scrollbar-highlight-color: rgba(15,15,15,15); 
scrollbar-shadow-color: rgba(15,15,15,15); 
scrollbar-darkshadow-color: rgba(15,15,15,15); 
scrollbar-track-color: rgba(15,15,15,15); 
scrollbar-base-color:rgba(15,15,15,15); 
/*scrollbar{
  display: none;
}
::-webkit-scrollbar  
  {  
    width: 6px;  
    height: 6px;  
    background-color: #F5F5F5; 
    border-radius: 10px; 
  } */ 
    
  /*定义滚动条轨道 内阴影+圆角*/  
 /* ::-webkit-scrollbar-track  
  {  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
  } */ 
    
  /*定义滑块 内阴影+圆角*/  
  /*::-webkit-scrollbar-thumb  
  {  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #555;  
  }*/
</style>
