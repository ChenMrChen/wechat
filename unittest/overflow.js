function a(i){
	console.log("stack level: " + i)
	a(i+1);
}
a(0);
