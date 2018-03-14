var premodule = function(){
	
	var toBytesInt32 = function(num) {
		arr = new Uint8Array([
         (num & 0xff000000) >> 24,
         (num & 0x00ff0000) >> 16,
         (num & 0x0000ff00) >> 8,
         (num & 0x000000ff)
    	]);
    	return arr;
	};

	var toInt32 = function(array){
		return (array[0] << 24) + (array[1] << 16) + (array[2] << 8) + array[3];
	};

	var arrayEquality = function(a, b){
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;

		for (var i = 0; i < a.length; ++i) {
		  if (a[i] !== b[i]) return false;
		}
		return true;
	};


	this.prepare = function(array){
		var messageLength = toBytesInt32(array.length);
		var hash = sha256.array(array);

		var length = messageLength.length + hash.length + array.length;
		if (length % 16 != 0){
			length += 16 - length % 16;
		}

		var result = new Uint8Array(length);
		result.set(messageLength);
		result.set(hash, messageLength.length);
		result.set(array, messageLength.length + hash.length);

		return result;
	};

	this.check = function(array){
		var length = toInt32(array);
		var message = array.slice(36, 36 + length);

		var calculatedhash = sha256.array(message);
		var hash = array.slice(4,36);

		if (arrayEquality(calculatedhash, hash)){
			return message;
		}
		else{
			return false;
		}
	}

	return this;
}();
