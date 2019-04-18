
		window.onload = function (){
			var head = document.querySelector("#head");
			var nList = document.querySelectorAll("#head .wrap .nav > .list > li");
			var content = document.querySelector("#content");
			var cList = document.querySelector("#content >.list");
			var cLiNodes = document.querySelectorAll("#content >.list > li");
			//var arrowEl = document.querySelector("#head .wrap .arrow");
			var upNodes = document.querySelectorAll("#head .wrap  .nav > .list > li .up");
			var firstLiNode  = nList[0];
			var firstUpNode  = firstLiNode.querySelector(".up");
			 
			var pList = document.querySelectorAll("#content .point > li");
			
			var team3 = document.querySelector("#content > .list > .home5  .team3");
			var team3Ul = document.querySelector("#content > .list > .home5 .team3 ul");
			var team3Lis = document.querySelectorAll("#content > .list > .home5 .team3 ul>li");
			
			//同步当前屏的索引   this.index---同步---now   now----不同步---  this.index
			var now = 0;
			var index = 0;
			var timer = 0;
			var preIndex = 0;

			//第一屏3D效果
			var side1LiNodes = document.querySelectorAll("#content > .list > .home1 .side1 > li");
			var side2LiNodes = document.querySelectorAll("#content > .list > .home1 .side2 > li");
			var side1 = document.querySelector("#content > .list > .home1 .side1");
			var oldIndex = 0;
			var timer3D =0;
			var autoIndex =0;
			
			//3D效果
			home3D();
			function home3D(){
				for(var i=0;i<side2LiNodes.length;i++){
					side2LiNodes[i].index = i;
					side2LiNodes[i].onclick=function(){
						clearInterval(timer3D);
						for(var i=0;i<side2LiNodes.length;i++){
							side2LiNodes[i].classList.remove("active");
						}
						this.classList.add("active");
						//从左往右  当前索引大于上一次索引  rightShow
						if(this.index>oldIndex){
							side1LiNodes[this.index].classList.remove("leftShow");
							side1LiNodes[this.index].classList.remove("leftHide");
							side1LiNodes[this.index].classList.remove("rightHide");
							side1LiNodes[this.index].classList.add("rightShow");
							
							
							side1LiNodes[oldIndex].classList.remove("leftShow");
							side1LiNodes[oldIndex].classList.remove("rightShow");
							side1LiNodes[oldIndex].classList.remove("rightHide");
							side1LiNodes[oldIndex].classList.add("leftHide");
						}
						
						//从右往左  当前索引小于上一次索引 leftShow
						if(this.index<oldIndex){
							side1LiNodes[this.index].classList.remove("rightShow");
							side1LiNodes[this.index].classList.remove("leftHide");
							side1LiNodes[this.index].classList.remove("rightHide");
							side1LiNodes[this.index].classList.add("leftShow");
							
							
							side1LiNodes[oldIndex].classList.remove("leftShow");
							side1LiNodes[oldIndex].classList.remove("rightShow");
							side1LiNodes[oldIndex].classList.remove("leftHide");
							side1LiNodes[oldIndex].classList.add("rightHide");
						}
						
						oldIndex = this.index;
						
						//手动轮播  ---> 自动轮播的同步问题！！
						//手动点完是需要自动轮播的，自动轮播从哪个面开始播？--->手动点的这个面开始自动轮播
						//手动轮播的逻辑必须要告诉自动轮播 我刚刚点了哪一个面
						autoIndex = this.index;
						
					}
				}
				
				//从左向右自动轮播 
				move(4);
				function move(){
					 clearInterval(timer3D);
					 //定时器的调用(同步)  定时器回调函数的执行(异步)
					 timer3D = setInterval(function(){
					 		autoIndex ++;
					 	
					 		//无缝
					 		if(autoIndex == side1LiNodes.length ){
					 			autoIndex =0;
					 		}
					 	
					 	
					 		for(var i=0;i<side2LiNodes.length;i++){
								side2LiNodes[i].classList.remove("active");
							}
							side2LiNodes[autoIndex].classList.add("active");
					 	
					 		side1LiNodes[autoIndex].classList.remove("leftShow");
							side1LiNodes[autoIndex].classList.remove("leftHide");
							side1LiNodes[autoIndex].classList.remove("rightHide");
							side1LiNodes[autoIndex].classList.add("rightShow");
							
							
							side1LiNodes[oldIndex].classList.remove("leftShow");
							side1LiNodes[oldIndex].classList.remove("rightShow");
							side1LiNodes[oldIndex].classList.remove("rightHide");
							side1LiNodes[oldIndex].classList.add("leftHide");
					 	
					 		//自动轮播 --> 手动轮播的同步问题！！
					 		//自动轮播一直运行...autoIndex一直在加加,自动轮播到一半时有可能触发手动轮播
					 		//这个时候自动轮播的逻辑必须要告诉手动轮播  我播到哪一个面上了
					 		oldIndex = autoIndex;
					 		
					 },2000);
				}
				
				
				side1.onmouseenter=function(){
					clearInterval(timer3D);
				}
				
				side1.onmouseleave=function(){
					move();
				}
			}	
			
			//第四页瀑布流
			//获取文档宽度和每个盒子宽度（此处取第一个盒子），然后相除获得一行排列盒子的个数，将容器设置为盒子。
			//定位第一行盒子：top为0，left为单个盒子宽度×盒子顺序的下标，将每一列盒子的高度存储在一个数组中。
			//获取第一行盒子高度的最小值（Math.min），然后依次比较确定是第几个盒子，对于顺序大于cnum的盒子，
			//即第一行以后，位置即在第一行最短的盒子之下，定位为absolute，top值为最短盒子的高度，left值和上面的最短盒子一样。
			//然后将盒子高度的数组相应列数的高度值更新，继续排列下一个盒子。

			 var imageFull = document.querySelector("#content .list > .home4 .imageFull ");
			 var out = document.querySelector("#content .list > .home4 .imageFull .out");
			 var myin = document.querySelectorAll("#content .list > .home4 .imageFull .out .in");
			var imgDate = {
			            "data": [
			                {"src": "image1.jpg"}, {"src": "image2.jpg"}, {"src": "image3.jpg"}, {"src": "image4.jpg"}, {"src": "image5.jpg"}, {"src": "image6.jpg"},
			                {"src": "image7.jpg"}, {"src": "image8.jpg"}, {"src": "image9.jpg"}, {"src": "image10.jpg"}, {"src": "image11.jpg"}, {"src": "image12.jpg"},
			                {"src": "image13.jpg"}, {"src": "image14.jpg"}, {"src": "image15.jpg"},{"src":"Scene1.jpg"},{"src":"Scene2.jpg"},{"src":"Scene3.jpg"},{"src":"Scene4.jpg"}
			                ,{"src":"Scene5.jpg"},{"src":"Scene6.jpg"},{"src":"Scene7.jpg"}
			            ]
			        };

			imageFlow();
			function imageFlow(){
				//一行放不下就放到另一行，在高度最小的那一张自动对齐
			            var num = Math.floor(out.offsetWidth/myin[0].offsetWidth);
			            //分布均匀
			            out.style.width = num*myin[0].offsetWidth+'px';
			            var arr = [];
			            for(var i=0;i<myin.length;i++){
			                if(i<num){
			                    arr.push(myin[i].offsetHeight);
			                    myin[i].style.position = "static";
			                }else{
			                    var minHeight = Math.min.apply(null,arr);
			                    var index = arr.indexOf(minHeight);
			                    myin[i].style.position = "absolute";
			                    myin[i].style.top = minHeight + "px";
			                    myin[i].style.left = myin[index].offsetLeft+'px';
			                    arr[index]=arr[index]+myin[i].offsetHeight;
			                }
			            }
			        }
			  
			   //当滚动条拉到最后张图片露出一半时，加载剩余的图片。   
			function judge(){
				//滚动条位置判断，超出了高度最小的那张，开始加载图片
			        
			            var h1 = myin[myin.length-1].offsetTop+Math.floor(myin[myin.length-1].offsetHeight/2);
			           // var h2 = document.documentElement.clientHeight+(document.documentElement.scrollTop||document.body.scrollTop);
			            h2_1 =  imageFull.clientHeight+imageFull.scrollTop;
			         
			         /*    console.log("h1",h1);
			           console.log("h2_1",h2_1);
			          
			        */

			           if(h1>h2_1){

			                return false;
			            }else {
			            	return true;
			            }
			        }

		         imageFull.onscroll = function(){
		            if(judge()){
		                for(var i=0;i<imgDate.data.length;i++){
		                    var img = new Image();
		                    img.src = 'imgs/'+imgDate.data[i].src;
		                    var div1 = document.createElement("div");
		                    div1.className="img";
		                    div1.appendChild(img);
		                    var div2 = document.createElement("div");
		                    div2.className="in";
		                    div2.appendChild(div1);
		                    out.appendChild(div2);
		                }
		                imageFlow();
		            }
		            
		        };

		        //第五屏气泡效果
			biubiu();
			function biubiu(){
				var oc =null;
				var time1=0;
				var time2=0;
				for(var i=0;i<team3Lis.length;i++){
					team3Lis[i].onmouseenter=function(){
						for(var i=0;i<team3Lis.length;i++){
							team3Lis[i].style.opacity=.2;
						}
						this.style.opacity=1;
						addCanvas();
						oc.style.left = this.offsetLeft+"px";
					}
				}
				
				function addCanvas(){
					if(!oc){
						oc = document.createElement("canvas");
						oc.width = team3Lis[0].offsetWidth;
						oc.height = team3Lis[0].offsetHeight*2/3;
						
						//oc team3
						/*
						 	当指针设备移动到存在监听器的元素或其子元素的时候，
							mouseover
							mouseout（有冒泡）
								
							mouseenter
							mouseleave（无冒泡）
							事件就会被触发
						*/
						team3.onmouseleave=function(){
							for(var i=0;i<team3Lis.length;i++){
								team3Lis[i].style.opacity=1;
							}
							
							removeCanvas();
						}
						
						
						team3.appendChild(oc);
						QiPao()
					}
				}
				
				
				function QiPao(){
					if(oc.getContext){
						var ctx = oc.getContext("2d");
						var arr=[];
						//将数组中的圆绘制到画布上
						time1=setInterval(function(){
							ctx.clearRect(0,0,oc.width,oc.height);
							//动画
							for(var i=0;i<arr.length;i++){
								arr[i].deg+=10;
								arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
								arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;
								
								if(arr[i].y <=50){
									arr.splice(i,1)
								}
							}
							//绘制
							for(var i=0;i<arr.length;i++){
								ctx.save();
								ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
								ctx.beginPath();
								ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
								ctx.fill();
								ctx.restore();
							}
						},1000/60)
						
						//往arr中注入随机圆的信息
						time2=setInterval(function(){
							var r =Math.random()*6+2;
							var x = Math.random()*oc.width;
							var y = oc.height - r;
							var red =   Math.round(Math.random()*255);
							var green = Math.round(Math.random()*255);
							var blue =  Math.round(Math.random()*255);
							var alp = 1;
							
							
							var deg =0;
							var startX = x;
							var startY = y;
							//曲线的运动形式
							var step =Math.random()*20+10;
							arr.push({
								x:x,
								y:y,
								r:r,
								red:red,
								green:green,
								blue:blue,
								alp:alp,
								deg:deg,
								startX:startX,
								startY:startY,
								step:step
							})
						},50)
					}
				}
				
				function removeCanvas(){
					oc.remove();
					oc=null;
					clearInterval(time1);
					clearInterval(time2);
				}
			}

				//重置窗口
				//一行能排列的盒子个数在文档刚加载完成时就固定了。当后续改变宽度时，需要随之进行改变。
			window.onresize = function (){
				imageFlow();
				contentBind();
				//当前视口只能出现一屛
				cList.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight)+"px";
				//arrowEl.style.left = nList[now].offsetLeft + nList[now].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
				
			}

				//让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
			if(content.addEventListener){
				content.addEventListener("DOMMouseScroll",function(e){
					e=e||event;
					
					//让fn的逻辑在DOMMouseScroll事件被频繁触发的时候只执行一次
					clearTimeout(timer);
					timer = setTimeout(function(){
						fn(e)
					},200)
					
				});
			}	
			content.onmousewheel = function(e){
				e=e||event;
				clearTimeout(timer);
					timer=setTimeout(function(){
							fn(e);
						},200)
			};
				//内容区交互
			contentBind();
			function contentBind(){
				
				content.style.height = document.documentElement.clientHeight - head.offsetHeight+'px';
				for(var i=0;i<cLiNodes.length;i++){
					cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+'px';
					}
				}

				//头部交互
			headBind();
			function headBind(){
				firstUpNode.style.width = "100%";
				//arrowEl.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth/2 - arrowEl.offsetWidth/2+"px";
				for(var i=0;i<nList.length;i++){
					//当前索引转绑很重要
					nList[i].index = i;
					nList[i].onclick=function(){
						preIndex =now;
						move(this.index);
						now = this.index;
					}
				}

				for (var i=0;i<pList.length;i++) {
					pList[i].index = i;
					pList[i].onclick = function(){
						preIndex =now;
						move(this.index);
						now = this.index;
					}
				}
			}


			//动画

			var animationAttr = [
			
				{
					inAn:function(){
						var left = document.querySelector("#content .list > .home2 .left .pics");
						
						var right = document.querySelector("#content .list > .home2 .right ");
						
						setTimeout(function(){
							left.style.transform = "translateY(300px)";
							right.style.transform = "translateX(300px)";
						},500);
						
						
					},
					outAn:function(){
						var left = document.querySelector("#content .list > .home2 .left .pics");
						
						var right = document.querySelector("#content .list > .home2 .right");
						
						setTimeout(function(){
							left.style.transform = "translateY(0px)";
							right.style.transform = "translateX(0px)";
							
						},500);
						
					}
				},
				{
					inAn:function(){
						//E:nth-child(N)选择属于其父元素的第n个子元素E，E元素必须是某个对象的子元素。
						//注意，第n个子元素的概念不是此所选择父元素的第n个元素,而是要选择的元素的属于上一级元素的第n个位置
						//E:nth-of-type(n) 匹配同类型中的第n个同级兄弟元素E
						var item2 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(2) ");
						var item3 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(3) ");
						
						var item5 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(5) ");
						var item6 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(6) ");


						item2.style.animation = "move1 2s 0.8s ";
						item3.style.animation = "move2 2s 0.8s ";
						item5.style.animation = "move1 2s 0.8s ";
						item6.style.animation = "move2 2s 0.8s ";
						
						
						setTimeout(function(){
							item2.style.transform = "translateX(-300px)";
							item3.style.transform = "translateX(-620px)";
							
							item5.style.transform = "translateX(-300px)";
							item6.style.transform = "translateX(-620px)";
								
						},1200)
					},
					outAn:function(){
						var item2 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(2) ");
						var item3 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(3) ");
					
						var item5 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(5) ");
						var item6 = document.querySelector("#content >.list > .home3 .scene .item:nth-of-type(6) ");
						
						setTimeout(function(){
							
							item2.style.transform = "translateX(0px)";
							item3.style.transform = "translateX(0px)";
							
							item5.style.transform = "translateX(0px)";
							item6.style.transform = "translateX(0px)";
							
						},800)
						
					}
				},
				{
					inAn:function(){
						var team1 = document.querySelector("#content > .list > .home5 .team1");
						var team2 = document.querySelector("#content > .list > .home5 .team2");
						
						var team3 = document.querySelector("#content > .list > .home5 .team3");
						setTimeout(function(){
							team1.style.transform = "translate3d(-300px,-60px,-145px) rotateX(145deg) ";
							
						},800)
						setTimeout(function(){
							team2.style.transform = "translate3d(-300px,-60px,-145px) rotateX(145deg) ";
							
						},1000)
						setTimeout(function(){
							team3.style.transform = "translate3d(-300px,-300px,-145px) rotateX(145deg) ";
							team3.style.opacity = 0;
						},1200)
					},
					outAn:function(){
						var team1 = document.querySelector("#content > .list > .home5 .team1");
						var team2 = document.querySelector("#content > .list > .home5 .team2");
						
						var team3 = document.querySelector("#content > .list > .home5 .team3");
						
						
						setTimeout(function(){
							team1.style.transform = "translate3d(0,0,0) rotateX(0deg)";
							
						},800)
						setTimeout(function(){
							team2.style.transform = "translate3d(0,0,0) rotateX(0deg)";
							
						},1000)
						setTimeout(function(){
							team3.style.transform = "translate3d(0,0,0) rotateX(0deg)";
							team3.style.opacity = 1;
						},1200)
						
					}
				}
				
			]
			
			for(var i=1;i<animationAttr.length;i++){
				
				animationAttr[i]["outAn"]();
				
			};
			
		
			function fn(e){
				e = e||event;
				var flag ="";
				if(e.detail){
					flag = e.detail>0?"down":"up";
				}else if(e.wheelDelta){
					flag = e.wheelDelta<0?"down":"up";
				}
				
				if((now==0&&flag=="up")||(now==cLiNodes.length-1&&flag=="down")){
						return;
				}
				preIndex =now;
				
				switch (flag){
					case "up":
						if(now>0){
							now--;
						}
						move(now);
						break;
					case "down":
						if(now<cLiNodes.length-1){
							now++;
						}
						move(now);
						break;
				}
				
				if(e.preventDefault){
					e.preventDefault();
				}
				
				return false;
			}
			
			
			move();
			//动画的核心
			function move(index){
				for(var i=0;i<nList.length;i++){
					nList[i].className = "";
				}
				nList[index].className = "active";
				
				for(var i=0;i<pList.length;i++){
					pList[i].className = "";
				}
				pList[index].className = "active";
				
				for(var i=0;i<upNodes.length;i++){
					upNodes[i].style.width="";
				}
				upNodes[index].style.width="100%";
				//arrowEl.style.left = nList[index].offsetLeft + nList[index].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
				cList.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
				
				//元素动画
				if(animationAttr[index]&&animationAttr[index]["inAn"]){
					animationAttr[index]["inAn"]();
				}
				if(animationAttr[preIndex]&&animationAttr[preIndex]["outAn"]){
					animationAttr[preIndex]["outAn"]();
				}
			}
			
		}
