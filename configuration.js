var configuration = function(){

	this.version = "1.1";

	this.maxLength = 2500;
	this.maxPasswordLength = 64;

	this.allowedVersions = [ "1.1" ];

	this.nativeSelectors = {
		chatBox : ".im-chat-input--text",
		chatBoxContainer : ".im-chat-input--textarea",
		attachmentButton : ".im-chat-input--attach",
		placeholder : ".placeholder",
		smileButton : ".im-chat-input--smile-wrap",
		sendButton : ".im-send-btn",
		windowContainer : ".im-chat-input.clear_fix",
		chatHistoryContainer : ".im-page--chat-body-wrap-inner"
	};

	this.vkeSelectors = {
		messageBox : "#vke-message-input",
		enableCB : "#vke-enable",
		setPasswordButton : "#vke-set-password",
			passwordWindow : "#vke-password-window",
			passwordField : "#vke-password-field",
			passwordOK : "#vke-password-ok",
			passwordCancel : "#vke-password-cancel",
			passwordDisplay : "#vke-show-password"

	};

	this.html = {
		// image?
		messageWindow : "<textarea id='vke-message-input'></textarea>",
		passwordWindow : "<div id='vke-password-window'>"
						+ "<input id='vke-show-password' type='checkbox' value='false'>Показать пароль</input>" 
						+ "<input id='vke-password-field' type='password'/>"
						+ "<div style='overflow: hidden;'><div id='vke-password-ok'>OK</div>"
						+ "<div id='vke-password-cancel' style='overflow: hidden;'>Отмена</div></div></div>",
		setPasswordButton : "<div><image id='vke-set-password' src=''/></div>",
		enableButton : "<div><image id='vke-enable' src=''/></div>"

	};

	this.images = {
		lock : "",
		unlock : "",
		key : ""
	};

	this.alerts = {
		messageIsTooLong : "Сообщение слишком большое. Пожалуйста, поделите сообщение на несколько частей.",
		passwordIsTooLong : "Длина парольной фразы превышает максимально допустимую. Пожалуйста, используйте другую парольную фразу."
	};

	return this;
}();