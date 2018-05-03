(function(){
	var todolist = document.getElementById('todolist');
	var addBox = document.getElementById('addBox');
	var dark = document.getElementById('dark');
	var confirm=  document.getElementById('confirm');
	var addform = document.getElementById('addform');
	var content = document.getElementById('content_list');
	var removeBtn = document.getElementsByClassName('todo-remove');
	var doneBtn = document.getElementsByClassName('todo-one');

	//放置添加todolist事件的数组
	var list = [];

	//跨浏览器事件代理
	function addEvent(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type,handler)
		}else{
			element["on" + type] = handler;
		}
	}


	//围绕添加按钮+ ，一系列，构造函数
	var btnClick = function(elementID){
		this.elId = elementID || "switchBtn";
		//按钮+
		this.el = document.getElementById(this.elId);
		//按钮状态属性 来判断调用open（）还是close（）
		this.state = "close";
		//闭包
		self = this;
		
		addEvent(this.el,'click',function(e){
			if(self.state == "close"){
				self.open();
			}else if(self.state == "open"){
				self.close();
			}
			
		});

		this.msg = addBox.getElementsByTagName('input')[0];
		this.date = addBox.getElementsByTagName('input')[1];

		addEvent(todolist,'click',function(e){
			
			var e = e || window.event;
			var target = e.target;
			for(var j=0 ;j<removeBtn.length;j++){
				if(removeBtn[j] == target){
					self.remove(j);
				}
			}
			for (var i = 0; i < doneBtn.length; i++) {
				if(doneBtn[i] == target){console.log(2220);
					self.doneEvnet(i);
				}
			}

		})
	}

	btnClick.prototype.confirmEvent = function(){
		if(this.msg.value.length === 0){
				alert("事件不能为空");
				return;
			}else if(this.date.value.length === 0){
				alert('日期不能为空')
				return;
			}else {
				this.edit();
			}
	}

	
	btnClick.prototype.open = function() {
		addBox.classList.remove('none');
		dark.classList.remove('none');
		addBox.classList.add('move-up');
		dark.classList.add('move-up');
		this.el.classList.remove('btn_rotate_2');
		this.el.classList.add('btn_rotate');
		this.state = 'open';

		var moment = this;
		addEvent(todolist,'click',function(e){
			var e = e || window.event;
			var target = e.target;
			if(target == confirm){
				moment.confirmEvent();
			}else if(target == dark){
				moment.close();
			}
		})
	}

	btnClick.prototype.close = function(){
		addBox.classList.add('none');
		dark.classList.add('none');
		addBox.classList.remove('move-up');
		dark.classList.remove('move-up');
		this.el.classList.add('btn_rotate_2');
		this.state = 'close';


	}



	// //从本地缓存获取数据，赋值给list 这样刷新页面用户数据依旧存在
	// btnClick.prototype.loadData = function(){
	// 	var hisTory = localStorage.getItem('mytodolist');
	// 	if(hisTory != null){
	// 		return JSON.parse(hisTory);
	// 	}else{return [];}//返回空数组
	// }

	// brnclick.prototype.load = function(){
		

	// }

	btnClick.prototype.saveDate = function(data){
		localStorage.setItem('mytodolist',JSON.stringify(data));
	}

	var loadData = function(){
		var hisTory = localStorage.getItem('mytodolist');
		if(hisTory!= null){
			return JSON.parse(hisTory);
		}
		else{return [];}
	}

	btnClick.prototype.edit = function(){
		

		var obj_list = {
			todo: "",
			date: "",
			done: "todo"
		};
		obj_list.todo = this.msg.value;
		obj_list.date = this.date.value;

		list.push(obj_list); //添加到数组末尾
		this.saveDate(list);

		load(content);
		this.close();
		addform.reset();
	}

	function load (elementId){

		list = loadData();
		elementId.innerHTML = "";
		for(var i = 0; i<list.length; i++){
			elementId.innerHTML +='<li class="list">'
						+'<img src="img/'+ list[i].done +'.png" class="todo-one">'
						+'<p>'+list[i].todo +'</p>'	
						+'<img src="img/subtract.png" class="todo-remove">'
					+'</li>';
		}
	}


	var btnClick1 = new btnClick("switchBtn");
	window.onload = function(){
		load(content);
	}

	btnClick.prototype.remove = function(i){
	list.splice(i,1);
		this.saveDate(list);

		load(content);	
	}

	btnClick.prototype.doneEvnet = function(i){
		var todo = list[i].todo;
		var data = list[i].data;
		list[i].done = "success";
		var done = list[i].done;
		var obj_list = {
			todo: todo,
			date: data,
			done: done
		};
		list.splice(i,1);
		list.push(obj_list)
		this.saveDate(list);
		load(content);

	}
	
})()