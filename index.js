document.addEventListener("DOMContentLoaded",function(){
  $(".main").html("<center><i class='myloader fa fa-circle-o-notch fa-spin' style='font-size:1000%'></i><br><br> <h2> Processing... </h2></center>")
	browser.runtime.sendMessage({message:"getData"}).then(response => {
    console.log("Response is " + response);
 }
 ).catch(err => console.log(err));

})


browser.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.message == "sendData"){
        callOpenAPI(' Generate the summary of the following content. understand the meaning first , remember this app is for blog readers , provide the summary that blog readers would like. The summary generated should have embedded html in it. The format should be such that , there should be a title like : <h1> {title} </h1> <br><br> . The content should have bullet points and line breaks like . <bullet> {point 1} <br><br> . there should be 5 such bullet points with each bullet point having 40 words.' + getWordStr(removeMultipleWhitespace(request.content))); 
	}
})

function getWordStr(str) {
    return str.split(/\s+/).slice(0, 1500).join(" ");
}
 
 function removeMultipleWhitespace(str) {
  return str.replace(/\s{2,}/g, ' ');
}


function callOpenAPI(promptText) {
  console.log(" prompt text = " + promptText);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.openai.com/v1/completions', true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer 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');

  var requestBody = JSON.stringify({
   "model": "text-davinci-003",
    "prompt": promptText,
    "max_tokens": 1000,
    "temperature": Math.random()
  });

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      // Handle the response from the OpenAI API here
      console.log(response.choices[0].text);
      $(".main").html(response.choices[0].text + " <br><br><br><br> <center>@copyright 2023 * Himanshu Singh Bisht </center> <br><br><br>");
    } else {
      $(".main").html("<p style='color: red; font-weight: bold;'>Error: Unable to process your request. Please try again later.</p>")
    }
  };
  xhr.send(requestBody);
}


