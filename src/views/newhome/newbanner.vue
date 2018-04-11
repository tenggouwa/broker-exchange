<template>
  <!--新的banner-->
  <div class="banner">
    <el-button-group><!--登录按钮-->
      <el-button type="primary">手机登录</el-button>
      <el-button type="primary">邮箱登录</el-button>
    </el-button-group>
    <el-form :model="loginForm">
      <el-form-item  prop="loginname">
        <el-input type="text" v-model="loginForm.loginname" ></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="11"><a >注册</a></el-col>
        <el-col :span="11"><a>忘记密码</a></el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        loginForm:{
          loginname:'',
          password:''
        },
      }
    }
  }
</script>
<style>
  .banner{
    width: 300px;
    margin: 20px;
  }
</style>