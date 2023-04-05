let title = document.getElementsByTagName('title')[0];

setInterval(()=>{
	let str = title.innerHTML;
	title.innerHTML = str.substr(3) + str.substr(0,3);
},500)