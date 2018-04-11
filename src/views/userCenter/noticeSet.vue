<template>
  <div class="noticeSet">
    <div class="setcontent">
      <ul class="rechange">
        <li class="pleft">通知设置</li>
        <li class="pright"></li>
      </ul>
      <div class="setinfo">
        <div class="box firstbox">
          <span class="email">邮件提醒</span>
          <span class="note">短信提醒</span>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">提款已处理提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value2" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value3" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">充币到帐提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value4" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value5" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">提币申请提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value6" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value7" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">提币已处理提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value8" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value9" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">异地登录提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value10" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value11" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">app登录提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value12" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value13" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="imgleft fleft" src="../../assets/img/notice.png" alt="">
          <p class="noticetitle fleft">身份验证已通过提醒</p>
          <div class="open fright">
            <div class="isopen fleft">
              <el-switch v-model="value14" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
            <div class="isopen fleft">
              <el-switch v-model="value15" on-color="#c81118" off-color="#ccc"></el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        value2:false,
        value3:false,
        value4:false,
        value5:false,
        value6:false,
        value7:false,
        value8:false,
        value9:false,
        value10:false,
        value11:false,
        value12:false,
        value13:false,
        value14:false,
        value15:false,
      }
    }
  }
</script>
<style>
  .noticeSet{
    margin-bottom: 40px;
    .setcontent{
      width: 835px;
      margin:0 auto;
      height: 100%;
      /*.rechange{
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
      }*/
      .setinfo{
        width: 668px;
        margin: 0 auto;
        .fleft{
          float: left;
        }
        .fright{
          float: right;
        }
        .box{
          width: 100%;
          height: 78px;
          border-bottom: 1px solid #ccc;
          .imgleft{
            width: 19px;
            height: 19px;
            margin-top: 29px;
            margin-left: 35px;
          }
          .noticetitle{
            width: 140px;
            text-align: left;
            line-height: 78px;
            font-size: 14px;
            margin-left: 50px;
          }
          .isopen{
            margin: 28px 20px 28px 0;
          }
        }
        .firstbox{
          position: relative;
          font-size: 14px;
          .email{
            position: absolute;
            right: 100px;
            bottom: 10px;
          }
          .note{
            position: absolute;
            right: 20px;
            bottom: 10px;
          }
        }
      }
    }
  }
</style>