function elementReady(selector) {
	return new Promise((resolve, reject) => {
		let el = document.querySelector(selector);
		if (el) {resolve(el);}
		new MutationObserver((mutationRecords, observer) => {
			// Query for elements matching the specified selector
			Array.from(document.querySelectorAll(selector)).forEach((element) => {
				resolve(element);
				//Once we have resolved we don't need the observer anymore.
				observer.disconnect();
			});
		})
			.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
	});

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handle_hcaptcha(bad_kw){
	let text = document.getElementsByClassName("prompt-text")[0];
	let skip = document.getElementsByClassName("refresh button")[0];
	var skipped = false;

	for (let i=0; i<bad_kw.length; i++){
		if (text.innerText.includes(bad_kw[i])) {
			await sleep(50);
			skip.click();
			skipped = true;
			break;
		}
	}
	if (skipped) {
		await sleep(250);
		handle_hcaptcha(bad_kw); // in case it gets a double "negative" captcha, loop thru one more time
	}
}

var vnames = ["boat", "bicycle", "motorcycle", "bus", "truck"]

var keywords = [];

chrome.storage.sync.get("boat", function(data) {
			if (data["boat"]){
				keywords.push("boat");
}});
			
chrome.storage.sync.get("bicycle", function(data) {
			if (data["bicycle"]){
				keywords.push("bicycle");
			}});
			
chrome.storage.sync.get("motorcycle", function(data) {
			if (data["motorcycle"]){
				keywords.push("motorcycle");
			}});
			
chrome.storage.sync.get("bus", function(data) {
			if (data["bus"]){
				keywords.push("bus");
			}});
			
chrome.storage.sync.get("truck", function(data) {
			if (data["truck"]){
				keywords.push("truck");
			}});

console.log(keywords);



var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		elementReady("body > div.challenge-container > div > div > div.challenge-header > div.challenge-prompt > div.prompt-padding > div.prompt-text").then(
			function(){
				handle_hcaptcha(keywords);
			}
		)
	}
	}, 10);