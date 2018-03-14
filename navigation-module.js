var navigationModule = function(){

	this.key = "";
	this.author = "";

	var getRequestParams = function(prmstr){
	    var params = {};
	    var prmarr = prmstr.split("&");
	    for ( var i = 0; i < prmarr.length; i++) {
	        var tmparr = prmarr[i].split("=");
	        params[tmparr[0]] = tmparr[1];
	    }
	    return params;
	};

	// returns previous value if different
	this.updateNavigationState = function(address){

		var params = getRequestParams(address);

		var result = null;

		if (params["sel"]){
			if (this.key != params["sel"]) result = this.key;
			this.key = params["sel"];
		}
		else{
			this.key = "";
		}

		return result;
	};

	this.setAuthor = function(auth){
		this.author = auth;
	};

	return this;
}();