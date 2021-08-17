var Main = class {
	static load() {
		Main.close(true);
		$('head').append('<link id="pugether_css" rel="stylesheet" href="https://shrimpstack.000webhostapp.com/pugether/pugether.css?' + Math.random() + '">');
		let script = document.createElement("script");
		script.onload = function() { Main.open(); };
		script.src = 'https://passport.cnblogs.com/scripts/jsencrypt.min.js';
		script.className = "pugether_script";
		$('head')[0].appendChild(script);
	}
	static open() {
		Main.createWindow();
		$('<div class="pgt_pop" id="pgt_account"></div>')
		.append('<div class="pgt_pop_view">' +
		'<div><span>噗給樂帳號</span><input id="pgt_account_input"/></div>' +
		'<div><input type="checkbox" id="remember_pgt_account"><label for="remember_pgt_account">記住噗給樂帳號</label></div>' +
		'<div><button id="pgt_open_enter">送出</button><button id="pgt_create_enter">創建</button></div>' +
		'</div>')
		.appendTo('#pugether');
		
		$('#pgt_account span').css('margin-right', 5);
		$('#remember_pgt_account').css({position: 'relative', top: 2});
		$('#pgt_open_enter').parent().css({display: 'flex', 'justify-content': 'center'});
		$('#pgt_account button').css('margin', '0 5px');
		
		if(Courier.pgt_account) {
			$('#pgt_account_input').val(Courier.pgt_account);
			$('#remember_pgt_account').prop('checked', true);
		}
		$('#pgt_open_enter').keypress((e) => {if(e.which == 13) StartUp.log_in()});
		$('#pgt_open_enter').click(StartUp.log_in);
		$('#pgt_create_enter').click(StartUp.sign_up);
	}
	static createWindow() {
		$('body').attr('tabindex', 0);
		$('#layout_content').append('<div id="pugether" tabindex="0"></div>');
		$('#pugether').focus(()=>{Event.plurk_key_switch(false);}).focusout(()=>{Event.plurk_key_switch(true);});
		$('#pugether').append('<audio id="pgt_chat_audio"><source src="https://shrimpstack.000webhostapp.com/pugether/pgt_chat_audio.mp3" type="audio/mpeg"></audio>');
		$('#pugether').append('<div id="imgset_gif_sync"></div>');
		
		/*========場景區========*/
		$('<div id="pgt_scene"></div>')
		.append('<div id="pgt_screen_box"><div id="pgt_screen"></div></div>')
		.append('<div id="pgt_control"></div>')
		.append('<div id="pgt_action"></div>')
		.appendTo('#pugether');
		
			/*動作按鈕*/
			$('#pgt_control')
			.append('<div id="pgt_camera_switch" class="pgt_circle" val="true"></div>');
			
			/*動作按鈕*/
			$('#pgt_action')
			.append('<div id="pgt_arrow"><div data-d="2" title="西"></div><div data-d="3" title="北"></div><div data-d="1" title="南"></div><div data-d="0" title="東"></div></div>')
			.append('<div id="pgt_can_move" class="pgt_circle" val="true" title="允許移動">原地轉身</div>')
			.append('<div id="pgt_climb" class="pgt_circle" title="爬梯"></div>')
			.append('<div id="pgt_special_action" class="pgt_circle" action-open="false" title="特殊動作"><div data-s="sit_down" class="pgt_circle" val="false"></div><div data-s="fly" class="pgt_circle" val="false"></div><div data-s="act1" class="pgt_circle" val="false"></div><div data-s="act2" class="pgt_circle" val="false"></div><div data-s="act3" class="pgt_circle" val="false"></div></div>');
		
		/*========對話區========*/
		$('<div id="pgt_chat_outer"></div>')
		.append('<div id="pgt_chat"><div id="pgt_chat_logs"></div></div>')
		.appendTo('#pugether');
		
		/*========設定區========*/
		$('<div id="pgt_setup_outer"></div>')
		.append('<div id="pgt_setup_list"><div id="pgt_setup"></div></div>')
		.appendTo('#pugether');
		
			/*各種設定*/
			$('#pgt_setup')
			.append('<div id="pgt_chat_noti" val="true"><span>音效提示</span><div class="pgt_switch_track"><div class="pgt_switch_thumb"></div></div></div>')
			.append('<div id="pgt_chat_color"></div>')
			.append('<div id="pgt_name_set"><span>名字</span><input/><button>儲存</button></div>')
			.append('<hr/>')
			.append('<div id="pgt_set_imgset"></div>');
			
			/*紙娃娃*/
			$('#pgt_set_imgset')
			.append('<div><span>最底層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>第二層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>第三層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>第四層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>第五層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>第六層</span><input class="pgt_setid_input"/></div>')
			.append('<div><span>最頂層</span><input class="pgt_setid_input"/></div>')
			.append('<button id="pgt_set_imgset_done">儲存圖組</button>');
		
		/*========左右開關========*/
		$('#pugether')
		.append('<div id="pgt_chat_outer_switch" class="switch"></div>')
		.append('<div id="pgt_setup_outer_switch" class="switch"></div>')
		
		/*========輸入區========*/
		$('<div id="pgt_chat_input"></div>')
		.append('<div id="pgt_chat_text" contenteditable></div>')
		.append('<div id="pgt_chat_save" class="pgt_circle"></div>')
		.append('<div id="pgt_chat_send" class="pgt_circle"></div>')
		.appendTo('#pugether');
		
		/*========主視窗操作========*/
		$('<div id="pgt_window_control" unselectable="on"></div>')
		.append('<div id="pgt_window_move" class="pgt_circle"></div>')
		.append('<div id="pgt_minimize" class="pgt_circle"></div>')
		.append('<div id="pgt_close" class="pgt_circle"></div>')
		.appendTo('#pugether');
		Main.windowControlEvent();
	}
	static windowControlEvent() {
		$('#pugether .switch').click(Event.block_switch);
		$('#pgt_window_move').mousedown(() => {
			let mouse_offsetX = +$('#pugether').css('left').split('px')[0] - event.clientX,
				mouse_offsetY = +$('#pugether').css('top').split('px')[0] - event.clientY;
			$('body').mousemove(() => {
				$('#pugether').css({
					left: event.clientX + mouse_offsetX,
					top: event.clientY + mouse_offsetY
				});
			});
		});
		$('body').mouseup(()=>{ $('body').off('mousemove'); });
		$('#pgt_close').click(() => { Main.close() });
		$('#pgt_minimize').click(() => {
			let cur = $('#pugether').attr('data-mini') != 'true';
			$('#pugether').attr('data-mini', cur);
			if(cur) $('#pgt_screen_box')
				.attr('data-h', $('#pgt_screen_box').height())
				.css('min-height', 'unset').animate({height: 0, 'border-width': 0}, 600);
			else {
				let h = $('#pgt_screen_box').attr('data-h');
				$('#pgt_screen_box').css('border-width', '').animate({height: h}, 600, () => {
					$('#pgt_screen_box').css('min-height', '');
				});
			}
		});
	}
	static close(is_open) {
		if(!is_open) $('#pugether_script').remove();
		Event.plurk_key_switch(true);
		$('#pugether_css, #pugether_jsencrypt, #pugether').remove();
		$('body').off('keypress').off('mousemove').off('mouseup').attr('tabindex', null);
		Screen.auto_camera(false);
	}
	static reload() {
		Main.close();
		if(confirm('噗給樂：版本已更新，是否要重新整理頁面？'))
			location.reload();
	}
};

var Cookie = class {
	static get(c_name) {
		if(document.cookie.split(c_name + "=")[1]) return document.cookie.split(c_name + "=")[1].split(";")[0];
		return null;
	}
	static set(c_name, c_value) {
		if(c_value == "") return;
		let expires = new Date();
		expires.setTime(expires.getTime() + 1209600000);
		document.cookie = c_name + "=" + escape(c_value) + ";expires=" + expires.toGMTString();
	}
	static del(c_name) {
		let expires = new Date();
		expires.setTime(expires.getTime() - 1);
		document.cookie = c_name + "=" + escape("0") + "; expires=" + expires.toGMTString();
	}
}

var StartUp = class {
	static log_in(starting_try_again) {
		if(!starting_try_again && $('#pgt_open_enter[disabled]').length > 0) return;
		$('#pgt_open_enter').attr('disabled', 1);
		let read_screen_succ = (read_screen_return_data) => {
			Screen.init(read_screen_return_data);
			$('#pgt_account').remove();
			StartUp.set_event();
			Interval.run();
			return;
		};
		let log_in_succ = (log_in_return_data) => {
			SceneManager.init(log_in_return_data);
			Courier.post('read_screen', {}, read_screen_succ, (succ) => {if(!succ) $('#pgt_open_enter').attr('disabled', null);}, StartUp.log_in);
		};
		Courier.post('log_in', {}, log_in_succ, (succ) => {if(!succ) $('#pgt_open_enter').attr('disabled', null);}, StartUp.log_in);
	}
	static sign_up(starting_try_again) {
		if(!starting_try_again && $('#pgt_create_enter[disabled]').length > 0) return;
		$('#pgt_create_enter').attr('disabled', 1);
		Courier.post('sign_up', {nick_name: GLOBAL.session_user.nick_name}, () => alert('噗給樂：已完成註冊。'), () => { $('#pgt_create_enter').attr('disabled', null); }, StartUp.sign_up);
	}
	static set_event() {
		$('#pgt_camera_switch').click(Screen.camera_switch);
		
		$('#pgt_chat_text').keypress((e) => {if(!e.shiftKey && e.which == 13) Event.new_chat_log()});
		$('#pgt_chat_send').click(Event.new_chat_log);
		$('#pgt_chat_save').click(ChatLogs.download);
		
		$('#pgt_chat_noti .pgt_switch_track').click(ChatLogs.chat_noti_switch);
		$('#pgt_name_set input').keypress((e) => {if(e.which == 13) Event.oneself_rename()});
		$('#pgt_name_set button').click(Event.oneself_rename);
		
		$('#pgt_set_imgset_done').click(Event.change_imgset);
		
		$('#pgt_can_move').click(() => {$('#pgt_can_move').attr('val', $('#pgt_can_move').attr('val') != 'true');});
		$('#pgt_climb').click(Event.oneself_climb);
		$('#pgt_special_action').click(Event.special_action_list_switch);
		$('#pgt_special_action div').click(Event.oneself_change_state)
		
		$('#pgt_arrow div').click((e) => {Event.oneself_move(+$(e.target).attr('data-d'))});
		$('body').keypress((e) => {
			if($(e.target).attr('id') != 'pugether') return;
			switch(e.which) {
				case 51: Event.oneself_move(0); break;
				case 50: Event.oneself_move(1); break;
				case 53: Event.oneself_move(2); break;
				case 54: Event.oneself_move(3); break;
			}
		});
	}
}

var Event = class {
	static block_switch(e) {
		let id = '#' + $(e.target).attr('id').split('_switch')[0];
		if($(e.target).attr('style')) { $(e.target).attr('style', null); $(id).attr('style', null); return; }
		let width = $(id).width() * -1;
		let d = (id == '#pgt_chat_outer' ? 'left' : 'right')
		$(id).css(d, width);
		$(e.target).css(d, width - $(e.target).width());
	}
	static plurk_key_switch(onoff) {
		var elem = $(document)[0];
		var data = jQuery.hasData( elem ) && jQuery._data( elem );
		if(onoff && !data.events.keydown) {
			data.events.keydown = data.events.keydown_temp;
			delete data.events.keydown_temp;
		}
		else if(!onoff && data.events.keydown) {
			data.events.keydown_temp = data.events.keydown;
			delete data.events.keydown;
		}
	}
	static new_chat_log() {
		if($('#pgt_chat_send[disabled]').length > 0) return;
		$('#pgt_chat_send').attr('disabled', 1);
		let content = $('#pgt_chat_text').html().replace(/<br><br><br>/g, '<br><br>').replace(/<div>(.*?)<\/div>/g, '');
		if(content.replace(/<br>/g, '').replace(/(&nbsp;|&ensp;|&emsp;)/ig, '').replace(/ /g, '') == '') content = '';
		$('#pgt_chat_text').html(content);
		if(content.length == 0 || content.length > 1000) {
			if(content.length > 1000) alert('送出錯誤：超過字數(1000)。');
			$('#pgt_chat_send').attr('disabled', null);
			return;
		}
		Courier.post('new_chat_log', {text: content}, (data) => {
			$('#pgt_chat_text').empty();
			SceneManager.oneself.say(data.text);
		}, () => {$('#pgt_chat_send').attr('disabled', null);});
	}
	static oneself_rename() {
		if($('#pgt_name_set .pgt_circle[disabled]').length > 0) return;
		$('#pgt_name_set .pgt_circle').attr('disabled', 1);
		let new_name = $('#pgt_name_set input').val();
		if(new_name.length > 15) {
			alert('送出錯誤：超過字數(15)。');
			return;
			$('#pgt_name_set .pgt_circle').attr('disabled', null);
		}
		Courier.post('player_rename', {new_name: new_name}, () => {
			$('#pgt_name_set input').val('');
			SceneManager.oneself.dom.find('.pgt_sq_name').html(new_name);
		}, () => {$('#pgt_name_set .pgt_circle').attr('disabled', null);});
	}
	static change_imgset() {
		if($('#pgt_set_imgset_done[disabled]').length > 0) return;
		$('#pgt_set_imgset_done').attr('disabled', 1);
		let setids = [];
		let inputs = $('.pgt_setid_input');
		for(let f=0; f<inputs.length; f++)
			if(inputs.eq(f).val()) setids.push(inputs.eq(f).val());
		if(setids.length == 0) {
			alert('送出錯誤：未填寫任何圖組。');
			$('#pgt_set_imgset_done').attr('disabled', null);
			return;
		}
		Courier.post('change_imgset', {setids: setids}, (data) => {
			$('.pgt_setid_input').val('');
			SceneManager.oneself.setids = data.setids;
			for(let setid of data.setids)
				if(!SceneManager.imgsets[setid])
					SceneManager.not_downloaded_setids.push(setid);
			SceneManager.download_imgsets();
			SceneManager.oneself.update_imgset();
		}, () => {$('#pgt_set_imgset_done').attr('disabled', null);});
	}
	static oneself_move(direction) {
		if(Event.oneself_moving) return;
		Event.oneself_moving = true;
		
		/*變更方向*/
		SceneManager.oneself.face = direction;
		
		/*檢查是否允許移動*/
		if($('#pgt_can_move[val="true"]').length == 0) {
			SceneManager.oneself.update_imgset();
			Event.oneself_moving = false;
			return;
		}
		
		/*檢查當前格*/
		let pos = SceneManager.oneself.pos;
		if(Screen.check_wall(pos.r, pos.c, pos.a, direction)) {Event.oneself_moving = false; return;}
		
		/*設定目標格*/
		let target_pos = {
			r: pos.r + (direction==1) - (direction==3),
			c: pos.c + (direction==0) - (direction==2),
			a: pos.a
		};
		direction = (direction + 2) % 4;
		
		/*檢查是否有樓梯（a會發生改變）*/
		Screen.check_stair(target_pos, pos, direction);
		
		/*檢查目標格牆壁*/
		if(Screen.check_wall(target_pos.r, target_pos.c, target_pos.a, direction)) {Event.oneself_moving = false; return;}
		
		/*檢查目標格移動條件*/
		if(Screen.check_action(target_pos.r, target_pos.c, target_pos.a)) {Event.oneself_moving = false; return;}
		
		
		/*碰觸型觸發*/
		
		/*執行移動*/
		Screen.auto_camera(true);
		SceneManager.oneself.move('walk', target_pos, 1, () => {
			Screen.auto_camera(false);
			
			/*進入型觸發*/
			if(TriggerCheck.portal()) return;
			
			Event.oneself_moving = false;
		});
	}
	static oneself_climb() {
		if(Event.oneself_moving) return;
		Event.oneself_moving = true;
		
		/*檢查當前格*/
		let pos = SceneManager.oneself.pos;
		let ladder = Screen.check_climb(pos.r, pos.c, pos.a);
		if(!ladder) {Event.oneself_moving = false; return;}
		
		/*變更方向*/
		SceneManager.oneself.face = ladder.d;
		
		/*設定目標格*/
		let target_pos = {r: pos.r, c: pos.c, a: pos.a + ladder.lh};
		
		/*執行移動*/
		Screen.auto_camera(true);
		SceneManager.oneself.move('climb', target_pos, Math.abs(ladder.lh), () => {
			Screen.auto_camera(false);
			
			/*進入型觸發*/
			if(TriggerCheck.portal()) return;
			
			Event.oneself_moving = false;
		});
	}
	static oneself_change_state(e) {
		if(Event.oneself_moving) return;
		let target = $(e.target);
		$('#pgt_special_action div').attr('val', 'false');
		let s = target.attr('data-s');
		if(s == SceneManager.oneself.state)
			SceneManager.oneself.state = 'idle';
		else if(s == 'sit_down' && SceneManager.oneself.state == 'chair')
			SceneManager.oneself.state = 'idle';
		else {
			target.attr('val', 'true');
			let pos = SceneManager.oneself.pos;
			if(s == 'sit_down' && Screen.check_chair(pos.r, pos.c, pos.a)) s = 'chair';
			SceneManager.oneself.state = s;
		}
		SceneManager.oneself.update_imgset();
	}
	static special_action_list_switch(e) {
		if($(e.target).attr('id') != 'pgt_special_action') return;
		$('#pgt_special_action').attr('action-open', $('#pgt_special_action').attr('action-open') != 'true');
	}
}

var Courier = class {
	static uid = GLOBAL.session_user.uid;
	static postUrl = "https://plurk-chat-room.herokuapp.com/";//"http://localhost:5000/";
	static version = "0.0.0.1"; //主題更新.大更新.需重整的更新.小更新+BUG修正
	static pgt_account = Cookie.get("pgt_account");
	static async post(api, postData_param, success_function, done_function, starting_function) {
		if(typeof(done_function) != "function") done_function = () => {};
		let postData = Courier.getPostData();
		if(!postData) {
			done_function(false);
			return;
		}
		for(let key in postData_param) postData[key] = postData_param[key];
		await $.post(Courier.postUrl + api, {content: JSON.stringify(postData)}, (origData) => {
			if(origData.substr(0, 1) != '{') {
				alert('噗給樂-錯誤：回傳值不是json格式。');
				Main.close();
				return;
			}
			let data = JSON.parse(origData);
			if(data.error) {
				alert('噗給樂-錯誤：' + data.error.text);
				if(data.error.pgt_account_clear) {Cookie.del("pgt_account"); Courier.pgt_account = null;}
				if(data.error.version_update) {Main.reload(); return;}
				if(data.error.window_close) {Main.close(); return;}
				done_function(false);
				return;
			}
			if(data.starting && typeof(starting_function) == "function") {setTimeout(() => {done_function(false); starting_function(true);}, 5000); return;}
			done_function(true);
			success_function(data);
		}).fail(() => {
			alert('噗給樂-錯誤：無法連上伺服器。');
			done_function(false);
		});
	}
	static get_pgt_account() {
		if($('#pgt_account_input').length == 0) {alert('噗給樂-錯誤：找不到帳號輸入框。'); return null;}
		if(!$('#pgt_account_input').val()) {alert('噗給樂-錯誤：帳號不可空白。'); return null;}
		Courier.pgt_account = $('#pgt_account_input').val();
		if($('#remember_pgt_account:checked').length) Cookie.set("pgt_account", Courier.pgt_account);
		let jse = new JSEncrypt();
		jse.setPublicKey("-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKWcSXO6BeWZT+n7Z0bAlumMt99lytu+\nFp2VNwTiFsMFRxCwiYtVUMnKHuWFY5MdnuX1UCjb028RKJntKa3HTrcCAwEAAQ==\n-----END PUBLIC KEY-----");
		return jse.encrypt(Courier.pgt_account);
	}
	static getPostData() {
		if(!Courier.pgt_account_key) Courier.pgt_account_key = Courier.get_pgt_account();
		if(!Courier.pgt_account_key) return;
		return {
			pgt_account: Courier.pgt_account_key,
			version: Courier.version,
			uid: Courier.uid
		};
	}
}

var Interval = class {
	static fail_count = 0;
	static run() {
		let postData = Courier.getPostData();
		let oneself = SceneManager.oneself;
		if(!oneself) return;
		postData.pos = oneself.pos;
		postData.face = oneself.face;
		postData.state = oneself.state;
		postData.logs_last_index = ChatLogs.get_last_index(Screen.mid);
		
		$.post(Courier.postUrl + 'interval', {content: JSON.stringify(postData)}, (origData) => {
			if($('#pugether').length == 0) return;
			if(origData.substr(0, 1) != '{') {
				alert('噗給樂-錯誤：回傳值不是json格式。');
				Main.close();
				return;
			}
			if(Interval.fail_count) Interval.fail_count = 0;
			let data = JSON.parse(origData);
			if(data.starting) {setTimeout(Interval.run, 5000); return;}
			Interval.done(data);
		}).fail(() => {
			Interval.fail_count++;
			if(Interval.fail_count < 5) setTimeout(Interval.run, 5000);
			else {
				alert('噗給樂-錯誤：無法連上伺服器。');
				Main.close();
			}
		});
	}
	static async done(data) {
		if(data.mid != Screen.mid) {
			let postData = {logs_last_index: ChatLogs.get_last_index(data.mid)};
			await Courier.post('read_screen', postData, Screen.init);
			Interval.run();
			return;
		}
		let check_list = SceneManager.get_check_list();
		for(let cid in data.players) {
			if(check_list.players[cid]) delete check_list.players[cid];
			if(!Player.arr[cid]) {
				SceneManager.not_downloaded_player_cids.push(cid);
				continue;
			}
			Player.arr[cid].check_if_move(data.players[cid]);
		}
		for(let iid in data.items) {
			if(check_list.items[iid]) delete check_list.items[iid];
			if(!Item.arr[iid]) {
				SceneManager.not_downloaded_item_iids.push(iid);
				continue;
			}
			Item.arr[iid].check_if_change(data.items[iid]);
		}
		for(let cid in check_list.players) if(check_list.players[cid]) Player.arr[cid].dom.remove();
		for(let iid in check_list.items) if(check_list.items[iid]) Item.arr[iid].dom.remove();
		ChatLogs.read(data.mid, data.logs, data.logs_last_index);
		await SceneManager.download_squares();
		await SceneManager.download_imgsets();
		SceneManager.board_and_terrain_update();
		setTimeout(Interval.run, 1000);
	}
}

var Screen = class {
	static init(data) {
		Screen.mid = data.mid;
		Screen.sname = (data.name || "無法載入名稱");
		Screen.state = data.state;
		Screen.size = (data.size || {l:4, w:4, h:3});
		Screen.offset = (data.offset || {});
		if(!Screen.offset.r) Screen.offset.r = 0;
		if(!Screen.offset.c) Screen.offset.c = 0;
		if(!Screen.offset.a) Screen.offset.a = 0;
		
		Screen.dom = $('#pgt_screen');
		Screen.img_load(data.img);
		Screen.dom.empty();
		SceneManager.oneself.init_enter_screen();
		
		Screen.auto_camera_switch = true;
		
		Screen.board = [];
		Screen.terrain = [];
		Item.arr = {};
		
		ChatLogs.read(data.mid, data.logs, data.logs_last_index);
	}
	static img_load(src) {
		let img = new Image();
		img.onload = (e) => {
			let img = e.path[0];
			Screen.dom.css({
				background: 'url(' + img.src + ')',
				width: img.width,
				height: img.height
			});
			Screen.scroll_to_oneself();
		};
		img.onerror = () => {
			alert('噗給樂-錯誤：場景讀取失敗。');
			Main.close();
		};
		img.src = src;
	}
	static check_wall(r, c, a, d) {
		let target_grid = Screen.get_grid_terrain(r, c, a);
		if(!target_grid) return false;
		if(target_grid === 1 || target_grid['w' + d]) return true;
		return false;
	}
	static check_action(r, c, a) {
		let target_grid = Screen.get_grid_terrain(r, c, a);
		if(!target_grid) return false;
		if(target_grid.fly && SceneManager.oneself.state != "fly") return true;
		return false;
	}
	static check_climb(r, c, a) {
		let target_grid = Screen.get_grid_terrain(r, c, a);
		if(target_grid && target_grid.l) return target_grid.l;
		return null;
	}
	static check_stair(target_pos, cur_pos, d) {
		let target_grid = Screen.get_grid_terrain(target_pos.r, target_pos.c, target_pos.a);
		if(target_grid && target_grid['s' + d]) {target_pos.a++; return;}
		
		let cur_footer_grid = Screen.get_grid_terrain(cur_pos.r, cur_pos.c, cur_pos.a - 1);
		if(cur_footer_grid && cur_footer_grid['s' + ((d + 2) % 4)]) target_pos.a--;
	}
	static check_chair(r, c, a) {
		let target_grid = Screen.get_grid_terrain(r, c, a);
		if(target_grid && target_grid.c) return true;
		return false;
	}
	static get_grid_terrain(r, c, a) {
		let pos_str = [r, c, a].join("_");
		if(!Screen.terrain[pos_str]) return null;
		return Screen.terrain[pos_str];
	}
	static get_grid_item(r, c, a) {
		let pos_str = [r, c, a].join("_");
		if(!Screen.board[pos_str]) return [];
		return Screen.board[pos_str];
	}
	static scroll_to_oneself(auto) {
		let oneself_top = SceneManager.oneself.dom.css('top').split('px')[0];
		let oneself_left = SceneManager.oneself.dom.css('left').split('px')[0];
		let scene_height = $('#pgt_screen_box').css('height').split('px')[0];
		let scene_width = $('#pgt_screen_box').css('width').split('px')[0];
		let target_scroll_pos = {
			left: (+oneself_left || 0) - (+scene_width / 2 || 0) + 63,
			top: (+oneself_top || 0) - (+scene_height / 2 || 0)
		};
		if(auto === true) {
			$('#pgt_screen_box').scrollLeft(target_scroll_pos.left);
			$('#pgt_screen_box').scrollTop(target_scroll_pos.top);
		}
		else $('#pgt_screen_box').animate({
			scrollLeft: target_scroll_pos.left + 'px',
			scrollTop: target_scroll_pos.top + 'px'
		}, 1000);
	}
	static item_enter(item) {
		let pos_str = [item.pos.r, item.pos.c, item.pos.a].join("_");
		if(!Screen.board[pos_str]) Screen.board[pos_str] = [];
		Screen.board[pos_str].push(item);
	}
	static append_terrain(i_size, i_pos, t_pos, t) {
		let pos = [
			i_pos.r - i_size.l + 1 + t_pos.r,
			i_pos.c - i_size.w + 1 + t_pos.c,
			i_pos.a - i_size.h + 1 + t_pos.a
		];
		let pos_str = pos.join("_");
		Screen.append_terrain_enter(pos_str, t);
		if(t.l) {
			let pos_str2 = [pos[0], pos[1], pos[2] + t.l.lh].join("_");
			let t2 = JSON.parse(JSON.stringify(t));
			t2.l.lh *= -1;
			Screen.append_terrain_enter(pos_str2, t2);
		}
	}
	static append_terrain_enter(pos_str, t) {
		if(!Screen.terrain[pos_str] || t === 1) {Screen.terrain[pos_str] = JSON.parse(JSON.stringify(t)); return;}
		for(let f in t) Screen.terrain[pos_str][f] = t[f];
	}
	static auto_camera(onoff) {
		clearInterval(Screen.camera_moving);
		if(!Screen.auto_camera_switch) return;
		if(onoff) Screen.camera_moving = setInterval(() => {Screen.scroll_to_oneself(true)}, 10);
	}
	static camera_switch() {
		Screen.auto_camera_switch = !Screen.auto_camera_switch;
		$('#pgt_camera_switch').attr('val', Screen.auto_camera_switch);
	}
}

var SceneManager = class {
	static imgsets = {};
	static not_downloaded_setids = [];
	static not_downloaded_player_cids = [];
	static not_downloaded_item_iids = [];
	static async init(data) {
		this.oneself = new Player(data.cid, data);
		this.oneself.dom.attr('id', 'pgt_oneself');
		await SceneManager.download_imgsets();
		this.oneself.update_imgset();
		$('#pgt_special_action [data-s="' + this.oneself.state + '"]').attr('val', 'true');
	}
	static board_and_terrain_update() {
		Screen.board = [];
		Screen.terrain = [];
		for(let iid in Item.arr) {
			let item = Item.arr[iid];
			Screen.item_enter(item);
			if(item.terrain)
				for(let t_data of item.terrain)
					Screen.append_terrain(item.size, item.pos, t_data.pos, t_data.t);
		}
	}
	static get_check_list() {
		let check_list = {players: {}, items: {}};
		for(let cid in Player.arr) check_list.players[cid] = 1;
		for(let iid in Item.arr) check_list.items[iid] = 1;
		delete check_list.players[SceneManager.oneself.cid];
		return check_list;
	}
	static async download_squares() {
		if(SceneManager.not_downloaded_player_cids.length == 0 && SceneManager.not_downloaded_item_iids.length == 0) return;
		let postData = {cids: SceneManager.not_downloaded_player_cids, iids: SceneManager.not_downloaded_item_iids};
		await Courier.post('get_squares', postData, (data) => {
			for(let cid in data.players) {
				if(Player.arr[cid]) {
					Player.arr[cid].dom.remove();
					delete Player.arr[cid];
				}
				new Player(cid, data.players[cid]);
			}
			for(let iid in data.items) {
				if(Item.arr[iid]) {
					Item.arr[iid].dom.remove();
					delete Item.arr[iid];
				}
				new Item(iid, data.items[iid]);
			}
			for(let iid in Item.arr) Item.arr[iid].update_screen_index();
			
			SceneManager.not_downloaded_player_cids = [];
			SceneManager.not_downloaded_item_iids = [];
		});
	}
	static async download_imgsets() {
		if(SceneManager.not_downloaded_setids.length == 0) return;
		await Courier.post('get_imgsets', {ids: SceneManager.not_downloaded_setids}, (data) => {
			for(let setid in data.imgsets)
				SceneManager.imgsets[setid] = new Imgset(data.imgsets[setid]);
			SceneManager.not_downloaded_setids = [];
			for(let cid in Player.arr) Player.arr[cid].update_imgset();
		});
	}
}

var Imgset = class {
	constructor(data) {
		this.name = data.name;
		this.speed = data.speed;
		this.idle = data.idle;
		this.walk = data.walk;
		this.send = data.send;
		this.climb_up = data.climb_up;
		this.climb_down = data.climb_down;
		this.sit_down = data.sit_down;
		this.chair = data.chair;
		this.fly = data.fly;
		this.act1 = data.act1;
		this.act2 = data.act2;
		this.act3 = data.act3;
		this.set_gif_sync();
	}
	set_gif_sync() {
		let states = ['idle', 'walk', 'send', 'climb_up', 'climb_down', 'sit_down', 'chair', 'fly', 'act1', 'act2', 'act3'];
		let imgset_sync = $('#imgset_gif_sync');
		let gifs_url = [];
		for(let state of states)
			for(let face in this[state])
				for(let type in this[state][face]) {
					let img = this[state][face][type];
					switch(img.url.substr(-3)) { case 'gif': case 'png':
						if(imgset_sync.find('[src="' + img.url + '"]').length == 0) {
							imgset_sync.append('<img src="' + img.url + '"/>');
							gifs_url.push(img.url);
						}
					}
				}
		//寫到這：迴圈醜醜
		let loaded = 0;
		function all_loaded() {
			loaded++;
			if(loaded >= gifs_url.length) {
				let sync_imgs = $('#imgset_gif_sync img');
				for(let f=0; f<sync_imgs.length; f++) sync_imgs[f].src = sync_imgs[f].src;
			}
		}
		for(let url of gifs_url) {
			let gif = new Image();
			gif.onload = all_loaded;
			gif.onerror = all_loaded;
			gif.src = url;
		}
	}
	get_img_dom(dom_imgs, state, face) {
		let doms = this.img_to_dom(state, face);
		if(doms.normal) dom_imgs.normal.push(doms.normal);
		if(doms.outer) dom_imgs.outer.splice(0, 0, doms.outer);
		if(doms.chair) dom_imgs.chair.push(doms.chair);
		if(doms.send) dom_imgs.send.push(doms.send);
	}
	img_to_dom(state, face) {
		if(!this[state] || !this[state][face]) return {};
		let doms = {};
		let img = this[state][face];
		for(let type in img) {
			if(img[type].url == "") continue;
			doms[type] = $('<img class="pgt_sq_img" src="' + img[type].url + '"/>');
			if(img[type].origin) for(let o in img[type].origin) doms[type].css(o, img[type].origin[o]);
			if(img[type].turn) doms[type].css('transform', 'scaleX(-1)');
		}
		return doms;
	}
}

var Square = class {
	constructor(type, pos, size) {
		this.dom = $('<div class="square"></div>').addClass(type);
		this.type = type;
		this.pos = pos;
		if(type == "item") this.size = (size || {l: 1, w: 1, h: 1});
		this.init_enter_screen();
	}
	compare_layer_value(target_sq) {
		if(this.pos.r == target_sq.pos.r && this.pos.c == target_sq.pos.c && this.pos.a == target_sq.pos.a) {
			/*都是玩家物件*/
			if(this.type == 'player' && target_sq.type == 'player') {
				if(this.cid == SceneManager.oneself.cid) return true;
				else return false;
			}
			/*都是場景物件*/
			else if(this.type == 'item' && target_sq.type == 'item') {
				return (this.index || 0) > (target_sq.index || 0);
			}
			/* this 是玩家物件, target_sq 是場景物件*/
			else if(this.type == 'player') {
				if(target_sq.index > 0) return false;
				else true;
			}
			/* this 是場景物件, target_sq 是玩家物件*/
			else {
				if(this.index > 0) return true;
				else false;
			}
		}
		let a = this.get_point_and_size();
		let b = target_sq.get_point_and_size();
		if(a.min[2] > b.max[2]) return true;
		if(b.min[2] > a.max[2]) return false;
		let a_yesno = a.max[0] > b.min[0] && a.max[1] > b.min[1] && a.max[2] > b.min[2];
		let b_yesno = b.max[0] > a.min[0] && b.max[1] > a.min[1] && b.max[2] > a.min[2];
		if (a_yesno && b_yesno) {
			let da_p = [a.max[0] - b.min[0], a.max[1] - b.min[1], a.max[2] - b.min[2]];
			let db_p = [b.max[0] - a.min[0], b.max[1] - a.min[1], b.max[2] - a.min[2]];
			let dp_p = [
				a.size[0] + b.size[0] - Math.abs(da_p[0] - db_p[0]),
				a.size[1] + b.size[1] - Math.abs(da_p[1] - db_p[1]),
				a.size[2] + b.size[2] - Math.abs(da_p[2] - db_p[2])
			];
			if (dp_p[0] <= dp_p[1] && dp_p[0] <= dp_p[2]) return da_p[0] >= db_p[0];
			else if (dp_p[1] <= dp_p[0] && dp_p[1] <= dp_p[2]) return da_p[1] >= db_p[1];
			else return da_p[2] > db_p[2];
		}
		return a_yesno;
	}
	enter_screen() {
		if(!Screen.dom) return;
		let squares = Screen.dom.find('.square');
		let cur_index = 0;
		while(cur_index < squares.length) {
			let target = Square.dom_get_sq(squares.eq(cur_index));
			if(!this.compare_layer_value(target)) break;
			cur_index++;
		}
		if(cur_index == squares.length) Screen.dom.append(this.dom);
		else squares.eq(cur_index).before(this.dom);
	}
	init_enter_screen() {
		this.enter_screen();
		this.pic_pos_rapid_update();
	}
	update_screen_index() {
		this.dom.remove();
		this.enter_screen();
	}
	pic_pos_rapid_update() {
		let pic_pos = this.solid_pos_to_pic_pos();
		this.dom.css(pic_pos);
	}
	solid_pos_to_pic_pos() {
		if(!Screen.mid) return {bottom: 0, left: 0};
		let pos = {
			bottom: ((Screen.size.l - 1 - this.pos.r) + (Screen.size.w - 1 - this.pos.c)) * 31 + this.pos.a * 72,
			left: ((Screen.size.l - 1 - this.pos.r) + this.pos.c) * 63
		};
		pos.bottom += (Screen.offset.r + Screen.offset.c) * -31 + Screen.offset.a * 72;
		pos.left += (Screen.offset.r - Screen.offset.c) * 63;
		return pos;
	}
	static dom_get_sq(dom) {
		if(dom.hasClass('player')) return Player.arr[dom.attr('data-cid')];
		if(dom.hasClass('item')) return Item.arr[dom.attr('data-iid')];
	}
}

var Player = class extends Square {
	static arr = {};
    constructor(cid, data) {
		super('player', data.pos);
		this.cid = cid;
		this.name = data.name;
		this.face = data.face;
		this.setids = data.setids;
		this.state = data.state;
		this.role = data.role;
		Player.arr[cid] = this;
		this.dom_init();
	}
	dom_init() {
		this.dom.attr('title', 'ID:' + this.cid)
		.attr('data-cid', this.cid)
		.append('<div class="pgt_sq_imgs"></div>')
		.append('<div class="pgt_sq_name">' + this.name + '</div>')
		.append('<div class="pgt_sq_say"></div>');
		this.update_imgset();
	}
	get_speed() {
		if(this.setids.length == 0) return 1000;
		let imgset = SceneManager.imgsets[this.setids[0]];
		if(!imgset) return 1000;
		return (imgset.speed || 1000);
	}
	say(text) {
		clearTimeout(this.say_7s);
		let say_dom = this.dom.find('.pgt_sq_say');
		say_dom.html(text).fadeIn();
		this.say_7s = setTimeout(() => {say_dom.fadeOut()}, 7000);
	}
	move(move_state, target_pos, cellcount, done_move) {
		let index_before_change = false;
		let index_after_change = false;
		
		if(this.pos.r == target_pos.r && this.pos.c == target_pos.c) {
			if(target_pos.a > this.pos.a) index_after_change = true;
			else index_before_change = true;
		}
		else {
			if(this.pos.r > target_pos.r || this.pos.c > target_pos.c) index_after_change = true;
			else index_before_change = true;
		}
		
		this.pos = target_pos;
		if(this.state != 'fly') this.state = move_state;
		this.update_imgset();
		if(index_before_change) this.update_screen_index();
		
		let pic_pos = this.solid_pos_to_pic_pos();
		this.dom.animate(pic_pos, this.get_speed() * (cellcount || 1), () => {
			if(this.state != 'fly') this.state = 'idle';
			this.update_imgset();
			if(index_after_change) this.update_screen_index();
			if(done_move) done_move();
		});
	}
	check_if_move(data) {
		if($('.square.player[data-cid="' + this.cid + '"]').length == 0) this.init_enter_screen();
		if(JSON.stringify(this.pos) != JSON.stringify(data.pos)) {
			this.face = data.face;
			this.setids = data.setids;
			if(Screen.check_climb(this.pos.r, this.pos.c, this.pos.a)) {
				if(this.pos.a < data.pos.a) this.move('climb_up', data.pos, data.pos.a - this.pos.a);
				else this.move('climb_down', data.pos, this.pos.a - data.pos.a);
			}
			else this.move('walk', data.pos, 1);
			return;
		}
		if(this.face != data.face || this.state != data.state || this.check_imgset_change(data.setids)) {
			this.update_imgset();
		}
	}
	check_imgset_change(data_setids) {
		if(JSON.stringify(this.setids) != JSON.stringify(data_setids)) {this.setids = data_setids; return true;}
		if(JSON.stringify(this.setids) != '["空白"]' && this.dom.find('.pgt_sq_imgs').html() == "") return true;
		return false;
	}
	update_imgset() {
		let imgs = { normal: [], outer: [], chair: [], send: [] };
		for(let setid of this.setids) {
			if(!SceneManager.imgsets[setid])
				{ SceneManager.not_downloaded_setids.push(setid); continue; }
			SceneManager.imgsets[setid].get_img_dom(imgs, this.state, this.face);
		}
		let imgs_dom = this.dom.find('.pgt_sq_imgs');
		imgs_dom.empty();
		for(let f=0; f<imgs.outer.length; f++) imgs_dom.append(imgs.outer[f]);
		if(this.state == "chair") {
			for(let f=0; f<imgs.chair.length; f++) imgs_dom.append(imgs.chair[f]);
			TriggerCheck.chair(this);
		}
		for(let f=0; f<imgs.normal.length; f++) imgs_dom.append(imgs.normal[f]);
		for(let f=0; f<imgs.send.length; f++) imgs_dom.append(imgs.send[f]);
	}
    get_point_and_size() {
		return {
			min: [this.pos.r - 0.6, this.pos.c - 0.6, this.pos.a - 0.3],
			max: [this.pos.r + 0.6, this.pos.c + 0.6, this.pos.a + 0.9],
			size: [1.2, 1.2, 1.2]
		};
	}
}

var Item = class extends Square {
	static arr = {};
    constructor(iid, data) {
		super('item', data.pos, data.size);
		this.iid = iid;
		this.index = data.index;
		this.state = data.state;
		this.terrain = data.terrain;
		this.c_param = data.c_param;
		Item.arr[iid] = this;
		this.dom_init(data);
	}
	dom_init(data) {
		this.dom.attr('data-iid', this.iid)
		.append('<div class="pgt_sq_imgs"></div>');
		if(data.img) {
			let sq_img = $('<img class="pgt_sq_img" src="' + data.img + '"></div>');
			if(data.origin) for(let o in data.origin) sq_img.css(o, data.origin[o]);
			else sq_img.css({left: 0, bottom: 0});
			this.dom.find('.pgt_sq_imgs').append(sq_img);
		}
	}
    get_point_and_size() {
		return {
			min: [ this.pos.r + 0.5 - this.size.l, this.pos.c + 0.5 - this.size.w, this.pos.a - 0.5 ],
			max: [ this.pos.r + 0.5 , this.pos.c + 0.5, this.pos.a - 0.5 + this.size.h ],
			size: [ this.size.l, this.size.w, this.size.h ]
		};
	}
	check_if_change(data) {
		if($('.square.item[data-iid="' + this.iid + '"]').length == 0) this.init_enter_screen();
		if(this.state != data.state) {
			SceneManager.not_downloaded_item_iids.push(this.iid);
		}
	}
}

var TriggerRun = class {
	static chair(item, chair_param, player) {
		let chair_img = $('<img class="pgt_sq_img" src="' + chair_param.url + '"/>');
		if(chair_param.origin) for(let o in chair_param.origin) chair_img.css(o, chair_param.origin[o]);
		if(chair_param.turn) chair_img.css('transform', 'scaleX(-1)');
		player.dom.find('.pgt_sq_imgs').append(chair_img);
	}
	static portal(item) {
		Courier.post('trigger_effect', {iid: item.iid, effect_type: 'portal'}, () => {
			Event.oneself_moving = false;
		});
	}
}

var TriggerCheck = class {
	static chair(player) {
		if(!Screen.board) return;
		let here_items = Screen.get_grid_item(player.pos.r, player.pos.c, player.pos.a);
		for(let item of here_items)
			if(item.c_param && item.c_param.chair)
				TriggerRun.chair(item, item.c_param.chair, player);
	}
	static portal() {
		let pos = SceneManager.oneself.pos;
		let here_items = Screen.get_grid_item(pos.r, pos.c, pos.a);
		for(let item of here_items)
			if(item.c_param && item.c_param.portal)
				{TriggerRun.portal(item); return true;}
		return false;
	}
}

var ChatLogs = class {
	static chat_audio = true;
	static get_last_index(mid) {
		return (ChatLogs[mid] ? ChatLogs[mid].logs_last_index : null);
	}
	static read(mid, logs, logs_last_index) {
		if($('#pgt_chat_logs').attr('data-mid') != mid) ChatLogs.read_temp(mid);
		if(!logs_last_index || ChatLogs[mid].logs_last_index > logs_last_index) return;
		let is_lowest = $('#pgt_chat_logs').innerHeight() - $('#pgt_chat').height() - $('#pgt_chat').scrollTop() < 10;
		ChatLogs[mid].logs_last_index = logs_last_index;
		for(let log of logs) {
			ChatLogs[mid].logs.push(log);
			ChatLogs.add_log_view(log.cid, log.time, log.name, log.text);
		}
		if(!$('body').is(':focus') && !$('#pugether').is(':focus') && ChatLogs.chat_audio) $('#pgt_chat_audio')[0].play();
		if(is_lowest) $('#pgt_chat').animate({scrollTop: $('#pgt_chat')[0].scrollHeight - $('#pgt_chat').innerHeight()}, 1000);
	}
	static read_temp(mid) {
		$('#pgt_chat_logs').empty();
		$('#pgt_chat_logs').attr('data-mid', mid);
		if(!ChatLogs[mid]) ChatLogs[mid] = {logs: []};
		for(let log of ChatLogs[mid].logs) ChatLogs.add_log_view(log.cid, log.time, log.name, log.text);
	}
	static add_log_view(cid, time, name, text) {
		let n = new Date(time);
		let time_str = n.getFullYear() + "/" + (n.getMonth()+1) + "/" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
		$('<div class="pgt_chat_log" data-cid="' + cid + '" time="' + time_str + '"></div>')
		.append('<div class="pgt_log_name">' + name + '</div>')
		.append('<div class="pgt_log_text">' + text + '</div>')
		.appendTo('#pgt_chat_logs');
	}
	static chat_noti_switch() {
		ChatLogs.chat_audio = !ChatLogs.chat_audio;
		$('#pgt_chat_noti').attr('val', ChatLogs.chat_audio);
	}
	static download() {
		let logs = $('<div></div>');
		let mid = Screen.mid;
		if(!ChatLogs[mid] || !ChatLogs[mid].logs) {alert('無對話紀錄可下載。'); return;}
		for(let log of ChatLogs[mid].logs) {
			let n = new Date(log.time);
			let time_str = n.getFullYear() + "/" + (n.getMonth()+1) + "/" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
			$('<div class="chat_log"></div>')
				.append('<div class="cid">' + log.cid + '</div>')
				.append('<div class="time">' + time_str + '</div>')
				.append('<div class="name">' + log.name + '</div>')
				.append('<div class="text">' + log.text + '</div>')
			.appendTo(logs);
		}
		let logs_css = '<style>' +
			'.chat_log { border-bottom:1px solid #CCC; margin-bottom:5px; line-height:20px; }' +
			'.chat_log div:not(.text) { display:inline-block; }' +
			'.cid, .time, .name { background:#FFF; padding:2px 5px; margin:5px; filter:drop-shadow(rgb(255, 87, 77) 2px 2px 0px); }' +
			'.text { background:#FFF; margin:5px 10px 10px; padding:5px 10px; }' + 
			'</style>';
		let blob = new Blob([logs_css + '<body style="background:#AAA;">' + logs.html() + '</body>'], {type: 'text/html', charset: 'utf-8'});
		let download = $('<a download="對話紀錄"></a>')[0];
		if (window.webkitURL != null) {
			download.href = window.webkitURL.createObjectURL(blob);
		} else {
			download.href = window.URL.createObjectURL(blob);
		}
		download.click();
	}
}

Main.load();