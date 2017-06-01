/*(function(){
	var init = function(){
		var orderForm=document.forms.order;//获取name属性为‘order’的表单元素 相当于=document.getElementByTagName'form')
		var saveBtn=document.getElementById('saveOrder');
		var savBtnClicked=false;

		var saveForm=function(){
			//判断浏览器中的input元素是否包含formAction属性。
			//如果浏览器不支持formaction属性 就利用setAttribute设置表单的action属性
			if (!('formAction' in docuemnt.createElement('input'))) {
				//不支持却可以获取formaction属性值 不理解 难道不支持这个属性 却还有这个值
				//弄明白了 虽然浏览器不支持 但是dom中是有这个值的
				var formAction=saveBtn.getAttribute('formaction');//获取提交按钮的表单的formaction值 
				orderForm.setAttribute('action',formAction);//赋值给表单form的action属性
			}
			saveBtnClicked=true;
		};

		saveBtn.addEventListener('click',saveForm,false);

		//计算金额
	};

	window.addEventListener('load',init,false);
})();*/



//测试区
window.onload=function(){
	//定义过滤器 使计算出来的结果千分位加逗号
	Vue.filter(
		'fixTwo',function (value){
			return value==0?'0.00':value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
		}	
	);

	new Vue({
		el:'#container',
		data:{
			price:{
				Smartphone:399.99,
				Tablet:499.99,
				Netbook:299.99
			},
			qty:{
				Smartphone:0,
				Tablet:0,
				Netbook:0
			}
		},
		computed:{
			totalSmartphone(){
				return this.price.Smartphone*this.qty.Smartphone;	
			},
			totalTablet(){
				return this.price.Tablet*this.qty.Tablet;	
			},
			totalNetbook(){
				return this.price.Netbook*this.qty.Netbook;	
			},
			totalAll(){
				return this.totalSmartphone+this.totalTablet+this.totalNetbook;
			}

		},
		methods:{
			//fallback方案
			//当用户自行通过键盘输入数量 大于99 小于0的的时候 弹出提示框提示数量为0-99 解决手工键盘输入和不兼容html5的input框的max和min属性的浏览器兼容性问题 
			warnAmount(ev){
				//alert(ev.target.value);
				if (ev.target.value>99) {
					ev.target.value=99;
					confirm('Please keep the mount between 0-99');
				}
			},
			saveOrderSub(){
				(function(){
					var orderForm=document.forms.order;//获取name属性为‘order’的表单元素 相当于=document.getElementByTagName'form')
					var saveBtn=document.getElementById('saveOrder');
					var savBtnClicked=false;

					var saveForm=function(){
						//判断浏览器中的input元素是否包含formAction属性。
						//如果浏览器不支持formaction属性 就利用setAttribute设置表单的action属性
						if (!('formAction' in docuemnt.createElement('input'))) {
							//不支持却可以获取formaction属性值 不理解 难道不支持这个属性 却还有这个值
							//弄明白了 虽然浏览器不支持 但是dom中是有这个值的
							var formAction=saveBtn.getAttribute('formaction');//获取提交按钮的表单的formaction值 
							orderForm.setAttribute('action',formAction);//赋值给表单form的action属性
						}
						saveBtnClicked=true;
					};	
				})();
								
			},
			//按提交的时候 验证密码一致性 用setCustomValidity设置密码不一致的提示信息
			//如果再次更正输入 仍然显示“密码不一致” 这是一个bug 需要在input输入的时候设置提示信息
			checkPassword(){
				//var aPassword=document.forms.order.password.length;
				var orderForm=document.forms.order;//获取form元素
				var aPassword=orderForm.password;
				var aconfirmpassword=orderForm.confirmpassword
				//console.log(aconfirmpassword);
				if (aPassword.value!==aconfirmpassword.value) {
					//alert(2);
					//兼容浏览器
					if ('setCustomValidity' in aconfirmpassword) {
						aconfirmpassword.setCustomValidity('密码不一致');
					}else{
						//不兼容的浏览器 不会提示
						aconfirmpassword.validationMessage='密码不一致';
					}
					
					return false;//返回false 不提交submit
				}else{
					aconfirmpassword.setCustomValidity('');
					//return true;
				}

			},
			//当confirm密码框输入的时候 提示信息为空
			confirmpassword(ev){
				if ('setCustomValidity' in ev.target) {
						ev.target.setCustomValidity('');
					}else{
						ev.target.validationMessage='';
					}
			},
			//
			invalid(){
				// var orderForm=document.forms.order;
				// console.log(orderForm.id);
			}
		},
		mounted:function(){
			document.getElementById('setfocus').focus();//vue加载后 自动获取焦点失效 需要手工设置
			//alert(2);
			
			//vue挂载后开始监听invalid事件 
			(function(){
				var orderForm=document.forms.order;
				function invalidForm(){
					//console.log(orderForm.id);
					orderForm.className='invalid';	
				}
				orderForm.addEventListener('invalid',invalidForm,true);	
			})();

			
		}
	});

	//原生
	//监听form的invalid事件 放到vue的mouted周期内 也可以
	//invalid事件调用条件：
	//1 用户试图提交表单 但是验证失败
	//2 checkValidity方法已经被调用过 且返回false
/*	var orderForm=document.forms.order;
	function invalidForm(){
		//console.log(orderForm.id);
		orderForm.className='invalid';	
	}
	orderForm.addEventListener('invalid',invalidForm,true);*/

}

/***************************************************************************/

/*关于formaction 属性：
www.w3school.com.cn/html5/att_button_formaction.asp

实例
带有两个提交按钮的表单（带有不同的 action）：
<form action="demo_form.asp" method="get">
First name: <input type="text" name="fname" />
Last name: <input type="text" name="lname" />
<button type="submit">提交</button><br />
<button type="submit" formaction="demo_admin.asp">以管理员身份提交</button>
</form><!--此处的formaction会覆盖form元素的action-->

定义和用法
formaction 属性覆盖 form 元素的 action 属性。
该属性与 type="submit" 配合使用。*/


/***************************************************************************/

/*
知识点1 forms.name名称，是个集合意思是form表单里所有name属性值为该值的集合。
知识点2 html5中 type为number的input表单 有valueAsNumber属性。可以获取 也可以改写。获取的时候其值是个字符串。

<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Document</title>

<style>

</style>

</head>
<script></script>

<body>
<form id='form1'>
	<input type='number' id='number1' value='10' name='qty'>
	<input type='number' id='number2' name='qty'>
</form>


</body>

</html>
<script>
window.onload=function(){
	document.body.onclick=function(){
		var oForm=document.getElementById('form1');
		var aInput=oForm.qty;//form表单里 有name属性值为‘qty’的input集合
		//var aInput=oForm.number;//form表单里 有name属性值为‘qty’的input集合
		console.log(aInput.length);//2

		//input的valueAsNumber属性 有兼容性问题
		//不支持该属性的浏览器 fallback方案就是用value的值 
		//区别是value是个字符串 需要parseInt转换 而input的valueAsNumber属性值number 可以直接加减
		input的valueAsNumber属性可以读 可以写
		console.log(aInput[0].valueAsNumber);
		aInput[0].valueAsNumber=1;//1

	}

}
</script>*/




/*************************************/
/*dataset获取该元素的有data-** 属性的集合，返回一个对象
例如：
<form id='form1'>
	<input type='number' id='number1' value='10' name='qty'>
	<input type='number' id='number2' name='qty' data-price='1' data-qty='20'>
</form>

<script>
window.onload=function(){
	document.body.onclick=function(){
		var oForm=document.getElementById('form1');
		var aInput=oForm.qty[1].dataset;
		console.log(aInput);//是个对象{price: "1", qty: "20"}

	}

}
</script>*/

/*用setCustomValidity("请输入4位数字的代码")方法设置input的自定义提示，设置后其validationMessage属性值就是设置好的值
用法 ：
input元素.setCustomValidity("请输入4位数字的代码")
document.querySelector("input").setCustomValidity("请输入4位数字的代码");

fallback方案：
对于不支持setCustomValidity的浏览器 
input.validationMessage=''//手动设置值*/
