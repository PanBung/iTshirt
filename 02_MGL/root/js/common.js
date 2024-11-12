window.addEventListener("load", function(){
		
		var isMobile = false; //initiate as false
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|playbook|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
				
			isMobile = true;
		}
		let $elm_nav = document.getElementById("gnb");	// class라면 querySelector같은걸 사용한다.
		let $elm_header = document.getElementsByTagName("header")[0];	// 뒤에 0을 꼭 붙여줘야한다. 헤더는 유일무이기 때문에 바로 TagName을 사용.
		let $btn_menu = document.getElementById("nav_btn");	// class btn_menu가 다른 곳에 있을까봐 Id를 주어서 선언.
		let $btn_subs = document.getElementsByClassName("btn_sub");	// 5개중에 뭘 누를지 모르기 때문에 숫자 X
		
		if(!isMobile){
			//alert("desktop");
			//console.log("desktop");
			$btn_menu.onclick = function () {	// 내비가 열렸을때 뒷 화면 스크롤이 안 되게 하는 이벤트.
				nav_init();
				cls_toggle($elm_header, "on");
				if ($elm_header.classList.contains("on")){
					document.getElementsByTagName("body")[0].style.overflow = 'hidden';
				}
				else {
					document.getElementsByTagName("body")[0].style.overflow = 'auto';
				}
			} //
		
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			
			}

			function nav_init(){
					for(var i = 0; i < $btn_subs.length; i++){
						$btn_subs[i].parentNode.classList.remove("active");
						$btn_subs[i].nextElementSibling.style.height = "0px";
				}
			}

			for ( var i = 0; i < $btn_subs.length; i++){
				$btn_subs[i].onclick = function(){
					if(this.parentNode.classList.contains("active")){				
						this.nextElementSibling.style.height = "0px";
					 }
					 else{
						 nav_init();
						 this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight+"px";
					 }
					cls_toggle(this.parentNode, "active");
					
				}
			} 
			
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			}
		}
		
		else {
			$btn_menu.onclick = function () {	// 내비가 열렸을때 뒷 화면 스크롤이 안 되게 하는 이벤트.
				nav_init();
				cls_toggle($elm_header, "on");
				if ($elm_header.classList.contains("on")){
					document.getElementsByTagName("body")[0].style.overflow = 'hidden';
				}
				else {
					document.getElementsByTagName("body")[0].style.overflow = 'auto';
				}
			} //
				
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			
			}

			function nav_init(){
					for(var i = 0; i < $btn_subs.length; i++){
						$btn_subs[i].parentNode.classList.remove("active");
						$btn_subs[i].style.height = "200px";
				}
			}

			for ( var i = 0; i < $btn_subs.length; i++){
				$btn_subs[i].onclick = function(){
						if(this.parentNode.classList.contains("active")){				
					this.nextElementSibling.style.height = "40px";
					 }
					 else{
						 nav_init();
						 this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight+"px";
					 }
					cls_toggle(this.parentNode, "active");
				}
			} 
				
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			}

			function nav_init(){
				for (var i = 0; i < $btn_subs.length; i++){
					$btn_subs[i].parentNode.classList.remove("active");
					$btn_subs[i].style.height = "40px";
			}
				
			for (var i = 0; i < $btn_subs.length; i++){	// nav 내부의 li 열고 닫고
				$btn_subs[i].onclick = function () {
					// console.log(this.nextSibling.nextSibling.scrollHeight); // nextElementSibling 써도 됨.
					if (this.parentNode.classList.contains("active")){	// nav 내부 ul 하부의 서브 메뉴 열고 닫고
						this.style.height = "40px";
					}
					else {
					nav_init();
					this.style.height = "40px";
					console.log(this.style.height);
			}
					cls_toggle(this.parentNode, "active");	// 부모요소인 li에 active를 집어넣었다.
				}
			} 
		}
			
		// 모바일 디바이스
		if(screen.width >= 768){
			
		}
		else {
			//alert("mobile");
			//console.log("mobile");
			$btn_menu.onclick = function () {	// 내비가 열렸을때 뒷 화면 스크롤이 안 되게 하는 이벤트.
				nav_init();
				cls_toggle($elm_header, "on");
				if ($elm_header.classList.contains("on")){
					document.getElementsByTagName("body")[0].style.overflow = 'hidden';
				}
				else {
					document.getElementsByTagName("body")[0].style.overflow = 'auto';
				}
			} //
				
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			
			}

			function nav_init(){
					for(var i = 0; i < $btn_subs.length; i++){
						$btn_subs[i].parentNode.classList.remove("active");
						$btn_subs[i].style.height = "200px";
				}
			}

			for ( var i = 0; i < $btn_subs.length; i++){
				$btn_subs[i].onclick = function(){
						if(this.parentNode.classList.contains("active")){				
					this.nextElementSibling.style.height = "40px";
					 }
					 else{
						 nav_init();
						 this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight+"px";
					 }
					cls_toggle(this.parentNode, "active");
				}
			} 
				
			function cls_toggle(elm, cls_name){
				elm.classList.toggle(cls_name);
			}

			function nav_init(){
				for (var i = 0; i < $btn_subs.length; i++){
					$btn_subs[i].parentNode.classList.remove("active");
					$btn_subs[i].style.height = "40px";
			}
				
			for (var i = 0; i < $btn_subs.length; i++){	// nav 내부의 li 열고 닫고
				$btn_subs[i].onclick = function () {
					// console.log(this.nextSibling.nextSibling.scrollHeight); // nextElementSibling 써도 됨.
					if (this.parentNode.classList.contains("active")){	// nav 내부 ul 하부의 서브 메뉴 열고 닫고
						this.style.height = "40px";
					}
					else {
					nav_init();
					this.style.height = "40px";
					console.log(this.style.height);
			}
					cls_toggle(this.parentNode, "active");	// 부모요소인 li에 active를 집어넣었다.
				}
			} 
		}
		}
	}
});
	