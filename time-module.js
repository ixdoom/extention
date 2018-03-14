var timeModule = function(){

	if (!Date.now) {
    	Date.now = function() { return new Date().getTime(); };
	}

	this.timestamp = 0;
	this.seed = 0;

	this.unixtimeStamps = {};
	this.ids = {};

	this.generateUnixtime = function(){
		this.timestamp = Math.floor(Date.now() / 100);
		return this.timestamp;
	};

	this.generateSeed = function(){
		this.seed = Math.floor(Math.random()*4294967296);
		return this.seed;
	};

	this.getLastUnixtime = function(){
		if (this.timestamp){
			return this.timestamp;
		}
		return this.generateUnixtime();
	};

	this.getLastSeed = function(){
		if(this.seed){
			return this.seed;
		}
		return this.generateSeed();
	};

	this.setLastUnixtime = function(sender,time,id){

		if(ids[sender]){
			if (ids[sender] < id){
				ids[sender] = id;
				if (unixtimeStamps[sender] < time){
					unixtimeStamps[sender] = time;
				}
			}
		}
		else{
			ids[sender] = id;
			unixtimeStamps[sender] = time;
		}

	};

	this.checkLastUnixtime = function(sender,time,id){

		if(ids[sender] && (ids[sender] < id) && (unixtimeStamps[sender] >= time)){
			return false;
		}
		
		return true;
	};

	return this;
}();