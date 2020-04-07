<script src='https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js'></script>
		function Carousel() {
			var $box=$('#box');
			var Html = ''
					+ '<div class="slider" id="slider">'
					+ '<div class="slide"><img src="img/b5.png"+ alt=""></div>'
					+ '<div class="slide"><img src="img/b1.png" alt=""></div>'
					+ '<div class="slide"><img src="img/b2.png" alt=""></div>'
					+ '<div class="slide"><img src="img/b3.png" alt=""></div>'
					+ '<div class="slide"><img src="img/b4.png" alt=""></div>'
					+ '<div class="slide"><img src="img/b5.png" alt=""></div>'
					+ '</div>'
					+ '<span id="left"><</span>'
					+ '<span id="right">></span>'
					+'<ul class="nav" id="navs"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>'
			var idx=1;
			$box.html(Html);
			$box.mouseover(function () {
				clearInterval(timer);
				$("#left").css({ opacity: .4 });
				$("#right").css({ opacity: .4 })
				
			})
			$box.mouseout(function () {
				timer = setInterval(next, 1000);
				$("#left").css({ opacity: 0 });
				$("#right").css({ opacity: 0 })
			})
			$("#left").click(function () { 
				before();
			})
			$("#right").click(function () { 
				next();
			})
			$('#navs li').each(function(i){
				console.log(i);
				$(this).click(function(){
					idx = i;
					$('#slider').animate({'left': -1200 * idx}, 1000);
					circleChange(idx);
				});
			});
			function animate(obj, json, callback) {
				clearInterval(obj.timer);
				obj.timer = setInterval(function () {
					var flag = true;
					for (var attr in json) {
						(function (attr) {
							if (attr == "opacity") {
								var now = parseInt(getStyle(obj, attr) * 100);
								var dest = json[attr] * 100;
							} else {
								var now = parseInt(getStyle(obj, attr));
								var dest = json[attr];
							}
							var speed = (dest - now) / 6;
							speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
							if (now != dest) {
								flag = false;
								if (attr == "opacity") {
									obj.style[attr] = (now + speed) / 100;
								} else {
									obj.style[attr] = now + speed + "px";
								}
							}
						})(attr);
					}
					if (flag) {
						clearInterval(obj.timer);
						callback && callback(); 
					}
				}, 30);
			}
			var isMoving=false;
			timer = setInterval(next, 1000);
			function next() {
				if (isMoving) {
					return;
				}
				isMoving = true;
				idx++;
				circleChange(idx-2);
				animate(slider, { left: -1200 * (idx) }, function () {
					if (idx == 6) {
						slider.style.left = '-1200px';
						idx = 1;
					}
					isMoving = false;
				});
			}
			function circleChange(idx) {				
				$(".nav li").eq(idx).addClass("active");
				$(".nav li").eq(idx).siblings().removeClass("active");
				// var idxx = idx;
				// if(idxx > imgLength-1) idxx = 0;
				// $('#navs li').eq(idxx).css('background','red').siblings().css('background','orange');
			
			};
			function getStyle(obj, attr) {
				if (obj.currentStyle) {
					return obj.currentStyle[attr];
				} else {
					return getComputedStyle(obj, null)[attr];
				}
			}
		}
		Carousel()