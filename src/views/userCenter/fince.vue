<template>
  <div class="fince">
    <ul class="rechange">
      <li class="pleft">我的资产</li>
      <li class="pright"></li>
    </ul>
    <div class="coinnum" v-loading="finceloading" :element-loading-text="loadingtext">
      <ul>
        <li class="typecoin" v-for="(item,index) in myAssetsList" v-if="index != 'CNY'">
          <ul class="moneyinfo">
            <li class="logoli ETHimg">
              <svg v-if="index=='DCR'" class="icon" aria-hidden="true"  >
                <use  xlink:href="#icon-DCR3"></use>
              </svg>
              <i v-if="index!='DCR'" class="iconfont" :class=" 'icon-'+index+'3'"></i>
              <p>{{index|filIndex}}</p>
            </li>
            <li class="mycoinli">
              <p class="cnum">{{myAssets['available'+index+'coin']}}</p>
              <p class="contitle">可用{{index|filIndex}}</p>
            </li>
            <li class="mycoinli">
              <p class="cnum comnum noone">{{myAssets['frozen'+index+'coin']}}</p>
              <p class="contitle">冻结{{index|filIndex}}</p>
            </li>
            <li class="mycoinli">
              <p class="cnum comnum noone">{{myAssets[index+'total']}}</p>
              <p class="contitle">总{{index|filIndex}}</p>
            </li>
            <li v-if="index=='USDT'" class="rechangeli">
              <span @click="getcoinIn()">C2C充币</span>
            </li>
            <li v-if="index=='USDT'" class="buttonli">
              <span class="bbefore" @click="UsdtT(myAssets['available'+index+'coin'],index)">C2C提币</span>
              <!-- <span class="bnext" @click="Administration(index,'C2C')">账号管理</span> -->
            </li>
            <li v-if="index=='BTY'||index=='YCC'||index=='BTCS'" class="rechangeli">
              <span @click="rechangecoin(index)" style="background:#ccc;">充币</span>
            </li>
            <li v-if="index=='BTY'||index=='YCC'||index=='BTCS'" class="buttonli">
              <span class="bbefore" style="background:#ccc;" @click="getmycoin(0,index)">提币</span><span class="bnext" @click="Administration(index,1)">地址管理</span>
            </li>
            <li v-if="index!='USDT'&&index!='BTY'&&index!='YCC'&&index!='BTCS'" class="rechangeli">
              <span @click="rechangecoin(index)">充币</span>
            </li>
            <li v-if="index!='USDT'&&index!='BTY'&&index!='YCC'&&index!='BTCS'" class="buttonli"><span class="bbefore" @click="getmycoin(0,index)">提币</span><span class="bnext" @click="Administration(index,1)">地址管理</span></li>
          </ul>
        </li>
        <li class="typecoin">
          <p class="all">
            <img src="../../assets/img/fianceico.png" alt="">
            <span>账户资产总和:&nbsp;&nbsp;{{myAssets.valuation}} CNY </span>
          </p>
        </li>  
      </ul>
    </div>
    <ul class="rechange">
      <li class="pleft">历史记录</li>
      <li class="pright"></li>
    </ul>
    <div class="conselect">
      <ul>
        <li  class="first" :class="{active:coinname==11}" @click="gethistory('USDT',11,1)">USDT</li>
        <li :class="{active:coinname==5}" @click="gethistory('BTC',5,1)">BTC</li>
        <li :class="{active:coinname==12}" @click="gethistory('BTY',12,1)">BTY</li>
        <!-- <li :class="{active:coinname==13}" @click="gethistory('YCC',13,1)">YCC</li> -->
        <li :class="{active:coinname==10}" @click="gethistory('BCC',10,1)">BCC</li>
        <li :class="{active:coinname==2}" @click="gethistory('ETH',2,1)">ETH</li>
        <li :class="{active:coinname==3}" @click="gethistory('ETC',3,1)">ETC</li>
        <li :class="{active:coinname==7}" @click="gethistory('ZEC',7,1)">ZEC</li>
        <li :class="{active:coinname==9}" @click="gethistory('LTC',9,1)">LTC</li>
        <li :class="{active:coinname==15}" @click="gethistory('DCR',15,1)">DCR</li>
        <li :class="{active:coinname==13}" @click="gethistory('BTS',13,1)">BTS</li>
        <li :class="{active:coinname==14}" @click="gethistory('SC',14,1)">SC</li>
        <!-- <li :class="{active:coinname==12}" @click="gethistory('BTCS',12,1)">BTCS</li> -->
        <!-- <li class="BTYcoin"></li> -->
      </ul>
      <ul>
        <li :class="{active:listtype==1}" @click="gethistory('all',1,2)" class="whole">全部</li>
        <li :class="{active:listtype==2}" @click="gethistory('in',2,2)">充币</li>
        <li :class="{active:listtype==3}" @click="gethistory('out',3,2)">提币</li>
        <li class="last">
          <el-date-picker v-model="coinlistparam.stime" type="date" format='yyyy-MM-dd' placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
          <el-date-picker v-model="coinlistparam.etime" type="date" format='yyyy-MM-dd' placeholder="选择日期"></el-date-picker>
          <span class="seach" @click="seach()">查询</span>
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>币种</th>
            <th>类型</th>
            <th>金额</th>
            <th v-if="hiscointype!='rmb'">矿工费</th>
            <th class="tradedd" v-if="hiscointype=='rmb'">银行卡号/支付宝订单号后8位</th>
            <th class="tradedd" v-else>标签/地址</th>
            <th class="time">申请时间</th>
            <th>当前状态</th>
            <th class="time">完成日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coninListHistory">
            <td>{{item.id}}</td>
            <td v-if="hiscointype=='rmb'">人民币</td>
            <td v-else>{{coinlistparam.currency}}</td>
            <td>{{item.type}}</td>
            <td>{{item.amount}}</td>
             <td v-if="hiscointype!='rmb'">{{item.txfee}}</td>
            <td class="tradedd" v-if="hiscointype=='rmb'">{{item.bankcard}}</td>
            <td class="tradedd" v-else>{{item.label==''?item.address:item.label}}</td>
            <td class="time">{{item.addtime}}</td>
            <td>{{item.states}}</td>
            <td class="time">{{item.dealtime==''?'--':item.dealtime}}</td>
            <td v-if="item.statu=='6'" ><button class="autobtn" @click='tipface()'>人脸认证</button></td>
            <td v-if="item.statu!='6'" ></td>
          </tr>
        </tbody>
      </table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :page-size="15" :total="listatotal" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <fince-rechange :mrechange='mrechange' :mycoinadress="mycoinadress" :clickcoin="clickcoin":cointype="cointype":memo="MEMO" ></fince-rechange>
    <el-dialog :title="cointype+'提币'" v-model="dialogshow[0]" class='btn'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <el-form :model="getcoinparam" label-width="100px">
      <el-form-item label="提币地址 :" class="mybank">
        <div class="bankboxs" :class="{'addbankactive':isaddbank==1}">
          <span class="elicon el-icon-caret-bottom coinicon" @click='addbank()' style='cursor: pointer;'></span>
          <div class="bankname" >{{getcoinparam.label}}</div>
          <input class="addbank" readonly   v-model="getcoinparam.address"/>
          <div class="historybank" v-show="isaddbank==1">
            <div class="historylist"  
            @click="selectadree(item.id,item.address,item.label,item)" 
            v-for="(item,index) in hiscoinlist">
            <div style="float:left" class='bname'>{{item.label}}</div>
            <div class="hisadress">{{item.address}}</div>
            </div>
            <div class="addnewbank" @click="goaddress()">添加地址</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="MEMO :" v-show="cointype=='BTS'">
        <el-input v-model="getcoinparam.memo" class="moremany" disabled></el-input>
      </el-form-item>
      <el-form-item label="提币数量 :">
        <el-input v-model="getcoinparam.amount" class="moremany"></el-input>
      </el-form-item>
      
      <el-form-item label="矿工费 :">
          <el-select v-if="Minerfeelist.length>0" v-model="getcoinparam.txfee" placeholder="请选择">
            <el-option
              v-for="item in Minerfeelist"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input v-if="Minerfeelist.length == 0" class="moremany":disabled="true" v-model="getcoinparam.txfee" ></el-input>
        </el-form-item>
        <el-button type="primary" class="subbutton" @click="gogetcoin()" v-loading="showtip" element-loading-text="提币提交中">确认提币</el-button>
        <div class="constent">
          <p class="title">温馨提示 : </p>
          <p class="coninfo">1.提币到账时间取决于接收方对确认数的要求，详细情况可查询区块链。</p>
          <p class="coninfo">2.提币前请务必确认提币地址的正确性，如若发生错误请联系客服寻求帮助；</p>
          <p class="coninfo">3.如果48小时后依然未收到款项，请及时联系我们。</p>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :title="cointype+'提币'" v-model="dialogshow[2]" :close-on-click-modal="false" class='btn'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <p class="coininfo"> 
        <span>提币数量 :{{getcoinparam.amount}}{{cointype}}</span>
        <!-- <a class="update" @click="updateCoin()">编辑</a> -->
      </p>
      <div class="coininfo">
        <div class="comAdress">
          <span class="spanAdreess">提币地址 :{{getcoinparam.address}}</span>
          <p class="adressHover">{{getcoinparam.address}}</p>
        </div>
        <!-- <a class="update" @click="updateCoin()">编辑</a> -->
      </div>
      <div class="lastgetcoin">
        <label>获取验证码</label>
         <div class="anniu">
          <div class="canniu crleft" :class="{'active':isphoneselect==true}"  @click="selectype('phone')">获取手机验证码</div>
          <div class="canniu cright" :class="{'active':isemailselect==true}"   @click="selectype('email')">获取邮箱验证码</div>
        </div>
      </div>
     
      <div class="lastgetcoin">
        <label>验证码:</label>
        <input class="inputcode" v-model="getcoinparam.code" type="text"></input>
        <el-button class="codeButton" @click="getYZM('withdraw_coin',1,selecType)" :disabled="isenabled">{{codenum}}</el-button>
      </div>
      <p v-show="notfirstget" class="lastgetcoin-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
      <el-button class="submitcode"  :loading="getcionloading" @click="getlastcoin()">提币</el-button>
      <!-- <button  @click="getlastcoin()">提币</button> -->
    </el-dialog>
    <!-- 大额提币 -->
    <el-dialog :title="cointype+'提币'" v-model="dialogshow[5]"  class='btn'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <p class="coininfo"> 
        <span>提币数量 :{{getcoinparam.amount}}{{cointype}}</span>
        <!-- <a class="update" @click="updateCoin()">编辑</a> -->
      </p>
      <div class="coininfo">
        <div class="comAdress">
          <span class="spanAdreess">提币地址 :{{getcoinparam.address}}</span>
          <p class="adressHover">{{getcoinparam.address}}</p>
        </div>
        <!-- <a class="update" @click="updateCoin()">编辑</a> -->
      </div>
      <div class="cointip">
        <p >大额提币需要在手机APP上进行人脸识别认证，具体入口：我的账户-账单记录。</p>
        <p >立即扫码下载手机客户端：</p>
        <div class="appTip">
          <img  src="../../assets/img/home/download.png">
        </div>
      </div>
      <!-- <button  @click="getlastcoin()">提币</button> -->
    </el-dialog>
    <el-dialog title="添加地址" v-model="dialogshow[3]" :close-on-click-modal="false" class='btn'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <el-form :model="coinlistfrom" label-width="100px">
        <el-form-item label="提币地址 :">
          <el-input v-model="coinlistfrom.address"></el-input>
        </el-form-item>
        <el-form-item label="MEMO :" v-show="cointype=='BTS'">
          <el-input v-model="coinlistfrom.memo"></el-input>
        </el-form-item>
        <el-form-item label="地址标签 :">
          <el-input v-model="coinlistfrom.label"></el-input>
        </el-form-item>
        <el-form-item label="验证方式:"> 
          <el-row >
            <el-col :span="12">
               <div class="selectbtn " :class="{'activeBtn':isphoneselect==true}"  @click="selectype('phone');coinlistfrom.type='sms'">手机验证</div>
            </el-col>
            <el-col :span="12">
               <div class=" secondbtn" :class="{'activeBtn':isemailselect==true}"  @click="selectype('email');coinlistfrom.type='email'">邮箱验证</div>
            </el-col>
        </el-row>
        </el-form-item>
        <el-form-item label="验证码 :">
          <el-row >
            <el-col :span="18">
               <el-input v-model="coinlistfrom.code" ></el-input>
            </el-col>
            <el-col :span="6">
               <div class="sendyzm" @click="getYZM('add_coin_address',2,selecType)">{{codenum}}</div>
            </el-col>
          </el-row>
           <p v-show="notfirstget" class="lastgetcoin-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
          <!-- <div class="sendyzm" @click="getYZM('add_coin_address',2)">{{getcode[2]}}</div> -->
        </el-form-item>
        <el-button type="primary" class="subbutton" @click="adminAdress('add')">新建提币地址</el-button>
          <div class="constent">
            <table class="tables">
              <thead>
                <tr>
                  <th class="thtd1">标签</th>
                  <th class="thtd2">提币地址</th>
                  <th class="thtd1" v-show="cointype=='BTS'">MEMO</th>
                  <th class="thtd1" >操作</th>
                  <th class="thtd3" >默认</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in hiscoinlist">
                  <td class="thtd1">{{item.label}}</td>
                  <td class="thtd2" >{{item.address}}</td>
                  <td class="thtd1" v-show="cointype=='BTS'">{{item.memo}}</td>
                  <td  class="thtd1 detlate" @click="adminAdress('del',item.id)">删除</td>
                  <td class="thtd3">
                    <el-checkbox @change="adminAdress('up',item.id)" v-model='selectAdress[index]'></el-checkbox>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </el-form>
    </el-dialog>
    <el-dialog title="提币验证" v-model="dialogshow[4]" :close-on-click-modal="false" class='btn'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <p>您的账户信息还未补全，请先实名认证后再提币</p>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="gotoAuth">立即实名</el-button>
        <el-button type="primary" class="doublebtn" @click="colsedia">取消</el-button>
      </div>
    </el-dialog>
    <!-- 无认证弹框 -->
    <el-dialog title="C2C充币" :visible.sync="dialogchongzhino" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="chTcoantain">
        <span>姓名：</span>
        <input type="text" v-model="nostatus.name" placeholder="请输入本人姓名"><br>
        <span>手机：</span>
        <select v-model="nostatus.area" placeholder="请选择">
          <option  v-for="item in countryList" :label="item.ch_name" :value="item.code">
          </option>
        </select>
        <input class="coide" type="text" v-model="smsSend.mobile" :disabled="ishavemobile"><br>
        <span>验证码：</span>
        <input class="coide" type="text" v-model="nostatus.code">
        <button @click="getmessageno" :disabled="isenabled">
          {{codenum}}
        </button>
        <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
      </div>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="nowInststus">进行认证</el-button>
      </div>
    </el-dialog>
    <!-- 手机已认证弹框 -->
    <el-dialog title="C2C充币" :visible.sync="dialogchongzhimobile" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="chTcoantain">
        <span>姓名：</span>
        <input type="text" v-model="nostatus.name" placeholder="请输入本人姓名"><br>
        <span>手机：</span>
        <span class="mobilenum">{{mobilealready}}</span>
      </div>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="nowInststus">进行认证</el-button>
      </div>
    </el-dialog>
    <!-- 姓名已认证弹框 -->
    <el-dialog title="C2C充币" :visible.sync="dialogchongzhiname" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="chTcoantain">
        <span>姓名：</span>
        <span class="mobilenum">{{namealready}}</span><br>
        <span>手机：</span>
        <select v-model="nostatus.area" placeholder="请选择" v-if="ishavemobile==false">
          <option  v-for="item in countryList" :label="item.ch_name" :value="item.code">
          </option>
        </select>
        <input class="areashow" v-model="nostatus.area" v-if="ishavemobile==true" :disabled="ishavemobile">
        <input class="coide" type="text" v-model="smsSend.mobile" :disabled="ishavemobile"><br>
        <span>验证码：</span>
        <input class="coide" type="text" v-model="nostatus.code">
        <button @click="getmessageno" :disabled="isenabled">
          {{codenum}}
        </button>
        <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
      </div>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="nowInststus">进行认证</el-button>
      </div>
    </el-dialog>
    <!-- 已认证弹框 -->
    <el-dialog title="C2C充币" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="chTzhongzHI">
        <p>充值：充值金额 ****.<span>{{infoStatus.last}}</span>元</p>
        <div class="zHIone">
          <img src="../../assets/img/trade/111.png" height="13" width="13" alt="">
          汇款时请务必包含小数位“ .{{infoStatus.last}} ”
        </div>
        <div class="zHItwo">
          <table>
            <tr>
              <td>收款姓名：</td>
              <td class="td1">{{companybankInfo.name}}</td>
              <td class="td2"><button v-clipboard:copy="companybankInfo.name" v-clipboard:success="oncopy">复制</button></td>
            </tr>
            <tr>
              <td>银行账号：</td>
              <td class="td1 banknum" >
                <span v-for="item in companybankInfo.bankcardlist">
                  <span>{{item}}</span>
                </span>
              </td>
              <td class="td2"><button v-clipboard:copy="companybankInfo.bankcard" v-clipboard:success="oncopy">复制</button></td>
            </tr>
            <tr>
              <td>收款银行：</td>
              <td class="td1">{{companybankInfo.bankbranch}}</td>
            </tr>
          </table>
        </div>
        <div class="zHIthree">
          <img src="../../assets/img/trade/222.png" height="43" width="43" alt=""><br>
          <span>当前汇率：</span><span class="nameOn">1.00 USDT ≈{{usdtbuy}}CNY</span>
        </div>
        <div class="zHIfour">
          <p>
            充值提示：<br>
            1.您向商家的银行账户转账后会根据兑换价自动充币;<br>
            2.请使用本人绑定的银行卡进行汇款（暂不支持微信和支付宝;<br>
            3.参考价格仅供参考，实际到账金额按照到账时的价格为准;<br>
            4.转账后会在10分钟内您的USDT即会到账，如果USDT没有即时到账，请联系客服，客服会帮您催账;<br>
          </p>
        </div>
      </div>
    </el-dialog>



    <!-- 已认证弹框 -->
    <el-dialog title="C2C充币" :visible.sync="dialogAll" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="chTzhongzHI">
        <!-- <p>充值：充值金额 ****.<span>{{infoStatus.last}}</span>元</p>
        <div class="zHIone">
          <img src="../../assets/img/trade/111.png" height="13" width="13" alt="">
          汇款时请务必包含小数位“ .{{infoStatus.last}} ”
        </div> -->
        <div class="zHItwo">
          <table>
            <tr>
              <td>收款姓名：</td>
              <td class="td1">{{bankInfo.name}}</td>
              <td class="td2"><button v-clipboard:copy="bankInfo.name" v-clipboard:success="oncopy">复制</button></td>
            </tr>
            <tr>
              <td>银行账号：</td>
              <td class="td1 banknum" >
                <!-- <span v-for="item in companybankInfo.bankcardlist">
                  <span>{{bankInfo}}</span>
                </span> -->
                <span>{{bankInfo.number}}</span>
              </td>
              <td class="td2"><button v-clipboard:copy="bankInfo.number" v-clipboard:success="oncopy">复制</button></td>
            </tr>
            <tr>
              <td>收款银行：</td>
              <td class="td1">{{bankInfo.bank}}{{bankInfo.branch}}</td>
            </tr>
          </table>
        </div>
        <div class="zHIthree">
          <img src="../../assets/img/trade/222.png" height="43" width="43" alt=""><br>
          <span>当前汇率：</span><span class="nameOn">1.00 USDT ≈{{usdtbuy}}CNY</span>
        </div>
        <div class="zHIfour">
          <p>
            充值提示：<br>
            1.您向商家的银行账户转账后会根据兑换价自动充币;<br>
            2.请使用本人绑定的银行卡进行汇款（暂不支持微信和支付宝;<br>
            3.参考价格仅供参考，实际到账金额按照到账时的价格为准;<br>
            4.转账后会在10分钟内您的USDT即会到账，如果USDT没有即时到账，请联系客服，客服会帮您催账;<br>
          </p>
        </div>
      </div>
    </el-dialog>
    <!-- USDT提币 -->
    <el-dialog title="C2C提币" :visible.sync="dialogtibiOne" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="usdtmain">
        <span> 参考价格：</span>
        <span class="usdtcon">1.000USDT≈{{usdtbuy}}CNY</span><br>
        <span>提款金额：</span>
        <span class="usdtRmb">
          <input type="text"  v-model="getcoinparam.amount" @change="usdtchange">
          USDT
        </span>
        <span class="enter">=</span>
        <span class="usdtRmb">
          <input type="text" v-model="rmbout" @change="usdtchangeOne">
          CNY
        </span><br>
        <span>可提币量：</span>
        <span class="usdtcoin">{{usdtneed}}USDT</span><br>
        <span class="usdtnameT">提款人：</span>
        <span class="usdtname">{{tkuanren}}</span>
        <br>
        <span class="usdtfees">矿工费：</span>
        <span class="usdtname T1">{{ustdfxee}}</span>
        <br>
        <span class="banktit">提款银行：</span>
        <el-select  v-model="getcoinparam.aid" placeholder="请选择" class="usdtbank" @change="addthebank">
          <el-option
            v-for="item in getbankList"
            :key="item.id"
            :label="item | formatlabel"
            :value="item.id">
          </el-option>
          <el-option
            label='添加银行卡'
            value=99>
          </el-option>
        </el-select>
      </div>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="gogetcoin()">确认提币</el-button>
      </div>
    </el-dialog>

    <!-- 确认提币提示 -->
    <el-dialog title="提示" :visible.sync="dialogtibiTwo" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="usdttit">
        <span>您还没有添加银行卡，请添加银行卡在提币</span>
      </div>
      <div class="">
        <el-button type="primary" class="doublebtn" @click="addbankname">添加银行卡</el-button>
      </div>
    </el-dialog>
    
    <!-- 添加银行卡 -->
    <el-dialog title="添加银行卡" :visible.sync="dialogtibiThree" :close-on-click-modal="false" class='btnOne'>
      <div class="xian">
        <ul>
          <li class="frist1"></li>
          <li class="two1"></li>
        </ul>
      </div>
      <div class="usdtbankcon">
        <div class="tab1">
          <span>姓名：</span>
          <input type="text" class="normalin" v-model="adadbankparam.name" :disabled="nameabled"><br>

          <span>银行名称：</span>
          <el-select v-model="bankHa" placeholder="请选择银行" class="normalin margtop">
            <el-option
              v-for="item in bankListHa"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select><br>

          <span>银行账号：</span>
          <input type="text" class="banknumber" v-model="adadbankparam.bankcard">
          <span>默认</span>
          <el-checkbox v-model="checked"></el-checkbox><br>

          <span>所属地区：</span>
          <el-select v-model="bankprovince" placeholder="请选择省份" class="usdtlable" @change="getprovince">
            <el-option
              v-for="item in provincename"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="bankcity" placeholder="请选择城市" class="usdtlable" @change="getcity">
            <el-option
              v-for="item in cityname"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select><br>

          <span>手机号码：</span>
          <input type="text" class="normalin" v-model="showmobile"  :disabled="phoneabled"><br>

          <span>验证手机：</span>
          <input type="text" class="yanzheng" v-model="adadbankparam.code">
          <button class="getyanzheng" :disabled="isenabled" @click="getbanksms">{{codenum}}</button>
          <p v-show="notfirstget" class="chTcoantain-tip">收不到短信？试试<span @click="getVoicecode">语音验证码</span></p>
          <button class="letnew" @click="addAnewbank">新建银行提款账户</button>
        </div>
        <div class="yanhangtab">
          <table>
            <tr class="tr1">
              <td class="td1">银行名称</td>
              <td class="td2">银行账号</td>
              <td class="td3">操作 默认</td>
            </tr>
            <tr v-for="item in bankgetList">
              <td class="td1">{{item.bankname}}</td>
              <td class="td2">{{item.bankcard}}</td>
              <td class="td3"><span @click="deletebank(item.id)">删除</span>
                <!-- <img src="../../assets/img/trade/check.png" height="16" width="16" alt="" v-if="item.isdefault == 1">
                <img src="../../assets/img/trade/nocheck.png" height="16" width="16" alt="" v-if="item.isdefault != 1"> -->
              <el-checkbox class="checkboo" v-model="item.isdefault" @change="getchecked(item.id)"></el-checkbox><br>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-dialog>
    <div class="msgBox" v-if="fuckfuck">
      <div id="TCaptcha"style="width:300px;height:40px;"></div>
    </div>
  </div>
</template>
<script>
import Password from './sixpassword.vue'
import finceRechange from './finceRecheage.vue'
import { ajax,temptime,setcookie,getcookie,getuserinfo,delatecookie,getmincoinNum,getPhoneValidate,getEmailValidate,getStates,getfaceamount,lasscode1,sendVoicecode,getCountryList} from '../../assets/js/common'
  export default{
    data(){
      return{
        dialogchongzhino:false,
        dialogchongzhimobile:false,
        dialogchongzhiname:false,
        dialogAll:false,
        dialogtibiOne:false,
        dialogtibiTwo:false,
        dialogtibiThree:false,
        ishavemobile:false,
        finceloading:true,
        getcionloading:false,
        labeltitle:'验证码：',
        loadingtext:'数据加载中',
        loading:false,
        selectAdress:[],//控制默认选择地址
        mycoinadress:'',//充币地址信息
        MEMO:'',//bts提币memo
        clickcoin:'',//充币的币种
        mrechange:[false,false,false],//rmb充值弹框 要补充信息 false表示信息完整
        pickerOptions0: {},
        cointype:'RMB',//判断是对那个币种的操作
        hiscointype:'rmb',//获取历史操作记录的
        coinname:5,
        listtype:1,
        historyurl:'',//判断是资金历史记录还是虚拟币历史记录
        isaddbank:0,
        isemail:0,
        listatotal:0,//历史记录总条数
        dialogshow:[false,false,false,false,false,false,false,false,false,false,false,false,false],//控制弹框的是否显示
        getcode:['获取验证码','获取验证码','获取验证码','获取验证码','获取验证码','获取验证码','获取验证码','获取验证码'],
        codenum:'获取验证码',
        isenabled:false,
        notfirstget:false,
        clickNum:0,
        phoneclick:false,
        scode:0,
        selecType:'phone',
        coinok:{
          aid:'',
          address:'',
          label:'',
          operate:'setlabel',
        },
        myAssetsList:{
          USDT:{},
          BTC:{},
          BTY:{},
          // YCC:{},
          BCC:{},
          ETH:{},
          ETC:{},
          ZEC:{},
          LTC:{},
          DCR:{},
          BTS:{},
          SC:{},
          // BTCS:{},
        },
        //各种资产
        myAssets:{},
        //提币地址管理参数
        coinlistfrom:{
          currency:'',//货币支持
          aid:'',//提币地址ID
          op:'',//操作类型 可选值: add ( 添加地址) del（删除地址） up(设置默认)
          address:'',//提币地址
          memo:'',//备注值
          email:'',//邮件信息
          code:'',//验证码
          gid:'',//验证码引导ID，邮箱发送返回的guide值
          checkmethod:'',//验证码验证方式 gid 使用gid验证 data 使用邮箱信息等验证
          label:'',//标签
          type:'sms',//验证类型 sms或mobile
          area:'86',//area
          mobile:''//手机号码
        },
        //操作历史
        coinlistparam:{
          pagesize:15,
          page:1,
          stime:'',
          etime:'',
          showtype:'all',
          format:'',
          currency:'',
        },
        //提币参数
        getcoinparam:{
          currency:'',//币名称 支持 BTC BCC ZEC LTC ETH ETC
          amount:0,//提币金额
          txfee:'',//矿工费，不能为空，默认为0即可
          aid:'',//提币地址ID
          gid:'',//邮箱码guide值
          code:'',//验证码
          email:'',//邮箱信息
          yztype:'',//验证类型 sms或者email
          area:'86',//国家区号
          mobile:'',//手机号码
          memo:'',//memo
          // address:'添加提币地址',
          // checkmethod:'gid',
          // label:'',
          // type:'',
        },
        //提币地址列表
        hiscoinlist:[
          {
            label:'',
            address:'',
            id:'',
            isdefault:'',
            memo:'',
          }
        ],
        Minerfeelist:[],
        //历史记录数据
        coninListHistory:[],
        showtip:false,
        isAuth:true,
        isEmailAuth:false,
        isPhoneAuth:false,
        authEmail:'',
        authMobile:'',
        authArea:'',
        isphoneselect:true,
        isemailselect:false,
        isface:0,
        //ustd发送验证码
        smsSend:{
          codetype:'validate',
          param:'FzmRandom',
          mobile:'',
          area:'86',
        },
        //手机已认证
        mobilealready:'',
        //姓名已认证
        namealready:'',
        //认证参数
        nostatus:{
          name:'',
          mobile:'',
          code:'',
          area:'86',
          gid:'',
        },
        //认证后得到的数据 last&&name
        infoStatus:[],
        //提款人姓名
        inputname:'',
        //提款银行
        valuebank:'',
        optionbank:[],
        //usdt与人民币换算
        usdtbuy:'',
        //可用usdt
        usdtneed:'',
        usdtrate:0,
        //银行列表
        bankHa:'',
        bankListHa:[],
        getbankList:[],
        bankgetList:[],
        getbankListnum:[],
        //usdt&rmb提币
        usdtout:'',
        rmbout:'',
        //短信发送
        getbankmobile:{
          codetype:'validate',
          platkey:"cga",
          ticket:'',
          businessId:'',
          area:86,
          mobile:'',
          param:'FzmRandom',
        },
        bankprovince:'',
        bankcity:'',
        //新增银行参数
        adadbankparam:{
          op:'add',
          type:'sms',
          pid:'',
          cid:'',
          bank:'',
          bankcard:'',
          name:'',
          code:'',
          area:86,
          mobile:'',
          bid:'',
        },
        //省份
        provincename:[],
        cityname:[],
        city:{
          pid:'',
        },
        cityone:{
          pid:'',
        },
        ustdfxee:'',
        checked: true,
        isdefaultT:'',
        deletebanknam:{
          op:'del',
          bid:'',
        },
        tkuanren:'',
        phoneabled:false,
        nameabled:false,
        showmobile:'',
        checknice:false,
        checkbankname:{
          op:'up',
          bid:'',
        },
        voiceparam:{
          area:'86',
          mobile:'',
          codetype:'',
        },
        companybankInfo:{
          bankcardlist:[],
          bankcard:'',
          name:'',
          bankbranch:''
        },
        bankcardlist:[
        {
          bankcard:'6217001540019684255',
          name:'戴涛',
          bankbranch:'中国建设银行杭州文晖支行'
        },
        {
          bankcard:'6236681540003248866',
          name:'李朝辉',
          bankbranch:'中国建设银行杭州延安支行'
        },
        {
          bankcard:'6227073201280428',
          name:'卢月玲',
          bankbranch:'中国建设银行杭大路分理处'
        }],
        countryList:[],//国籍列表
        bankInfo:[],//经纪商银行卡信息
        alertStatus:'',
        dataSrc:'',
        businessId:'',
        ticketNum:'',
        fuckfuck:false,
      }
    },
    components:{
      Password,
      finceRechange,
    },
    filters:{
      filIndex(e){

        if(e == 'DYCC'){
          return 'YCC';
        }
        else if(e == 'YCC'){
          return 'YCC';
        }
        else if(e == 'WTC'){
          return 'WDT';
        }
        else{
          return e;
        }
      },
      formatlabel(e){
        if(e==undefined){
          return ''
        }
        return e.bankcard+"  "+e.bankname
      }  
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getCountry();
        document.body.scrollTop=0;
        this.getStatus();
        this.getusermoney();
        this.gethistory('BTC',5,1);
        this.getbankinfo();
        // this.getstatEMSM();
        //获取最大提币数量接口
      });
    },
    methods:{
      //添加script标签
      addscript(){
        let dom = document.createElement('script');
        console.log(this.dataSrc)
        dom.src = this.dataSrc;
        document.getElementsByTagName('body')[0].appendChild(dom);
        this.fuckfuck = true;
        setTimeout(()=>{
          let capOption={callback :this.cbfn,
            callback:this.cbfn,
            type:'popup',
            pos:'fixed'};
          capInit(document.getElementById("TCaptcha"), capOption);
        },2000)
      },
      //成功回调
      cbfn(retJson){
        if(retJson.ret==0){
          // 用户验证成功,需要校验签名
          this.$notify({
            title: '成功',
            message: '验证通过',
            type: 'success',
            duration:'2000'
          })
          this.ticketNum = retJson.ticket;
          this.fuckfuck = false;
          
          sessionStorage.setItem('alertStatus','')
          sessionStorage.setItem('dataSrc','')
          sessionStorage.setItem('businessId','')
          // 销毁上一个验证
          capDestroy();
          this.getYZM();
          this.getbanksms();
        }else{       
          //用户关闭验证码页面，没有验证
          capDestroy();
          this.fuckfuck = false;
          sessionStorage.setItem('alertStatus','')
          sessionStorage.setItem('dataSrc','')
          sessionStorage.setItem('businessId','')

        }
      },
      //获取银行卡信息
      getbankinfo(){
        ajax(this,this.extendApi.getcompanybankNew,'',(res)=>{
          if(res.code == 200){
            this.bankInfo = res.data;
          }else{

          }
        },'GET')
      },
      //获取入账银行
      getcompanyBank(){
        let param={
          rand:''
        }
        ajax(this,this.extendApi.getcompanybank,param,(res)=>{
          if(Number(res.code)==200){
            let i=0;
            let bankcard=""
            for(i=0;i<this.bankcardlist.length;i++){
              if(this.bankcardlist[i].bankcard==res.data.bankcard){//银行卡一致，显示
                 this.companybankInfo.bankcard=this.bankcardlist[i].bankcard;
                 this.companybankInfo.name=this.bankcardlist[i].name;
                 this.companybankInfo.bankbranch=this.bankcardlist[i].bankbranch;
                 break;
              }else{
                continue;
              }
            }
            if(i==3){
              this.$notify({
                title: '提示',
                message: "充值通道暂时无法使用",
                type: 'warning',
                duration:'2000',
              });
            }else{
             
              let begin = 0;  
              let cutCount=parseInt(this.companybankInfo.bankcard.length/4);
              let cutCounts = this.companybankInfo.bankcard.length % 4; 
              if (cutCounts != 0) {  
                cutCount = cutCount+1;  
              }  
              this.companybankInfo.bankcardlist = [];
              for (let j = 1; j <= cutCount; j++) {  
                let temp;  
                // 不是最后一段  
                if (j != cutCount) {  
                    temp = this.companybankInfo.bankcard.substring(begin, 4 * j);  
  
                } else {  
                    temp =this.companybankInfo.bankcard.substring(begin,this.companybankInfo.bankcard.length);  
                }  
  
                begin = 4 * j;  
                this.companybankInfo.bankcardlist.push(temp);  
              }  
              this.getstatEMSM();
            }
          }
        })
      },
      //获取所在地
      getCountry(){
        let _this=this;
        getCountryList(this,function(res){
           _this.countryList=res;
        }) 
      },
      //增加语音验证码
      getVoicecode(){
        if(this.codenum!='获取验证码'){
          return;
        }

        sendVoicecode(this,this.voiceparam,(response)=>{
          lasscode1(this,this.clickNum);
          this.phoneclick=false;
        })
      },
      selectype(value){
        this.isenabled=false;
        clearInterval(this.scode);
        this.codenum = '获取验证码';
        if(value=='phone'){
          if(this.clickNum>=1){
            this.notfirstget=true;
          }else{
            this.notfirstget=false;
          }
          this.isphoneselect=true;
          this.isemailselect=false;
        }else{
          this.notfirstget=false;
          this.isphoneselect=false;
          this.isemailselect=true;
        }
        this.selecType=value;
      },
      getchecked(e){
        this.checkbankname.bid = e;
          ajax(this,this.extendApi.addbanknew,this.checkbankname,(ram)=>{
            if(ram.code == 200){
              this.$notify({
                title: '成功',
                message: "操作成功",
                type: 'success',
                duration:'2000',
              });
              this.addbankname();
            }else{
              this.$notify({
                title: '提示',
                message: ram.message,
                type: 'warning',
                duration:'2000',
              });
            }
          },'POST')
      },
      getstatsesss(){
        ajax(this,this.extendApi.getstates,'',(res)=>{
          if(res.code == 200){
            this.tkuanren = res.data.states.base.lockname;
          }else{

          }
        },'GET');
      },
      //usdt与rmb换算
      usdtchange(){
        if(Number(this.getcoinparam.amount)&&Number(this.getcoinparam.amount)<=Number(this.usdtneed)){
          this.rmbout = (this.getcoinparam.amount*this.usdtbuy).toFixed(2);
        }else{
          this.getcoinparam.amount="";
          this.rmbout="";
          this.$notify({
            title: '提示',
            message: "输入的数量需小于可用数量",
            type: 'warning',
            duration:'2000',
          });
        }
      },
      usdtchangeOne(){
        if(Number(this.rmbout)){
          this.getcoinparam.amount = (this.rmbout/this.usdtbuy).toFixed(2);
          if(Number(this.getcoinparam.amount)>=Number(this.usdtneed)){
            this.rmbout="";
            this.getcoinparam.amount="";
            this.$notify({
              title: '提示',
              message: "输入的数量需小于可用数量",
              type: 'warning',
              duration:'2000',
            });
          }
        }
      },
      //获取汇率usdt
      getusdtrate(){
        ajax(this,this.extendApi.getUsdtrate,'',(res)=>{
          if(res.code == 200){
            this.usdtbuy = res.data.usdbuy;
          }
        },'GET')
      },
      //USDT提币
      UsdtT(e,index){
        this.getcoinparam.aid='';
        this.getcoinparam.currency=index;
        this.cointype=index;
        this.getfee(this.cointype);
        this.dialogtibiOne = true;
        this.valuebank = '';
        this.rmbout="";
        this.getcoinparam.amount="";
        this.getcoinparam.aid="";
        this.usdtneed = e;
        ajax(this,this.extendApi.getUsdtrate,'',(res)=>{
          if(res.code == 200){
            this.usdtbuy = res.data.usdsell;

          }
        },'GET')
        //获取可用银行
        ajax(this,this.extendApi.getbankList,'',(param)=>{
          if(param.code == 200){
            this.getbankList = param.data.list;
            for(let i=0;i<this.getbankList.length;i++){
              if(this.getbankList[i].isdefault==1){
                //默认银行卡
                 this.getcoinparam.aid=this.getbankList[i].id;
              }
            }
            this.getbankListnum = param.data.total;
          }
        },'GET')
        //获取旷工费
        ajax(this,this.extendApi.getfee,'',(res)=>{
          if(res.code == 200){
            this.ustdfxee = res.data.USDT;
          }else{

          }
        },'GET')
      },
      //删除可用银行
      deletebank(e){
        this.deletebanknam.bid = e;
        ajax(this,this.extendApi.addbanknew,this.deletebanknam,(par)=>{
          if(par.code == 200){
            this.$notify({
              title: '成功',
              message: "删除成功",
              type: 'success',
              duration:'2000',
            });
            this.addbankname();
          }else{
            this.$notify({
              title: '提示',
              message: par.message,
              type: 'warning',
              duration:'2000',
            });
          }
        },'POST')
      },
      //USDT确认提币
      getcoinyes(){
        if(this.getbankListnum===0){
          this.dialogtibiOne = false;
          this.dialogtibiTwo = true;
        }else{
        }
      },
      //添加银行卡
      addbankname(){
        this.dialogtibiOne = false;
        this.dialogtibiTwo = false;
        this.dialogtibiThree = true;
        this.bankHa = '';
        // bankListname
        ajax(this,this.extendApi.bankListname,'',(res)=>{
          if(res.code == 200){
            this.bankListHa = res.data;
          }else{

          }
        },'GET')
        // 获取可用银行
        ajax(this,this.extendApi.getbankList,'',(param)=>{
          if(param.code == 200){
            this.bankgetList = param.data.list;

          }
        },'GET')
        //获取省份
        ajax(this,this.extendApi.getcityId,'',(ere)=>{
          if(ere.code == 200){
            this.provincename = ere.data;
          }else{

          }
        },'GET')
      },
      //获取城市
      getprovince(e){
        this.city.pid = e;
        ajax(this,this.extendApi.getcityId,this.city,(res)=>{
          if(res.code == 200){
             this.cityname = res.data;
          }else{
           
          }
        },'GET')
      },
      getcity(f){
        this.cityone.pid = f;
      },
      addthebank(val){
        if(val == 99){
          this.addbankname();
        }
      },
      //验证手机发送验证码
      getbanksms(){
        let _this=this;
        _this.clickNum++;
        if(this.showmobile){
          if(this.showmobile.indexOf('*')<0){
             this.getbankmobile.mobile=this.showmobile;
          }
          this.voiceparam.area=this.getbankmobile.area;
          this.voiceparam.mobile=this.getbankmobile.mobile;
          this.voiceparam.param=this.getbankmobile.param;
          if(this.alertStatus == ''){
            this.getbankmobile.businessId = this.businessId;
            this.getbankmobile.ticket = this.ticketNum;
          }
          ajax(this,this.extendApi.getCodeNew,this.getbankmobile,(res)=>{
            _this.phoneclick=true;
             _this.scode=setInterval(function(){
              lasscode1(_this,_this.clickNum)
            }, 1000);
            if(res.code == 200){
              this.$notify({
                title: '成功',
                message: "短信发送成功，请注意查收",
                type: 'success',
                duration:'2000',
              });
              if(res.data.isShow == 1){
                this.alertStatus = true;
                this.dataSrc = res.data.data.jsUrl
                this.businessId = res.data.data.businessId;
              }
              console.log(this.alertStatus);
              if(this.alertStatus = true){
                this.alertStatus = true;
                this.addscript();
              }
            }else{
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'warning',
                duration:'2000',
              });
            }
          },'POST');
          console.log(this.alertStatus)
          
        }else{
          this.$notify({
            title: '提示',
            message: '请填写手机号码',
            type: 'warning',
            duration:'2000',
          });
        }
        
      },
      //新增银行
      addAnewbank(){
        this.adadbankparam.op = 'add';
        this.adadbankparam.pid = this.city.pid;
        this.adadbankparam.cid = this.cityone.pid;
        this.adadbankparam.bank = this.bankHa;
        this.adadbankparam.mobile =this.showmobile;
        ajax(this,this.extendApi.addbanknew,this.adadbankparam,(res)=>{
          if(res.code == 200){
            if(this.checked == true){
              this.isdefaultT = res.data.bid;
              this.adadbankparam.op = 'up';
              this.adadbankparam.bid = this.isdefault;
              ajax(this,this.extendApi.addbanknew,this.adadbankparam,(par)=>{
                if(par.code == 200){
                  this.$notify({
                    title: '成功',
                    message: "该银行卡已设为默认",
                    type: 'success',
                    duration:'2000',
                  });
                }else{

                }
              },'POST')
            }else{

            }
            this.$notify({
              title: '成功',
              message: "新增银行卡成功",
              type: 'success',
              duration:'2000',
            });
            this.dialogtibiThree = false;
            this.adadbankparam.name ="";
            this.bankHa="";
            this.adadbankparam.bankcard='';
            this.bankprovince="";
            this.bankcity="";
            this.getbankmobile.mobile="";
            this.adadbankparam.code="";
          }else{
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'warning',
              duration:'2000',
            });
          }
        },'POST')
      },
      //获取用户认证状态
      getStatus(){
        let _this=this;
        getStates(_this,function(res){
           _this.tkuanren=_this.adadbankparam.name=res.states.base.lockname;
           _this.authEmail=res.states.email.data.email;
           if(res.states.mobile.data.show!=''&&res.states.mobile.data.show!=null){
            _this.nostatus.area=res.states.mobile.data.area;
            _this.authMobile=res.states.mobile.data.show;
            _this.showmobile=res.states.mobile.data.show;
             // _this.getbankmobile.mobile=res.states.mobile.data.show;
            _this.authArea=res.states.mobile.data.area;

            _this.phoneabled=true;
           }
          if(res.states.base.lockname==''){
            _this.nameabled=false;
          }else{
             _this.nameabled=true;
             // _this.tkuanren = res.data.states.base.lockname;
          }
          if(res.states.email.statu=='1'){//邮箱已验证手机未验证
            _this.isEmailAuth=true;
            
          }
          if(res.states.email.statu=='0'){//邮箱已验证手机未验证
            _this.isEmailAuth=false;
          }
          if(res.states.mobile.statu=='1'){//手机已验证邮箱未验证
            _this.isPhoneAuth=true;
            // _this.authMobile=res.states.mobile.data.show;
            // _this.showmobile=res.states.mobile.data.mobile;
           
            setcookie('phone',res.states.mobile.data.mobile);
            
           
          }
          if(res.states.mobile.statu=='0'){//手机已验证邮箱未验证
            _this.isPhoneAuth=false;
          }
          if(res.states.identity.statu=='1'){//实名已验证
            //查看是否实名---未实名的状态
            
            _this.isAuth=true;
          }
          if(res.states.identity.statu=='0'){//实名已验证
            //查看是否实名---未实名的状态

            _this.isAuth=false;
          }
        })
      },
      //获取人脸提币数量
      getfaceAmount(param){
        let _this=this;
        getfaceamount(_this,param,function(res){
            _this.isface=res.isface;
        })
      },
      //codeType代表操作   num 代表验证/提币 type 代表手机/邮箱
      getYZM(codetype,num,type){// 手机邮箱验证
       let _this=this;
        if(num=='2'){//验证码获取
          if(type=='phone'){//手机验证  手机已验证
            if(_this.authMobile==''||_this.authMobile==undefined){
              this.$notify({
                title: '失败',
                message: "您的手机未认证，请前往我的账户---手机认证进行验证",
                type: 'error',
                duration:'1000',
              });
              setTimeout(function(e){
                _this.gotoAuth('phone');
              }, 2000);
              return ;
            }
            _this.isphoneselect=true;
            _this.isemailselect=false;
            _this.clickNum++;
            let param={
              area:_this.authArea,//获取手机号区号
              mobile:_this.authMobile,//获取手机号
              codetype:'validate',
              param:'FzmRandom',
              extend_param:'',
              platkey:'cga',

            }
            if(sessionStorage.getItem('alertStatus') == ''){
              param.businessId = this.businessId;
              param.ticket = this.ticketNum;
            }
            getPhoneValidate(_this,param,function(res){
              _this.coinlistfrom.gid =res.gid;
              _this.coinlistfrom.area =_this.authArea;
              _this.coinlistfrom.mobile =_this.authMobile;
              _this.voiceparam.area=_this.authArea;
              _this.voiceparam.mobile =_this.authMobile;
              _this.voiceparam.codetype='add_coin_address';
              _this.coinlistfrom.type = 'sms';
               lasscode1(_this,_this.clickNum)
            })
            this.ticketNum = '';
            if(sessionStorage.getItem('alertStatus') == 'true'){
              this.alertStatus = true;
              this.dataSrc = sessionStorage.getItem('dataSrc');
              this.businessId = sessionStorage.getItem('businessId');
              this.addscript();
            }
            
          }
          if(type=='email'){
            // &&_this.isEmailAuth==true
            _this.isphoneselect=false;
            _this.isemailselect=true;
            if(_this.authEmail==''||_this.authEmail==undefined){
              _this.$notify({
                title: '失败',
                message: "您的邮箱未认证，请前往我的账户---邮箱认证进行验证",
                type: 'error',
                duration:'1000',
              });
              setTimeout(function(e){
                _this.gotoAuth('email');
              }, 2000);
              return ;
            }
            var param = {
              email:_this.authEmail,
              codetype:'validate',
              param:'FzmRandom',
              extend_param:'',
              platkey:'cga',
            }
            if(sessionStorage.getItem('alertStatus') == ''){
              param.businessId = this.businessId;
              param.ticket = this.ticketNum;
            }
            getEmailValidate(_this,param,function(res){
              _this.coinlistfrom.gid = res.gid;
              _this.coinlistfrom.type = 'email';
              _this.coinlistfrom.email =_this.authEmail;
               lasscode1(_this,_this.clickNum)
            })
            this.ticketNum = '';
            if(sessionStorage.getItem('alertStatus') == 'true'){
              this.alertStatus = true;
              this.dataSrc = sessionStorage.getItem('dataSrc');
              this.businessId = sessionStorage.getItem('businessId');
              this.addscript();
            }
          }
          // if(type=='email'&&_this.isEmailAuth==false){
          //   _this.isphoneselect=false;
          //   _this.isemailselect=true;
          //    _this.$notify({
          //     title: '失败',
          //     message: "您的邮箱未认证，请前往我的账户---邮箱认证进行验证",
          //     type: 'error',
          //     duration:'1000',
          //   });
            
          // }
        }
        else{//num=="1"提币支付密码验证码获取
          if(type=='phone'){//手机验证并提币操作  //&&_this.isPhoneAuth==true
             _this.isphoneselect=true;
            _this.isemailselect=false;
            if(_this.authMobile==''||_this.authMobile==undefined){
              this.$notify({
                title: '失败',
                message: "您的手机未认证，请前往我的账户---手机认证进行验证",
                type: 'error',
                duration:'1000',
              });
              setTimeout(function(e){
                _this.gotoAuth('phone');
              }, 2000);
              return ;
            }
            let param={
              area:_this.authArea,//获取手机号区号
              mobile:_this.authMobile,//获取手机号
              codetype:'validate',
              param:'FzmRandom',
              extend_param:'',
              platkey:'cga',
            }
            if(sessionStorage.getItem('alertStatus') == ''){
              param.businessId = this.businessId;
              param.ticke = this.ticketNum;
            }
            _this.clickNum++;
            getPhoneValidate(_this,param,function(res){
              _this.getcoinparam.gid =res.gid;
              _this.getcoinparam.area =_this.authArea;
              _this.getcoinparam.mobile =_this.authMobile;
              _this.getcoinparam.yztype = 'sms';
              _this.voiceparam.area=_this.authArea;
              _this.voiceparam.mobile =_this.authMobile;
              _this.voiceparam.codetype='withdraw_coin';
              lasscode1(_this,_this.clickNum)
            })
            this.ticketNum = '';
            if(sessionStorage.getItem('alertStatus') == 'true'){
              this.alertStatus = true;
              this.dataSrc = sessionStorage.getItem('dataSrc');
              this.businessId = sessionStorage.getItem('businessId');
              this.addscript();
            }
          }
          if(type=='email'){   
            // &&_this.isEmailAuth==true
             _this.isphoneselect=false;
            _this.isemailselect=true;
            if(_this.authEmail==''||_this.authEmail==undefined){
              _this.$notify({
                title: '失败',
                message: "您的邮箱未认证，请前往我的账户---邮箱认证进行验证",
                type: 'error',
                duration:'1000',
              });
              setTimeout(function(e){
                _this.gotoAuth('email');
              }, 2000);
              return ;
            }
            var param = {
              email:_this.authEmail,
              codetype:'withdraw_coin',
              param:'FzmUid|FzmDateTime|'+_this.getcoinparam.amount+'|'+_this.cointype+'|FzmRandom',
              extend_param:''
            }
            getEmailValidate(_this,param,function(res){
              _this.getcoinparam.gid = res.gid;
              _this.getcoinparam.yztype = 'email';
              _this.getcoinparam.email =_this.authEmail;
              lasscode1(_this,_this.clickNum)

            })      
          }
        }
      },
      updateCoin(){
        this.colsedia();
        this.$set(this.dialogshow,0,true);
      },
      //获取矿工费
      getfee(cointype){
        let _this=this;
        _this.Minerfeelist=[];
        ajax(this,this.extendApi.getfee,'',function(response){
          if(response.code==200){
            _this.Minerfeelist = [];
            _this.getcoinparam.txfee = '';
            if(typeof(response.data[cointype]) == 'object'){
              _this.Minerfeelist = response.data[cointype];
              _this.getcoinparam.txfee = response.data[cointype][0];
            }else{
              _this.getcoinparam.txfee = response.data[cointype];
            }
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'error',
              duration:'2000'
            });
          }
        },'GET')
      },
      addbank(){
        this.isaddbank==1?this.isaddbank=0:this.isaddbank=1;
      },
      //点击充币
      //cointy表示币种
      rechangecoin(cointy){
        if(cointy=='BTY'){
          this.$notify({
            title: '提示',
            message: cointy+"充币功能暂未开通",
            type: 'warning',
            duration:'2000'
          });
          return;
        }
        var _this=this;
        this.$set(this.mrechange,0,false);
        this.$set(this.mrechange,1,false);
        //获取币的地址
        this.cointype=cointy;
        this.finceloading=true;
        this.loadingtext="获取提币地址中";
        this.clickcoin=cointy+'充币';
        _this.mycoinadress="";
        var t=cointy;
        var lowcase=t.toLowerCase();
        ajax(this,this.extendApi.CoinAddress,{'currency':t},function(response){
          _this.finceloading=false;
          _this.loadingtext="数据加载中";
          if(response.code==200){
            if(response.data['address']=="获取地址失败"){
              _this.$notify({
                title: '提示',
                message: "获取地址失败",
                type: 'error',
                duration:'2000'
              });
            }else{
              _this.$set(_this.mrechange,2,true);
              _this.mycoinadress=response.data['address'];
              if(response.data['memo']!=undefined&&response.data['memo']!=null){
                _this.MEMO=response.data['memo'];
              }
            }
          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'error',
              duration:'2000'
            });
          }
        },'GET');
      },
      //复制
      oncopy:function(e){
        this.$notify({
          title: '成功',
          message: '复制成功',
          type: 'success',
          duration:'2000'
        });
      },
      //发送验证码
      getmessageno(){
        this.clickNum++;
        this.voiceparam.area=this.smsSend.area;
        this.voiceparam.mobile=this.smsSend.mobile;
        this.voiceparam.codetype=this.smsSend.codetype;
        ajax(this,this.extendApi.getmobilecode,this.smsSend,(res)=>{
          if(res.code == 200){
            this.$notify({
              title: '成功',
              message: "发送短信成功，请注意查收",
              type: 'success',
              duration:'2000'
            });
            lasscode1(this,this.clickNum)
            // this.lasscode(this.clickNum)
          }else{
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'warning',
              duration:'2000'
            });
          }
        },'POST')
      },
      //立即验证
      nowInststus(){
        this.getusdtrate();
        this.nostatus.mobile = this.smsSend.mobile;
        ajax(this,this.extendApi.getrecharge,this.nostatus,(res)=>{
          if(res.code == 200){
            this.infoStatus = res.data;
            this.dialogchongzhimobile = false;
            this.dialogchongzhiname = false;
            this.dialogchongzhino = false;
            this.dialogAll = true;
            // this.$notify({
            //   title: '成功',
            //   message: "验证成功",
            //   type: 'success',
            //   duration:'2000'
            // });
          }else{
            this.$notify({
              title: '提示',
              message: res.message,
              type: 'warning',
              duration:'2000'
            });
          }
        },'POST')
      },
      //获取认证状态
      getstatEMSM(){
        ajax(this,this.extendApi.getstates,'',(res)=>{
          if(res.code == 200){
            //全部认证
            if(res.data.states.base.isrecharge == '1'){//isrecharge已验证
              this.dialogAll = true;
              this.nowInststus();//获取充值点数
            }else{
              if(res.data.states.mobile.statu == '1'){//手机已验证
                if(res.data.states.base.lockname==""||res.data.states.base.lockname==null){//姓名未锁定
                  this.dialogchongzhimobile = true;
                  this.mobilealready = res.data.states.mobile.data.show;//手机号显示
                  this.nostatus.area=res.data.states.mobile.data.area;
                }else{
                  this.dialogAll = true;
                  this.nowInststus();//获取充值点数=========这就是isrecharge状态
                  this.tkuanren = res.data.states.base.lockname;
                }
                
              }else{
                //手机未认证
                if(res.data.states.mobile.data.show==''||res.data.states.mobile.data.show==null){
                  //不是手机注册进来
                  this.ishavemobile=false;
                }else{//手机注册进来用户
                  this.ishavemobile=true;
                  this.smsSend.mobile=res.data.states.mobile.data.show;
                  this.nostatus.area=res.data.states.mobile.data.area;
                }
                if(res.data.states.base.lockname==""||res.data.states.base.lockname==null){//姓名未锁定
                  this.dialogchongzhino = true;//keyi
                  // this.smsSend.area = 86;
                }else{//姓名已锁定
                  this.dialogchongzhiname = true;
                  this.namealready =res.data.states.base.lockname;//姓名显示
                  // this.smsSend.area = 86;
                  this.tkuanren = res.data.states.base.lockname;
                }
              }
            }
            
          }else{

          }
        },'GET');
      },
      //USDT充值
      getcoinIn(){
        this.getcompanyBank();
        
      },
      //获取验证码倒计时
      lasscode(setnum,Num){
        var _this=this;
        clearInterval(this.scode);
        this.codenum=60;
        this.scode=setInterval(()=>{
          this.codenum=this.codenum-1;
          var lnext=this.codenum+'秒后重试'
          this.$set(_this.getcode,setnum,lnext);
          if(this.codenum==0){
            this.codenum = "获取验证码";
            clearInterval(_this.scode);
            this.$set(_this.getcode,setnum,'获取验证码');
          }
        },1000)
      },
      //跳转实名认证 phone---手机认证 email---邮箱认证  identify----实名认证
      gotoAuth(param){
        this.$router.push({
           path: '/usercenter/myaccount?index='+param
         });
      },
      //点击提币
      getmycoin(num,tcoin){
        //提币前先判断是否实名
        // if(this.isAuth==false){//未实名
        //   this.colsedia();
        //   this.$set(this.dialogshow,4,true);
        // }else{
          //清除提币
          if(tcoin=='BTY'){
            this.$notify({
              title: '提示',
              message:tcoin+"提币功能暂未开通",
              type: 'warning',
              duration:'2000'
            });
            return;
          }
          this.colsedia();
          this.$set(this.dialogshow,num,true);
          this.getcoinparam.amount=0;
          this.coinmoney='0.00';
          this.cointype=tcoin;
          this.getcoinparam.currency=tcoin;
          this.getcoinparam.address='';
          this.getcoinhislist(this.cointype);
          this.getfee(this.cointype);
      },
      //点击确认提币
       gogetcoin(){
        var _this=this;
        if(Number(this.getcoinparam.amount)<20&&this.cointype=='USDT'){
          _this.$notify({
            title: '提示',
            message: 'USDT最小提币额为20个',
            type: 'warning',
            duration:'2000'
          });

          return false;
        }
        if(Number(this.getcoinparam.amount)==0){
          _this.$notify({
            title: '提示',
            message: '请输入提币数量',
            type: 'error',
            duration:'2000'
          });
          _this.showtip=false;
          return false;
        }
        if(Number(this.getcoinparam.amount)-Number(this.myAssets['available'+this.cointype+'coin'])>0){
          _this.$notify({
            title: '提示',
            message: '可提币不足',
            type: 'error',
            duration:'2000'
          });
          _this.showtip=false;
          return false;
        }
        if(this.cointype=='USDT'&&this.getcoinparam.aid==''){
          this.$notify({
            title: '提示',
            message: '请添加银行卡',
            type: 'warning',
            duration:'2000'
          });
          return false;
        }
        if((this.getcoinparam.address=="" || this.getcoinparam.address=="添加提币地址")&&this.cointype!='USDT'){
          this.$notify({
            title: '提示',
            message: '请添加提币地址',
            type: 'warning'
          });
          return false;
        }
        //获取认证控制 ----是否需要人脸/是否需要实名
        let param={
          amount:_this.getcoinparam.amount,
          currency:_this.cointype
        };
        ajax(_this,_this.extendApi.authoperation,param,(response)=>{
          _this.dialogtibiOne=false;//针对c2c提币的
          if(response.code == 200){
             _this.$set(_this.dialogshow,0,false);
            if(response.data.identity==0){//不需要实名认证
              //直接弹框
              if(response.data.face==0){
                _this.isface=0;
                _this.colsedia();
                _this.getcoinparam.code='';
                _this.$set(_this.dialogshow,2,true);
              }
              
            }
            if(response.data.identity==1)//需要实名
            {//先跳到实名认证链接
              if(_this.isAuth==true){
                //已经实名,
                if(response.data.face==0){
                  _this.isface=0;
                  _this.colsedia();
                  _this.getcoinparam.code='';
                  _this.$set(_this.dialogshow,2,true);
                }
              }else{
                _this.$notify({
                  title: '提示',
                  message: '请先去实名认证',
                  type: 'warning',
                  duration:'2000'
                });
                setTimeout(function(e){
                  _this.gotoAuth('identify');
                }, 2000);
                return;
              }
            }
            if(response.data.face==1)//需要人脸认证
            {
              _this.isface=1;
              _this.getlastcoin();
              // this.colsedia();
              _this.$set(this.dialogshow,5,true);
            }
          }else{
            console.log(response.message);
          }
        },'GET'); 
      },
      //提交提币
      getlastcoin(){
        if(this.isface==1){
          this.getcoinparam.code="123456";
          this.getcoinparam.gid="123456";
          this.getcoinparam.mobile=this.authMobile;
          this.getcoinparam.area=this.authArea;
        }
        if(this.getcoinparam.code){//小额
          this.getcionloading = true;
          ajax(this,this.extendApi.WithdrawCoin,this.getcoinparam,(response)=>{
            this.getcionloading = false;
            if(response.code == 200){
              this.gettikuan(this.cointype);
              this.getusermoney();
              if(this.isface==1){
                this.$set(this.dialogshow,5,true);
              }else{
                this.colsedia();
                this.$notify({
                  title: '提示',
                  message: '提币申请成功',
                  type: 'success',
                  duration:'2000'
                });
              }
            }else{
              this.$notify({
                title: '提示',
                message: response.message,
                type: 'error',
                duration:'2000'
              });
            }
          });
        }else{
          this.$notify({
            title: '提示',
            message: '请输入验证码',
            type: 'error',
            duration:'2000'
          });
        }
      },
      colsedia(){
        for(let i=0;i<this.dialogshow.length;i++){
          this.$set(this.dialogshow,i,false);
          this.isaddbank=0;
        }
        this.codenum="获取验证码";
        clearInterval(this.scode);
        for(let i=0;i<this.getcode.length;i++){
          this.$set(this.getcode,i,'获取验证码');
        }
      },
      //选择提币地址
      selectadree(aid,adress,label,item){
        if(item.memo!=undefined){
          this.getcoinparam.memo=item.memo;
        }
        this.getcoinparam.aid=aid;
        this.getcoinparam.address=adress;
        this.getcoinparam.label=label;
        this.isaddbank=0;
      },
      //点击添加提币地址
      goaddress(){
        var _this=this;
        this.colsedia();
        _this.codenum="获取验证码";
        _this.coinlistfrom.address='';
        _this.coinlistfrom.memo='';
        _this.coinlistfrom.label="";
        _this.coinlistfrom.code='';
        _this.$set(_this.getcode,2,'获取验证码');
        this.$set(this.dialogshow,3,true);
      },
      //获取资金
      getusermoney(){
        var _this=this;
        ajax(this,this.extendApi.getMoneyInfo,'',function(reponse){
          _this.finceloading=false;
          if(reponse.code==200){
            var data=reponse.data;
            var symbol=sessionStorage.getItem('symbol');
            _this.myAssets.valuation=data.valuation;
            for(let index in _this.myAssetsList){
              _this.myAssetsList[index] = data.list[index];
            }
            for(let index in _this.myAssetsList){
              let myindex='';
              _this.myAssets['available'+index+'coin']= data.list[index].active;
              _this.myAssets['frozen'+index+'coin'] = data.list[index].frozen;
              _this.myAssets[index+'total'] = data.list[index].total;
            }
          }
        });
      },
      //获取操作记录 
      //listtype为1时表示点击的是币种为2表示点击的是提币还是充币
      //Llist按钮的活动状态
      //comcointype 当listtype为1时表示查询的币种，当listtype为2时表示查询的是操作方式
      gethistory(comcointype,Llist,listtype){
        this.historyurl=this.extendApi.coinlist;
        if(listtype==1){
          this.coinname=Llist;
          this.hiscointype='';
          this.coinlistparam.currency=comcointype;
        }else{
          this.listtype=Llist;
          this.coinlistparam.showtype=comcointype;
        }
        var _this=this;
        ajax(this,this.historyurl,this.coinlistparam,function(response){
          _this.coninListHistory=response.data.list;
          _this.listatotal=Number(response.data.total);
        },'GET');
      },
      //分页执行的函数
      handleCurrentChange(currentPage){
        var _this=this;
        this.coinlistparam.page=currentPage;
        ajax(this,this.historyurl,this.coinlistparam,function(response){
          _this.coninListHistory=response.data.list;
          _this.listatotal=Number(response.data.total);
        },'GET');
      },
      //充提币、款之后调用
      gettikuan(mycointype){
        var _this=this;
        if(mycointype=="ETH"){
          this.coinname=2;
        }else if(mycointype=="ETC"){
          this.coinname=3;
        }else if(mycointype=="ZEC"){
          this.coinname=7;
        }else if(mycointype=="LTC"){
          this.coinname=9;
        }else if(mycointype=="BCC"){
          this.coinname=10;
        }else{
          this.coinname=5;
        }
        this.gethistory(mycointype,this.coinname,1);
      },
      //点击搜索按钮
      seach(){
        this.coinlistparam.stime=temptime(this.coinlistparam.stime);
        this.coinlistparam.etime=temptime(this.coinlistparam.etime);
        var _this=this;
        ajax(this,this.historyurl,this.coinlistparam,function(response){
          _this.coninListHistory=response.data.list;
          _this.listatotal=Number(response.data.total);
        },'GET');
      },
      //添加提币地址
      adminAdress(operatetype,aid){
        var _this=this;
        this.coinlistfrom.currency = this.cointype
        this.coinlistfrom.op=operatetype;
        if(operatetype == 'add'){
          this.coinlistfrom.checkmethod = 'gid';
          this.coinlistfrom.aid = '';
        }else{
          this.coinlistfrom.aid = aid;
          this.coinlistfrom.gid = '';
        }
        ajax(this,this.extendApi.ooperateAddress,this.coinlistfrom,function(response){
          if(response.code == 200){
            for(let index in _this.coinlistfrom){
              _this.coinlistfrom[index] = '';
            }
            if(operatetype!='up'){
               _this.$notify({
                title: '提示',
                message: '地址操作成功',
                type: 'success',
                duration:'2000'
              });
            }
           
            // getuserinfo(_this);
            _this.getcoinhislist(_this.cointype);
            // _this.colsedia();
            _this.$set(this.dialogshow,0,true);

          }else{
            _this.$notify({
              title: '提示',
              message: response.message,
              type: 'error',
              duration:'2000'
            });
          }
        });
      },
      //获取提币地址列表
      getcoinhislist(cointypee){
        var _this=this;
        _this.getcoinparam.label='';
        _this.selectAdress=[];
        _this.hiscoinlist=[];
        ajax(this,this.extendApi.withdrawAddressList,{'currency':cointypee},function(response){
         if(response.code==200){
          var data=response.data.list;
          if(data.length!=0){
            for(let i=0;i<data.length;i++){
              if(data[i].isdefault==1){
                _this.selectAdress.push(true);
                _this.getcoinparam.aid=data[i].id;
                _this.getcoinparam.address=data[i].address;
                _this.getcoinparam.label=data[i].label;
                if(data[i].memo!=undefined&&data[i].memo!=null){
                  _this.getcoinparam.memo=data[i].memo;
                }
                
              }else{
                _this.selectAdress.push(false);
              }
            }
          }else{
            _this.getcoinparam.address='添加提币地址';
          }
          _this.hiscoinlist=data;
         }
        },'GET')
      },
      //点击管理账户或管理地址
      Administration(cointype,INDEX){
        if(INDEX=='C2C'){
          this.addbankname();
        }else{
          // this.coinlistfrom={};
          this.colsedia();
          this.$set(this.dialogshow,3,true);
          this.getcoinhislist(cointype);
          this.cointype=cointype;
        }
      },
      //人脸认证按钮
      tipface(){
        this.$alert('请前往App进行人脸认证', '人脸认证', {
          confirmButtonText: '确定',
        });
      }
    }
  }
</script>
<style>
  .el-form-item__content{
    line-height: 32px;
  }
  .selectbtn:nth-child(1){
    border-radius: 4px 0px 0px 4px;
  }
  .secondbtn{
    border-radius: 0px 4px 4px 0px;
  }
  .selectbtn,.secondbtn{
    /*width: 135px;*/
    height: 34px;
    background: #fff;
    /*border-radius: 4px 0px 0px 4px;*/
    text-align: center;
    border: solid 1px rgba(206, 24, 29, 1) !important;
    &:before{
      color:black;
      background: #c81118;
    }
   /* &:active,&:hover{
      color: white;
      background-color: rgba(206, 24, 29, 1);
    };*/
  }
  .activeBtn{
     color: white;
    background-color: rgba(206, 24, 29, 1);
  }

  .fince{
    font-size: 14px;
    width: 835px;
    height: 100%;
    margin: 0 auto;
    .password{
      width: 350px;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
    }
   /* .el-loading-mask{
      background: rgba(255,255,255,0.7)!important;
    }*/
    .nps{
      margin-top: -20px;
      margin-bottom: 20px;
    }
    .nonephone{
      width: 260px;
    }
    .coinnum{
      width: 100%;
      ul{
        width: 100%;
        height: 100%;
        li{
          width: 100%;
          height: 100%;
        }
        .typecoin{
          height: 70px;
          border-bottom: 1px solid #ccc;
          .all{
           width: 395px;
           float: right;
           text-align: right;
           line-height: 70px;
           font-size: 16px;
           color: #333;
           font-weight: bold;
           padding-right: 5px;
           img{
            margin: 0px 20px 0 0;
            position: relative;
            top:15px;
           }
          }
        }
      }
      .moneyinfo{
        width: 100%;
        li{
          float: left;
          i{
            font-size: 35px;
          }
          .icon-USDT3,.icon-USDT3 + p{
            color: #ff8f21;
          }
         
          .icon-BTC3,.icon-BTC3+p{
            color: #e6ac00;
          }
          .icon-ETC3,.icon-ETC3+p{
           color: #47ad50;
          }
          .icon-ETH3,.icon-ETH3+p{
            color: #3dabcb;
          }
          .icon-ZEC3,.icon-ZEC3+p{
            color: #366bb2;
          }
          .icon-ETH3,.icon-ETH3+p{
            color: #3dabcb;
          }
          .icon-LTC3,.icon-LTC3+p{
            color: #6353b3;
          }
          .icon-BCC3,.icon-BCC3+p{
            color: #ec712e;
          }
          .icon-BTY3,.icon-BTY3+p{
            color: #e14f55;
          }
          .icon-SC3,.icon-SC3+p{
            color: #0ea48a;
          }
          .icon-BTS3,.icon-BTS3+p{
            color: #7fb131;
          }
          .icon-BTCS3,.icon-BTCS3+p{
            color: #13a94f;
          }
        }
        .logoli{
          width: 100px;
          position: relative;
          text-align: center;
          font-size: 12px;
          
          color: #c81118;
          i{
            vertical-align:middle;
            margin: 0px 32.5px 6px;
           
          }
          svg{
            width:35px;
            height: 35px;
            margin: 10px 32.5px 3px;
            vertical-align:middle;
           /* margin-top: 5px;*/
          }
          svg+p{
            margin-top: -4px;
          }
          i+p{
            margin-top: -8px;
          }
          p{
            font-weight: bold;
          }
        }
        .mycoinli{
          width: 176px;
          p{
            text-align: left;
          }
          .contitle{
            margin-top: 0px;
            font-size: 12px;
            color: #808080;
          }
          .comnum{
            font-weight: bold;
            margin-top: 6px;
          }
          .cnum{
            color: #ce181d;
            font-size: 16px;
            font-weight: bold;
            margin-top: 14px;
          }
          .noone{
            color: #333;
            font-size: 16px;
          }
        }
        .rechangeli{
          width: 62px;
          span{
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            background: #E64544;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            margin-top: 21px;
            cursor: pointer;
          }
        }
        .djieli{
          width: 180px;
          line-height: 70px;
        }
        .allmoney{
          width: 230px;
          padding-left: 10px;
          line-height: 70px;
        }
        .buttonli{
          width: 145px;
          padding: 0 5px;
          span{
            height: 28px;
            line-height: 28px;
            margin-top: 21px;
            border-radius: 3px;
            display: inline-block;
            color: #fff;
            text-align: center;
          }
          .bbefore{
            width: 62px;
            background: #24A948;
            cursor: pointer;
          }
          .bnext{
            width: 68px;
            background: #4186CC;
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }
    }
    .conselect{
      width: 100%;
      height: 100%;
      ul{
        width: 100%;
        height: 28px;
        line-height: 26px;
        margin-top: 22px;
        li{
          margin-left: 10px;
          float: left;
          border: 1px solid #e6e6e6;
          border-radius: 5px;
          cursor: pointer;
          width: 60px;
          text-align: center;
        }
        .whole{
          margin-left: 0;
        }
        .BTYcoin{
          width: 60px;
          border:0;
          height: 28px;
        }
        .first{
          margin-left: 0;
        }
        .last{
          border:0;
          width: 320px;
          text-align: left;
          .el-input{
            width: 120px;
            height: 28px;
          }
          .el-input__inner{
            height: 28px;
          }
          .seach{
            display: inline-block;
            width: 42px;
            height: 28px;
            border: 1px solid #e6e6e6;
            text-align: center;
            line-height: 26px;
            border-radius: 5px;
          }
        }
      }
      table{
        margin-top: 10px;
        font-size: 12px;
        thead{
          tr{
            background-color: rgb(235, 235, 235);
          }
        }
        tr{
          width: 100%;
          height: 30px;
          line-height: 30px;
        }
        th,td{
          width: 60px;
          text-align: center;
        }
        .tradedd{
          width: 195px;
        }
        .time{
          width: 170px;
        }
        .autobtn{
          background: #E64544;
          border-radius: 3px;
          border:0px;
          color: #fff;
        }
      }
      .block{
        margin: 20px auto 0;
        /*max-width: 340px;*/
        text-align: center;
        .el-pager{
          margin-top: 0;
          width: inherit;
          li{
            width: 35px;
            margin: 0 2px;
            &.active{
              background: #fff;
            }
          }
        }
        .btn-next{
          border-left: 1px solid #d1dbe5;
          border-radius: 4px;
        }
        .btn-prev{
          border-right: 1px solid #d1dbe5;
          border-radius: 4px;
        }
      }
      .active{
        border:1px solid #c81118;
        color:#c81118; 
      }
    }
    .el-dialog--small{
      width: 540px;
    }
    .el-dialog__header{
      padding: 26px 26px 0;
    }
    .el-dialog__title{
      display: inline-block;
      height: 18px;
      color: #666;
    }
    .el-dialog__body{
      padding: 10px 26px 26px;
    }
    .el-form-item__label{
      padding-right: 5px;
      color: #000;
    }
    .el-dialog__close{
     /**/
      font-size: 14px;
    }
    .btn{
      .el-dialog__headerbtn{
        line-height: 20px;
      }
    }
    .rmbbtn{
      .el-dialog__headerbtn{
        line-height: 20px;
      }
    }
    .el-dialog__headerbtn{
      /*line-height: 80px;*/
    }
    .el-dialog__close:hover{
      color: #c81118;
    }
    .el-form-item{
      margin-bottom: 10px;
    }
    .ktje{
      height: 20px;
      line-height: 20px;
      position: relative;
      margin-bottom: 0px;
      top:-15px;
    }
    .el-checkbox__inner{
      border-color:#e6e6e6!important;
      background-color: #fff!important;
    }
    .el-checkbox__inner::after{
      border-color: #24A948!important;
    }
    .subbutton{
      width: 120px;
      height: 30px;
      margin-left:164px;
      border-radius: 0;
    }
    .doublebtn{
      width: 120px;
      height: 30px;
      margin-left:40px;
      margin-top: 30px;
      border-radius: 0;
    }
    .suerok{
      width: 80px;
      height: 30px;
      margin-left:170px;
      background: #24A948!important;
      border-radius: 6px;
    }
    .el-button--primary{
      background-color: #c81118;
    }
    .el-input__inner{
      border-color: #ccc;
      border-radius: 0;
    }
    .el-button{
      padding: 0;
      border:0;
    }
    .moremany{
      width: 207px !important;
    }
    .banknum{
      width: 277px;
    }
    .bankboxs{
      /*width: 348px;*/
      height: 36px;
      border: 1px solid #e6e6e6;
      .bankname{
        text-align: center;
        border-right: 1px solid #e6e6e6;
        width: 69px;
        height: 20px;
        float: left;
        line-height: 20px;
        margin-top: 8px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .addbank{
      margin-left:2px;
      width: 260px;
      height: 34px;
      line-height: 37px;
      text-align: center;
      border:1px solid #ccc;
      position: relative;
      border:none;
      float: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .elicon{
        position: absolute;
        right: 10px;
        top:11px;
      }
    }
    .btsadd{
      text-align: left;
      margin-left: 5px;
    }
    .addrmb{
      width: 348px;
      height: 36px;
      border: 1px solid #ccc;
      margin-left: 0;
    }
    .coinicon{
      position: absolute;
      top:11px;
      right: 3px;
      z-index: 400;
      font-size: 12px;
    }
    .addbankactive{
      border:1px solid #78bce6;
      border-bottom: 0px;
    }
    .moren{
      margin-left: 5px;
    }
    .sendsuccess{
      text-align: center;
      /*margin-bottom: 20px;*/
      color: #000;
      p{
        height: 20px;
        line-height: 20px;
      }
      .p2{
        margin-top: 10px;
      }
    }
    .mybank{
      position: relative;
      .historybank{
        z-index: 5;
        width: 100%;
        /*width: 348px;*/
        position: absolute;
        border:1px solid #78bce6;
        border-top:0;
        background: #fff;
        top:36px;
        left: 0;
        padding-bottom: 10px;
        .bname{
          width: 69px;
          height: 20px;
          line-height: 20px;
          margin-top: 10px;
          border-right: 1px solid #e6e6e6;
          text-align: center;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .historylist{
          text-align: center;
          width: 340px;
          color: #000;
          line-height: 30px;
          background-color: #fff;
          margin: 5px 0 0 0px;
          cursor: pointer;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          .hisadress{
            float: left;
            width: 270px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .site{
            text-align: left;
            /*margin-left: 5px;*/
            .BTSadres{
              padding-left: 5px;
              display: inline-block;
              width: 260px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
         .memo{
            color: #999;
            font-size: 14px;
            margin-left:75px;
            margin-top:-15px;
            position: relative;
            p:nth-child(2){
              position:absolute;
              left: 55px;
              top:0;
              color: #000;
            }
          }

        }
        .addnewbank{
          width: 328px;
          text-align: center;
          color: #78bce6;
          height: 30px;
          line-height: 30px;
          border:1px dashed #78bce6;
          background-color: #fff; 
          margin: 5px 10px 0px;

        }
      }
    }
    .selectcity{
      width: 170px;
    }
    .selectcounty{
      width: 170px;
      margin-left: 3px;
    }
    .rmb{
      float: right;
    }
    .yzm{
      width: 244px;
    }
    .sendyzm{
      float: right;
      width: 100px;
      height: 36px;
      line-height: 34px;
      border:1px solid #ccc;
      text-align: center;
      background-color: #f7f7f7;
      color: #78bce6;
      font-size: 14px;
      cursor: pointer;
    }
    .city{
      width: 171px;
    }
    .Preservation{
      border:0;
      background-color: #c81118;
      color: #fff;
    }
    .frominfo{
      padding: 5px 100px;
      margin-top: -10px;
      font-size: 14px;
      color: #ff0000;
    }
    .xian{
      /*width: 448px;*/
      width: 510px;
      ul{
        width: 510px;
        padding-bottom: 10px;
        .frist1{
          width: 120px;
          background: #c81118;
        }
        .two1{
          width: 490px;
          background: #e6e6e6;
        }
        li{
          float: left;
          height: 3px;
        }
      }
    }
    .tibiok{
      width: 448px;
      height: 60px;
      text-align: center;
      .el-icon-circle-check{
        font-size: 60px;
        color: #039935;
      }
    }
    .success{
      font-size: 16px;
      width: 100%;
      color: #000;
      text-align: center;
      margin-top: 10px;
    }
    .adresse{
      display: inline-flex;
      w:92%;
      padding-left: 5px;
      font-size: 14px;
      color: #000;
      word-spacing: 2px;
      overflow: hidden;
    }
    .constent{
      width: 100%;
      margin-top: 10px;
      border-top:1px solid #e6e6e6;
      padding-bottom: 0px;
      .title{
        font-size: 14px;
        color: #ff0000;
        font-weight: bold;
        padding: 10px 0;
      }
      .coninfo{
        color: #000;
        font-size: 12px;
      }
      .tables{
        width: 500px;
        margin-top: 10px;
        table-layout: fixed;
        overflow: hidden;
        .tbstr{
          width: 448px;
          height: 36px;
          border-top: 1px solid #e6e6e6;
          .thtd1{
            width: 53px;
            padding-left: 10px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .thtd2{
            padding-left: 10px;
            width: 160px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .thtd5{
            padding-left: 10px;
            width: 132px;
          }
        }
        tr{
          width: 448px;
          height: 36px;
          border-top: 1px solid #e6e6e6;
          th,td{
            font-size: 14px;
            color: #000;
          }
          .thtd1{
            min-width: 40px;
            padding-left: 10px;
            text-overflow:ellipsis;
          }
          .thtd2{
            min-width: 200px;
            max-width: 350px;
            text-overflow:ellipsis;
            overflow: hidden;
          }
          .thtd3{
            width: 40px;
          }
          .thtd4{
            width: 40px;
            text-align: center;
          }
          .detlate{
            color: #78bce6;
            cursor: pointer;
            overflow: hidden;
          }

        }
        thead{
          tr{
            background: #e6e6e6;
          }
        }
      }
      .tablese{
        .thtd1{
          width: 120px!important;
          padding-left: 10px;
        }
        .thtd2{
          width: 260px!important;
        }
      }
    }
    .anniu{
      width: 100%;
      height: 36px;
      .canniu{
        width: 214px;
        height: 36px;
        line-height: 36px;
        background: #f7f7f7;
        color: #ccc;
        text-align: center;
        cursor: pointer;
      }
      .active{
        color: #000;
        border:1px solid #c81118;
        background: #fff;
      }
      .crleft{
        float: left;
      }
      .cright{
        float: left;
        margin-left: 10px;
      }
    }
    .coininfo{
      height: 20px;
      line-height: 20px;
      margin-bottom: 10px;
      color: #000;
      font-size: 14px;
      display: block;
      position: relative;
      span{
        /*width: 85%;*/
        display: inline-block;
        text-overflow:ellipsis; 
        white-space:nowrap;
      }
      .comAdress{
        float:left;
        /*width: 70%;*/
        max-width: 400px;
        .adressHover{
          text-align: center;
          display: none;
        }
        &:hover{
          .adressHover{
            display:block;
            width: 440px;
            height: auto;
            background: rgba(0,0,0,0.8);
            color: #fff;
            word-wrap:break-word;
            padding: 10px 10px;
            position:absolute;
            border-radius: 4px;
            top:20px;
            left: 50%;
            margin-left: -220px;
          }
        }
      }
      .spanAdreess{
        width: 100%;
        overflow:hidden;
        cursor: pointer;
      }
      a{
        width: 10%;
         display: inline-block;
      }
      .update{
        padding-left: 5px;
        color: #78bce6;
        cursor: pointer;
      }
      .leftlabel{
        display: inline-block;
        width: 100px;
        text-align: right;
        padding-right: 20px;
      }
    }
    .cointip{
      margin-top: 10px;
      p{
        color: #666;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .appTip{
        margin-left: 101px;
       /* img{
          width: 87px;
          height: 87px;
        }*/
      }
    }
    .lastgetcoin{
      margin-top: 10px;
      width: 100%;
      label{
        color: #000;
        display: inline-block;
      }
      .inputcode{
        width: 230px;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
      }
      button{
        margin-left: 10px;
        padding: 0 10px;
        height: 30px;
        color: #fff;
        background: #E64544;
        border:0;
      }

    }
    .lastgetcoin-tip{
      color: #333;
      span{
        color: #c81118;
        cursor: pointer;
      }
    }
    .submitcode{
      width: 100px;
      height: 30px;
      color: #fff;
      margin:20px 160px 0;
      background: #E64544;
      border:0;
    }
    .infots{
      width: 100%;
      text-align: center;
    }
    .divyzm{
      margin-top: 10px;
      margin-bottom: 5px;
      width: 100%;
      height: 20px;
      .setlinfo{
        font-size: 14px;
        color: #ff0000;
        word-spacing: 2px;
      }
    }
    .conlabel{
      margin-left: 65px;
      .yzmtj{
        height: 36px;
        line-height: 36px;
        width: 60px;
      }
    }
    .mimakuan{
      width: 217px;
      height: 30px;
      margin-left: 10px;
    }
    .btnOne{
      .chTcoantain{
          margin-top: 30px;
          text-align: right;
          margin-right: 25px;
          .chTcoantain-tip{
            margin-left: 100px;
            text-align: left;
            color: #333;
            span{
              color: #c81118;
              cursor: pointer;
            }
          }
          input{
            width: 358px;
            height: 35px;
            margin-bottom: 10px;
            border:1px solid #e5e5e5;
            padding: 0 10px;
          }
          .coide{
            width: 245px;
          }
          .mobilenum{
            width: 358px;
            display: inline-block;
            text-align: left;
            margin-bottom: 10px;
          }
          select{
            width: 108px;
            height: 35px;
            color: #333;
            font-size: 14px;
            /*float: right;*/
            margin-left: 5px;
            background: #f7f7f7;
            border:1px solid #e5e5e5;
            cursor: pointer;
          }
          .areashow{
            width: 108px;
            height: 35px;
            color: #333;
            font-size: 14px;
             background:rgb(235, 235, 228);
              cursor: pointer;
          }
          button{
            width: 108px;
            height: 35px;
            color: #1486cd;
            font-size: 14px;
            float: right;
            margin-left: 5px;
            background: #f7f7f7;
            border:1px solid #e5e5e5;
            cursor: pointer;
          }
        }
        .doublebtn{
          width: 120px;
          margin-left: 160px;
        }
        .chTzhongzHI{
          p{
            text-align: center;
            font-size: 14px;
            color: #000;
            font-weight: bold;
            margin-top: 30px;
            span{
              color: #f00;
            }
          }
          .zHIone{
            text-align: center;
            margin-top: 28px;
            img{
              margin-right: 8px;
            }
          }
          .zHItwo{
            overflow: hidden;
            width: 100%;
            background: #f5f5f5;
            margin-top: 20px;
            padding:10px 0;
            table{
              width: 100%;
              tr{
                height: 30px;
                td{
                  text-align: right;
                  width: 100px;
                }
                .td1{
                  text-align: left;
                  width: 200px;
                  padding-left: 20px;
                  span{
                    font-weight: bolder;

                  }
                  /*span:nth-child(2),span:nth-child(3),span:nth-child(4){
                    margin-left:5px;
                  }*/
                }
                .banknum{
                  span{
                    margin-left:5px;
                  }
                  span:nth-child(1){
                    margin-left:0px;
                  }
                }
                .td2{
                  text-align: left;
                  padding-left: 20px;
                  button{
                    width: 50px;
                    height: 22px;
                    background: #c81116;
                    color: #fff;
                    border-radius: 2px;
                    border: none;
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .zHIthree{
            text-align: center;
            img{
              margin: 28px 0 ;
            }
            .nameOn{
              font-size: 14px;
              color: #000;
              font-weight: bold;
            }
          }
          .zHIfour{
            margin-top: 28px;
            padding: 20px;
            background: #fffffa;
            border: 1px solid #FEEBE0;
            p{
              margin-top: 0;
              text-align: left;
              font-size: 12px;
              color: #333;
              font-weight: normal;
            }
          }
        }
        .usdtmain{
          text-align: right;
          .usdtcon{
            display: inline-block;
            width: 370px;
            text-align: left;
            margin-top: 20px;
          }
          .usdtRmb{ 
            margin-top: 15px;
            display: inline-block;
            border: 1px solid #e7e7e7;
            line-height: 30px;
            color: #666;
            input{
              width: 125px;
              border: none;
            }
          }
          .enter{
            margin: 0 10px;
          }
          .usdtcoin{
            display: inline-block;
            width: 295px;
            text-align: left;
            color: #48576a;
          }
          .usdtnameT{
            margin-top: 5px;
            display: inline-block;
          }
          .usdtfees{
            /*display: inline-block;*/
            float: left;
            margin-top: 25px;
            margin-left: 57px;
          }
          .T1{
            margin-top: 10px;
          }
          .usdtname{
            cursor: not-allowed;
            padding-left: 10px;
            float: right;
            width: 370px;
            display: inline-block;
            text-align: left;
            height: 35px;
            background: #e6e6e6;
            line-height: 32px;
          }
          .usdtbank{
            width: 370px;
            margin-top: 10px;
          }
          .banktit{
            float: left;
            margin-top: 25px;
            margin-left: 41px;
          }
        }
        .usdttit{
          text-align: center;
          margin-top: 35px;
          font-size: 14px;
          color: #000;
          font-weight: bold;
        }
        .usdtbankcon{
          overflow:hidden;
          text-align: right;
          .tab1{
            overflow: hidden;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            input{
              padding-left: 10px;
              height: 36px;
              border: 1px solid #ccc;
            }
            .normalin{
              width: 370px;
              margin-top: 10px;
            }
            .banknumber{
              margin-top: 10px;
              width: 315px;
            }
            .usdtlable{
              width: 183px;
              margin-top: 10px;
            }
            .margtop{
              margin-top: 10px;
            }
            .yanzheng{
              width: 280px;
              margin-top: 10px;
            }
            .getyanzheng{
              width: 84px;
              height: 36px;
              border: 1px solid #d1d1d1;
              background: #f7f7f7;
              color: #4C86AB;
              cursor: pointer;
            }
            .chTcoantain-tip{
              text-align: left;
              margin-left: 120px;
              color: #333;
              span{
                color: #c81118;
                cursor: pointer;
              }
            }
            .letnew{
              text-align: center !important;
              width: 200px;
              height: 32px;
              background: #C91119;
              color: #fff;
              border: none;
              cursor: pointer;
              margin-top: 20px;
              float: left;
              margin-left: 120px;
            }
        }
        .yanhangtab{
            margin-top: 10px; 
            table{
              width: 100%;
              .tr1{
                background: #e6e6e6;
              }
              tr{
                line-height: 32px;
                border-bottom: 1px solid #ccc;
                td{
                  padding-left: 10px;
                }
                .td1{
                  text-align: center;
                  width: 150px;
                }
                .td2{
                  width: 220px;
                    text-align: left;
                    padding-left: 10px;
                }
                .td3{
                  span{
                    cursor: pointer;
                  }
                  .nametd3{
                    text-align: left;
                    margin-right: 15px;
                  }
                  .checkboo{
                    margin-left: 10px;
                  }
                }
              }
            }
        }
      }
    }
    .msgBox{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.2);
      z-index: 100;
      text-align: center;
      #TCaptcha{
        /* z-index: 1000000; */
        position: absolute;
        left: 50%;
        margin : -20px 0 0 -150px;
        top: 50%;
      }
      
    }
  }
</style>