<template>
  <div class="settlement-box">
    <ul class="settlement">
      <li class="pleft">手续费返还</li>
      <li style="width:600px;float:left;margin-top:5px;"> 
        <el-date-picker
          type="date"
          v-model="searchData.sdate"
          format="yyyy-MM-dd"
          placeholder="选择日期" @change="searchSubmit">
        </el-date-picker>
        <el-date-picker
          class="datepicker"
          type="date"
          v-model="searchData.edate"
          format="yyyy-MM-dd"
          placeholder="选择日期" @change="searchSubmit">
        </el-date-picker>
        <el-select  placeholder="请选择状态" v-model="searchData.status" style="width:200px;" @change="searchSubmit">
          <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value" >
         </el-option>
        </el-select>

      </li>
      <li class="pright">
        <div class="settle"  @click="showdialog ">
           <p><img src="../../assets/img/balanceIcon.png" alt=""></p>
           <el-button type="text">结算</el-button>
        </div>
        <el-dialog title="确认结算" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
           <div style="text-align:center;font-size:14px" class="restore">
             <span>未返手续费天数</span>
             <span>{{num}}</span>
             <span>天，</span>
             <span>共计返佣</span>
             <span>{{total_poundage}}</span>
             <span>元</span>
           </div>
           <span slot="footer" class="dialog-footer" >
               <el-button type="primary" @click="submit" :disabled="isenable"  class="btn" >{{btnText}}</el-button>
               <el-button  @click="dialogVisible = false" class='btn' :disabled="isenable" >取 消</el-button>
           </span>
        </el-dialog>
      </li>
    </ul>
     <el-table :data="tableData" style="width: 100%"> 
        <el-table-column prop="matchdate" label="日期" width="139px"></el-table-column>
        <el-table-column prop="totalpoundage" label="总手续费" width="139px"></el-table-column>
        <el-table-column prop="poundagepre" label="返还比例" width="139px"  :formatter="formatdata" >
        </el-table-column>
        <el-table-column prop="rebackpoundage" label="实际返还" width="139px"></el-table-column>
        <el-table-column prop="statu" label="结算状态" width="139px"></el-table-column>

        <el-table-column prop="rebacktime" label="结算时间" width="139px">
          <template scope="scope">
             <span v-show="scope.row.rebacktime==''||scope.row.rebacktime==null">--</span>
              <span v-show="scope.row.rebacktime!=''&&scope.row.rebacktime!=null">{{scope.row.rebacktime |formatDate}}</span>
          </template>
         </el-table-column> 
    </el-table>
    <div class="pageblock">
        <el-pagination  :page-size="searchData.pageSize"
        layout="prev, pager, next"
        class="table__page"
        :current-page = "searchData.page"
        @current-change = "pageChange"
        :total="total"><!-- @current-change="handleCurrentChange" -->
        </el-pagination>
    </div>
  </div>
</template>
 <script>
 import { ajax,temptime} from '../../assets/js/common'
    export default {
      data() {
        return {
          tableData:[],
          total:0,
          num:'',
          isenable:false,
          total_poundage:'',
          dialogVisible: false,
          btnText:'确定',
          searchData:{
            status:'',
            sdate:'',
            edate:'',
            pageSize:23,
            page:1
          },
          options:[{
            value:'9',
            label:'未知状态'
          },{
            value:'1',
            label:'已审核'
          },{
            value:'0',
            label:' 待审核'
          },{
            value:'2',
            label:'已结算'
          },{
            value:'3',
            label:'审核未通过'
          }],
        }
      },
      filters:{
        formatDate(timestamp) {
          let format='Y-M-D';
            var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
            var FORMAT = new Object();
            FORMAT = {
              'Y': "date.getFullYear()",
              'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
              'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
              'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
              'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
              's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
            }
            for(let i in FORMAT) {
              if(format.indexOf(i) != -1) {
                format = format.replace(i, eval(FORMAT[i]));
              }
            }
            return format;
          },
      },
      mounted:function(){
        this.getUserDetail();
      },
      methods: {
        //显示弹出框
        showdialog(){
          if(this.num=='0'||this.num==0){
            this.$notify({
              title: '无可结算的数据',
              message: '无可结算的数据',
              type: 'success'
            });
          }else{
            this.dialogVisible=true;
          }
          // this.dialogVisible=true;

        },
        //格式化数据
        formatdata:function(row,column,cellValue){
          // if(cellValue!='0.00'){
          //   return Number(cellValue)*100+"%";
          // }
          // else{
          //   return 0;
          // }
          if(row.poundagepre!='0.00'){
            return Number(row.poundagepre)*100+"%";
          }else{
            return 0;
          }
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        searchSubmit(){
          this.getUserDetail();
        },
        getUserDetail(){
          let _this=this;
          this.searchData.sdate=temptime(this.searchData.sdate);
          this.searchData.edate=temptime(this.searchData.edate);
          ajax(this,this.extendApi.getUserDetail,this.searchData,function(response){
             if(response.code==200){
              _this.tableData=response.data.data;
              _this.total=Number(response.data.total);
              _this.num=response.data.stat[1].num;
              _this.total_poundage=response.data.stat[1].total_poundage;
             }
             
          },'GET')
        },
        pageChange(page){
          this.searchData.page = page;
          this.getUserDetail();
        },
        submit(){
          let _this=this;
          _this.isenable=true;
          _this.btnText="正在结算中";
          ajax(this,this.extendApi.Settle,'',function(response){
            if(response.code==200){
              _this.dialogVisible = false;
              _this.$notify({
                title: '操作成功',
                message: '结算成功',
                type: 'success'
              });
               _this.isenable=false;
            }
            else{
              _this.dialogVisible = false;
              _this.$notify.error({
                title: '操作失败',
                message: response.error
              });
              _this.isenable=false;
            }
          },'POST')
        }
      }
    }

  </script>
<style type="text/css">
  .settlement-box{
    font-size: 14px;
    width: 835px;
    height: 100%;
    margin: 0 auto;
    .settlement{
      height: 50px;
      border-bottom: 3px solid #ccc;
      .pleft{
        float: left;
        width: 96px;
        height: 50px;
        line-height: 50px;
         border-bottom: 3px solid #c81118;
      }
      .pright{
        float: right;
        
        .settle{
          width: 77px;
          height: 25px;
          background: #c81118;
          border:none;
          color: #fff;
          font-size: 12px;
          margin-top: 15px;
          border-radius: 2px;
          cursor:pointer;
          p{
            float: left;
            margin-top: 5px;
            margin-left: 10px;
          }
          button{
            height: 100%;
            border:none;
            background: #c81118;
            color: #fff;
            line-height: 0px;
            margin-left: 10px;
             cursor:pointer;
          }
        }
        .restore{
          margin-top: 30px;
          span{
            font-size: 14px;
            color: #000;
          }
        }
        .el-dialog--tiny {
          width: 500px;
          height: 265px;
          .el-dialog__footer{
            padding-top: 50px;
            text-align: center;
          }
          .btn{
            width: 108px;
            height: 35px;
          }
        }
      }
    }
    .pageblock{
     margin-top: 50px;
    text-align: center;
    border-radius: 0px;
    }
  }
</style>