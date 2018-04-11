<template>
  <div class="footer">
    <div class="cont">
      <div class="footer_left">
        <!-- <div class="title">联系我们</div> -->
        <!-- <div class="info">
          <ul>
            <li>客服热线：<span>400-1566-899</span></li>
            <li>微信咨询：<span>yfx0323</span></li>
            <li>官方邮箱：<span>support@licai.cn</span></li>
          </ul>
          <ul>
            <li>客服QQ：<span class="special">4001566899</span></li>
            <li>官方QQ群1：<span>345106800</span></li>
            <li>官方QQ群2：<span>545967811</span></li>
          </ul>
        </div> -->
        <p class="prompt">温馨提示：数字资产是创新的投资产品，价格波动较大，具有较高的投资风险，有资产归零的可能，
          请您投资前对数字资产充分认知，理性判断自己的投资能力，审慎做出投资决策。</p>
        <router-link to="/help/risk">
          <span style="color:#fff">风险提示</span>
        </router-link>
        <a style="margin-left:30px;color:#fff;cursor: pointer;" target="_blank" @click="dialogshow" >客服支持</span></a>
      </div>
      <!-- <div class="footer_right">
        <router-link class="title" to="/help/feedback">意见反馈</router-link>
        <input type="text" placeholder="姓名" class="input" />
        <br />
        <input type="text" placeholder="邮箱" class="input" />
        <br />
        <textarea placeholder="反馈" class="input input_area" />
        <br />
        <input type="button" value="提交" class="btn submit_btn"  @mousedown="addClass" @mouseup="removeClass" />
      </div> -->
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  methods:{
    addClass(){
      var elem = document.getElementsByClassName("submit_btn")[0];
      elem.classList.add("btn_click");
    },
    removeClass(){
      var elem = document.getElementsByClassName("submit_btn")[0];
      elem.classList.remove("btn_click");
    },
    dialogshow(){
      this.$alert('资询客服需要通过大型社交应用Slack，您需要使用邮箱注册Slack后才能获取帮助。','提示',{
        confirmButtonText:'前往注册',
        callback:  (action, instance) => {
          if(action=='confirm'){

           window.open('https://join.slack.com/t/fxeework/shared_invite/enQtMjUzMTUxMTg3NzEyLTAyMGM1YTU5NmEzYWRjNWE2ZjYxYzU4YjE3ZTcxZjRjMGM3YzE5ZWRkMjA1ZWVhYjA5MjYyZGY3ODVlZjg5NDk');
          }
          if(action=='cancel'){
            instance.confirmButtonLoading = false;
          }
        }
      });
    },
  },
}

</script>

<style scoped>
.footer{
  width: 100%;
  height: 100px;
  background-color: #343434;
  margin-top: 70px;
  /*padding-top: 10px;*/
  color: #888;
  font-size: 14px;
  text-align: left;
  .title{
    color: #fff;
    margin-bottom: 10px;
  }
  .cont{
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    padding-top: 10px;
    .footer_left{
      float: left;
      width: 550px;
      .info{
        width: 550px;
        height: 60px;
        ul{
          float: left;
          width: 270px;
          height: 90px;
          color: #b0b0b0;
          margin-bottom: 60px;
          li{
            height: 20px;
            margin-bottom: 10px;
            span{
              font-family: "Arial";
              font-weight: bold;
              font-size: 16px;
            }
            .special{
              margin-left: 22px;
            }
          }
        }
      }
      p{
        margin-bottom: 20px;
      }
      .prompt{
        font-size: 12px;
      }
    }
    .footer_right{
      width: 300px;
      float: right;
      .title{
        display: inline-block;
        margin-bottom: 10px;
      }
      .input{
        width: 300px;
        height: 34px;
        margin-bottom: 10px;
        padding-left: 10px;
        background-color: #414141;
        border: 0;
        color: #b0b0b0;
      }
      .input_area{
        height: 100px;
        resize: none;
        overflow:hidden;
        padding-top: 5px;
      }
      .btn{
        float: right;
        width: 100px;
        height: 30px;
        border: 2px solid #414141;
        background-color: #343434;
        color: #666;
      }
      .btn:hover{
        color: #fff;
        background-color: #888;
        border-color: #888;
      }
      .btn_click,.btn_click:hover{
        color: #a5a5a5;
        background-color: #666;
        border-color: #666;
      }
    }
  }

::-webkit-input-placeholder { color:#888;font-size:14px; }
::-moz-placeholder { color:#888;font-size:14px; } /* firefox 19+ */
:-ms-input-placeholder { color:#888;font-size:14px; } /* ie */
input:-moz-placeholder { color:#888;font-size:14px; }
}
</style>
