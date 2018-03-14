var base64module = function(){

	var getResultObject = function(){
		return {
			result : false,
			bytes : [],
			message : []
		};
	};

	this.toBase64 = function(message){
		var result = getResultObject();

		result.bytes = message;

		try{
			var base = base64js.fromByteArray(message);

			result.message = base;
			result.result = true;
		}
		catch(e){
			console.log(e);
		}

		return result;
	}

	this.fromBase64 = function(message){
		var result = getResultObject();

		result.message = message;

		try{
			var bytes = base64js.toByteArray(message);

			result.bytes = bytes;
			result.result = true;			
		}
		catch(e){
			console.log(e);
		}

		return result;
	}

	return this;

}();