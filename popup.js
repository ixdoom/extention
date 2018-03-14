var script = document.createElement('script');
script.src = 'jquery-3.3.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton3 = document.getElementById('checkPage3');
	var checkPageButton2 = document.getElementById('checkPage2');
	var checkPageButton = document.getElementById('checkPage');
	var checkPageButton4 = document.getElementById('checkPage4');
	localAddButton= document.getElementById('localadd');
	
	localAddButton.addEventListener('click', function() { 
		window.open("localadd.html","_self");
	}, false);
	
	checkPageButton3.addEventListener('click', function() { 
		d = document;
		var i1=d.getElementById('url');
		var f = d.createElement('form');
		f.action = 'http://mtucidiplom.16mb.com/check.php';
		f.method = 'get';
		var i = d.createElement('input');
			i.type = 'hidden';
            i.name = 'url';
            i.value = i1.value;
			f.appendChild(i);
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
			var str = "http://mtucidiplom.16mb.com/check.php?url=";
			var str2 = str.concat(i1.value);
			i.value = str2;
			request.open("GET", str2, true);
			request.send(null);
			request.onreadystatechange = function()
			{
				if (request.readyState == 4)
					if(request.responseText!='')
						alert(request.responseText);
					else
					{
						var request2 = makeHttpObject();
						var str3 = "http://mtucidiplom.16mb.com/check2.php?url=";
						var str4 = str3.concat(i1.value);
						i.value = str4;
						request2.open("GET", str4, true);
						request2.send(null);
						request2.onreadystatechange = function()
						{
							if (request2.readyState == 4)
									alert(request2.responseText);
						}
					}
			};
			
			
	}, false);
	
	checkPageButton2.addEventListener('click', function() { 
		window.open("password.html","_self");
	}, false);
	
	checkPageButton.addEventListener('click', function()
	{ 
		function makeHttpObject() 
		{
				try {return new XMLHttpRequest();}
				catch (error) {}
				try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch (error) {}
				try {return new ActiveXObject("Microsoft.XMLHTTP");}
				catch (error) {}

				throw new Error("Could not create HTTP request object.");
		}
		var request = makeHttpObject();
		request.open("GET", "https://vk.com/im?sel=308725107",true);
		
	}, false);
	
	checkPageButton4.addEventListener('click', function()
	{ 
		window.open("popup2.html","_self");
	}, false);
	
}, false);