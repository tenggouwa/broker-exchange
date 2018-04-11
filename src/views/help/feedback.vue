<template>
  <div class="feedback-box">
    <h5 class="tt">
      问题反馈
    </h5>
    <p class="tip">描述<span style="color:red;">*</span></p>
    <el-input
      class="e-input"
      type="textarea"
      :rows="7"
      placeholder="请输入内容"
      v-model="feedlist.message">
    </el-input>
    <p class="tip1">请输入问题描述，我们的工作人员将尽快答复您。</p>
    <p class="tip2">附件</p>
    <!-- :before-upload="beforeAvatarUpload" -->
    <el-upload 
      class="upload-demo" 
      :action="feedbackUrl" 
      :on-preview="handlePreview" 
      :on-remove="handleRemove" 
      :on-success="handsuccess"
      multiple
      :file-list="fileList" 
      :auto-upload="true"
      style="margin-left:40px;"
      >
      <img src="../../../src/assets/img/添加.png" height="25" width="25">
      <em style="color:#039;">添加图片</em>或把文件拖放到这里
    </el-upload>
    <button class="submit-btn" @click="sumbitfeedback()">提交</button>
  </div>
</template>

<script>
import api from '../../config/api-config'
import { ajax,setcookie,getcookie} from '../../assets/js/common'
  export default {
    data() {
      return {
        value: '',
        feedlist:{
          mark:'d5ee52b1-7dcb-43b5-ae4b-cd4b889c5462',
          identification:'',
          name:'',
          email:'',
          mobile:'',
          title:'',
          message:'',
          upload_id:[],
        },
        fileList:[],
        feedbackUrl:this.extendApi.feedbackUrl,//上传图片地址
      }
    },
    computed:{
      header(){
        return{
          'FZM-Ca-AppKey':'zhaobi'
        }
      }
    },
    methods:{
      handleRemove(file, fileList) {
        let _this=this;
        this.feedlist.upload_id.pop(file.response.id);
        let url=this.extendApi.feedbackUrl+'/'+file.response.id;
        this.axios({
          method: "DELETE",
          url: url,
        }).then((response) => {
          if(response.status==204){
            _this.$notify({
              name: 'success',
              message: '删除成功',
              type: 'success',
              duration: '2000'
            });
          }
        },(err)=>{
          _this.$notify({
            title: '删除失败',
            message: err.response.data[0].message,
            type: 'error',
            duration: '2000'
          });
        })

      },
      handlePreview(file) {
        this.fileList.myfile=file;
      },

      handleChange(file, fileList) {
        if(this.beforeAvatarUpload(file)==false){
          return false;
        }
        let param = new FormData();
        param.append('file',file);
        this.submitUpload(param);
      },
      handsuccess(res,fileList){
        this.feedlist.upload_id.push(res.id);
        this.$notify({
          title: 'success',
          message: "图片上传成功！",
          type: 'success',
          duration: '2000'
        });
      },
      submitUpload(param){
        ajax(this,this.extendApi.feedbackUrl,param,(response)=>{
          if(response.code==200){
            this.$notify({
              title: 'success',
              message: "图片上传成功！",
              type: 'success',
              duration: '2000'
            });
          }else{
             this.$notify({
              title: '提示',
              message: "图片上传失败",
              type: 'error',
              duration: '2000'
            });
          }
        })

      },
      sumbitfeedback(){
        let _this=this;
        _this.feedlist.identification=getcookie('id');
        this.axios({
          method: "POST",
          url: _this.extendApi.createFeedback,
          data: _this.feedlist,
        }).then((response) => {
          if(response.status==201||response.status==200){
            _this.$notify({
              name: 'success',
              message: '反馈内容已提交，我们会尽快处理！',
              type: 'success',
              duration: '2000'
            });
            _this.fileList=[];
            _this.feedlist.message='';

          }
        },(err)=>{
          _this.fileList=[];
          _this.feedlist.message='';
          _this.$notify({
            title: '提交失败',
            message: err.response.data[0].message,
            type: 'error',
            duration: '2000'
          });
        })
      }
    },
  }
</script>

<style type="text/css">
.el-upload-list__item-name{
  display: inline-block;
  margin-left: 40px;
}
.feedback-box{
  .tip{
    font-size: 14px;
    color: #333;
    line-height: 14px;
    padding:15px 0;
    margin-left: 40px;
  }
  .e-input{
    width: 620px;
    border-radius: 2px;
    margin-left: 40px;
  }
  .tip1{
    font-size: 12px;
    color: #999;
    line-height: 14px;
    padding:15px 0;
    margin-left: 40px;
  }
  .tip2{
    font-size: 14px;
    color: #333;
    line-height: 14px;
    margin-left: 40px;
    padding-bottom: 20px;
  }
  .submit-btn{
    width: 150px;
    height: 40px;
    background: #e61f19;
    border-radius: 2px;
    margin-left: 510px;
    margin-top: 38px;
    margin-bottom: 77px;
    font-size: 14px;
    color: #fff;
    border: none;
  }
  .submit-btn:hover{
    background: #f00;
  }
  img{
    float:left; 
    margin-top:5px;
    margin-left:200px;
  }
  em{
    color: #039;
    margin-left: 10px;
    font-style:normal; 
    height:30px; 
    line-height:30px;
    margin-left:-200px;
  }
}
.el-upload .el-upload-dragger {
  height: 35px !important;
  width: 620px !important;
  border: 1px solid #BFCBD9 !important;
}
</style>