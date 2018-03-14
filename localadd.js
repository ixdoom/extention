document.addEventListener('DOMContentLoaded', function() {
	var addButton = document.getElementById('add');
	var backButton = document.getElementById('back');
	backButton.addEventListener('click', function() { 
		window.open("popup.html","_self");
	}, false);
	addButton.addEventListener('click', function() { 
		d = document;
		var urlBox=d.getElementById('url');
		var reasonBox=d.getElementById('reason');
		var f = d.createElement('form');
		f.action = 'http://mtucidiplom.16mb.com/add.php';
		f.method = 'get';
		var url = d.createElement('input');
		url.type = 'hidden';
        url.name = 'url';
        url.value = urlBox.value;
		f.appendChild(url);
        d.body.appendChild(f);
		var reason = d.createElement('input');
		reason.type = 'hidden';
        reason.name = 'reason';
        reason.value = reasonBox.value;
		f.appendChild(reason);
        d.body.appendChild(f);
        f.submit();
		function makeHttpObject() {
				try {return new XMLHttpRequest();}
				catch (error) {}
				try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch (error) {}
				try {return new ActiveXObject("Microsoft.XMLHTTP");}
				catch (error) {}

				throw new Error("Could not create HTTP request object.");
		}
		var request = makeHttpObject();
			var str = "http://mtucidiplom.16mb.com/add.php?url=";
			var str2 = str.concat(url.value);
			var str3 = str2.concat("&reason=");
			var str4 = str3.concat(reason.value);
			request.open("GET", str4, true);
			request.send(null);
			request.onreadystatechange = function() {
			if (request.readyState == 4)
				alert(request.responseText);
			};
	}, false);
}, false);