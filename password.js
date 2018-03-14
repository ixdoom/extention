document.addEventListener('DOMContentLoaded', function() {
	var continueButton = document.getElementById('continue');
	var backButton = document.getElementById('back');
	var btn = document.getElementById('mypass');
	var myownpass = false;
	
	function generate(len, num, liter, symbol)
	{
		var ints =[0,1,2,3,4,5,6,7,8,9]; 
		var chars=['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		var symbs=['!','@','#','$','%','^','&','*','(',')','-','_','+','='];
		var out='';
		var randhelper=0;
		var fullmas = [];
		if(num==true)
		{
			fullmas = ints;
			randhelper = 10;
			if(liter==true)
			{
				fullmas = fullmas.concat(chars);
				randhelper=randhelper+50;
			}
			if(symbol==true)
			{
				fullmas = fullmas.concat(symbs);
				randhelper=randhelper+14;
			}
		}
		else if(liter==true)
		{
			fullmas = chars;
			randhelper = 50;
			if(symbol==true)
			{
				fullmas = fullmas.concat(symbs);
				randhelper=randhelper+14;
			}
		}
		else if(symbol==true)
		{
			fullmas = symbs;
			randhelper=14;
		}
		for(var i=0;i<len;i++)
		{
			var test = Math.random(1,fullmas.length)*randhelper;
			var ch2=Math.ceil(test);
			if(ch2==randhelper)
				ch2=0;
			out+=fullmas[ch2];
		}
		return out;
	}
	
	function generateword(word)
	{
		var out='';
		for(var i=0; i<word.length; i++)
		{
			var ch=Math.random(1,2);
			if(ch<0.5)
			{
				if(word[i]=='a'||word[i]=='A')
				{
					out+='@';
				}
				else if(word[i]=='b'||word[i]=='B')
				{
					out+='6';
				}
				else if(word[i]=='c'||word[i]=='C')
				{
					if(word[i+1]=='h'||word[i]=='H')
					{
						out+='4';
						i++;
					}
				}
				else if(word[i]=='g'||word[i]=='G')
				{
					out+='9';
				}
				else if(word[i]=='i'||word[i]=='I')
				{
					out+='!';
				}
				else if(word[i]=='l'||word[i]=='L')
				{
					out+='1';
				}
				else if(word[i]=='o'||word[i]=='0')
				{
					out+='0';
				}
				else if(word[i]=='s'||word[i]=='S')
				{
					out+='$';
				}
				else
				{
					out+=word[i];
				}
			}
			else
			{
				out+=word[i];
			}
		}
		return out;
	}
	
	backButton.addEventListener('click', function() { 
		window.open("popup.html","_self");
	}, false);
	continueButton.addEventListener('click', function() { 
		d = document;
		var len = d.getElementById("len").value;
		if(myownpass==false)
		{
			var num=d.getElementById("num").checked;
			var liter=d.getElementById("literal").checked;
			var symb=d.getElementById("symb").checked;
			var out = generate(len, num, liter, symb);
		}
		else
		{
			var out = generateword(len);
		}
		alert(out);
	}, false);
	
	btn.addEventListener('click', function() { 
		var numptag = document.getElementById('numptag');
		var litptag = document.getElementById('litptag');
		var symbptag = document.getElementById('symbptag');
		var lenorpass = document.getElementById('lenorpass');
		if(myownpass==false)
		{
			myownpass=true;
			numptag.style.display = 'none';
			litptag.style.display = 'none';
			symbptag.style.display = 'none';
			lenorpass.innerHTML = 'Слово:';
			btn.innerHTML = 'Случайный пароль';
		}
		else
		{
			myownpass=false;
			numptag.style.display = 'block';
			litptag.style.display = 'block';
			symbptag.style.display = 'block';
			lenorpass.innerHTML = 'Длина:';
			btn.innerHTML = 'Пароль из слова';
		}
	}, false);
}, false);