<template>
  <div>
    <index-banner></index-banner> <!-- 登录banner banner图片修改 -->
    <div class="content">
      <div class="list">
        <label>新密码：</label>
        <input type="password" name="" class="newPassword" v-model="regestpasword.password">
      </div>
      <div class="list">
        <label>重复新密码：</label>
        <input type="password" class="newNextPassword" v-model="regestpasword.password2">
      </div>
      <button class="submit" @click="resetpassword()">提交</button>
    </div>
  </div>
</template>
<script>
  import indexBanner from '../components/newheader.vue'
  import {ajax} from '../assets/js/common'
  export default {
    data(){
      return{
        regestpasword:{
          password:'',
          password2:'',
          os:'web',
          resettoken:'',
          type:'email'
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.regestpasword.resettoken = this.$route.query.resettoken;
      });
    },
    methods:{
      resetpassword(){
        let that=this;
        if(this.regestpasword.password && this.regestpasword.password2){
          ajax(this,this.extendApi.resetpassword,this.regestpasword,(response)=>{
            if(response.code == 200){
                this.$notify({
                  title: '提示',
                  message: '重置密码成功',
                  type: 'success',
                  duration:'2000'
                });
                delatecookie();
                
                // this.$emit("change");
                // this.$router.push({
                //   path: '/index'
                // });
            }else{
              this.$notify({
                title: '提示',
                message: response.message,
                type: 'error',
                duration:'2000'
              });
              delatecookie();
                // this.$emit("change");
            }
          });
          setTimeout(()=>{
            window.location.href = 'https://www.zhaobi.com';
          }, 3000);
        }else{
          this.$notify({
            title: '提示',
            message: '请输入密码',
            type: 'error',
            duration:'2000'
          });

        }
      }
    },
    components: {
      indexBanner
    }
  }
</script>
<style scoped>
  html,body{
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }
  .content{
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -200px;
    margin-top:-200px;
  }
  .list{
    height: 36px;
    line-height: 36px;
    margin-bottom: 20px;
  }
  .list label{
    display: inline-block;
    height: inherit;
    line-height: inherit;
    width: 100px;
    text-align: right;
  }
  .list input{
    height: inherit;
    width: 280px;
    line-height: inherit;
    border-radius: 5px; 
    border:1px solid #808080;
    padding-left: 10px;
  }
  .submit{
    width: 100px;
    height: 36px;
    border:0;
    line-height: 36px;
    color: #fff;
    background: #c81118;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
  }
</style>