document.addEventListener("DOMContentLoaded",function(){
	browser.runtime.sendMessage({message:"getData"}).then(response => {
    console.log("Response is " + response);
 }
 ).catch(err => console.log(err));
})


browser.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.message == "sendData"){
		//console.log("RESPONSE RECEIVED -------------- ");
		//console.log(request.content);
		document.getElementsByClassName("main")[0].textContent =  request.content;
	}
})