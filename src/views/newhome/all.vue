<template>
	<div class="lunch">
		<!-- 行情1 -->
		<!-- <div class="elscroll">
			<div class="title">
				<span class="nope">行情</span>
				<span class="houer">24h</span>
			</div>
			<div class="scroll">
				<el-carousel :interval="5000" height="168px" arrow="always">
			    <el-carousel-item v-for="item in allinticker">
			      <div class="tab" v-for="cat in item">
			      	<div class="left">
			      		<p class="newprice">{{cat.symbol}}最新价格</p>
				      	<p class="coin">$ <span :class="{green:cat.range!=null&&cat.range.indexOf('-')>=0}">{{cat.last}}</span> / ¥ {{cat.lastrmb}}</p>
				      	<p class="dealnum">成交量: {{cat.vol}}</p>
			      	</div>
			      	<div class="bottom"></div>
			      	<span class="updown" :class="{green:cat.range!=null&&cat.range.indexOf('-')>=0}">{{cat.range|fift}}</span>
			      </div>
			    </el-carousel-item>
			  </el-carousel>
			</div>
		</div>  -->
		<!-- 行情二 -->
		<div class="tabhang">
			<!-- 一级tab -->
			<div class="tabul">
				<ul>
					<li @click="changecoin('USDT')" :class="{active:isactive == 'USDT'}">USDT行情</li>
					<li @click="changecoin('BTC')" :class="{active:isactive == 'BTC'}">BTC行情</li>
				</ul>	
			</div>
			<div class="tabtable">
				<table>
					<tr class="tr1">
						<td width="150">交易市场</td>
						<td width="230">最新成交价</td>
						<td width="130">涨跌</td>
						<td width="189">最高价 ( 24h )</td>
						<td width="189">最低价 ( 24h )</td>
						<td width='120'>成交量</td>
						<td width="80" class="last">操作</td>
					</tr>
					<tr v-for="item in fince" v-if="item.symbol!='BTCSUSDT'&&item!=false">
						<td class="hovertd" @click="gohelp()">
							<i class="iconfont" :class="'icon-'+item.symbol+'-copy'"></i>
							<span class="hover">{{item.symbol|filterSymbol}}</span><br>
							<span>{{item.symbol|filterSymbolT}}</span>
						</td>
						<td>
							<span class="red" :class="{green:item.range!=null&&item.range.indexOf('-')>=0}">{{item.last|filterUndefined}}</span>
							 / ¥ {{item.lastrmb|filterUndefined}}
							 <i v-if="item.range!=null&&item.range.indexOf('-')<0" class="iconfont icon-arrow-up"></i>
							 <i v-if="item.range!=null&&item.range.indexOf('-')>=0" class="iconfont icon-arrow-down"></i>
						</td>
						<td class="red" :class="{green:item.range!=null&&item.range.indexOf('-')>=0}">{{item.range|fift}}</td>
						<td>{{item.high}}</td>
						<td>{{item.low}}</td>
						<td>{{item.vol}}</td>
						<td class="last">
							<button @click="gotrade(item.symbol)">去交易</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import {ajax} from '../../assets/js/common.js'
	export default{
		data(){
			return{
				isactive:"USDT",
				ticker:[],
				tickerBTC:[],
				tickerUSDT:[],
				fince:[],
				goup:true,
				allinticker:[],
				symbol:'',
				sparam:{
					sort: 'cname',
				}
			}
		},
		filters:{
			fift(e){
				if(e != null){
					if(e.indexOf('-')>=0){
						return e;
						this.goup = true;
					}else if(e.indexOf('-'<0)){
						return '+'+e;
						this.goup = false;
					}
				}else{
					return;
				}
			},
			filterSymbol(e){
				if(e.indexOf("USDT") != -1){
					e = e.replace('USDT','/USDT');
					return e;
				}else if((e.indexOf("BTC") != -1)){
					e = e.replace('BTC','/BTC');
					return e;
				}
      },
      filterSymbolT(e){
        if(e.indexOf("USDT") != -1){
          e = e.replace('USDT','');
          if(e == 'BTY'){
            return e = '比特元';
          }else if(e == 'BTC'){
            return e = '比特币';
          }else if(e == 'BCC'){
            return e = '比特现金';
          }else if(e == 'ETH'){
            return e = '以太坊';
          }else if(e == 'ETC'){
            return e = '以太坊经典';
          }else if(e == 'ZEC'){
            return e = '零币';
          }else if(e == 'LTC'){
            return e = '莱特币';
          }else if(e == 'DCR'){
            return e = '德信币';
          }else if(e == 'BTS'){
            return e = '比特股';
          }else if(e == 'SC'){
            return e = '云储币';
          }
				}else if((e.indexOf("BTC") != -1)){
					e = e.replace('BTC','');
					if(e == 'BCC'){
            return e = '比特现金';
          }else if(e == 'ETH'){
            return e = '以太坊';
          }else if(e == 'ZEC'){
            return e = '零币';
          }else if(e == 'LTC'){
            return e = '莱特币';
          }
				}
      },
			filterUndefined(e){
				if(e == null){
					return 0;
				}else{
					return e;
				}
			}
		},
		mounted(){
			this.firstFun();
			this.interTime = setInterval(()=>{
				this.firstFun();
			},5000)
		},
		destroyed(){
			clearInterval(this.interTime);
		},
		methods:{
			//初始化函数
			firstFun(){
				this.$store.dispatch('getMineTickerData',this.sparam);
				setTimeout(()=>{
					this.getTicker()
				},300)
			},
			//跳转到帮助中心
			gohelp(){
				this.$router.push({path:'/help/coinIntroduce'})
			},
			//跳转到交易中心
			gotrade(e){
				if(this.isactive == 'USDT'){
					//拿到币种
					this.symbol = e.replace('USDT','');
					// 大小写转换
					this.symbol = (this.symbol).toLowerCase();
					// 跳转
					this.$router.push({path:'usercenter/'+this.symbol+'USDTtrade'})
				}else if(this.isactive == 'BTC'){
					//拿到币种
					this.symbol = e.replace('BTC','');
					// 大小写转换
					this.symbol = (this.symbol).toLowerCase();
					// 跳转
					this.$router.push({path:'usercenter/'+this.symbol+'trade'})
				}
				// this.$router.push({path:''})
			},
			// 循环轮播
			allin(){
				// console.log(this.ticker)
				let array = [];
				for(let i=0, len=this.ticker.length;i<len;i+=4){
					array.push(this.ticker.slice(i,i+4));
				}
				this.allinticker = array;
			},
			// 获取数据
			getTicker(){
				ajax(this,this.extendApi.getcoindata,this.sparam,(res)=>{
					if(res.code == 200){
						this.tickerBTC = res.data.BTC;
						this.tickerUSDT = res.data.USDT;
						// this.$store.state.tickerUSDT = res.data.USDT;
						this.ticker = this.tickerBTC.concat(this.tickerUSDT);
						this.changecoin(this.isactive);
						// 循环轮播
						this.allin();	
					}else{

					}
				},'GET')
			},
			//一级菜单
			changecoin(e){
				if(e == 'USDT'){
					this.isactive = "USDT";
					this.fince = this.$store.state.tickersUSDT;
				}else{
					this.isactive = "BTC";
					this.fince = this.$store.state.tickersBTC;
				}
			}
		}
	}
</script>
<style>
	.lunch{
		width: 1200px;
		margin: 0 auto;
		/*height: 500px;*/
		.elscroll{
			.title{
				line-height: 24px;
				padding: 15px 0;
				.nope{
					color: #000;
					font-size: 14px;
					border-left: 3px solid #de5604;	
					padding-left: 10px;
				}
				.houer{
					color: #fff;
					display: inline-block;
					width: 40px;
					height: 24px;
					background: #1a5f9b;
					text-align: center;
					border-radius: 4px;
					margin-left: 10px;
				}
			}
			.scroll{
				height:168px;
				text-align: center;
				.el-carousel__indicators{
					display: none;
				}
				.tab{
					float: left;
					margin-right: 20px;
					width: 283px;
					height: 168px;
					background-color: #fff;
					/*background-image: url(../../assets/img/index1/one.png) center center no-repeat;*/
					/*background:url(../../assets/img/index1/one.png) no-repeat center bottom;*/
					padding: 15px 10px 0 10px;
					border:1px solid #eee;
					.left{
						text-align: left;
						float: left;
						.newprice{
							/*float: left;*/
							font-size: 14px;
							color: #666;
							font-weight: bold;
						}
						.coin{
							margin-top: 19px;
							color: #333;
							font-size: 16px;
							span{
								color: #de5604;
							}
							.green{
								color: #78b632;
							}
						}
						.dealnum{
							margin-top: 18px;
							color: #666;
							font-size: 14px;
						}
					}
					.bottom{
						float: left;
						position: absolute;
						bottom:0;
						width: 283px;
						height: 57px;
						margin-left: -10px;
						background: url(../../assets/img/index1/one.png) no-repeat center bottom;
					}
					.updown{
						float: right;
						font-size: 14px;
						font-weight: bold;
						color: #de5604;
					}
					.green{
						color: #78b632;
					}
				}
				.tab:last-child{
					margin-right: 0px;
				}
			}
		}
		.tabhang{
			margin-top: 30px;
			.tabul{
				
				ul{
					background: #f0efef;
					overflow: hidden;
					li{
						width: 600px;
						line-height: 60px;
						float: left;
						font-size: 16px;
						text-align: center;
						font-weight: bold;
						color: #333;
						border-top: 2px solid #f0efef;
						cursor: pointer;
					}
					.active{
						background: #fff;
						border-top: 2px solid #c81118;
						color: #c81118;
					}
				}
			}
			.tabtable{
				background: #fff;
				/*padding: 10px 20px 0 20px;*/
				table{
					border: 1px solid #f0efef;
					border-top: none;
					width: 100%;
					tr{
						height: 70px;
						font-size: 14px;
						color: #666;
						border-bottom: 1px solid #f0efef;
						td{
							padding-left: 20px;

							button{
								color: #fff;
								width: 90px;
								height: 34px;
								background: #0485d8;
								border-radius: 5px;
								outline: none;
								border: none;
								font-size: 14px;
								cursor: pointer;
							}
						}
						.red{
							color: #de5604;
							
						}
						.green{
							color: #78b632;
						}
						.hovertd{
							cursor: pointer;
							i{
								float: left;
								font-size: 30px;
								margin-right: 10px;
							}
							.icon-BTYUSDT-copy{
								color: #ff8f21;
							}
							.icon-BTCUSDT-copy{
								color: #3dabcb;
							}
							.icon-BCCUSDT-copy{
								color: #e6ac00;
							}
							.icon-BCCBTC-copy{
								color: #e6ac00;
							}
							.icon-ETHUSDT-copy{
								color: #e14f55;
							}
							.icon-ETHBTC-copy{
								color: #e14f55;
							}
							.icon-ETCUSDT-copy{
								color: #09afd8;
							}
							.icon-ETCBTC-copy{
								color: #09afd8;
							}
							.icon-ZECUSDT-copy{
								color: #ec7121;
							}
							.icon-ZECBTC-copy{
								color: #ec7121;
							}
							.icon-LTCUSDT-copy{
								color: #47ad50;
							}
							.icon-LTCBTC-copy{
								color: #47ad50;
							}
							.icon-BTSUSDT-copy{
								color: #635383;
							}
							.icon-SCUSDT-copy{
								color: #7fb131;
							}
							.icon-DCRUSDT-copy{
								color: #09afd8;
							}
						}
						
						.last{
							text-align: right;
							padding-right: 20px;
						}
					}
					tr:hover{
						.hover{
							color: #0485d8;
						}
					}
					tr:nth-child(odd){
						background: #fafafa;
					}
					.tr1{
						font-size: 16px;
						color: #333;
						height: 75px;
						background: #fff !important;
						border-bottom: 1px solid #dcdcdc;
					}
				}
			}
		}
	}

	.icon-arrow-up{
		color: #de5604;
	}
	.icon-arrow-down{
		color: #78b632;
	}
</style>