var storage = function(){

	var defaultKey = [];

	this.setDefaultKey = function(key){
		defaultKey = key;
	}

	this.keys = {};

	this.messages = {};
	this.modifiedMessages = {};
	this.messagesState = {};
	this.nonVKEMessages = {};
	this.messagesColor = {};
	this.dialogsMessages = {};

	this.addKey = function(key,path){
		keys[path] = key;
	};

	this.getKey = function(path){
		if (this.keys[path] != null){
			return this.keys[path];
		}
		return defaultKey;
	};

	this.storeOriginalMessage = function(id, dialog, author, message){
		this.messages[id] = { author : author, message : message };
		this.setMessageState(id,false);
		if (!this.dialogsMessages[dialog]) this.dialogsMessages[dialog] = [];
		this.dialogsMessages[dialog].push(id);
	};

	this.getOriginalMessage = function(id){
		if (this.messages[id]){
			return this.messages[id];
		}
		else{
			return null;
		}
	};

	this.storeModifiedMessage = function(id, author, message){
		this.modifiedMessages[id] = { author : author, message : message };
		this.setMessageState(id,true);
	};

	this.getModifiedMessage = function(id){
		if (this.modifiedMessages[id]){
			return this.modifiedMessages[id];
		}
		else{
			return null;
		}
	};

	this.clearMessagesInfo = function(){
		this.messages = {};
		this.modifiedMessages = {};
		this.messagesState = {};
		this.nonVKEMessages = {};
		this.dialogsMessages = {};
	};

	this.messageEncryptionState = function(id){
		return this.messagesState[id];
	};

	this.setMessageState = function(id, state){
		this.messagesState[id] = state;
	};

	this.addNonVKEMessage = function(id){
		this.nonVKEMessages[id] = true;
	};

	this.setMessagesColor = function(id, color){
		this.messagesColor[id] = color;
	};

	this.resetDialogMessagesState = function(dialog){
		if (!this.dialogsMessages[dialog]) return;
		for (var i = 0; i < this.dialogsMessages[dialog].length; i++) {
			setMessageState(this.dialogsMessages[dialog][i], false);
		}
	};

	this.belongsToDialog = function(dialog, id){
		if (!this.dialogsMessages[dialog]) return false;
		return this.dialogsMessages[dialog].indexOf(id) != -1;
	};

	return this;
}();