<template>
	<div class='six-box'>
		
		<div class='pwd-box1'>
			<i v-for='i in 6'>{{pwdArray[i-1]}}</i>
		</div>
		<div class='input-box'>
			<input v-model='password' v-focus id='pwd1' class='pwd1' type="text" name="" maxlength='6' @input="input1()">
		</div>
	</div>
</template>
<script>

export default{
	// props:['clearstate'],
	// watch:{
	// 	clearstate:function(val){
	// 		if(val==false){
	// 			this.password='';
	// 			this.pwdArray=[];
	// 		}
	// 		else{
	// 		}
	// 	}
	// },
	data(){
		return{
			password:'',
			pwdArray:[],
		}
	},
	directives:{
		focus:{
			inserted:function(el){
				el.focus();
			}
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.password='';
			
		})
	},
	methods:{
		input1:function(){
			this.sperate((data)=>{
			})
			let _this=this;
			setTimeout(function(){
				_this.password='';
				_this.sperate((data)=>{
				})
      },5000)
		},
		sperate:function(success){
			
			let number=this.password;
			let array=number.split('');
			this.pwdArray=array;
			if(array.length==6){
				
				// document.getElementById('pwd1').blur();
				// success("123");
				let x=document.getElementsByClassName('pwd1');
					x[0].blur();
				this.$emit('sixbox',this.password);
			}

		}
	}
}
</script>
<style>
.six-box{

	.pwd-box1{
		text-align: center;
		position: relative;
		width:217px;
		margin:0 auto;
		overflow: hidden;
		i{
			float: left;
			border:1px solid #ccc;
			border-right: none;
			color: #ccc;
			width: 36px;
			height: 40px;
			line-height: 40px;
			font-size: 20px;
		}
		i:first-child{
			border-top-left-radius:6px;
			border-bottom-left-radius: 6px;
		}
		i:last-child{
			border-right:1px solid #ccc;
			border-top-right-radius: 6px;
			border-bottom-right-radius: 6px;
		}

	}
	.input-box{
		position: relative;
		clear: both;
		width: 217px;
		margin: 0 auto;
	}
	#pwd1{
			position: absolute;
			top: 0;
			width: 217px;
			margin: -40px auto 0;
			/*margin-top: -40px;*/
			height: 40px;
			opacity:0;
			background-color:red !important;
		}
}
</style>