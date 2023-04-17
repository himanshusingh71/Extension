function extractMeaningfulText(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');
   const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'figcaption', 'strong'];
  const textContent = [];

  tags.forEach(tag => {
    const elements = document.getElementsByTagName(tag);
    for (const element of elements) {
      if (element.textContent.trim() !== '') {
        textContent.push(element.textContent.trim());
      }
    }
  });

  return textContent.join(' ');
}



// Function to fetch the HTML content of the currently opened webpage
function fetchHtmlContent() {
  return browser.tabs.executeScript({
    code: 'document.documentElement.outerHTML;'
  });
}


browser.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.message == "getData"){
fetchHtmlContent().then(([html]) => {
  const textContent = extractMeaningfulText(html);
  console.log(textContent);

  browser.runtime.sendMessage({message:"sendData",content:textContent})
});
	}
})