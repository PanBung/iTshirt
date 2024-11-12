window.addEventListener("load", function(){

	var $anchors = document.getElementsByTagName("a");
	//console.log($anchors.length);

	for(var i = 0; i < $anchors.length; i++){
		$anchors[i].onclick = function(){
			if(this.getAttribute("href") == "#"){
				return false;
			}
		}
	}
	
	var isMobile = false; //initiate as false
    // device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|playbook|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}
	

	// next, prev  = count 변수 + 1, count 변수 - 1로 돌린다. (현 인디고 visual.) slides, count, interval, pagination
	// 지정한 section 안의 slides를 잡는 것이 안전하다.

	// 함수 시작 자리

		
		
	function slide_closer (_targetWrap) { 
		
		// promo 부터 시작해서 클로저로 묶을 함수 시작
		let $wrap = _targetWrap;
		let $view_mask = document.querySelector($wrap + " div.view_mask");	// div는 안써도 됨. 공통으로 설정하려고 .view_mask 씀
		let $inner_ul = document.querySelector($wrap + " div.view_mask > ul");
		console.log($inner_ul);
		let $inner_ul_li = $inner_ul.children;	// querySelectorAll은 Nodelist로 나오기 때문에 X
		// console.log($inner_ul_li);
		let $btn_prev = document.querySelector($wrap + " button.prev");
		let $btn_next = document.querySelector($wrap + " button.next");
		let $pn_btns = document.querySelectorAll($wrap + " .pagination > button");
		let view_ea = 4;	// 화면에 보여지는 이미지 갯수
			if (screen.width <= 1024 && screen.width > 767){
				view_ea = 2;
			}
			else if (screen.width < 768){
				view_ea = 1;
			}
		let li_width = $view_mask.offsetWidth / view_ea;	// offsetWidth는 border값도 합산함.
		// 화면이 움직이는 거리라고 생각하면 된다. *중요* 1로 나누면 200이고 2로 나누면 400 / 2 이런식이기 때문에 맞춘 것.
		let move_cnt = 1;	// 화면에 보이는 리스트가 움직이는 갯수.
		let click_Event = true;	// 이벤트 도중에 return false로 중첩되지 않기 위해서 막는 것.
		let si_01 = null;	// setinterval 
		let cnt = 0;	// 카운트 변수
		
		(function init() {
			for(var i = 0; i < $inner_ul_li.length; i++) {
				$inner_ul_li[i].style.width = li_width + "px";	// px, 단위 연결 주의
			}
			$inner_ul.style.width = (li_width * $inner_ul_li.length) + "px";
			$inner_ul.style.left = "0px";
			$inner_ul.style.transition = "left 0.3s";
			$inner_ul.style.position = "relative";
			$inner_ul.insertBefore($inner_ul_li[$inner_ul_li.length - 1], $inner_ul.firstChild);	// 맨 마지막 것을 맨 앞으로 가져오기 위해서 작성
			$inner_ul.style.marginLeft = -(li_width * move_cnt) + "px";	// 움직이는 방향

		})();
		
		
		// prev
		if ($btn_prev){
			$btn_prev.addEventListener("click", function () {
				move_ul("prev");
			});
		}
		// next
		if ($btn_next){
			$btn_next.addEventListener("click", function () {
				move_ul("next");
			});
		}
		
		if($pn_btns.length){	// 노드리스트는 갯수가 없어도 잡히기 때문에 $pn_btns가 있어야만 실행하도록 묶은 것이다.
			for (var i = 0; i < $pn_btns.length; i++){
				stop_si();
				$pn_btns[i].index = i;
				$pn_btns[i].addEventListener("click", function () {
					let cur_num = this.index;
					let _length = $inner_ul_li.length;	// data-index가 몇개 있는지, 공간이 몇개 있는지 알기 위한 것.
					for (var j = 0; j < $inner_ul_li.length; j++){
						$inner_ul.appendChild(document.querySelector($wrap + " div.view_mask > ul > li[data-index = '"+ cur_num + "']"));
						cur_num = cur_num == _length - 1 ? 0 : cur_num + 1;
					}
					$inner_ul.insertBefore($inner_ul.children[$inner_ul_li.length - 1], $inner_ul.firstChild);
					
					cnt = cur_num;
					pn_change(cnt);
					start_si();
				});
			}
		
		

			function pn_change(num) {	// 패지네이션을 활용한 그림 이동
				
				for (var i = 0; i < $pn_btns.length ; i++){
					$pn_btns[i].classList.remove("active");
				}
				$pn_btns[num].classList.add("active");
			}
		}
		
		
		function move_ul(_direction) {
			if (click_Event){
				click_Event = false;
				stop_si();
				$inner_ul.style.left = _direction == "prev" ? li_width * move_cnt + "px" : -li_width * move_cnt + "px";
				$inner_ul.style.transition = "left 0.3s";
				setTimeout(function () {
					if (_direction == "prev"){ 
						$inner_ul.insertBefore($inner_ul_li[$inner_ul_li.length - 1], $inner_ul.firstChild);
						if ($pn_btns.length) {
							cnt = cnt == 0 ? $pn_btns.length - 1 : cnt - 1;
							pn_change(cnt);
						}
						
					}
					else {
						$inner_ul.appendChild($inner_ul.firstElementChild);
						if ($pn_btns.length) {
							cnt = cnt == $inner_ul_li.length - 1 ? 0 : cnt + 1;
							pn_change(cnt);
						}
					}
					$inner_ul.style.left = "0px";
					$inner_ul.style.transition = "none";
					click_Event = true;
					start_si();
				}, 300);
			}
			else {
				return false;
			}
		}


		function start_si () {
			if (si_01 != 0) {		// setInterval이어서 boolean 형식이 아님.
				clearInterval(si_01);
			}
			si_01 = setInterval(function () { move_ul("next"); }, 3000);	
			// 해야될 일, 시간. 함수를 호출할 때는 익명 함수를 만들어 실행하려는 함수를 집어넣는다.
		}
		function stop_si () {
			if (si_01 != 0) {	// si_01이 setInterval이어서 boolean 형식이 아님.
				clearInterval(si_01);
			}
			si_01 = null;
			
		}
		start_si();	// 새로운 Interval 넣기
	}	


	
	
	let slide_closer_01 = slide_closer(".new_product");
	let slide_closer_02 = slide_closer(".event");
	
	
	
	// 전체 함수 끝 자리
	// 함수를 따로 쓰되, 불러올 것을 desktop이나 tablet이나 mobile영역에서 필요한 부분에서 불러오면 상관 X
	
	if(!isMobile){

		
		
	
	}

	else {
		// 모바일 디바이스
		if (screen.width >= 768){
			
		}
		else{
			
			
		}
		
	}

});